import React, { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import IconoLupa from "@material-ui/icons/SearchRounded";
import IconoCamara from "@material-ui/icons/PhotoCamera";
import IconoFoto from "@material-ui/icons/PhotoSizeSelectActual";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import {
  Archivo,
  BuscadorPolizasSiniestradas,
  ContenedorBoton,
  ContenedorBotonSubidaDeFotos,
  ContenedorBuscadorPolizasSiniestradas,
  ContenedorOpcionSubidaDeFotos,
  ContenedorOpcionSubidaDeFotosTexto,
  ContenedorPolizaSiniestrada,
  ContenedorPolizasSiniestradas,
  ContenedorSubidaDeFotos,
  ContenedorSubidaDeFotosCompleto,
  EnvolvedorPantallaPolizas,
  MensajeError,
  PantallaFondoGris,
  PieDePaginaPolizasSiniestradas,
  TituloPolizasSiniestradas,
  ContenedorSinSiniestros,
} from "./PantallaPolizasSiniestradas.styled";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import Boton from "../../boton";
import IndicadorCarga from "../../indicador-carga";
import PolizaSiniestrada from "../../poliza-siniestrada";
import PantallaCamara from "../../pantalla-camara";
import Configuraciones from "../../../servicios/configuraciones";
import BarraAlerta from "../../barra-alerta";
import Constantes from "../../../recursos/constantes";
import { ReactComponent as IconoCarro } from "../../../recursos/iconos/ico_carro_ok.svg";
import { MensajePequeno } from "../../pantalla-registro-poliza/pantalla-registro-poliza-componente/PantallaRegistroPoliza.styled";
import MenuBottomComponente from "../../menu-bottom";
import { validaDispositivoCelular } from "../../../utils/validaDispositivo";
import showConfig from "../../../utils/configs";

const OBTENER_POLIZAS = loader(
  "../../../graphQL/query/poliza/obtener_polizas.graphql"
);

const EVENTOS_PASADOS = loader(
  "../../../graphQL/query/reporte/listado_actualizaciones_reporte.graphql"
);

const diccionario = {
  titulo: "Bienvenido",
  mensajePequeno: "Consulta el detalle de tus pólizas y tus siniestros",
  busqueda: "Buscar póliza",
  etiquetaBoton: "Reportar un siniestro",
  tomarFoto: "Tomar una foto",
  elegirFotoDeLaGaleria: "Elegir foto de la galería",
  cancelar: "Cancelar",
  tituloCamara: "Foto de póliza",
  textoError1: "Carga fallida, reintentar",
  textoError2: "La foto superó el límite de 3 MB, reintentar con otra",
  etiquetaTelefonoVerificado:
    "Tu número de teléfono ha sido validado con éxito",
  sinSiniestros1: "No tienes siniestros activos",
  sinSiniestros2: "",
};

const valores = {
  busqueda: "",
};

let polizasSiniestradas = [];
const nombreCookie = Constantes.nombreDeCookie;

const PantallaPolizasSiniestradas = () => {
  const estadoApp = useSelector((estado) => estado);
  const [polizasEncontradas, asignarValorPolizasEncontradas] =
    useState(polizasSiniestradas);
  const [cargando, asignarValorCargando] = useState(false);
  const [cargandoSubidaImagen, asignarValorCargandoSubidaImagen] =
    useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const telefono = estadoApp.usuario ? estadoApp.usuario : "0";
  const [mostrarInteraccionFotos, asignarValorMostrarInteraccionFotos] =
    useState(false);
  const [mostrarCamara, asignarValorMostrarCamara] = useState(false);
  const [polizaActual, asignarValorPolizaActual] = useState(false);
  const archivoRef = useRef(null);
  const limiteTamanoArchivo = 3145728;
  const location = useLocation();
  let barraTelefonoVerificado = false;
  if (
    location &&
    location.state &&
    location.state.notificacionTelefonoVerificado
  ) {
    barraTelefonoVerificado = true;
  }
  const [cookie] = useCookies([nombreCookie]);
  let objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }
  const usuario =
    objetoCookie && objetoCookie.Usuario ? objetoCookie.Usuario : "0";

  const { data: polizas, loading: enCarga } = useQuery(OBTENER_POLIZAS, {
    variables: { telefono: usuario },
    fetchPolicy: "no-cache",
  });

  const [obtenerEventosPasados] = useLazyQuery(EVENTOS_PASADOS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!enCarga) {
      asignarValorCargando(false);
      if (polizas && polizas.obtener_polizas && polizas.obtener_polizas.dato) {
        // Obtener sólo las pólizas que tengan al menos un reporte activo
        polizasSiniestradas = polizas.obtener_polizas.dato.filter(
          (poliza) => poliza.reportes.length > 0
        );
        // Si sólo hay una póliza con un único incidente, re-dirigir a pasos-progreso
        if (
          polizasSiniestradas.length === 1 &&
          polizasSiniestradas[0].reportes.length === 1
        ) {
          dispatch({
            type: "AGREGAR",
            valor: {
              data: polizasSiniestradas[0].poliza.datosVehiculo,
            },
            indice: "datosVehiculo",
          });
          console.log(polizasSiniestradas[0].reportes[0].numeroSiniestro);
          dispatch({
            type: "AGREGAR",
            valor: polizasSiniestradas[0].reportes[0].numeroSiniestro,
            indice: "numeroSiniestroReporte",
          });
          const reporte = polizasSiniestradas[0].reportes[0];
          const polizaData = polizasSiniestradas[0].poliza;
          if (
            reporte.estatusReporte === "A" ||
            reporte.estatusReporte === "B"
          ) {
            if (reporte.idSubEvento === 1) {
              /**
               * 1 => Reporte de grúa
               */
              dispatch({
                type: "AGREGAR",
                valor: reporte.numeroReporte,
                indice: "numeroReporteGrua",
              });
              history.push({
                pathname: "/pasos-progreso-grua",
              });
              return;
            }

            if (reporte.idSubEvento === 21 || reporte.idSubEvento === 22) {
              /**
               * Cuando es de robo
               * 21 => Robo con violencia
               * 22 => Robo estacionado
               */

              // !Armamos la estructura de la póliza
              const certificadoData = polizaData.numeroCertificado;
              const oficinaData = polizaData.oficina.replace(/^0+/, "");
              const polizaDataParam = polizaData.poliza.replace(/^0+/, "");

              dispatch({
                type: "AGREGAR",
                indice: "datosReporteRobo",
                valor: {
                  numeroPoliza: `${oficinaData}-${polizaDataParam}-${certificadoData}`,
                },
              });
              dispatch({
                type: "AGREGAR",
                valor: reporte.numeroSiniestro,
                indice: "numeroSiniestroReporte",
              });
              /**
               * Validar si la funcionalidad de robo esta prendida
               */
              if (showConfig.showRobo) {
                // !Se elimina que redirija a pasos progreso. Se manda a menu de espera de robo y de ahí se valida si se mostrará pasos progreso
                history.push({
                  pathname: "menu-espera-robo",
                  search: `?numeroReporte=${reporte.numeroReporte}`,
                });
              } else {
                history.push({
                  pathname: "pasos-progreso",
                  search: `?numeroReporte=${reporte.numeroReporte}`,
                });
              }
              return;
            }

            objetoCookie = {
              ...objetoCookie,
              nombreReporta: reporte.nombreReporta,
              vin: reporte.vin,
            };
            // establecerCookie(nombreCookie, JSON.stringify(objetoCookie), {
            //   path: "/",
            // });
            const {
              ubicacion: { latitud, longitud },
            } = reporte;
            if (latitud && longitud) {
              dispatch({
                type: "AGREGAR",
                valor: { lat: latitud, lng: longitud },
                indice: "coordenadasIniciales",
              });
            }

            const fetchEventosPasados = async () => {
              try {
                const { data } = await obtenerEventosPasados({
                  variables: { numeroReporte: reporte.numeroReporte },
                });

                if (
                  data.listado_actualizaciones_reporte.completado &&
                  data.listado_actualizaciones_reporte.dato
                ) {
                  const notificaciones =
                    data.listado_actualizaciones_reporte.dato.ajuste;

                  const tieneNotificacion22 =
                    notificaciones.filter((item) => item.tipoMensaje === 22)
                      .length > 0;

                  if (tieneNotificacion22) {
                    history.push({
                      pathname: "pasos-progreso",
                      search: `?numeroReporte=${reporte.numeroReporte}`,
                    });
                  } else {
                    history.push({
                      pathname: "menu-espera",
                      search: `?numeroReporte=${reporte.numeroReporte}`,
                    });

                    return;
                  }
                }
              } catch (error) {
                console.error("Error fetching data:", error);
                history.push({
                  pathname: "menu-espera",
                  search: `?numeroReporte=${reporte.numeroReporte}`,
                });
              }
            };

            fetchEventosPasados();
          } else {
            if (reporte.idSubEvento === 21 || reporte.idSubEvento === 22) {
              /**
               * Cuando es de robo
               * 21 => Robo con violencia
               * 22 => Robo estacionado
               */

              // !Armamos la estructura de la póliza
              const certificadoData = polizaData.numeroCertificado;
              const oficinaData = polizaData.oficina.replace(/^0+/, "");
              const polizaDataParam = polizaData.poliza.replace(/^0+/, "");

              dispatch({
                type: "AGREGAR",
                indice: "datosReporteRobo",
                valor: {
                  numeroPoliza: `${oficinaData}-${polizaDataParam}-${certificadoData}`,
                },
              });
              dispatch({
                type: "AGREGAR",
                valor: reporte.numeroSiniestro,
                indice: "numeroSiniestroReporte",
              });
              /**
               * Validar si la funcionalidad de robo esta prendida
               */
              if (showConfig.showRobo) {
                // !Se elimina que redirija a pasos progreso. Se manda a menu de espera de robo y de ahí se valida si se mostrará pasos progreso
                history.push({
                  pathname: "menu-espera-robo",
                  search: `?numeroReporte=${reporte.numeroReporte}`,
                });
              } else {
                history.push({
                  pathname: "pasos-progreso",
                  search: `?numeroReporte=${reporte.numeroReporte}`,
                });
              }
              return;
            }
            history.push({
              pathname: "pasos-progreso",
              search: `?numeroReporte=${reporte.numeroReporte}`,
            });
          }
        }

        asignarValorPolizasEncontradas(polizasSiniestradas);
      }
    } else if (enCarga) {
      asignarValorCargando(true);
    }
  }, [polizas, enCarga]);

  const [
    mostrarBarraAlertaTelefonoVerificado,
    asignarValorMostrarBarraAlertaTelefonoVerificado,
  ] = useState(barraTelefonoVerificado);
  const alCambiarBusqueda = (evento) => {
    if (evento) {
      valores.busqueda = evento.target.value;
      const polizasFiltradas = polizasSiniestradas.filter((poliza) =>
        poliza.poliza.poliza.includes(valores.busqueda.replace(/\D/g, ""))
      );
      asignarValorPolizasEncontradas(polizasFiltradas);
    }
  };

  const alDarClickEnImagen = (e) => {
    const numeroDePoliza = e.target.getAttribute("data-numero-poliza");
    asignarValorPolizaActual(numeroDePoliza);
    asignarValorMostrarInteraccionFotos(true);
  };

  const cerrarCamara = () => {
    asignarValorMostrarCamara(false);
  };

  const cargaImagenAServidor = async (imagenBase64) => {
    const stringBase64Imagen = imagenBase64.split("base64,")[1];
    const nuevoArregloPolizas = JSON.parse(JSON.stringify(polizasEncontradas));
    const indicePoliza = nuevoArregloPolizas.findIndex(
      (objeto) => objeto.poliza.poliza === polizaActual
    );
    const poliza = nuevoArregloPolizas[indicePoliza];
    const tamanoArchivo = atob(stringBase64Imagen).length;
    const esDeTamanoAdecuado = tamanoArchivo <= limiteTamanoArchivo;
    if (esDeTamanoAdecuado) {
      const imagenBase64Datos = await fetch(imagenBase64);
      const imagenBlob = await imagenBase64Datos.blob();
      if (imagenBlob && poliza && poliza.poliza && poliza.poliza.vin) {
        const respuestaServidor = await fetch(
          // eslint-disable-next-line max-len
          `${Configuraciones.api}/poliza/vehiculo/imagen/${telefono}/${polizaActual}/${poliza.poliza.vin}/miniatura.jpg`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/octet-stream",
            },
            body: imagenBlob,
          }
        )
          .then((respuesta) => respuesta.json())
          .then((respuesta) => respuesta)
          .catch((errorEnRespuesta) => ({ error: errorEnRespuesta }));
        if (respuestaServidor.error) {
          poliza.poliza.error = diccionario.textoError1;
        } else if (
          poliza.poliza.imagenesVehiculo &&
          poliza.poliza.imagenesVehiculo.length
        ) {
          poliza.poliza.error = "";
          poliza.poliza.imagenesVehiculo[0] = {
            url: imagenBase64,
          };
        } else {
          poliza.poliza.error = "";
          poliza.poliza.imagenesVehiculo = [{ url: imagenBase64 }];
        }
        asignarValorPolizasEncontradas(nuevoArregloPolizas);
        return respuestaServidor;
      }
    }
    poliza.poliza.error = diccionario.textoError2;
    asignarValorPolizasEncontradas(nuevoArregloPolizas);
    return null;
  };

  const alAceptarImagen = async (imagen) => {
    asignarValorCargandoSubidaImagen(true);
    asignarValorMostrarCamara(false);
    await cargaImagenAServidor(imagen);
    asignarValorMostrarInteraccionFotos(false);
    asignarValorCargandoSubidaImagen(false);
  };

  const alDarClickEnContenedor = () => {
    archivoRef.current.click();
  };

  const convertirABase64 = (archivo) =>
    new Promise((resuelve, rechaza) => {
      const lector = new FileReader();
      lector.readAsDataURL(archivo);
      lector.onload = () => resuelve(lector.result);
      lector.onerror = (error) => rechaza(error);
    });

  const alSeleccionarArchivo = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return null;
    }
    const archivoEnBase64 = await convertirABase64(e.target.files[0]);
    asignarValorCargandoSubidaImagen(true);
    await cargaImagenAServidor(archivoEnBase64);
    asignarValorMostrarInteraccionFotos(false);
    asignarValorCargandoSubidaImagen(false);
    return null;
  };

  const funcionDevuelveFormatoPoliza = (cadena) => {
    let formatoSinCerosIn = "";
    if (cadena) {
      if (cadena.length > 0) {
        formatoSinCerosIn = cadena.replace(/^(0+)/g, "");
      }
    }
    return formatoSinCerosIn;
  };

  const [verMenuInferior, setVerMenuInferior] = useState(false);

  useEffect(() => {
    setVerMenuInferior(validaDispositivoCelular());
  }, []);

  return mostrarCamara ? (
    <PantallaCamara
      titulo={diccionario.tituloCamara}
      alCerrar={cerrarCamara}
      alAceptar={alAceptarImagen}
    />
  ) : (
    <EnvolvedorPantallaPolizas key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <EncabezadoPolizasSiniestradas mostrarMenu={!verMenuInferior} />
      <PantallaFondoGris>
        <ContenedorPolizasSiniestradas polizas={polizasEncontradas.length}>
          <BarraAlerta
            etiqueta={diccionario.etiquetaTelefonoVerificado}
            mostrarAlerta={mostrarBarraAlertaTelefonoVerificado}
            manejarCierre={asignarValorMostrarBarraAlertaTelefonoVerificado}
            estilo="exitoso"
            posicionAbsoluta
            encabezadoAlto
          />
          <TituloPolizasSiniestradas id="titulo">
            {diccionario.titulo}
          </TituloPolizasSiniestradas>
          <MensajePequeno>{diccionario.mensajePequeno}</MensajePequeno>
          <ContenedorBuscadorPolizasSiniestradas>
            <IconoLupa style={{ fontSize: 20 }} />
            <BuscadorPolizasSiniestradas
              placeholder={diccionario.busqueda}
              defaultValue={valores.busqueda}
              onChange={alCambiarBusqueda}
              autoFocus={valores.busqueda !== ""}
            />
          </ContenedorBuscadorPolizasSiniestradas>
          {polizasEncontradas.length === 0 && (
            <ContenedorSinSiniestros>
              <IconoCarro> </IconoCarro>
              <br />
              {diccionario.sinSiniestros1}
            </ContenedorSinSiniestros>
          )}
          {polizasEncontradas.map((valor) => (
            <ContenedorPolizaSiniestrada key={valor.poliza.poliza}>
              <PolizaSiniestrada
                numeroPoliza={funcionDevuelveFormatoPoliza(valor.poliza.oficina)
                  .concat("-")
                  .concat(funcionDevuelveFormatoPoliza(valor.poliza.poliza))
                  .concat("-")
                  .concat(valor.poliza.numeroCertificado)}
                numeroPolizaCompuesto={funcionDevuelveFormatoPoliza(
                  valor.poliza.oficina
                )
                  .concat("-")
                  .concat(funcionDevuelveFormatoPoliza(valor.poliza.poliza))
                  .concat("-")
                  .concat(valor.poliza.numeroCertificado)}
                vehiculo={valor.poliza.datosVehiculo}
                vigencia={valor.poliza.fechaTermino}
                vin={valor.poliza.vin}
                siniestros={valor.reportes}
                enClickEnFoto={alDarClickEnImagen}
                imagen={
                  valor.poliza.imagenesVehiculo &&
                  valor.poliza.imagenesVehiculo.length
                    ? valor.poliza.imagenesVehiculo[0].url
                    : ""
                }
                error={valor.poliza.error}
              />
              {valor.poliza.error !== "" && (
                <MensajeError id="errorPoliza">
                  {valor.poliza.error}
                </MensajeError>
              )}
            </ContenedorPolizaSiniestrada>
          ))}
        </ContenedorPolizasSiniestradas>
      </PantallaFondoGris>
      <PieDePaginaPolizasSiniestradas
        bottomSinBar={verMenuInferior ? "1" : "0"}
      >
        <ContenedorBoton>
          <Boton
            etiqueta={diccionario.etiquetaBoton}
            tema="rojo"
            enClick={() => {
              history.push({
                pathname: "/mis-polizas",
                state: {
                  paginaAnterior: history.location,
                  busqueda: "AUTR",
                },
              });
            }}
            // enClick={() => {
            //   dispatch({
            //     type: "AGREGAR",
            //     indice: "seatedClaim",
            //     valor: "crash",
            //   });
            //   history.push({
            //     pathname: "/ingreso-poliza",
            //     state: {
            //       paginaAnterior: "/polizas-siniestradas",
            //     },
            //   });
            // }}
          />
        </ContenedorBoton>
      </PieDePaginaPolizasSiniestradas>
      {mostrarInteraccionFotos && (
        <ContenedorSubidaDeFotosCompleto>
          {cargandoSubidaImagen ? (
            <IndicadorCarga tema="verde-pequeno" />
          ) : null}
          <ContenedorSubidaDeFotos bottomSinBar={verMenuInferior ? "1" : "0"}>
            <ContenedorOpcionSubidaDeFotos>
              <IconoCamara />
              <ContenedorOpcionSubidaDeFotosTexto
                onClick={() => {
                  asignarValorMostrarCamara(true);
                }}
              >
                {diccionario.tomarFoto}
              </ContenedorOpcionSubidaDeFotosTexto>
            </ContenedorOpcionSubidaDeFotos>
            <ContenedorOpcionSubidaDeFotos onClick={alDarClickEnContenedor}>
              <Archivo
                ref={archivoRef}
                type="file"
                onChange={alSeleccionarArchivo}
                accept="image/*"
              />
              <IconoFoto />
              <ContenedorOpcionSubidaDeFotosTexto>
                {diccionario.elegirFotoDeLaGaleria}
              </ContenedorOpcionSubidaDeFotosTexto>
            </ContenedorOpcionSubidaDeFotos>
            <ContenedorBotonSubidaDeFotos>
              <Boton
                etiqueta={diccionario.cancelar}
                tema="simple-gris"
                id="botonCancelar"
                enClick={() => {
                  asignarValorMostrarInteraccionFotos(false);
                }}
              />
            </ContenedorBotonSubidaDeFotos>
          </ContenedorSubidaDeFotos>
        </ContenedorSubidaDeFotosCompleto>
      )}
      {verMenuInferior ? <MenuBottomComponente /> : <></>}
    </EnvolvedorPantallaPolizas>
  );
};

export default PantallaPolizasSiniestradas;
