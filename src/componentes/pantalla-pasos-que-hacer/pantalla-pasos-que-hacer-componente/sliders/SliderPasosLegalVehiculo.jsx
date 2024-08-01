/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react";
import { useHistory } from "react-router-dom";
import PrimerPaso from "../../../../recursos/iconos/ico-puesta-disposicion.svg";
import SegundoPaso from "../../../../recursos/iconos/ico_acreditacion_vehiculo.svg";
import TercerPaso from "../../../../recursos/iconos/ico_investigacion_caso.svg";
import CuartoPaso from "../../../../recursos/iconos/ico_resolucion_caso.svg";
import QuintoPaso from "../../../../recursos/iconos/ico_oficio_liberacion.svg";
import Boton from "../../../boton/boton-componente/Boton";
import { TituloMisPolizas } from "../../../pantalla-pruebas/PantallaTransaccionMitec.styled";
import { ParrafoModal } from "../../../solicitud/solicitud-componente/SolicitudModal.styled";
import { ContenedorBoton } from "../../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import "./styles.scss";
import {
  ContentBotonesBottom,
  // EnlaceInlineTexto,
} from "../PantallaPasosQueHacer.styled";

export const SliderPasosLegalVehiculo = ({ paso, setPaso }) => {
  const history = useHistory();
  const info = {
    1: {
      imagen: PrimerPaso,
      titulo: "Puesta a disposición",
      desc: "",
    },
    2: {
      imagen: SegundoPaso,
      titulo: "Acreditación del vehículo",
      desc: "",
    },
    3: {
      imagen: TercerPaso,
      titulo: "Investigación del caso",
      desc: "",
    },
    4: {
      imagen: CuartoPaso,
      titulo: "Resolución del caso",
      desc: "",
    },
    5: {
      imagen: QuintoPaso,
      titulo: "Emisión del Oficio de liberación",
      desc: "",
    },
  };

  const siguienteImagen = () => {
    if (paso !== 5) {
      setPaso(paso + 1);
    }
  };

  const imagenPrevia = () => {
    if (paso !== 1) {
      setPaso(paso - 1);
    }
  };

  const redirigir = (option) => {
    // const { poliza, numSerie } = estadoApp.datosReportePoliza;
    if (option === "comenzar") {
      history.push({
        pathname: `/reporte-identificar`,
        state: {
          claim: "robbery",
        },
      });
    } else if (option === "llamarHDI") {
      window.open("tel:*434");
    } else if (option === "contacto") {
      history.push({
        pathname: "asistencia-hdi",
        state: {
          tipoPersona: "f",
          tipoAtencion: "robo",
        },
      });
    } else if (option === "llamar911") {
      window.open("tel: 911");
    }
  };

  return (
    <div className="contenedor-padre">
      <div>
        <TituloMisPolizas style={{ textAlign: "center" }}>
          {info[paso].titulo}
        </TituloMisPolizas>
        <section className="contenedor-imagenes-slider">
          <img
            src={paso !== 1 ? info[paso - 1].imagen : ""}
            alt=""
            className="imagen-pequena"
            onClick={imagenPrevia}
          />
          <img src={info[paso].imagen} alt="" className="imagen-grande" />
          <img
            src={paso !== 5 ? info[paso + 1].imagen : ""}
            alt=""
            className="imagen-pequena"
            onClick={siguienteImagen}
          />
        </section>
        {/* Si te preguntas porque hago validacion de "paso" por paso */}
        {/* Es porque el diseñador mete etiquetas HTMl en el prototipo y no puedo imprimirlas */}
        <section className="mt-20">
          {paso === 1 && (
            <>
              <ParrafoModal>
                La primera autoridad que esté en el lugar del hecho pondrá a
                disposición a los involucrados y mandará las unidades al
                corralón, abriendo una carpeta de investigación.
              </ParrafoModal>
            </>
          )}

          {paso === 2 && (
            <>
              <ParrafoModal>
                Para la acreditación de la propiedad del vehículo será necesario
                presentar los siguientes documentos según sea persona física o
                moral.
              </ParrafoModal>
              <br />
              <ParrafoModal style={{ color: "var(--color-verde-normal)" }}>
                <b>Persona fisica</b>
              </ParrafoModal>
              <ul>
                <ParrafoModal>
                  <li>Factura original/Carta factura vigente.</li>
                </ParrafoModal>

                <ParrafoModal>
                  <li>INE del titular de la factura.</li>
                </ParrafoModal>
              </ul>
              <br />
              <ParrafoModal style={{ color: "var(--color-verde-normal)" }}>
                <b>Persona moral</b>
              </ParrafoModal>
              <ul>
                <ParrafoModal>
                  <li>Poder vigente.</li>
                </ParrafoModal>

                <ParrafoModal>
                  <li>Identificación del Propietario/Apoderado Legar.</li>
                </ParrafoModal>

                <ParrafoModal>
                  <li>INE del titular de la factura.</li>
                </ParrafoModal>
              </ul>
            </>
          )}

          {paso === 3 && (
            <>
              <ParrafoModal>
                Se solicitan peritos para cumplir requisitos articulo 239, como
                verificar que el vehículo no sea robado o este vinculando a
                hechos delictivos y que no haya oposición fundada para la
                devolución por parte de terceros.
              </ParrafoModal>
            </>
          )}

          {paso === 4 && (
            <>
              <ParrafoModal>
                Basado en los dictámenes, se decidirá la responsabilidad de los
                involucrados.
              </ParrafoModal>
              <br />
              <ParrafoModal>
                Si la autoridad no cuenta con los elementos para poder señalar
                la responsabilidad se emitirá un informe.
              </ParrafoModal>
            </>
          )}

          {paso === 5 && (
            <>
              <ParrafoModal>
                Contando con los dictámenes correspondientes y acreditada la
                propiedad la autoridad emite el Oficio de liberación del
                vehículo.
              </ParrafoModal>
            </>
          )}
        </section>
      </div>
      {/* TODO: Utilizar position para fijar botones al final de la pantalla? */}
      <ContentBotonesBottom>
        <ContenedorBoton>
          <Boton
            estilo={{ marginTop: "20px" }}
            etiqueta="Llamar a HDI"
            tema="simple"
            enClick={() => {
              redirigir("llamarHDI");
            }}
          />
        </ContenedorBoton>
      </ContentBotonesBottom>
    </div>
  );
};
