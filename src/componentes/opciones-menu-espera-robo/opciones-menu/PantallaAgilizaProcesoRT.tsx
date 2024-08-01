/* eslint-disable  */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import configuraciones from "../../../servicios/configuraciones";
import Boton from "../../boton/boton-componente/Boton";
import Encabezado from "../../encabezado/encabezado-componente/Encabezado";
import FotoContenedor from "../../foto-contenedor";
import PantallaCamara from "../../pantalla-camara";
import { ContenedorBoton } from "../../pantalla-creacion-cuenta/pantalla-creacion-cuenta-componente/PantallaCreacionCuenta.styled";
import { Titulo } from "../../pantalla-editar-informacion-contacto/pantalla-editar-informacion-contacto/PantallaEditarInformacionContacto.styled";
import { MensajePequeno } from "../../pantalla-pruebas/PantallaTransaccionMitec.styled";
import { Alerta } from "../../alerta";
import {
  ContenedorPantalla,
  EnvolvedorPantallaDocumentos,
  PantallaSubirDocumentos,
} from "../../pantalla-subir-fotos-documentos/pantalla-subir-fotos-documentos-componente/PantallaSubirFotosDocumentos.styled";
import IndicadorCarga from "../../indicador-carga";

interface IProps {
  setPantalla: React.Dispatch<React.SetStateAction<string>>;
  numeroReporte: String;
}

const valores = ["", "", "", ""];

const OBTENER_ROBO_IMAGENES = loader(
  "../../../graphQL/query/robo/obtenerRoboImagenesAgiliza.graphql"
);

