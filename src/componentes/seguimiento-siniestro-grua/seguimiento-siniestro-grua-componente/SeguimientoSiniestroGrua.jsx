import React from "react";
import { useHistory } from "react-router-dom";
import {
  Envolvedor,
  Campo,
  ContenedorBotonCancelar,
} from "./SeguimientoSiniestroGrua.styled";
import Boton from "../../boton";

const diccionario = {
  tituloEstatusGrua:
    "Un proveedor de grúa se pondrá en contacto contigo para darle seguimiento a tu asistencia.",
  tituloCancelarGrua: "¿Ya no necesitas el servicio de grúa? háznoslo saber.",
  botonEstatusGrua: "Estatus de la grúa",
  botonCancelar: "Cancelar grúa",
};

const SeguimientoSiniestroGrua = () => {
  const history = useHistory();

  return (
    <Envolvedor>
      <Campo>{diccionario.tituloEstatusGrua}</Campo>
      <ContenedorBotonCancelar>
        <Boton
          etiqueta={diccionario.botonEstatusGrua}
          tema="estandar"
          enClick={() => {
            window.location.href = "tel:*4777402870";
          }}
        />
      </ContenedorBotonCancelar>
      <Campo>{diccionario.tituloCancelarGrua}</Campo>
      <ContenedorBotonCancelar>
        <Boton
          etiqueta={diccionario.botonCancelar}
          tema="simple"
          enClick={() => {
            history.push("/cancelar-grua");
          }}
        />
      </ContenedorBotonCancelar>
    </Envolvedor>
  );
};

export default SeguimientoSiniestroGrua;
