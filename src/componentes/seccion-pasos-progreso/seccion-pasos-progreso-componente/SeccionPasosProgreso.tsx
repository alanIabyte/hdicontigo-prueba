import React, { useState } from "react";
import IconoComenzado from "@material-ui/icons/CheckCircleRounded";
import IconoPendiente from "@material-ui/icons/RadioButtonUncheckedRounded";
import {
  SeccionPasosProgreso,
  EncabezadoPasosProgreso,
  ContenedorIconoCirculo,
  CuerpoPasosProgreso,
  TituloSeccionPasosProgreso,
  ContenedorIconoVerMas,
} from "./SeccionPasosProgreso.styled";

interface IProps {
  titulo: string;
  pendiente: boolean;
  opcional?: boolean;
  children: React.ReactElement | React.ReactElement[];
  abrirSeccion?: boolean;
}

const Seccion = ({
  titulo,
  pendiente,
  opcional,
  children,
  abrirSeccion = false,
}: IProps) => {
  const [desplegarSeccion, asignarValorSeccion] = useState(abrirSeccion);
  return (
    <SeccionPasosProgreso>
      <EncabezadoPasosProgreso
        onClick={() => {
          asignarValorSeccion(!desplegarSeccion);
        }}
      >
        <ContenedorIconoCirculo opcional={opcional}>
          {pendiente ? (
            <IconoPendiente style={{ fontSize: 16 }} />
          ) : (
            <IconoComenzado style={{ fontSize: 16 }} />
          )}
        </ContenedorIconoCirculo>
        <TituloSeccionPasosProgreso opcional={opcional}>
          {titulo}
        </TituloSeccionPasosProgreso>
        {!pendiente && (
          <ContenedorIconoVerMas
            onClick={() => {
              asignarValorSeccion(!desplegarSeccion);
            }}
          >
            {desplegarSeccion ? "–" : "+"}
          </ContenedorIconoVerMas>
        )}
      </EncabezadoPasosProgreso>
      {desplegarSeccion && !pendiente && (
        <CuerpoPasosProgreso>{children}</CuerpoPasosProgreso>
      )}
    </SeccionPasosProgreso>
  );
};

export default Seccion;