const PantallaAgilizaProcesoRT = ({ setPantalla, numeroReporte }: IProps) => {
  const estadoApp = useSelector((estado) => estado);
  const [estadoCargando, setEstadoCargando] = useState(false);
  const [mostrarCamara, asignarValorMostrarCamara] = useState(false);
  const [temaBoton, asignarValorTemaBoton] = useState("deshabilitado");
  const [actual, asignarValorActual] = useState({
    indice: 0,
    titulo: "",
    nombreImagen: "",
  });
  const [imagenes, asignarValorImagenes] = useState<any[]>([
    {
      imagen: "",
      seCargoAServidor: false,
      error: false,
      nombreImagen: "declaracion-ministerio.jpeg",
      titulo: "Declaración ante el Ministerio Público",
    },
    {
      imagen: "",
      seCargoAServidor: false,
      error: false,
      nombreImagen: "identificacion-frente.jpeg",
      titulo: "Foto de tu identificación (frente)",
    },
    {
      imagen: "",
      seCargoAServidor: false,
      error: false,
      nombreImagen: "identificacion-trasera.jpeg",
      titulo: "Foto de tu identificación (reverso)",
    },
    {
      imagen: "",
      seCargoAServidor: false,
      error: false,
      nombreImagen: "lugar-robo.jpeg",
      titulo: "Lugar del robo",
    },
  ]);

  /* ,
    {
      imagen: "",
      seCargoAServidor: false,
      error: false,
      nombreImagen: "vehiculo-robado.jpeg",
      titulo: "Vehículo que fue robado",
    } */

  const [mostrarValorModal, asignarMostrarModal] = useState(false);

  const [obtenerRoboImagenes, { loading: loading, error: error, data: data }] =
    useLazyQuery(OBTENER_ROBO_IMAGENES, {
      fetchPolicy: "cache-and-network",
    });

  const validarImagenes = () => {
    const validacion = imagenes.filter(
      (imagen) => !(imagen.imagen.trim() !== "")
    );

    if (validacion.length === 0) {
      asignarValorTemaBoton("estandar");
      return true;
    }
    return false;
  };

  const mostrarmodal = () => {
    if (validarImagenes() === true) asignarMostrarModal(true);
  };

  const cerrarCamara = () => asignarValorMostrarCamara(false);

  const abrirCamara = (valores: any) => {
    asignarValorActual(valores);
    asignarValorMostrarCamara(true);
  };

  const cargaImagenAServidor = async (
    imagenBase64: string,
    nombreImagen: string
  ) => {
    const imagenBase64Datos = await fetch(imagenBase64);
    const imagenBlob = await imagenBase64Datos.blob();
    if (imagenBlob) {
      // El dato posterior al numero del telefono es el folio del reporte al 911
      // Ya que en este punto contamos con un número de reporte para guardar las imagenes
      // Pero no contamos con el para guardar los audios de declaración

      const respuestaServidor = await fetch(
        `${configuraciones.api}/robo/agiliza/${numeroReporte}/imagenes/${nombreImagen}`,
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

  const alAceptarImagen = async (imagen: any) => {
    setEstadoCargando(true);
    // console.log(imagen);
    const resp = await cargaImagenAServidor(imagen, actual.nombreImagen);
    setEstadoCargando(false);
    console.log(resp);
    const copiaArreglo = [...imagenes];
    const { indice } = actual;
    copiaArreglo[indice].imagen = imagen;
    copiaArreglo[indice].seCargoAServidor = false;
    asignarValorImagenes(copiaArreglo);

    //valdiar que todas las fotos estan asignadas
    validarImagenes();

    // asignarValorImagenesEstado(copiaArreglo);
    asignarValorMostrarCamara(false);
  };

  useEffect(() => {
    // Se va a consultar el back para traer la lista de imagenes de la carpeta
    // /robo/agiliza/{numeroReporte}/imagenes
    // ** SE COMENTA ESTE METODO PERO VA A SERVIR PARA OBTENER LAS IMAGENES EN LA LINEA DEL TIEMPO
    // obtenerRoboImagenes({
    //   variables: { numeroReporte },
    // });
    // **
  }, []);

  // efecto para obtener las imagenes del reporte
  useEffect(() => {
    if (!loading && data) {
      console.log("data", data.obtener_roboImagenesAgiliza.dato);
      const siniestro = data.obtener_roboImagenesAgiliza.dato.filter(
        (foto: any) =>
          foto.nombre === "/declaracion-ministerio.jpeg" ||
          foto.nombre === "/identificacion-frente.jpeg" ||
          foto.nombre === "/identificacion-trasera.jpeg" ||
          // foto.nombre === "/vehiculo-robado.jpeg" ||
          foto.nombre === "/lugar-robo.jpeg"
      );
      console.log("siniestro", siniestro);

      const nuevoArreglo = imagenes.map((imagen) => {
        const imagenNueva = siniestro.find(
          (foto: any) => foto.nombre.split("/")[1] === imagen.nombreImagen
        );

        return imagenNueva
          ? { ...imagen, imagen: imagenNueva.url }
          : imagenNueva;
      });

      console.log("nuevoArreglo", nuevoArreglo);
      asignarValorImagenes(nuevoArreglo);

      // asignarValorFotosSiniestro(siniestro);
      // asignarValorCargando(false);
    } else if (error) {
      console.log("error", error);
    } else if (loading) {
      console.log("loading", loading);
    }
  }, [loading, data, error]);

  return (
    // TODO: State para la camara del dispositivo
    <EnvolvedorPantallaDocumentos>
      {estadoCargando ? <IndicadorCarga /> : <></>}
      <Alerta
        textoEncabezado="Documentación subida exitosamente"
        textoCuerpo={`Con tu apoyo, nos ayudas a agilizar el trámite.`}
        colorAlerta="amarillo"
        tipoIcono="palomita"
        mostrarIcono
        mostrarModal={mostrarValorModal}
        etiquetaBoton="Aceptar"
        temaBoton="estandar"
        funcionLlamadaBoton={() => {
          asignarMostrarModal(false);
          setPantalla("menu");
        }}
        manejarCierre={() => asignarMostrarModal(false)}
      />
      {mostrarCamara && (
        <PantallaCamara
          titulo={actual.titulo}
          alCerrar={cerrarCamara}
          alAceptar={alAceptarImagen}
        />
      )}

      {!mostrarCamara && (
        <>
          <PantallaSubirDocumentos>
            <Titulo>Ayúdanos a agilizar el proceso</Titulo>
            <MensajePequeno>
              Anticípate y sube la documentación requerida para reunirte con tu
              ajustador.
            </MensajePequeno>
            <ContenedorPantalla id="contenedor-pantalla">
              <FotoContenedor
                titulo={imagenes[0].titulo}
                imagenPorDefecto=""
                imagen={imagenes[0].imagen}
                // seCargoAServidor={imagenes[0].seCargoAServidor}
                alDarClick={() => {
                  abrirCamara({
                    indice: 0,
                    titulo: imagenes[0].titulo,
                    nombreImagen: imagenes[0].nombreImagen,
                  });
                }}
                // alPresentarError={() => {
                //   alPresentarseErrorEnPrecargar(0);
                // }}
                // alCargarseExitosamente={() => {
                //   alCargarseExitosamente(0);
                // }}
              />

              <FotoContenedor
                titulo={imagenes[1].titulo}
                imagenPorDefecto=""
                imagen={imagenes[1].imagen}
                // seCargoAServidor={imagenes[0].seCargoAServidor}
                alDarClick={() => {
                  abrirCamara({
                    indice: 1,
                    titulo: imagenes[1].titulo,
                    nombreImagen: imagenes[1].nombreImagen,
                  });
                }}
                // alPresentarError={() => {
                //   alPresentarseErrorEnPrecargar(0);
                // }}
                // alCargarseExitosamente={() => {
                //   alCargarseExitosamente(0);
                // }}
              />

              <FotoContenedor
                titulo={imagenes[2].titulo}
                imagenPorDefecto=""
                imagen={imagenes[2].imagen}
                // seCargoAServidor={imagenes[0].seCargoAServidor}
                alDarClick={() => {
                  abrirCamara({
                    indice: 2,
                    titulo: imagenes[2].titulo,
                    nombreImagen: imagenes[2].nombreImagen,
                  });
                }}
                // alPresentarError={() => {
                //   alPresentarseErrorEnPrecargar(0);
                // }}
                // alCargarseExitosamente={() => {
                //   alCargarseExitosamente(0);
                // }}
              />

              <MensajePequeno>
                Ayúdanos si puedes compartir las siguientes fotos:
              </MensajePequeno>

              {/* <FotoContenedor
                titulo={imagenes[3].titulo}
                imagenPorDefecto=""
                imagen={imagenes[3].imagen}
                // seCargoAServidor={imagenes[0].seCargoAServidor}
                alDarClick={() => {
                  abrirCamara({
                    indice: 3,
                    titulo: imagenes[3].titulo,
                    nombreImagen: imagenes[3].nombreImagen,
                  });
                }}
                // alPresentarError={() => {
                //   alPresentarseErrorEnPrecargar(0);
                // }}
                // alCargarseExitosamente={() => {
                //   alCargarseExitosamente(0);
                // }}
              /> */}

              <FotoContenedor
                titulo={imagenes[3].titulo}
                imagenPorDefecto=""
                imagen={imagenes[3].imagen}
                // seCargoAServidor={imagenes[0].seCargoAServidor}
                alDarClick={() => {
                  abrirCamara({
                    indice: 3,
                    nombreImagen: imagenes[3].nombreImagen,
                    titulo: imagenes[3].titulo,
                  });
                }}
                // alPresentarError={() => {
                //   alPresentarseErrorEnPrecargar(0);
                // }}
                // alCargarseExitosamente={() => {
                //   alCargarseExitosamente(0);
                // }}
              />
            </ContenedorPantalla>

            <ContenedorBoton>
              <Boton
                tema={temaBoton}
                etiqueta="Guardar"
                enClick={mostrarmodal}
              />
            </ContenedorBoton>
          </PantallaSubirDocumentos>
        </>
      )}
    </EnvolvedorPantallaDocumentos>
  );
};

export default PantallaAgilizaProcesoRT;
