import React from "react";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  TituloMisPolizas,
  Contenedor,
  ContenedorRef,
  Subtitulo,
  MensajeTiendas,
  NumeroReferencia,
  MensajePequeno,
  Logo,
} from "./PantallaPagoOtraTiendas.styled";
import EncabezadoGrande from "../../encabezado-grande";
import LogoOxxo from "../../../recursos/imagenes/logo_oxxo.png";
import LogoBara from "../../../recursos/imagenes/logo_bara.png";
import { BarCode } from "../../componentes-styled-compartidos/Textos";

const diccionario = {
  titulo: "Tiendas de autoservicio",
  subtituloTiendas: "PAGO EN TIENDAS",
  parr1: "Paga tu póliza en efectivo en tiendas OXXO o Súper Bara",
  parr2:
    "Importante, el monto máximo a pagar en efectivo es de $10 mil pesos por póliza",
};

const PantallaPagoOtraTiendas = () => {
  const history = useHistory();
  const location = useLocation();
  let referencias;

  if (location.state.referencias) {
    referencias = location.state.referencias;
  } else {
    history.push("/mis-polizas");
  }

  return (
    <EnvolvedorPantallaPolizas key={v4()}>
      <EncabezadoGrande mostrarBack />
      <PantallaFondoBlanco>
        <Contenedor>
          <TituloMisPolizas id="titulo">{diccionario.titulo}</TituloMisPolizas>

          <ContenedorRef>
            <Subtitulo>{diccionario.subtituloTiendas}</Subtitulo>
            <MensajeTiendas>
              <MensajePequeno>{diccionario.parr1} </MensajePequeno>
              <Logo src={LogoOxxo} medio />
              <Logo src={LogoBara} medio />
            </MensajeTiendas>
            <MensajePequeno>{diccionario.parr2}</MensajePequeno>

            <BarCode>{referencias.codigoBarras}</BarCode>
            <NumeroReferencia>{referencias.codigoBarrasDig}</NumeroReferencia>
          </ContenedorRef>
        </Contenedor>
      </PantallaFondoBlanco>
    </EnvolvedorPantallaPolizas>
  );
};

export default PantallaPagoOtraTiendas;

/*
      <PieDePagina>
        <ContenedorBoton>
          <Boton
            etiqueta={diccionario.descargarFormato}
            tema="deshabilitado"
            deshabilitado
            enClick={descargarFormatoPago}
          />
        </ContenedorBoton>
      </PieDePagina>
*/
