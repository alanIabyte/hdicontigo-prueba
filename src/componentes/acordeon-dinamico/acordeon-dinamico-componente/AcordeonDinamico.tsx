/* eslint-disable arrow-body-style */
import React from "react";
import {
  Contenedor,
  ContenedorBotones,
  ContenidoAcordeon,
  Encabezado,
  EnvolvedorIcono,
  EnvolvedorImagen,
  ParrafoAcordeon,
  TituloAcordeon,
} from "../../acordeon-registro-poliza/acordeon-registro-poliza-componente/AcordeonRegistroPoliza.styled";

type IOpcion = {
  icono: string;
  titulo: string;
  descripcion: string;
  key: string;
  click: React.Dispatch<React.SetStateAction<string>> | void;
};

interface IProps {
  opciones: IOpcion[];
}

const AcordeonDinamico = ({ opciones }: IProps) => {
  return (
    <ContenedorBotones>
      {opciones.map((opcion) => (
        <Contenedor key={opcion.key} onClick={opcion.click} show>
          <Encabezado>
            <EnvolvedorIcono>
              <EnvolvedorImagen src={opcion.icono} />
            </EnvolvedorIcono>
            <ContenidoAcordeon>
              <TituloAcordeon>{opcion.titulo}</TituloAcordeon>
              <ParrafoAcordeon>{opcion.descripcion}</ParrafoAcordeon>
            </ContenidoAcordeon>
          </Encabezado>
        </Contenedor>
      ))}
    </ContenedorBotones>
  );
};

export default AcordeonDinamico;
