/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React, { useState } from "react";
import CampoTexto from "../../componentes/campo-texto";
import { Pantalla } from "../../componentes/componentes-styled-compartidos/Pantalla.styled";
import { LeyendaNegritas } from "../../componentes/componentes-styled-compartidos/Textos";
import EncabezadoContenedor from "../../componentes/encabezado";
import { SeparadorEspacio } from "../../componentes/entrega/entrega-componente/Entrega.styled";
import { TituloCuestionarioReporte } from "../../componentes/pantalla-cuestionario-reporte/pantalla-cuestionario-reporte-componente/PantallaCuestionarioReporte.styled";
import { MensajePequeno } from "../../componentes/pantalla-pruebas/PantallaTransaccionMitec.styled";
import { IObjectKeys } from "./utils";

interface IProps {
  setPantalla: React.Dispatch<React.SetStateAction<string>>;
}

const valores: IObjectKeys = {
  fecha: "",
  hora: "",
};

const PantallaAgendarCita = ({ setPantalla }: IProps) => {
  // const history = useHistory();
  // const [fecha, setFecha] = useState();
  const [focoHoraCita, setFocoHoraCita] = useState("");

  const alCambiarValores = (key: string, event: any) => {
    if (key === "fecha") {
      const date = moment(event).toDate();
      console.log(date);
      return;
    }
    console.log(event);
    valores[key] = event.target.value;
  };

  return (
    <>
      <EncabezadoContenedor
        titulo="Agendar cita"
        funcionRegresar={() => setPantalla("menu")}
      />

      <Pantalla
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <TituloCuestionarioReporte>
          Agenda tu cita con tu ajustador:
        </TituloCuestionarioReporte>

        {/* Imagen del ajustador y su nombre */}

        <MensajePequeno>
          Será necesario que reúnas los{" "}
          <span className="link">siguientes requisitos</span> antes de reunirte
          con tu ajustador.
        </MensajePequeno>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <LeyendaNegritas>Datos de la cita</LeyendaNegritas>

          <SeparadorEspacio />

          <DatePicker
            value={valores.fecha}
            onChange={(e) => alCambiarValores("fecha", e)}
          />

          <SeparadorEspacio />

          <CampoTexto
            id="campoPoliza"
            enCambio={(e: any) => alCambiarValores("hora", e)}
            etiqueta="Hora de la cita"
            foco={focoHoraCita}
            valor={valores.horaRobo}
            marcador="HH:HH pm"
          />

          <SeparadorEspacio />

          <LeyendaNegritas>Ubicación de la cita</LeyendaNegritas>

          <SeparadorEspacio />
        </div>
      </Pantalla>
    </>
  );
};

export default PantallaAgendarCita;
