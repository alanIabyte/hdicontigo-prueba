/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react";
import { useHistory } from "react-router-dom";
import PrimerPaso from "../../../../recursos/iconos/RT/1-reporte.svg";
import SegundoPaso from "../../../../recursos/iconos/RT/2-reporte.svg";
import TercerPaso from "../../../../recursos/iconos/RT/3-reporte.svg";
import CuartoPaso from "../../../../recursos/iconos/RT/4-reporte.svg";
import QuintoPaso from "../../../../recursos/iconos/RT/5-reporte.svg";
import Boton from "../../../boton/boton-componente/Boton";
import { TituloMisPolizas } from "../../../pantalla-pruebas/PantallaTransaccionMitec.styled";
import { ParrafoModal } from "../../../solicitud/solicitud-componente/SolicitudModal.styled";
import { ContenedorBoton } from "../../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import "./styles.scss";
import { ContentBotonesBottom, EnlaceInlineTexto } from "../PantallaPasosQueHacer.styled";

export const SliderPasosRobo = ({ paso, setPaso }) => {
  const history = useHistory();
  const info = {
    1: {
      imagen: PrimerPaso,
      titulo: "Reporta a las autoridades",
      desc: "Comunícate al 911 para notificar el robo de tu vehículo y acude al Ministerio Público de la localidad donde ocurrió el siniestro, para interponer una demanda.<br><br> <b>Conserva el número de fólio del reporte que te asignarán las autoridades.<b/>",
    },
    2: {
      imagen: SegundoPaso,
      titulo: "Genera tu reporte",
      desc: "Reportar tu siniestro con nosotros es muy sencillo, podrás hacerlo desde aquí. Ten a la mano tu número de póliza y la serie del vehículo o puedes hacerlo de manera en el número HDI *434",
    },
    3: {
      imagen: TercerPaso,
      titulo: "Da seguimiento",
      desc: "Reportar tu siniestro con nosotros es muy sencillo, podrás hacerlo desde aquí. Ten a la mano tu número de póliza y la serie del vehículo o puedes hacerlo de manera en el número HDI *434",
    },
    4: {
      imagen: CuartoPaso,
      titulo: "Localización de tu vehículo",
      desc: "Si encuentras tu vehículo, es importante que nos avises para actualizar su estatus en el Registro Público Vehicular <br />. Si necesitas recuperarlo, te acompañaremos durante el proceso; necesitaremos el Oficio de Liberación emitido por las autoridades.",
    },
    5: {
      imagen: QuintoPaso,
      titulo: "Recibe tu indemnización",
      desc: `En caso de proceder, recibe de manera rápida y sencilla el pago correspondiente al tipo de valor estipulado en tu póliza. <br /> Estamos disponibles para ayudarte en todo momento.`,
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
      if (option === 'comenzar') {
        history.push({
          pathname: `/reporte-identificar`,
          state: {
            claim: "robbery",
          },
        });
      } else if (option === 'llamarHDI') {
        window.open("tel:*434");
      } else if (option === 'contacto') {
        history.push({
          pathname: "asistencia-hdi",
          state: {
            tipoPersona: "f",
            tipoAtencion: "robo",
          },
        });
      } else if (option === 'llamar911') {
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
              Comunícate al 911 para notificar el robo de tu vehículo y acude al{" "}
              Ministerio Público de la localidad donde ocurrió el siniestro, para{" "}
              interponer una demanda.
              </ParrafoModal>
              <br />
              <ParrafoModal style={{ fontWeight: "bold" }}>
                Conserva el número de fólio del reporte que te asignarán las autoridades.
              </ParrafoModal>
            </>
          )}

          {paso === 2 && (
            <>
              <ParrafoModal>
                Un vez hecha la denuncia ante el MP, reporta tu siniestro con nosotros por este medio.
              </ParrafoModal>
              <br />
              <ParrafoModal>
                Si lo prefieres, puedes hacer el reporte vía telefónica al <EnlaceInlineTexto onClick={() => { redirigir('llamarHDI') }}>*434</EnlaceInlineTexto>, para ello ten a la mano tu número de póliza y serie del vehículo.
              </ParrafoModal>
            </>
          )}

          {paso === 3 && (
            <>
              <ParrafoModal>
                Te asignaremos un ajustador para ayudarte en los{" "}
                <b>siguientes pasos.</b> Asegurate de contar con:
              </ParrafoModal>
              <ul>
                <ParrafoModal>
                  <li>Denuncia ante el Ministerio Público, que cuente con la acreditación de la propiedad.</li>
                </ParrafoModal>

                <ParrafoModal>
                  <li>Factura del vehículo.</li>
                </ParrafoModal>
                <ParrafoModal>
                  <li>Identificación oficial.</li>
                </ParrafoModal>
              </ul>
              <br />
              <ParrafoModal>
                Una vez que tengas los documentos necesarios, te ayudaremos a 
                agendar una cita con el ajustador.
              </ParrafoModal>
            </>
          )}

          {paso === 4 && (
            <>
              <ParrafoModal>
                Si encuentras tu vehículo, <b>es importante que nos avises</b> para
                actualizar su estatus en el Registro Público Vehicular. 
              </ParrafoModal>
              <br />
              <ParrafoModal>
                Si necesitas
                recuperarlo, te acompañaremos durante el proceso, para ello, necesitamos el{" "}
                <b>Oficio de Liberación</b>, emitido por las autoridades.
              </ParrafoModal>
            </>
          )}

          {paso === 5 && (
            <>
              <ParrafoModal>
                Recibe el pago de indemnización del siniestro reportado, de acuerdo con lo estipulado en tu póliza.
              </ParrafoModal>
              <br />
              <ParrafoModal>
                ¡Estamos disponibles para ayudarte en todo momento!
              </ParrafoModal>
            </>
          )}
        </section>
      </div>
      {/* TODO: Utilizar position para fijar botones al final de la pantalla? */}
      <ContentBotonesBottom>
        {paso === 1 && (
          <ContenedorBoton>
              <Boton 
                etiqueta="Llamar al 911"
                tema="rojo"
                enClick={() => { redirigir('llamar911') }}
              />
          </ContenedorBoton>
        )}
        <ContenedorBoton>
          <Boton 
            estilo={{ marginTop: "20px" }}
            etiqueta="Comenzar reporte"
            tema={paso=== 1 ? "simple" : "estandar"}
            enClick={() => { redirigir('comenzar') }}
          />
        </ContenedorBoton>
        {paso >= 2 && (
          <ContenedorBoton>
              <Boton 
                estilo={{ marginTop: "20px" }}
                etiqueta={paso === 2 ? "Llamar a HDI *434" : "Contacto HDI" }
                tema="simple"
                enClick={() => { redirigir( (paso === 2) ? 'llamarHDI' : 'contacto') }}
              />
          </ContenedorBoton>
        )}
      </ContentBotonesBottom>

    </div>
  );
};
