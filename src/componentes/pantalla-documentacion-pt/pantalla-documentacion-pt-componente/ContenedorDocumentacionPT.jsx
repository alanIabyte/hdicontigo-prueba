/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
import React from "react";
import { useHistory } from "react-router-dom";
import Boton from "../../boton/boton-componente/Boton";
import GrupoBotones from "../../grupo-botones";
import { ContenedorBoton } from "../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import {
  MensajePequeno,
  TituloMisPolizas,
} from "../../pantalla-pruebas/PantallaTransaccionMitec.styled";
import configs from "../../../utils/configs";

// Este componente esta hecho para contener la lista de documentos requeridos para solicitar una indemnización
// A fin de no repetir código se creó el componente para servir como padre y cambiar dinamicamente los titulos

const ContenedorDocumentacionPT = ({
  children,
  tipoPersona,
  seleccionarPersona,
  typeDamages,
  abrirAlertaDanosGlobales,
  alComenzarIndemnizacion,
}) => {
  const history = useHistory();

  const redirectAsistenciaHDI = () => {
    history.push({
      pathname: "asistencia-hdi",
      state: {
        tipoPersona,
        tipoAtencion: typeDamages,
      },
    });
  };

  return (
    <>
      {typeDamages === "total" && (
        <TituloMisPolizas>{`Indemnización por pérdida total para persona ${tipoPersona}: Requisitos`}</TituloMisPolizas>
      )}

      {typeDamages === "parcial" && (
        <TituloMisPolizas>{`Indemnización por daños parciales para persona ${tipoPersona}: Requisitos`}</TituloMisPolizas>
      )}

      {typeDamages === "global" && (
        <TituloMisPolizas>{`Indemnización por daños globales para persona ${tipoPersona}: Requisitos`}</TituloMisPolizas>
      )}
      {typeDamages === "robo" && (
        <>
          <TituloMisPolizas>{`Indemnización por robo total: Requisitos`}</TituloMisPolizas>
          <MensajePequeno>
            Selecciona tu régimen fiscal y conoce los requisitos y formatos que debes llenar para agilizar tu solicitud.
          </MensajePequeno>
        </>
      )}
      {typeDamages !== "robo" && (
        <MensajePequeno>
          Selecciona tu régimen fiscal para conocer los requisitos.
        </MensajePequeno>
      )}
      <GrupoBotones
        tipoSeleccionado={tipoPersona}
        evento={seleccionarPersona}
        opcion1="física"
        opcion2="moral"
        texto1="Persona física"
        texto2="Persona moral"
      />

      {/* Por si te lo preguntas, aquí se renderizan todos los componentes cómo el encabezado o la lista de documentos */}
      {children}

      {configs.showDaniosGlobales && typeDamages === "global" && (
        <>
          <MensajePequeno style={{ textAlign: "center" }}>
            ¿Desea solicitar el pago de daños globales?
          </MensajePequeno>

          <ContenedorBoton>
            <Boton
              tema="estandar"
              etiqueta="Solicitar pago de daños globales"
              enClick={abrirAlertaDanosGlobales}
            />
          </ContenedorBoton>
        </>
      )}
      {(typeDamages === "total" || typeDamages === "parcial") && (
        <>
          <ContenedorBoton style={{ marginTop: "20px" }}>
            <Boton
              tema="estandar"
              etiqueta="Solicitar indemnización"
              enClick={alComenzarIndemnizacion}
            />
          </ContenedorBoton>
        </>
      )}
      {!configs.showDaniosGlobales && (
        <>
          <br />
          <br />
          <br />
          <br />
        </>
      )}
      <Boton
        tema="simple"
        etiqueta="Contacto HDI"
        enClick={redirectAsistenciaHDI}
      />
    </>
  );
};

export default ContenedorDocumentacionPT;
