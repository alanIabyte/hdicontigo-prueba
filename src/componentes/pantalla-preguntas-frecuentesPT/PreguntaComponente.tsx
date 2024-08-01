/* eslint-disable arrow-body-style */
import React from "react";
import { Pantalla } from "../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../encabezado/encabezado-componente/Encabezado";
import { MensajePequeno } from "../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import { Titulo } from "../pantalla-registro-poliza/pantalla-registro-poliza-componente/PantallaRegistroPoliza.styled";
import { Pregunta } from "./interfaces";

type IProps = {
  pregunta: Pregunta;
  setQuestion: React.Dispatch<React.SetStateAction<Pregunta>>;
};

const PreguntaComponente = ({ pregunta, setQuestion }: IProps) => {
  return (
    <>
      <Encabezado
        funcionCerrar={() => setQuestion({ question: "", answer: "" })}
        titulo="Preguntas frecuentes"
      />

      <Pantalla>
        <Titulo>{pregunta.question}</Titulo>
        <MensajePequeno
          style={{ marginTop: "20px" }}
          dangerouslySetInnerHTML={{ __html: pregunta.answer || "" }}
        />
      </Pantalla>
    </>
  );
};

export default PreguntaComponente;
