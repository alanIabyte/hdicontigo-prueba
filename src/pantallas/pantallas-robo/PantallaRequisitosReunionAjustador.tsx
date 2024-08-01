/* eslint-disable */
import React from "react";
import EncabezadoContenedor from "../../componentes/encabezado";
import { TituloCuestionarioReporte } from "../../componentes/pantalla-cuestionario-reporte/pantalla-cuestionario-reporte-componente/PantallaCuestionarioReporte.styled";
import { MensajePequeno } from "../../componentes/pantalla-pruebas/PantallaTransaccionMitec.styled";
import { ContenedorPreguntas } from "../../componentes/pantalla-cuestionario-reportes/pantalla-cuestionario-reportes-componente/PantallaCuestionarioComponentes.styled";
import { PantallaFondoGris } from "../../componentes/pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";
import { EnvolvedorPantalla, Pantalla } from "../../componentes/componentes-styled-compartidos/Pantalla.styled";
import "./../../componentes/pantalla-cuestionario-reportes/pantalla-cuestionario-reportes-componente/styles.scss"
import { ContenedorBoton } from "../../componentes/pantalla-camara/pantalla-camara-componente/PantallaCamara.styled";
import { Boton } from "../../componentes";
import { useHistory } from "react-router";

const ContenedorNumeroPregunta = (props: any) => (
  <div className={`semi-circulo-2 color-${props.numero}`}>
    <p>{props.numero}</p>
  </div>
);

const PantallaRequisitosReunionAjustador = () => {

  const history = useHistory();

  return (
    <>
      <EnvolvedorPantalla>
        <EncabezadoContenedor
          titulo="Conoce el proceso"
          funcionRegresar={() => history.goBack()}
        />
        <Pantalla>
          <TituloCuestionarioReporte>
            Requisitos de la reunión con ajustador
          </TituloCuestionarioReporte>

          <MensajePequeno>
            Previo a la reunión con tu ajustador, reúne y comparte los siguientes documentos:
          </MensajePequeno>

          <ContenedorPreguntas numeroPreguntas={3}>
            <div style={{ display: "flex", marginBottom: "1.5rem" }}>
              <ContenedorNumeroPregunta numero={1} />
              <MensajePequeno style={{ height: "20px", marginLeft: "10px" }}>
                Declaración ante el ministerio público
              </MensajePequeno>
            </div>
            <div style={{ display: "flex", marginBottom: "1.5rem" }}>
              <ContenedorNumeroPregunta numero={2} />
              <MensajePequeno style={{ height: "20px", marginLeft: "10px" }}>
                Identificación oficial
              </MensajePequeno>
            </div>
            <div style={{ display: "flex", marginBottom: "1.5rem" }}>
              <ContenedorNumeroPregunta numero={3} />
              <MensajePequeno style={{ height: "20px", marginLeft: "10px" }}>
                Factura del vehículo
              </MensajePequeno>
            </div>
          </ContenedorPreguntas>
          <ContenedorBoton style={{ marginTop: "5rem", background: "transparent" }}>
            <Boton
              customClass="boton-contacto-hdi"
              etiqueta={"Contacto HDI"}
              tema="simple"
              enClick={() => {
                window.location.href = "tel:*434";
              }}
              />
          </ContenedorBoton>
        </Pantalla>
      </EnvolvedorPantalla>
    </>
  );
};

export default PantallaRequisitosReunionAjustador;