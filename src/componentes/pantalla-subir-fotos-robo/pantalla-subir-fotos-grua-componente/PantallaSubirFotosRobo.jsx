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
  SeparadorEncabezadoCuestionarioReporte,
  PantallaPrevImagen,
  TituloCuestionarioReporte,
  MensajePequeno,
} from "./PantallaSubirFotosRobo.styled";
import Boton from "../../boton";
import EncabezadoReporte from "../../encabezado-reporte";
import Encabezado from "../../encabezado";
import BarraProgresoReporte from "../../barra-progreso-reporte";
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
  tituloBarraProgreso: "Fotos del reporte",
  encabezado: "Agiliza tu proceso",
  titulo: "Ayúdanos a agilizar el proceso",
  mensajePequeno:
    "Anticípate y sube la documentación requerida para reunirte con tu ajustador.",
  mensajePequeno2:
    "Ayúdanos a subir las siguientes fotos, si cuentas con ellas:",
  etiquetaBoton: "Siguiente",
  subtituloInicial:
    "El ajustador podrá ver las fotografías que agregues al oprimir guardar.",
  subtitulo: "Compártenos fotos del accidente:",
  subtitulo2: "Compártenos fotos de estos documentos:",
  subtituloFoto1: "Tomar foto/agregar archivo",
  subtituloFoto2: "Agregar archivo",
  opcionesFotos: {
    vehiculo: {
      titulo1: "Vehículo que fue robado",
      titulo2: "Lugar del robo",
    },
    documentos: {
      titulo1: "Declaración ante el ministerio público",
      titulo2: "Foto de identificación (frente)",
      titulo3: "Foto de identificación (reverso)",
    },
  },
  alertaLlegadaAjustador: {
    encabezado: "Fotos no guardadas",
    texto:
      // eslint-disable-next-line max-len
      '<p>Hay algunas fotos que no se han guardado. Si las descartas, tu ajustador puede tomarlas nuevamente.</p><p style="font-family: var(--fuente-proxima-bold);">¿Deseas guardar o descartar las fotos?</p>',
    textoBoton1: "Guardar",
    textoBoton2: "Descartar fotos",
  },
};

