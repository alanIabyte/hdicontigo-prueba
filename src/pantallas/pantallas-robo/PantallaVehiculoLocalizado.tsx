/* eslint-disable */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import {
  MensajePequeno,
  TituloMisPolizas,
} from "../../componentes/pantalla-pruebas/PantallaTransaccionMitec.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes/componentes-styled-compartidos/Pantalla.styled";
import { Alerta, Boton, IndicadorCarga } from "../../componentes";
import CampoTexto from "../../componentes/campo-texto";
import { CuerpoCuestionarioReporte } from "../../componentes/pantalla-cuestionario-reporte/pantalla-cuestionario-reporte-componente/PantallaCuestionarioReporte.styled";
import SeleccionCuestionario from "../../componentes/seleccion-cuestionario";
import { ContenedorBoton } from "../../componentes/pantalla-creacion-cuenta/pantalla-creacion-cuenta-componente/PantallaCreacionCuenta.styled";
import SelectActualizado from "../../componentes/select-actualizado";
import { MensajeError } from "../../componentes/componentes-styled-compartidos/Textos";
import Encabezado from "../../componentes/encabezado/encabezado-componente/Encabezado";
import { CampoRequeridoSeleccionCuestionario } from "../../componentes/seleccion-cuestionario/seleccion-cuestionario-componente/SeleccionCuestionario.styled";
import { estados, municipios } from "./data/dataBack";
import { v4 } from "uuid";
import { configFuncionalidadRobo } from "./utils";
import { CampoFile, ContenedorInputFile, ContenedorTextoEtiqueta } from "./PantallaVehiculoLocalizado.styled";
import { useHistory, useLocation } from "react-router-dom";
import configuraciones from "../../servicios/configuraciones";

const OBTENER_ESTADOS = loader(
  "../../graphQL/query/robo/obtenerEstados.graphql"
);

const OBTENER_MUNICIPIOS = loader(
  "../../graphQL/query/robo/obtenerCiudades.graphql"
);

const GENERAR_REPORTE = loader(
  "../../graphQL/mutation/robo/robo_reportarVehiculoLocalizado.graphql"
);

type IOpcion = {
  id: string;
  nombre: string;
};

interface IEstado {
  id: number;
  nombre: string;
}

interface IMunicipio {
  estadoId: number;
  municipios: IOpcion[];
}

let valores = {
  estado: "",
  ciudad: "",
  descripcion: "",
  notificado: null,
  fiscalia: "",
  corralon: null,
  nombreCorralon: "",
  declaracion: null,
  oficio: "",
  base64: ""
};

interface ILocationVehiculoLocalizado {
  regreso?: string;
}

