/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react";
import { useHistory } from "react-router-dom";
import PrimerPaso from "../../../../recursos/iconos/ico_dictamen_lesiones.svg";
import SegundoPaso from "../../../../recursos/iconos/ico_dictamen_responsabilidad.svg";
import TercerPaso from "../../../../recursos/iconos/ico_comprobacion_residecncia.svg";
import CuartoPaso from "../../../../recursos/iconos/ico-boleta_liberacion.svg";
import Boton from "../../../boton/boton-componente/Boton";
import { TituloMisPolizas } from "../../../pantalla-pruebas/PantallaTransaccionMitec.styled";
import { ParrafoModal } from "../../../solicitud/solicitud-componente/SolicitudModal.styled";
import { ContenedorBoton } from "../../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import "./styles.scss";
import {
  ContentBotonesBottom,
  // EnlaceInlineTexto,
} from "../PantallaPasosQueHacer.styled";

export const SliderPasosAsistenciaLegal = ({ paso, setPaso }) => {
  const history = useHistory();
  const info = {
    1: {
      imagen: PrimerPaso,
      titulo: "Dictamen de lesiones",
      desc: "Un médico legista examinará y <b>evaluara las lesiones sufridas o decesos</b> por las partes involucradas.<br><br> Este dictamen médico será esencial en la toma de decisiones judiciales y ayudará a establecer responsabilidades.",
    },
    2: {
      imagen: SegundoPaso,
      titulo: "Dictamen de responsabilidad",
      desc: "En esta etapa se realizará una <b>investigación a cargo de peritos judiciales</b> para identificar las circunstancias que llevaron  al accidente.<br><br> Tiene como fin identificar de manera objetiva qué evento o conjuntó de eventos condujeron al accidente y quién tiene la responsabilidad legal.",
    },
    3: {
      imagen: TercerPaso,
      titulo: "Comprobación de residencia",
      desc: "Esta verificación se realiza con el propósito de asegurar que <b>puedas asistir a las audiencias</b> que se llevarán a cabo en el lugar del accidente y es importante para garantizar tu disponibilidad y participación en el proceso legal.<br><br> Podrás utilizar cualquier identificación oficial.(INE, pasaporte, cartilla militar)",
    },
    4: {
      imagen: CuartoPaso,
      titulo: "Entrega de boleta de liberación",
      desc: "En caso de que lo determine el ministerio publico, <b>se emitirá una boleta de salida</b> que te permitirá seguir adelante con el procedimiento legal sin estar bajo custodia.",
    },
  };

  const siguienteImagen = () => {
    if (paso !== 4) {
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
            src={paso !== 4 ? info[paso + 1].imagen : ""}
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
                Un médico legista examinará y{" "}
                <b>evaluara las lesiones sufridas o decesos</b> por las partes
                involucradas.
                <br />
                <br /> Este dictamen médico será esencial en la toma de
                decisiones judiciales y ayudará a establecer
                responsabilidades.
              </ParrafoModal>
            </>
          )}

          {paso === 2 && (
            <>
              <ParrafoModal>
                En esta etapa se realizará una{" "}
                <b>investigación a cargo de peritos judiciales</b> para
                identificar las circunstancias que llevaron al accidente.
                <br />
                <br /> Tiene como fin identificar de manera objetiva qué evento
                o conjuntó de eventos condujeron al accidente y quién tiene la
                responsabilidad legal.
              </ParrafoModal>
            </>
          )}

          {paso === 3 && (
            <>
              <ParrafoModal>
                Esta verificación se realiza con el propósito de asegurar que{" "}
                <b>puedas asistir a las audiencias</b> que se llevarán a cabo en
                el lugar del accidente y es importante para garantizar tu
                disponibilidad y participación en el proceso legal.
                <br />
                <br /> Podrás utilizar cualquier identificación oficial(INE,
                pasaporte, cartilla militar).
              </ParrafoModal>
            </>
          )}

          {paso === 4 && (
            <>
              <ParrafoModal>
                En caso de que lo determine el ministerio publico,{" "}
                <b>se emitirá una boleta de salida</b> que te permitirá seguir
                adelante con el procedimiento legal sin estar bajo custodia.
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