const PantallaSubirFotosRobo = () => {
  const estadoApp = useSelector((estado) => estado);
  const history = useHistory();
  const [mostrarCamara, asignarValorMostrarCamara] = useState(false);
  const [mostrarPrevisualizacion, asignarValorMostrarPrevisualizacion] =
    useState(false);
  const [imagenAMostrarEnModal, asignarValorImagenAMostrarEnModal] = useState();
  const [cargando, asignarValorCargando] = useState(false);
  const [actual, asignarValorActual] = useState({
    indice: 0,
    titulo: "",
  });
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

  const dispatch = useDispatch();

  const abrirCamara = (valores) => {
    asignarValorActual(valores);
    asignarValorMostrarCamara(true);
  };
  const cerrarCamara = () => {
    asignarValorMostrarCamara(false);
  };
  const abrirPrevisualizacion = (e, indice) => {
    e.stopPropagation();
    asignarValorImagenAMostrarEnModal(imagenes[indice].imagen);
    asignarValorMostrarPrevisualizacion(true);
  };
  const cerrarPrevisualizacion = () => {
    asignarValorMostrarPrevisualizacion(false);
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
      dispatch({
        type: "AGREGAR",
        valor: copiaArreglo,
        indice: "datosImagenesEstado",
      });
      // estadoApp.datosImagenesEstado = copiaArreglo;
      asignarValorImagenes(copiaArreglo);
    }
  };
  const alAceptarImagen = (imagen) => {
    const copiaArreglo = [...imagenes];
    const { indice } = actual;
    copiaArreglo[indice].imagen = imagen;
    copiaArreglo[indice].seCargoAServidor = false;
    dispatch({
      type: "AGREGAR",
      valor: copiaArreglo,
      indice: "datosImagenesEstado",
    });
    asignarValorImagenes(copiaArreglo);

    // asignarValorImagenesEstado(copiaArreglo);
    asignarValorMostrarCamara(false);
  };
  const cargaImagenAServidor = async (imagenBase64, nombreImagen) => {
    const imagenBase64Datos = await fetch(imagenBase64);
    const imagenBlob = await imagenBase64Datos.blob();
    if (imagenBlob) {
      const respuestaServidor = await fetch(
        // `${Configuraciones.api}/reporte/imagen/${reporte}/${telefonoContacto}/${nombreImagen}`,
        `${Configuraciones.api}/reporte/imagen/4244447/4731245578/${nombreImagen}`,
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
  };
  // ESTO SOLO ES PARA PROBAR EL FLUJO TODAVIA SIN LOS LAMBDA
  const pruebaSiguentePaso = () => {
    // cargarImagenes();
    history.push("/ubicacion");
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
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={() => {
          history.goBack();
        }}
      />
      <PantallaPrevImagen>
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
        <TituloCuestionarioReporte id="titulo">
          {diccionario.titulo}
        </TituloCuestionarioReporte>
        <MensajePequeno id="mensajePequeno">
          {diccionario.mensajePequeno}
        </MensajePequeno>
        <ContenedorPantalla>
          <FotoContenedor
            titulo={diccionario.opcionesFotos.documentos.titulo1}
            subtitulo={diccionario.subtituloFoto1}
            imagen={imagenes[0].imagen}
            seCargoAServidor={imagenes[0].seCargoAServidor}
            alDarClick={() => {
              abrirCamara({
                indice: 0,
                titulo: diccionario.opcionesFotos.documentos.titulo1,
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
            titulo={diccionario.opcionesFotos.documentos.titulo2}
            subtitulo={diccionario.subtituloFoto1}
            imagen={imagenes[1].imagen}
            seCargoAServidor={imagenes[1].seCargoAServidor}
            alDarClick={() => {
              abrirCamara({
                indice: 1,
                titulo: diccionario.opcionesFotos.documentos.titulo2,
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
            titulo={diccionario.opcionesFotos.documentos.titulo3}
            subtitulo={diccionario.subtituloFoto1}
            imagen={imagenes[2].imagen}
            seCargoAServidor={imagenes[2].seCargoAServidor}
            alDarClick={() => {
              abrirCamara({
                indice: 2,
                titulo: diccionario.opcionesFotos.documentos.titulo3,
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
          <MensajePequeno id="mensajePequeno2">
            {diccionario.mensajePequeno2}
          </MensajePequeno>
          <FotoContenedor
            titulo={diccionario.opcionesFotos.vehiculo.titulo1}
            subtitulo={diccionario.subtituloFoto2}
            imagen={imagenes[3].imagen}
            seCargoAServidor={imagenes[3].seCargoAServidor}
            alDarClick={() => {
              abrirCamara({
                indice: 3,
                titulo: diccionario.opcionesFotos.vehiculo.titulo1,
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
          <FotoContenedor
            titulo={diccionario.opcionesFotos.vehiculo.titulo2}
            imagen={imagenes[4].imagen}
            seCargoAServidor={imagenes[4].seCargoAServidor}
            alDarClick={() => {
              abrirCamara({
                indice: 4,
                titulo: diccionario.opcionesFotos.vehiculo.titulo2,
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
        </ContenedorPantalla>
        <ContenedorBoton>
          <Boton
            id="botonContinuar"
            etiqueta={diccionario.etiquetaBoton}
            enClick={pruebaSiguentePaso}
          />
        </ContenedorBoton>
      </PantallaPrevImagen>
    </EnvolvedorPantallaDocumentos>
  );
};

PantallaSubirFotosRobo.defaultProps = {};

PantallaSubirFotosRobo.propTypes = {};

export default PantallaSubirFotosRobo;
