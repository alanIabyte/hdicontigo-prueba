/* eslint-disable */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { useDispatch, useSelector } from "react-redux";
import { EnvolvedorPantalla } from "../../componentes/componentes-styled-compartidos/Pantalla.styled";
import { Alerta, BarraProgresoReporte, Boton, Encabezado, IndicadorCarga } from "../../componentes";
import { PantallaFondoGris } from "../../componentes/pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";
import {
  ContenedorBoton,
  Titulo,
} from "../../componentes/pantalla-formulario-informacion-contacto/pantalla-formulario-informacion-contacto/PantallaFormularioInformacionContacto.styled";
import { SeparadorEspacio } from "../../componentes/pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import {
  ContenedorParrafo,
  ContenedorTextoEditar,
  Etiqueta,
  LinkEditar,
  Seccion,
  Separador,
  SeparadorLinea,
  Valor,
} from "../../componentes/pantalla-resumen-reporte/pantalla-resumen-reporte/PantallaResumenReporte.styled";
import { Subtitulo3Negritas } from "../../componentes/componentes-styled-compartidos/Textos";
import { IRedux } from "../../interfaces/Redux/IRedux";
import { IAuidoDeclaracion } from "../../interfaces/IndexDB/indexDB";
import configuraciones from "../../servicios/configuraciones";
import useActionsAudio from "../../utils/useActionsAudio";
import useFormatDate from "../../utils/useFormatDate";
import { MensajePequeno } from "../../componentes/pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import { Check, ContenedorCheck, MensajeCheck } from "../../componentes/pantalla-cuestionario-reporte/pantalla-cuestionario-reporte-componente/PantallaCuestionarioReporte.styled";
import { CheckRobo, ContenedorChecboxRobo } from "./ResumenReporteRobo.styled";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { ParrafoAlerta } from "../../componentes/pantalla-indemnizacion-opciones/pantalla-indemnizacion-componente/PantallaIndemnizacion.styled";
import { diccionarioRobo, configFuncionalidadRobo } from "./utils";
import ACTIONS_REDUX from "../../reductores/Actions";
import { IEventosNotificaciones } from "../../interfaces/Graphql/IEventosNotificaciones";
import obtenerValorDeArregloDeStrings from "../../componentes/utilidades-compartidas/obtenerValorDeArregloDeStrings";

const CREAR_REPORTE_ROBO = loader(
  "../../graphQL/mutation/robo/robo_generarReporte.graphql"
);

