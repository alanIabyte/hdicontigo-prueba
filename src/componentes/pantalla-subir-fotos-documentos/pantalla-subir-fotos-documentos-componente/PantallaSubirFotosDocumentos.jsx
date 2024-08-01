/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { loader } from "graphql.macro";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery, useSubscription } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CloseIcon from "@material-ui/icons/Close";
import {
  ContenedorBoton,
  ContenedorIcono,
  ContenedorPantalla,
  ContenedorPrevisualizacionDeImagen,
  ContenedorPrevisualizacionDeImagenContenedor,
  ContenedorPrevisualizacionDeImagenImagen,
  ContenedorTitulo,
  Divisor,
  EnvolvedorPantallaDocumentos,
  PantallaSubirDocumentos,
  Subtitulo,
  TituloFijo,
} from "./PantallaSubirFotosDocumentos.styled";
import Boton from "../../boton";
import EncabezadoReporte from "../../encabezado-reporte";
import FotoContenedor from "../../foto-contenedor";
import FrontalDerecha from "../recursos/frontal-derecha.png";
import FrontalIzquierda from "../recursos/frontal-izquierda.png";
import TraseraDerecha from "../recursos/trasera-derecha.png";
import TraseraIzquierda from "../recursos/trasera-izquierda.png";
import PantallaCamara from "../../pantalla-camara";
import Configuraciones from "../../../servicios/configuraciones";
import IndicadorCarga from "../../indicador-carga";
import { Alerta } from "../../alerta";
import Constantes from "../../../recursos/constantes";
import { Titulo3 } from "../../componentes-styled-compartidos/Textos";

const diccionario = {
  titulo: "Ayúdanos a agilizar el proceso",
  subtituloInicial:
    "El ajustador podrá ver las fotografías que agregues al oprimir guardar.",
  subtitulo: "Compártenos fotos del accidente:",
  subtitulo2: "Compártenos fotos de estos documentos:",
  opcionesFotos: {
    vehiculo: {
      titulo1: "Frontal derecha",
      titulo2: "Frontal izquierda",
      titulo3: "Trasera derecha",
      titulo4: "Trasera izquierda",
    },
    documentos: {
      titulo1: "Licencia de conducir (frente)",
      titulo2: "Licencia de conducir (reverso)",
      titulo3: "Tarjeta de circulación (frente)",
      titulo4: "Tarjeta de circulación (reverso)",
    },
    textoFoto: "Tomar foto",
  },
  etiquetaBoton: "Guardar",
  alertaLlegadaAjustador: {
    encabezado: "Fotos no guardadas",
    texto:
      // eslint-disable-next-line max-len
      '<p>Hay algunas fotos que no se han guardado. Si las descartas, tu ajustador puede tomarlas nuevamente.</p><p style="font-family: var(--fuente-proxima-bold);">¿Deseas guardar o descartar las fotos?</p>',
    textoBoton1: "Guardar",
    textoBoton2: "Descartar fotos",
  },
};

const OBTENER_IMAGENES = loader(
  "../../../graphQL/query/reporte/obtener_imagenes_reporte.graphql"
);

const SUSCRIPCION_AJUSTADOR = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const nombreCookie = Constantes.nombreDeCookie;