const PantallaVehiculoLocalizado = () => {

  const history = useHistory();
  const location = useLocation<ILocationVehiculoLocalizado>();
  const params = new URLSearchParams(window.location.search);

  const numeroReporte = params.get("numeroReporte");

  const regresarMenu = () => {
    // Se valida si se regresa a menu de espera o a la linea del tiempo
    // !Se busca si en el state hay una propiedad llamada regreso
    if (location.state?.regreso && location.state.regreso != "") {
      history.goBack();
    } else {
      history.push({
        pathname: "/menu-espera-robo",
        search: `?numeroReporte=${numeroReporte}`
      });
    }
  };

  if (numeroReporte === "" || numeroReporte === null || numeroReporte === undefined) {
    history.push("/inicio");
  };

  // TODO: Utilizar el setEstadoOpcion cuando se tenga el catalogo de estados
  const [cargando, asignarValorCagando] = useState<boolean>(false);

  const [estado, setEstado] = useState<string>("");
  const [ciudad, setCiudad] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [fiscalia, setFiscalia] = useState<string>("");
  const [nombreCorralon, setNombreCorralon] = useState<string>("");
  const [corralon, setCorralon] = useState<boolean | null>(null);
  const [notificado, setNotificado] = useState<boolean | null>(null);
  const [declaracion, setDeclaracion] = useState<boolean | null>(null);
  
  const [oficio, setOficio] = useState<string>("");
  const [base64, setBase64] = useState("");
  const fileInputRef = useRef();

  const [errorEstado, setErrorEstado] = useState<boolean>(false);
  const [errorCiudad, setErrorCiudad] = useState<boolean>(false);
  const [errorDescripcion, setErrorDescripcion] = useState<boolean>(false);
  const [errorNotificado, setErrorNotificado] = useState<boolean>(false);
  const [errorFiscalia, setErrorFiscalia] = useState<boolean>(false);
  const [errorCorralon, setErrorCorralon] = useState<boolean>(false);
  const [errorNombreCorralon, setErrorNombreCorralon] = useState<boolean>(false);
  const [errorDeclaracion, setErrorDeclaracion] = useState<boolean>(false);
  const [errorOficio, setErrorOficio] = useState<boolean>(false);

  const [listaEstados, setListaEstados] = useState<IOpcion[]>([]);
  const [listaMunicipios, setListaMunicipios]= useState<IOpcion[]>([]);

  const [mostrarAlertaError, setMostrarAlertaError] = useState<boolean>(false);
  const [mostrarAlertaReporteGenerado, setMostrarAlertaReporteGenerado] = useState<boolean>(false);

  const [disabledButtonGenerarReporte, setDisableButtonGnerarReporte] = useState<boolean>(true);

  const [alertaRecomendacionNotificarAutoridades, setAlertaRecomendacionNotificarAutoridades] = useState<boolean>(false);

  const [obtenerEstados, {
    data: dataEstados, loading: loadingEstados, error: errorEstados
  }] = useLazyQuery(OBTENER_ESTADOS);

  const [obtenerMunicipios, {
    data: dataMunicipios, loading: loadingMunicipios, error: errorMunicipios
  }] = useLazyQuery(OBTENER_MUNICIPIOS, {
    fetchPolicy: "network-only",
  });

  const [generarReporteRobo, {
    data: dataGenerarReporte, loading: loadingGenerarReporte, error: errorGenerarReporte
  }] = useMutation(GENERAR_REPORTE, {
    fetchPolicy: "network-only"
  });

  useEffect(() =>{

    if (
      !loadingEstados &&
      dataEstados &&
      dataEstados.obtenerEstados &&
      dataEstados.obtenerEstados.completado &&
      dataEstados.obtenerEstados.dato
    ) {
      // !Llenar la lista con el resultado
      if (dataEstados.obtenerEstados.dato.length > 0) {
        setListaEstados(dataEstados.obtenerEstados.dato)
      }
    }

    if (errorEstados) {
      console.log("error con la lista de estados", errorEstados);
    }

    if (loadingEstados) {
      asignarValorCagando(true);
    } else {
      asignarValorCagando(false);
    }
  }, [dataEstados, errorEstados, loadingEstados]);
  
  useEffect(() =>{
    if (
      !loadingMunicipios &&
      dataMunicipios &&
      dataMunicipios.obtenerCiudades &&
      dataMunicipios.obtenerCiudades.completado &&
      dataMunicipios.obtenerCiudades.dato
    ) {
      // !Llenar la lista con el resultado
      if (dataMunicipios.obtenerCiudades.dato.length > 0) {
        setListaMunicipios(dataMunicipios.obtenerCiudades.dato);
      }
    }

    if (errorMunicipios) {
      console.log("error con la lista de municipios", errorMunicipios);
    }

    if (loadingMunicipios) {
      asignarValorCagando(true);
    } else {
      asignarValorCagando(false);
    }
  }, [dataMunicipios, errorMunicipios, loadingMunicipios]);

  useEffect(() => {
    if (
      !loadingGenerarReporte &&
      dataGenerarReporte &&
      dataGenerarReporte.robo_reportarVehiculoLocalizado &&
      dataGenerarReporte.robo_reportarVehiculoLocalizado.mensaje &&
      dataGenerarReporte.robo_reportarVehiculoLocalizado.codigo
    ) {
      const response = dataGenerarReporte.robo_reportarVehiculoLocalizado;
      if (response.completado && response.dato) {
        // !Reporte generado con éxito
        setMostrarAlertaReporteGenerado(true);
      } else {
        // Falló al generar el reporte
        setMostrarAlertaError(true);
      }
    }
    if (errorGenerarReporte) {
      console.log("Error algenerar reporte", errorGenerarReporte);
      setMostrarAlertaError(true);
    }
    if (loadingGenerarReporte) {
      asignarValorCagando(true);
    } else {
      asignarValorCagando(false);
    }
  }, [dataGenerarReporte, loadingGenerarReporte, errorGenerarReporte]);

  /**
   * @description
   * Función para validar si hay errores dentro del formulario
   * con una promesa para que se utilice dentro de otras funciones
   * y estas esperen primero las validaciones antes de continuar
   * 
   * @returns Promise <boolean>
   */
  const validacionesErrores = (msjErrorEnFormulario: boolean = true) => {
    return new Promise<boolean>((resolve) => {
      setErrorCiudad(false);
      setErrorCorralon(false);
      setErrorDeclaracion(false);
      setErrorDescripcion(false);
      setErrorEstado(false);
      setErrorFiscalia(false);
      setErrorNombreCorralon(false);
      setErrorNotificado(false);
      setErrorOficio(false);

      let hayErrores = false;

      if (!valores.estado && valores.estado === "") {
        hayErrores = true;
        if (msjErrorEnFormulario) {
          setErrorEstado(true);
        }
      }
      if (!valores.ciudad && valores.ciudad === "") {
        hayErrores = true;
        if (msjErrorEnFormulario) {
          setErrorCiudad(true);
        }
      }
      if (!valores.descripcion && valores.descripcion === "") {
        hayErrores = true;
        if (msjErrorEnFormulario) {
          setErrorDescripcion(true);
        }
      }
      
      if (valores.notificado === null) {
        hayErrores = true;
        if (msjErrorEnFormulario) {
          setErrorNotificado(true);
        }
      }
      if (valores.notificado && (!valores.fiscalia && valores.fiscalia === "") ) {
        hayErrores = true;
        if (msjErrorEnFormulario) {
          setErrorFiscalia(true);
        }
      }
      
      if (valores.corralon === null) {
        hayErrores = true;
        if (msjErrorEnFormulario) {
          setErrorCorralon(true);
        }
      }
      if (valores.corralon && (!valores.nombreCorralon && valores.nombreCorralon === "")) {
        hayErrores = true;
        if (msjErrorEnFormulario) {
          setErrorNombreCorralon(true);
        }
      }
      
      if (valores.declaracion === null) {
        hayErrores = true;
        if (msjErrorEnFormulario) {
          setErrorDeclaracion(true);
        }
      }
      if (valores.declaracion && ((valores.oficio === "" || valores.oficio === null) || (valores.base64 === "" || valores.base64 === null))) {
        hayErrores = true;
        if (msjErrorEnFormulario) {
          setErrorOficio(true);
        }
      }

      resolve(hayErrores);
    });
  };

  /**
   * @description
   * Esta función llama a validacionesErrores y habilita/deshabilita
   * el botón de generar reporte
   */
  const disableGenerarReporte = async () => {
    const hayErrores = await validacionesErrores(false);
    setDisableButtonGnerarReporte(hayErrores);
  };

  /**
   * @description
   * Esta función se ejecuta cada que se cambia algun valor dentro
   * de cualquier campo del formulario de la pantalla.
   * 
   * @param propiedad {string} nombre del campo
   * @param e {any} evento del input
   */
  const alCambiarValor = (propiedad: string, e: any) => {
    switch (propiedad) {
      case "estado":
        setEstado(e.target.value);
        setErrorEstado(false);

        // Vamos a borrar la lista de municipios y a buscar por el id
        // del estado seleccionado sus municipios
        setListaMunicipios([]);
        //Obtener el id del estado seleccionado
        const val = e.target.value;
        const estadoSel: any = listaEstados.find((e => e.nombre === val));
        if (estadoSel) {
          obtenerMunicipios({variables: {estadoId: estadoSel.id}});
          valores.estado = e.target.value;
          disableGenerarReporte();
        }
        break;
      case "ciudad":
        setCiudad(e.target.value);
        setErrorCiudad(false);
        valores.ciudad = e.target.value;
        disableGenerarReporte();
        break;
      case "descripcion":
        setDescripcion(e.target.value);
        setErrorDescripcion(false);
        valores.descripcion = e.target.value;
        disableGenerarReporte();
        break;
      case "fiscalia":
        setFiscalia(e.target.value);
        setErrorFiscalia(false);
        valores.fiscalia = e.target.value;
        disableGenerarReporte();
        break;
      case "nombreCorralon":
        setNombreCorralon(e.target.value);
        setErrorNombreCorralon(false);
        valores.nombreCorralon = e.target.value;
        disableGenerarReporte();
        break;
      case "notificado":
        setNotificado(e);
        setErrorNotificado(false);
        valores.notificado = e;
        disableGenerarReporte();
        break;
      case "corralon":
        setCorralon(e);
        setErrorCorralon(false);
        valores.corralon = e;
        disableGenerarReporte();
        break;
      case "declaracion":
        setDeclaracion(e);
        if (!e) {
          // !Si el asegurado selecciona que no se va a mostrar la alerta que recomienda informar a las autoridades
          setAlertaRecomendacionNotificarAutoridades(true);
        }
        setErrorDeclaracion(false);
        valores.declaracion = e;
        disableGenerarReporte();
        break;
      default:
        break;
    }
  };

  
  const cargarImagenAlServidor = async () => {
    const limiteTamanoArchivo = 3145728;
    const stringBase64Imagen = base64.split("base64,")[1];
    const tamanoArchivo = atob(stringBase64Imagen).length;
    const esDeTamanoAdecuado = tamanoArchivo <= limiteTamanoArchivo;
    if (esDeTamanoAdecuado) {
      const imagenBase64Datos = await fetch(base64);
      const imagenBlob = await imagenBase64Datos.blob();
      if (imagenBlob) {
        const respuestaServidor = await fetch(
          // eslint-disable-next-line max-len
          `${configuraciones.api}/robo/reporteVehiculoLocalizado/${numeroReporte}/${oficio}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/octet-stream"
            },
            body: imagenBlob,
          }
        )
          .then((respuesta) => respuesta.json())
          .then((respuesta) => respuesta)
          .catch((errorEnRespuesta) => ({ error: errorEnRespuesta }));
        if (respuestaServidor.error) {
          console.log("Error al cargar la imagen");
          console.log(respuestaServidor.error);
          return null;
        } else {
          return respuestaServidor;
        }
      }
    }
    console.log("Error");
    return null;
  };

  const generarReporte = async () => {
    asignarValorCagando(true);

    const hayErrores = await validacionesErrores();

    if (hayErrores) {
      asignarValorCagando(false);
    } else {
      // Se va a mandar llamar el servicio para registro
      if (configFuncionalidadRobo.vehiculoRecuperado.simularReportar) {
        // se va a simular que ya se mando el reporte al servicio
        if (configFuncionalidadRobo.vehiculoRecuperado.respuestaSatisfactoria) {
          // La respuesta simulada será satisfactoria
          setMostrarAlertaReporteGenerado(true);
          asignarValorCagando(false);
        } else {
          // La respuesta simulada dará error
          setMostrarAlertaError(true);
          asignarValorCagando(false);
        }
      } else{
        // Se mandará llamar al servicio
        /**
         * 1.- Subir el archivo a aws
         * 2.- si el archivo se sube con éxito se continúa con el proceso de
         *     enviar la info para generar el reporte.
         */
        let oficioUrl = "";
        // Si hay archivo se sube a aws
        if (oficio != "" && base64 != "") {
          const respuestaSubidaImagen = await cargarImagenAlServidor();
          if (respuestaSubidaImagen === null) {
            console.log("Error desde generarReporte");
            setMostrarAlertaError(true);
            return;
          }
          oficioUrl = respuestaSubidaImagen.dato;
        }

        //Se obtiene el id del estado
        const estadoFind = listaEstados.find((e) => e.nombre === estado);
        let estadoIdParam = "";
        let ciudadIdParam = "";
        if (estadoFind) {
          estadoIdParam = estadoFind.id;
        }
        
        // Se obtienen los ids de las ciudades seleccionadas
        const findMunicipio = listaMunicipios.find((m) => m.nombre === ciudad);
        if (findMunicipio) {
          ciudadIdParam = findMunicipio.id;
        }

        generarReporteRobo({
          variables: {
            autoridadesNotificaronLocalizacion: notificado,
            ciudad: ciudadIdParam,
            corralon: corralon,
            declaracionMP: declaracion,
            descripcion: descripcion,
            estado: estadoIdParam,
            fiscalia: fiscalia,
            nombreCorralon: nombreCorralon,
            numeroReporte: numeroReporte,
            oficioLiberacion: oficioUrl
          }
        });
      }
    }
  };

  useEffect(() => {
    // setListaEstados(estados);
    //Aqui mandamos llamar el servicio para llenar la lista de estados
    obtenerEstados();
  }, []);

  const handleClick = () => {
    // @ts-ignore
    fileInputRef.current.click();
  };

  const handleFileChange = (event: any) => {
    const regex = new RegExp("image/");
    if (
      !event.target.files ||
      event.target.files.length === 0 ||
      !regex.test(event.target.files[0].type)
    ) {
      return null;
    }
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64: any = reader.result;
        const fileName = file.name;
        setOficio(fileName);
        setBase64(base64);
        valores.oficio = fileName;
        valores.base64 = base64;
        disableGenerarReporte();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <EnvolvedorPantalla>
        {cargando ? <IndicadorCarga /> : null}
        {/* Alerta para mostrar que hubo un error al generar reporte */}
        <Alerta
          textoEncabezado={"Hubo un error"}
          textoCuerpo={"Hubo un error al reportar el vehículo localizado. Intentalo más tarde."}
          mostrarModal={mostrarAlertaError}
          tipoIcono={"trianguloAlerta"}
          temaBoton={"estandar"}
          etiquetaBoton={"Aceptar"}
          funcionLlamadaBoton={() => {
            setMostrarAlertaError(false);
          }}
          manejarCierre={() => {
            setMostrarAlertaError(false);
          }}
        />
        {/* Alerta para mostrar que se realizó el reporte */}
        <Alerta
          textoEncabezado={"Reporte generado"}
          etiquetaBoton={"Aceptar"}
          temaBoton={"estandar"}
          funcionLlamadaBoton={() => {
            regresarMenu();
          }}
          mostrarModal={mostrarAlertaReporteGenerado}
          mostrarIcono={true}
          tipoIcono={"palomita"}
          colorAlerta={"verde"}
          mostrarCierre={false}
        />
        {/* Alerta para recomendar al asegurado notificar a las autoridades */}
        <Alerta
          textoEncabezado={"Para continuar se recomienda notificar a las autoridades"}
          textoCuerpo={"Ellos te brindarán protección y primeros auxilios, también facilitarás la recuperación del vehículo."}
          etiquetaBoton={"Llamar al 911"}
          temaBoton={"rojo"}
          funcionLlamadaBoton={() => {
            window.open("tel: 911");
          }}
          mostrarModal={alertaRecomendacionNotificarAutoridades}
          mostrarIcono={true}
          tipoIcono={"911"}
          colorAlerta={"verde"}
          mostrarCierre={true}
          manejarCierre={() => {
            setAlertaRecomendacionNotificarAutoridades(false);
          }}
        />
        <Encabezado
          titulo={"Vehículo localizado"}
          mostrarBotonCerrar={false}
          mostrarBotonRegresar={true}
          funcionRegresar={() => {
            regresarMenu();
          }}
        />
        <Pantalla style={{ display: "flex", justifyContent: "flex-start" }}>
          <TituloMisPolizas>Reportar vehículo localizado</TituloMisPolizas>
          <MensajePequeno>
            Ayúdanos a completar la información para actualizar el estatus en el {" "}
            Registro Público Vehícular
          </MensajePequeno>

          <div style={{ marginTop: "20px", width: "100%" }}>
            <SelectActualizado
              labelInput="Estado en donde fue localizado*"
              id="estado"
              etiqueta="Estado en donde fue localizado*"
              enCambio={(e: HTMLSelectElement) => alCambiarValor("estado", e)}
              // foco={focoTipoTarjeta}
              valor={estado}
              opciones={listaEstados}
              inputholder="Seleccionar"
            />
            <CampoRequeridoSeleccionCuestionario
              id="error-razon-duplicado"
              mostrar={errorEstado}
              style={{ marginBottom: "0px" }}
            >
              {"Debe seleccionar un estado para poder continuar"}
            </CampoRequeridoSeleccionCuestionario>
          </div>
          
          <div style={{ marginTop: "20px", width: "100%" }}>
            <SelectActualizado
              labelInput="Ciudad en donde fue localizado *"
              id="ciudad"
              etiqueta="Ciudad en donde fue localizado*"
              enCambio={(e: HTMLSelectElement) => alCambiarValor("ciudad", e)}
              // foco={focoTipoTarjeta}
              valor={ciudad}
              opciones={listaMunicipios}
              inputholder="Seleccionar"
            />
            <CampoRequeridoSeleccionCuestionario
              id="error-razon-duplicado"
              mostrar={errorCiudad}
              style={{ marginBottom: "0px" }}
            >
              {"Debe seleccionar una ciudad para poder continuar"}
            </CampoRequeridoSeleccionCuestionario>
          </div>

          <div style={{ marginTop: "20px", width: "100%" }}>
            <CampoTexto
              etiqueta="Describe como fue encontrado *"
              valor={descripcion}
              enCambio={(e: HTMLInputElement) =>
                alCambiarValor("descripcion", e)
              }
              // foco={focoReferencias}
              marcador="Cuéntanos más"
              esAreaDeTexto
              numeroDeRenglones={8}
              numeroDeCaracteres={225}
              conteoDeCaracteres
              id="campoReferencias"
            />
            <CampoRequeridoSeleccionCuestionario
              id="error-razon-duplicado"
              mostrar={errorDescripcion}
              style={{ marginTop: "115px", marginBottom: "0px" }}
            >
              {"Campo requerido para poder continuar"}
            </CampoRequeridoSeleccionCuestionario>
          </div>

          <div style={{ marginTop: errorDescripcion ? "15px" : "140px", width: "100%" }}>
            <CuerpoCuestionarioReporte style={{ paddingBottom: "0px" }}>
              <SeleccionCuestionario
                pregunta="¿Las autoridades te notificaron la localización del vehículo?*"
                respuesta={notificado}
                cambiarEstado={(sel) => { alCambiarValor("notificado", sel); }}
                mostrarMensajeCampoRequerido={errorNotificado}
              />
            </CuerpoCuestionarioReporte>
          </div>
          
          {notificado && (
            <div style={{ width: "100%" }}>
              <CampoTexto
                etiqueta="¿Qué fiscalía te contactó?*"
                valor={fiscalia}
                enCambio={(e: HTMLInputElement) => alCambiarValor("fiscalia", e)}
                // foco={focoReferencias}
                marcador="Selecciona la fiscalía"
                id="campoReferencias"
              />
              <CampoRequeridoSeleccionCuestionario
                id="error-razon-duplicado"
                mostrar={errorFiscalia}
                style={{ marginTop: "15px", marginBottom: "0px" }}
              >
                {"Campo requerido para poder continuar"}
              </CampoRequeridoSeleccionCuestionario>
            </div>
          )}

          <div style={{ width: "100%" }}>
            <CuerpoCuestionarioReporte
              style={{ paddingBottom: "0px", marginTop: "10px" }}
            >
              <SeleccionCuestionario
                pregunta="¿El vehículo se encuentra en el corralón?*"
                respuesta={corralon}
                cambiarEstado={(sel) => { alCambiarValor("corralon", sel); }}
                mostrarMensajeCampoRequerido={errorCorralon}
              />
            </CuerpoCuestionarioReporte>
          </div>

          {corralon && (
            <div style={{ marginTop: "20px", width: "100%" }}>
              <CampoTexto
                etiqueta="Ingresa el nombre del corralón*"
                valor={nombreCorralon}
                enCambio={(e: HTMLInputElement) =>
                  alCambiarValor("nombreCorralon", e)
                }
                // enCambio={alCambiarReferencias}
                // foco={focoReferencias}
                marcador="Nombre del corralón"
                id="campoReferencias"
              />
              <CampoRequeridoSeleccionCuestionario
                id="error-razon-duplicado"
                mostrar={errorNombreCorralon}
                style={{ marginTop: "15px", marginBottom: "0px" }}
              >
                {"Campo requerido para poder continuar"}
              </CampoRequeridoSeleccionCuestionario>
            </div>
          )}

          <CuerpoCuestionarioReporte
            style={{ paddingBottom: "0px", marginTop: "10px" }}
          >
            <SeleccionCuestionario
              pregunta="¿Realizaste la declaración ante el Ministerio Público?*"
              respuesta={declaracion}
              cambiarEstado={(sel) => { alCambiarValor("declaracion", sel);}}
              mostrarMensajeCampoRequerido={errorDeclaracion}
            />
          </CuerpoCuestionarioReporte>
          {declaracion && (
            <div style={{ marginTop: "20px", width: "100%", cursor: "pointer" }} onClick={handleClick}>
                <ContenedorInputFile className="archivoOficioRobo">
                  <ContenedorTextoEtiqueta>Anexa oficio de liberación*</ContenedorTextoEtiqueta>
                  <CampoFile
                    type="file"
                    id="archivoOficioRobo"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  {oficio.length === 0 ? "Agregar una imagen" : oficio}
                </ContenedorInputFile>
              
              {/* <CampoTexto
                etiqueta="Anexa oficio de liberación"
                valor={oficio}
                enCambio={(e: any) => { console.log(e); }}
                // foco={focoReferencias}
                marcador="Agregar un archivo"
                id="campoReferencias"
                enClick={() => {
                  handleClick();
                }}
              /> */}
              <CampoRequeridoSeleccionCuestionario
                id="error-razon-duplicado"
                mostrar={errorOficio}
                style={{ marginTop: "15px", marginBottom: "0px" }}
              >
                {"Seleccionar archivo para poder continuar"}
              </CampoRequeridoSeleccionCuestionario>
            </div>
          )}

          <ContenedorBoton style={{ marginTop: "40px" }}>
            <Boton
              etiqueta="Reportar"
              tema="estandar"
              enClick={generarReporte}
              deshabilitado={disabledButtonGenerarReporte}
            />
          </ContenedorBoton>
        </Pantalla>
      </EnvolvedorPantalla>
    </>
  );
};

export default PantallaVehiculoLocalizado;