const SUSCRIPCION_ACTUALIZACIONES = loader(
  "../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const ResumenReporteRobo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [blobState, setBlobState] = useState<Blob|any>("");
  const [hayAudio, setHayAudio] = useState<boolean>(false);
  const estadoApp = useSelector((state: IRedux) => state);
  const { descargarUrlBlob } = useActionsAudio();
  const { obtenerFechaFormatoString } = useFormatDate();
  const [checkValue, setCheckValue] = useState<boolean>(false);
  const {
    datosReporteRobo: {
      atencionLugarRobo,
      conViolencia,
      datosRoboAdicionales,
      fechaOcurrencia,
      horaRobo,
      infoContacto,
      numeroPoliza,
      numeroSerie,
      referenciasUbicacionRobo,
      tiempoGrabacion,
      ubicacionAtencionRobo,
      ubicacionRobo,
      modeloVehiculo,
    },
  } = estadoApp;
  const [cargando, asigarValorCargando] = useState<boolean>(false);
  const [crearReporte, { loading, error, data }] =
  useMutation(CREAR_REPORTE_ROBO, { fetchPolicy: "network-only" });
  const [
    numeroReporteActualizaciones,
    asignarValorNumeroReporteActualizaciones,
  ] = useState<string>("");
  const { data: nuevosEventos } = useSubscription(SUSCRIPCION_ACTUALIZACIONES, {
    variables: { numeroReporte: numeroReporteActualizaciones },
  });
  const [mostrarErrorAudio, setMostrarErrorAudio] = useState<boolean>(false);
  const [textoAlerta, setTextoAlerta] = useState<string>("");
  const [alertaReporteGenerado, setAlertaReporteGenerado] = useState<boolean>();
  const [numeroReporte, setNumeroReporte] = useState<string>("");

  useEffect(() => {
    // console.log(`Nuevos Eventos resumen: ${JSON.stringify(nuevosEventos)}`);
    if (
      nuevosEventos &&
      nuevosEventos.escucha_evento_actualizacion_reporte &&
      nuevosEventos.escucha_evento_actualizacion_reporte.tipoMensaje
    ) {
      // console.log(nuevosEventos);
      const datosNuevoEvento = nuevosEventos.escucha_evento_actualizacion_reporte;
      if (datosNuevoEvento.tipoMensaje === 20) {
        const numeroReporteMensaje = obtenerValorDeArregloDeStrings(
          datosNuevoEvento.dato.descripciones,
          "NumeroReporte: "
        ).trim();
        const validaciones = obtenerValorDeArregloDeStrings(
          datosNuevoEvento.dato.descripciones,
          "Validaciones: "
        ).trim();
        if (numeroReporteMensaje && numeroReporteMensaje != "0") {
          setNumeroReporte(numeroReporteMensaje||"");
          setAlertaReporteGenerado(true);
          asigarValorCargando(false);
        } else if (validaciones != "") {
          setTextoAlerta(validaciones);
          setMostrarErrorAudio(true);
          asigarValorCargando(false);
        } else if (validaciones === "") {
          setTextoAlerta(diccionarioRobo.resumenReporte.textoErrorGenerarReporte);
          setMostrarErrorAudio(true);
          asigarValorCargando(false);
        }
      }
    }
  }, [nuevosEventos]);

  useEffect(() => {
    if (
      !loading &&
      data &&
      data.robo_generarReporte &&
      data.robo_generarReporte.completado
    ) {
      if (data.robo_generarReporte.dato && typeof data.robo_generarReporte.dato === "number") {
        asignarValorNumeroReporteActualizaciones(data.robo_generarReporte.dato);
      } else {
        setMostrarErrorAudio(true);
        setTextoAlerta(diccionarioRobo.resumenReporte.textoErrorGenerarReporte);
        asigarValorCargando(false);
      }
    } else if (error) {
      setMostrarErrorAudio(true);
      setTextoAlerta(diccionarioRobo.resumenReporte.textoErrorGenerarReporte);
      asigarValorCargando(false);
    } else if (loading) {
      asigarValorCargando(true);
    }
  }, [loading, data, error]);

  const dataURItoBlob = (dataURI: any) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], { type: mimeString });
  };

  const getAudioFromLocalStorage = () => {
    const audioData = localStorage.getItem(configFuncionalidadRobo.descripcionRobo.NOMBREAUDIOLS);
    if (audioData) {
      console.log("entra");
      const blob = dataURItoBlob(audioData);
      const blobUrl = URL.createObjectURL(blob);
      setBlobState(blobUrl);
      setHayAudio(true);
    } else {
      setHayAudio(false);
      console.log("No hay audio guardado");
    }
  }

  useEffect(() => {
    getAudioFromLocalStorage();
  }, []);

  const obtenerRutaSinQueryParams = (url: string) => {
    try {
        const urlObj = new URL(url);
        return urlObj.origin + urlObj.pathname;
    } catch (error) {
        console.error("La URL proporcionada no es válida.");
        return null;
    }
}

  const generarReporteRobo = async () => {
    console.log("Generando reporte de robo...");
    asigarValorCargando(true);
    if (configFuncionalidadRobo.resumenReporte.simularSubirAudio) {
      // !Lógica de prueba
      setTimeout(() => {
        asigarValorCargando(false);
      }, 3000);
      return null;
    } else {
      // !lógica con la lambda

      /**
       * 1.- Subir el audio a el bucket de aws
       * 2.- Una vez subido el audio se obtiene la url del archivo
       * 3.- Se genera el json final como se va a mandar a la lambda de generar reporte
       * 4.- Se incluye la url del archivo antes subido
       * 5.- Se manda generar el reporte
       */
      
      try {

        const hoy = obtenerFechaFormatoString();
        const nombreAudio = `grabacion-${hoy}.mp3`;

        const audioFile: any = await descargarUrlBlob(configFuncionalidadRobo.resumenReporte.localAudio ? configFuncionalidadRobo.resumenReporte.urlAudio : blobState);
        
        if (audioFile === null) {
          throw new Error("audio");
        }

        const formData = new FormData();
        formData.append('audioFile', audioFile, nombreAudio);

        const response = await fetch(
          configFuncionalidadRobo.resumenReporte.localAudio ? 
          'http://localhost:3001/upload'
          :
          `${configuraciones.api}/robo/audio/${infoContacto.telefono}/audio/${nombreAudio}`,
          {
            method: "POST",
            body: configFuncionalidadRobo.resumenReporte.localAudio ? formData : audioFile,
            headers: {
              "Content-Type": "application/octet-stream",
            },
          }
        );

        const data = await response.json();

        const resRuta = obtenerRutaSinQueryParams(data.dato||"");
        if (resRuta === null) {
          setTextoAlerta(diccionarioRobo.resumenReporte.errorGuardarAudio);
          setMostrarErrorAudio(true);
          return;
        }
        
        if (data && data.completado && data.dato) {
          const dataRequest = {
            audioURL: resRuta,
            conViolencia,
            caracteristicas: datosRoboAdicionales?.caracteristicas||"",
            colorVehiculo: datosRoboAdicionales?.colorVehiculo||"",
            declaracion: datosRoboAdicionales?.declaracion||false,
            duplicado: datosRoboAdicionales?.duplicado||false,
            folio911: datosRoboAdicionales?.folio911||"",
            nombreUltimoConductor: datosRoboAdicionales?.nombreConductor||"",
            razonDuplicado: datosRoboAdicionales?.razonDuplicado||"",
            ultimoConductor: datosRoboAdicionales?.ultimoConductor||false,
            fechaOcurrencia,
            horaRobo,
            telefono: infoContacto.telefono,
            email: infoContacto.email,
            numeroPoliza,
            numeroSerie,
            atencionLugarRobo,
            latAtencion: ubicacionAtencionRobo.lat,
            lngAtencion: ubicacionAtencionRobo.lng,
            referenciasUbicacionRobo,
            latUbicacionRobo: ubicacionRobo.lat,
            lngUbicacionRobo: ubicacionRobo.lng,
          };
          crearReporte({variables: dataRequest});
        } else {
          setTextoAlerta(diccionarioRobo.resumenReporte.errorGuardarAudio);
        }
      } catch (error) {
        //@ts-ignore
        if (error.message === "audio") {
          setTextoAlerta(diccionarioRobo.resumenReporte.errorGuardarAudio);
          setMostrarErrorAudio(true);
        } else {
          setTextoAlerta(diccionarioRobo.resumenReporte.textoErrorGenerarReporte);
        }
      } finally {
        //setAlertaReporteGenerado(true);
        //setNumeroReporte("4245604");
        asigarValorCargando(false);
      }
    }
  };

  const handleCheck = (event: any) => {
    const { name, checked } = event.target;
    setCheckValue(checked);
  }

  const irAsistenciaHDI = () => {
    history.push({
      pathname: "/asistencia-hdi",
      state: {
        tipoAtencion: "robo"
      },
    });
  }

  /**
   * Se va a mandar le numeroReporte por la url
   * Se va a mandar mostrarVentanaServicioGPS para si tiene servicio de gps
   * le muestre la ventana
   * Se va a agregar la polza por redux para que pueda consultar los datos
   */
  const redirectSeguimientoRoboTotal = () => {

    // Primero eliminamos el index datosReporteRobo del redux
    dispatch({
      type: ACTIONS_REDUX.BORRAR,
      indice: "datosReporteRobo"
    });

    // Se agrega la poliza al redux en el la propiedad de datosReporteRobo
    dispatch({
      type: ACTIONS_REDUX.AGREGAR,
      indice: "datosReporteRobo",
      valor: {
        numeroPoliza
      }
    });

    dispatch({
      type: ACTIONS_REDUX.AGREGAR,
      indice: "informacionContacto",
      valor: infoContacto
    });
    // Se elimina el audio del loalstorage dantes de redireccionar
    localStorage.removeItem(configFuncionalidadRobo.descripcionRobo.NOMBREAUDIOLS);
    history.push({
      pathname: "/menu-espera-robo",
      search: `?numeroReporte=${numeroReporte}`,
      state: {
        mostrarVentanaServicioGPS: true
      }
    })
  }

  return (
    <EnvolvedorPantalla>
      {cargando ? <IndicadorCarga /> : null}
      <Alerta
        textoEncabezado={"Hubo un error"}
        textoCuerpo={textoAlerta}
        mostrarModal={mostrarErrorAudio}
        tipoIcono={"trianguloAlerta"}
        temaBoton={"estandar"}
        etiquetaBoton={"Aceptar"}
        funcionLlamadaBoton={() => {
          setMostrarErrorAudio(false);
        }}
        manejarCierre={() => {
          setMostrarErrorAudio(false);
        }}
      />
      <Alerta
        textoEncabezado={"Reporte generado"}
        etiquetaBoton={"Aceptar"}
        temaBoton={"estandar"}
        funcionLlamadaBoton={redirectSeguimientoRoboTotal}
        mostrarModal={alertaReporteGenerado}
        mostrarIcono={true}
        tipoIcono={"palomita"}
        colorAlerta={"verde"}
        mostrarCierre={false}
      >
        <ParrafoAlerta>
          Gracias. Este es tu número de reporte:
        </ParrafoAlerta>
        <ParrafoAlerta><b>{numeroReporte}</b></ParrafoAlerta>
      </Alerta>
      <Encabezado
        titulo="Reportar robo total"
        funcionRegresar={history.goBack}
      />

      <PantallaFondoGris style={{ paddingTop: "3rem", overflow: "hidden" }}>
        <BarraProgresoReporte
          numeroElementos={4}
          progreso={4}
          titulo="Resumen del reporte"
        />

        <SeparadorLinea />

        <Titulo>Verifica la información de tu reporte</Titulo>
        <SeparadorEspacio />

        <Seccion>
          <Separador>Datos de la póliza</Separador>
        </Seccion>
        <SeparadorLinea />

        <ContenedorParrafo>
          <Etiqueta id="etiquetaPoliza">Número de póliza</Etiqueta>
          <Valor id="valorPoliza">{numeroPoliza}</Valor>
        </ContenedorParrafo>

        <ContenedorParrafo>
          <Etiqueta id="etiquetaPoliza">Modelo del vehículo</Etiqueta>
          <Valor id="valorPoliza">{modeloVehiculo}</Valor>
        </ContenedorParrafo>

        <ContenedorParrafo>
          <Etiqueta id="etiquetaPoliza">Número de serie</Etiqueta>
          <Valor id="valorPoliza">{numeroSerie}</Valor>
        </ContenedorParrafo>

        <Seccion>
          <Separador>Información adicional</Separador>
          <LinkEditar
            id="editarInfo"
            onClick={() => {
              history.push({
                pathname: "/robo/info-complementaria",
                state: {
                  regreso: "resumen",
                },
              });
            }}
          >
            <ContenedorTextoEditar>Editar</ContenedorTextoEditar>
            <EditRoundedIcon style={{ fontSize: 16 }} />
          </LinkEditar>
        </Seccion>
        <SeparadorLinea />

        <ContenedorParrafo>
          <Etiqueta id="etiquetaPoliza">Tipo de robo</Etiqueta>
          <Valor id="valorPoliza">
            {conViolencia ? "Con violencia" : "Sin violencia"}
          </Valor>
        </ContenedorParrafo>

        <ContenedorParrafo>
          <Etiqueta id="etiquetaPoliza">Télefono de contacto</Etiqueta>
          <Valor id="valorPoliza">{infoContacto.telefono || ""}</Valor>
        </ContenedorParrafo>

        <ContenedorParrafo>
          <Etiqueta id="etiquetaPoliza">
            Correo electrónico del contacto
          </Etiqueta>
          <Valor id="valorPoliza">{infoContacto.email || ""}</Valor>
        </ContenedorParrafo>

        <Seccion>
          <Separador>Ubicación</Separador>
          <LinkEditar
            id="editarInfo"
            onClick={() => {
              history.push({
                pathname: "/ubicacion-robo",
                state: {
                  regreso: "resumen",
                },
              });
            }}
          >
            <ContenedorTextoEditar>Editar</ContenedorTextoEditar>
            <EditRoundedIcon style={{ fontSize: 16 }} />
          </LinkEditar>
        </Seccion>
        <SeparadorLinea />
        <ContenedorParrafo>
          <Etiqueta id="etiquetaPoliza">Ubicación del robo</Etiqueta>
          <Valor id="valorPoliza">{ubicacionRobo?.direccion}</Valor>
        </ContenedorParrafo>

        <ContenedorParrafo>
          <Etiqueta id="etiquetaPoliza">Ubicación de atención</Etiqueta>
          <Valor id="valorPoliza">
            {ubicacionAtencionRobo?.direccion !== "" && ubicacionAtencionRobo?.direccion
              ? ubicacionAtencionRobo.direccion
              : ubicacionRobo?.direccion}
          </Valor>
        </ContenedorParrafo>
        <SeparadorLinea />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Subtitulo3Negritas>Descripción de los hechos</Subtitulo3Negritas>
          {hayAudio && <audio controls src={blobState} /> }

          <SeparadorEspacio />

          <ContenedorChecboxRobo>
            <CheckRobo
            name="aceptar"
            checked={checkValue}
            onChange={handleCheck}/>
            <MensajePequeno style={{ color: "#333333", marginLeft: "10px" }} onClick={() => { setCheckValue(!checkValue); }}>
              Acepto que, al realizar el reporte, se actualizará el estatus de mi vehículo en <b>REPUVE</b> (Registro Público Vehicular) y solo será modificado si es recuperado.
            </MensajePequeno>
          </ContenedorChecboxRobo>
          
        </div>

        <ContenedorBoton>
          <Boton
            etiqueta="Generar reporte"
            tema="estandar"
            enClick={generarReporteRobo}
            deshabilitado={!checkValue || cargando}
          />
          <SeparadorEspacio />
          <Boton
          etiqueta="Contacto HDI"
          tema="simple"
          enClick={irAsistenciaHDI}/>
        </ContenedorBoton>
      </PantallaFondoGris>
    </EnvolvedorPantalla>
  );
};

export default ResumenReporteRobo;