const PantallaSubirFotosDocumentos = () => {
  const paginaAnterior = "/menu-espera";
  const history = useHistory();
  const location = useLocation();
  const estadoApp = useSelector((estado) => estado);
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  console.log(estadoApp);
  let reporte;
  if (estadoApp.datosReporte && estadoApp.datosReporte.numeroReporte) {
    reporte = estadoApp.datosReporte.numeroReporte;
  } else if (
    location &&
    location.search &&
    location.search.includes("numeroReporte")
  ) {
    const params = new URLSearchParams(location.search);
    reporte = params.get("numeroReporte");
  } else {
    history.push({
      pathname: "/",
      state: {
        mostrarAlerta: true,
      },
    });
  }
  let telefonoContacto;
  if (estadoApp.informacionContacto && estadoApp.informacionContacto.telefono) {
    telefonoContacto = estadoApp.informacionContacto.telefono;
  } else if (objetoCookie && objetoCookie.Telefono) {
    telefonoContacto = objetoCookie.Telefono;
  } else {
    history.push({
      pathname: "/",
      state: {
        mostrarAlerta: true,
      },
    });
  }
  const [cargando, asignarValorCargando] = useState(false);
  const [mostrarCamara, asignarValorMostrarCamara] = useState(false);
  const [mostrarPrevisualizacion, asignarValorMostrarPrevisualizacion] =
    useState(false);
  const [actual, asignarValorActual] = useState({
    indice: 0,
    titulo: "",
  });
  const [imagenAMostrarEnModal, asignarValorImagenAMostrarEnModal] = useState();
  // El nombre de archivos se guarda con extensión jpg pero pueden ser de cualquier tipo
  // ya que leemos los datos en base 64 de la imagen y esos son los que se usan para su despliegue.
  // Se pudiera luego hacer una implementación para guardar los archivos con la extensión correspondiente.
  // const [imagenesEstado, asignarValorImagenesEstado] = useState(
  //   estadoApp.datosImagenesEstado ? estadoApp.datosImagenesEstado : []
  // );
  const dispatch = useDispatch();
  const [imagenes, asignarValorImagenes] = useState(
    estadoApp.datosImagenesEstado
      ? estadoApp.datosImagenesEstado
      : [
          {
            imagen: "",
            seCargoAServidor: false,
            error: false,
            nombreImagen: "frontal-derecha.jpg",
          },
          {
            imagen: "",
            seCargoAServidor: false,
            error: false,
            nombreImagen: "frontal-izquierda.jpg",
          },
          {
            imagen: "",
            seCargoAServidor: false,
            error: false,
            nombreImagen: "trasera-derecha.jpg",
          },
          {
            imagen: "",
            seCargoAServidor: false,
            error: false,
            nombreImagen: "trasera-izquierda.jpg",
          },
          {
            imagen: "",
            seCargoAServidor: false,
            error: false,
            nombreImagen: "licencia-frontal.jpg",
          },
          {
            imagen: "",
            seCargoAServidor: false,
            error: false,
            nombreImagen: "licencia-trasera.jpg",
          },
          {
            imagen: "",
            seCargoAServidor: false,
            error: false,
            nombreImagen: "tarjeta-circulacion-frontal.jpg",
          },
          {
            imagen: "",
            seCargoAServidor: false,
            error: false,
            nombreImagen: "tarjeta-circulacion-trasera.jpg",
          },
        ]
  );
  const [mostrarModalAjustador, asignarValorMostrarModalAjustador] =
    useState(false);
  const [obtenerImagenes, { loading, error, data }] = useLazyQuery(
    OBTENER_IMAGENES,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const { data: dataLlegadaAjustador } = useSubscription(
    SUSCRIPCION_AJUSTADOR,
    {
      variables: { numeroReporte: reporte },
    }
  );

  const convierteAObjeto = (arregloRespuesta) => {
    const objetoResultado = {};
    for (let i = 0; i < arregloRespuesta.length; i += 1) {
      const { nombre } = arregloRespuesta[i];
      const llaveAUtilizar = nombre;
      objetoResultado[llaveAUtilizar] = arregloRespuesta[i].url;
    }
    return objetoResultado;
  };

  const convertirABase64DeUrl = async (url) => {
    const respuestaFetch = await fetch(url);
    const blob = await respuestaFetch.blob();
    return new Promise((resuelve) => {
      const lector = new FileReader();
      lector.readAsDataURL(blob);
      lector.onloadend = () => {
        const base64data = lector.result;
        resuelve(base64data);
      };
    });
  };

  useEffect(() => {
    obtenerImagenes({
      variables: { numeroReporte: reporte, usuario: telefonoContacto },
    });
  }, []);

  useEffect(async () => {
    if (!loading) {
      asignarValorCargando(false);
    }
    if (!loading && data && !error) {
      const {
        obtener_imagenes_reporte: { dato },
      } = data;
      if (dato) {
        const objetoImagenes = convierteAObjeto(dato);
        const copiaArreglo = [...imagenes];
        for (let i = 0; i < imagenes.length; i += 1) {
          const nombreDeImagen = imagenes[i].nombreImagen;
          if (nombreDeImagen in objetoImagenes) {
            // eslint-disable-next-line no-await-in-loop
            const imagenBase64 = await convertirABase64DeUrl(
              objetoImagenes[nombreDeImagen]
            );
            copiaArreglo[i].imagen = imagenBase64;
            copiaArreglo[i].seCargoAServidor = true;
          }
        }
        // estadoApp.datosImagenesEstado = copiaArreglo;
        asignarValorImagenes(copiaArreglo);
        asignarValorCargando(false);
      }
    } else if (error) {
      asignarValorCargando(false);
    } else if (loading) {
      asignarValorCargando(true);
    }

    if (!loading && error) {
      asignarValorCargando(false);
      console.log("Hubo un error");
    }
  }, [loading, data, error]);

  useEffect(() => {
    if (
      dataLlegadaAjustador &&
      dataLlegadaAjustador.escucha_evento_actualizacion_reporte &&
      dataLlegadaAjustador.escucha_evento_actualizacion_reporte.tipoMensaje &&
      dataLlegadaAjustador.escucha_evento_actualizacion_reporte.tipoMensaje ===
        1
    ) {
      asignarValorMostrarModalAjustador(true);
    }
  }, [dataLlegadaAjustador]);

  const abrirCamara = (valores) => {
    asignarValorActual(valores);
    asignarValorMostrarCamara(true);
  };

  const cerrarCamara = () => {
    asignarValorMostrarCamara(false);
  };

  const alAceptarImagen = (imagen) => {
    const copiaArreglo = [...imagenes];
    const { indice } = actual;
    copiaArreglo[indice].imagen = imagen;
    copiaArreglo[indice].seCargoAServidor = false;
    asignarValorImagenes(copiaArreglo);

    // asignarValorImagenesEstado(copiaArreglo);
    asignarValorMostrarCamara(false);
  };

  const alPresentarseErrorEnPrecargar = (indice) => {
    if (!imagenes[indice].error) {
      const copiaArreglo = [...imagenes];
      copiaArreglo[indice].error = true;
      // estadoApp.datosImagenesEstado = copiaArreglo;
      asignarValorImagenes(copiaArreglo);
    }
  };

  const alCargarseExitosamente = (indice) => {
    if (imagenes[indice].error) {
      const copiaArreglo = [...imagenes];
      copiaArreglo[indice].error = false;
      // dispatch({
      //   type: "BORRAR",
      //   indice: "ImagenesSiniestro",
      // });
      // dispatch({
      //   type: "BORRAR_INDICES",
      //   indices: [
      //     "ImagenesSiniestro",
      //     "NombreUsuarioPerfil"
      //   ]
      // })
      dispatch({
        type: "AGREGAR",
        valor: copiaArreglo,
        indice: "datosImagenesEstado",
      });
      // estadoApp.datosImagenesEstado = copiaArreglo;
      asignarValorImagenes(copiaArreglo);
    }
  };

  const subirVista = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const abrirPrevisualizacion = (e, indice) => {
    e.stopPropagation();
    asignarValorImagenAMostrarEnModal(imagenes[indice].imagen);
    asignarValorMostrarPrevisualizacion(true);
  };

  const cerrarPrevisualizacion = () => {
    asignarValorMostrarPrevisualizacion(false);
  };

  const cargaImagenAServidor = async (imagenBase64, nombreImagen) => {
    const imagenBase64Datos = await fetch(imagenBase64);
    const imagenBlob = await imagenBase64Datos.blob();
    if (imagenBlob) {
      const respuestaServidor = await fetch(
        `${Configuraciones.api}/reporte/imagen/${reporte}/${telefonoContacto}/${nombreImagen}`,
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
      return respuestaServidor;
    }
    return null;
  };

  const cargarImagenes = async () => {
    const copiaArreglo = [...imagenes];
    asignarValorCargando(true);
    for (let i = 0; i < imagenes.length; i += 1) {
      const {
        imagen,
        error: errorEnObjeto,
        nombreImagen,
        seCargoAServidor,
      } = imagenes[i];
      if (imagen && !errorEnObjeto && !seCargoAServidor) {
        // eslint-disable-next-line no-await-in-loop
        const response = await cargaImagenAServidor(imagen, nombreImagen);
        const { completado, error: errorEncarga } = response;
        if (!errorEncarga && completado) {
          copiaArreglo[i].seCargoAServidor = true;
        }
      }
    }
    asignarValorCargando(false);
    asignarValorImagenes(copiaArreglo);
    subirVista();
  };

  const { titulo } = actual;
  return mostrarCamara ? (
    <PantallaCamara
      titulo={titulo}
      alCerrar={cerrarCamara}
      alAceptar={alAceptarImagen}
    />
  ) : (
    <EnvolvedorPantallaDocumentos key={v4()}>
      <Alerta
        mostrarIcono={false}
        textoEncabezado={diccionario.alertaLlegadaAjustador.encabezado}
        textoCuerpo={diccionario.alertaLlegadaAjustador.texto}
        mostrarModal={mostrarModalAjustador}
        etiquetaBoton={diccionario.alertaLlegadaAjustador.textoBoton1}
        etiquetaBoton2={diccionario.alertaLlegadaAjustador.textoBoton2}
        temaBoton2="simple"
        funcionLlamadaBoton={() => {
          cargarImagenes();
          history.push({
            pathname: "/pasos-progreso",
            search: `?numeroReporte=${reporte}`,
          });
        }}
        funcionLlamadaBoton2={() => {
          history.push({
            pathname: "/pasos-progreso",
            search: `?numeroReporte=${reporte}`,
          });
        }}
        mostrarCierre={false}
      />
      {cargando ? <IndicadorCarga /> : null}
      {mostrarPrevisualizacion && (
        <ContenedorPrevisualizacionDeImagen>
          <ContenedorPrevisualizacionDeImagenContenedor>
            <CloseIcon onClick={cerrarPrevisualizacion} />
            <ContenedorPrevisualizacionDeImagenImagen
              src={imagenAMostrarEnModal}
            />
          </ContenedorPrevisualizacionDeImagenContenedor>
        </ContenedorPrevisualizacionDeImagen>
      )}
      <EncabezadoReporte reporte={reporte} />
      <ContenedorTitulo>
        <TituloFijo>{diccionario.titulo}</TituloFijo>
        <ContenedorIcono
          onClick={() => {
            history.push({
              pathname: paginaAnterior,
              search: `?numeroReporte=${reporte}`,
            });
          }}
        >
          <CloseRoundedIcon />
        </ContenedorIcono>
      </ContenedorTitulo>
      <PantallaSubirDocumentos>
        <ContenedorPantalla>
          <Subtitulo style={{ margin: "0px" }}>
            {diccionario.subtituloInicial}
          </Subtitulo>
          <Subtitulo>{diccionario.subtitulo}</Subtitulo>
          <FotoContenedor
            titulo={diccionario.opcionesFotos.vehiculo.titulo1}
            imagenPorDefecto={FrontalDerecha}
            imagen={imagenes[0].imagen}
            seCargoAServidor={imagenes[0].seCargoAServidor}
            alDarClick={() => {
              abrirCamara({
                indice: 0,
                titulo: diccionario.opcionesFotos.vehiculo.titulo1,
              });
            }}
            alDarClickEnZoom={(e) => {
              abrirPrevisualizacion(e, 0);
            }}
            alPresentarError={() => {
              alPresentarseErrorEnPrecargar(0);
            }}
            alCargarseExitosamente={() => {
              alCargarseExitosamente(0);
            }}
          />
          <FotoContenedor
            titulo={diccionario.opcionesFotos.vehiculo.titulo2}
            imagenPorDefecto={FrontalIzquierda}
            imagen={imagenes[1].imagen}
            seCargoAServidor={imagenes[1].seCargoAServidor}
            alDarClick={() => {
              abrirCamara({
                indice: 1,
                titulo: diccionario.opcionesFotos.vehiculo.titulo2,
              });
            }}
            alDarClickEnZoom={(e) => {
              abrirPrevisualizacion(e, 1);
            }}
            alPresentarError={() => {
              alPresentarseErrorEnPrecargar(1);
            }}
            alCargarseExitosamente={() => {
              alCargarseExitosamente(1);
            }}
          />
          <FotoContenedor
            titulo={diccionario.opcionesFotos.vehiculo.titulo3}
            imagenPorDefecto={TraseraDerecha}
            imagen={imagenes[2].imagen}
            seCargoAServidor={imagenes[2].seCargoAServidor}
            alDarClick={() => {
              abrirCamara({
                indice: 2,
                titulo: diccionario.opcionesFotos.vehiculo.titulo3,
              });
            }}
            alDarClickEnZoom={(e) => {
              abrirPrevisualizacion(e, 2);
            }}
            alPresentarError={() => {
              alPresentarseErrorEnPrecargar(2);
            }}
            alCargarseExitosamente={() => {
              alCargarseExitosamente(2);
            }}
          />
          <FotoContenedor
            titulo={diccionario.opcionesFotos.vehiculo.titulo4}
            imagenPorDefecto={TraseraIzquierda}
            imagen={imagenes[3].imagen}
            seCargoAServidor={imagenes[3].seCargoAServidor}
            alDarClick={() => {
              abrirCamara({
                indice: 3,
                titulo: diccionario.opcionesFotos.vehiculo.titulo4,
              });
            }}
            alDarClickEnZoom={(e) => {
              abrirPrevisualizacion(e, 3);
            }}
            alPresentarError={() => {
              alPresentarseErrorEnPrecargar(3);
            }}
            alCargarseExitosamente={() => {
              alCargarseExitosamente(3);
            }}
          />
          <Divisor />
          <Subtitulo>{diccionario.subtitulo2}</Subtitulo>

          <Titulo3>Licencia de conducir</Titulo3>
          <FotoContenedor
            titulo={diccionario.opcionesFotos.documentos.titulo1}
            imagen={imagenes[4].imagen}
            seCargoAServidor={imagenes[4].seCargoAServidor}
            alDarClick={() => {
              abrirCamara({
                indice: 4,
                titulo: diccionario.opcionesFotos.documentos.titulo1,
              });
            }}
            alDarClickEnZoom={(e) => {
              abrirPrevisualizacion(e, 4);
            }}
            alPresentarError={() => {
              alPresentarseErrorEnPrecargar(4);
            }}
            alCargarseExitosamente={() => {
              alCargarseExitosamente(4);
            }}
          />
          <FotoContenedor
            titulo={diccionario.opcionesFotos.documentos.titulo2}
            imagen={imagenes[5].imagen}
            seCargoAServidor={imagenes[5].seCargoAServidor}
            alDarClick={() => {
              abrirCamara({
                indice: 5,
                titulo: diccionario.opcionesFotos.documentos.titulo2,
              });
            }}
            alDarClickEnZoom={(e) => {
              abrirPrevisualizacion(e, 5);
            }}
            alPresentarError={() => {
              alPresentarseErrorEnPrecargar(5);
            }}
            alCargarseExitosamente={() => {
              alCargarseExitosamente(5);
            }}
          />

          <Titulo3>Tarjeta de circulación</Titulo3>

          <FotoContenedor
            titulo={diccionario.opcionesFotos.documentos.titulo3}
            imagen={imagenes[6].imagen}
            seCargoAServidor={imagenes[6].seCargoAServidor}
            alDarClick={() => {
              abrirCamara({
                indice: 6,
                titulo: diccionario.opcionesFotos.documentos.titulo3,
              });
            }}
            alDarClickEnZoom={(e) => {
              abrirPrevisualizacion(e, 6);
            }}
            alPresentarError={() => {
              alPresentarseErrorEnPrecargar(6);
            }}
            alCargarseExitosamente={() => {
              alCargarseExitosamente(6);
            }}
          />
          <FotoContenedor
            titulo={diccionario.opcionesFotos.documentos.titulo4}
            imagen={imagenes[7].imagen}
            seCargoAServidor={imagenes[7].seCargoAServidor}
            alDarClick={() => {
              abrirCamara({
                indice: 7,
                titulo: diccionario.opcionesFotos.documentos.titulo4,
              });
            }}
            alDarClickEnZoom={(e) => {
              abrirPrevisualizacion(e, 7);
            }}
            alPresentarError={() => {
              alPresentarseErrorEnPrecargar(7);
            }}
            alCargarseExitosamente={() => {
              alCargarseExitosamente(7);
            }}
          />
          <ContenedorBoton>
            <Boton
              etiqueta={diccionario.etiquetaBoton}
              tema="estandar"
              enClick={cargarImagenes}
            />
          </ContenedorBoton>
        </ContenedorPantalla>
      </PantallaSubirDocumentos>
    </EnvolvedorPantallaDocumentos>
  );
};

PantallaSubirFotosDocumentos.defaultProps = {};

PantallaSubirFotosDocumentos.propTypes = {};

export default PantallaSubirFotosDocumentos;
