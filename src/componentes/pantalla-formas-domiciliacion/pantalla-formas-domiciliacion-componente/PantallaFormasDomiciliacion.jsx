/* eslint-disable */
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { loader } from "graphql.macro";
import { useLazyQuery } from "@apollo/react-hooks";
import {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  TituloMisPolizas,
  MensajePequeno,
  Contenedor,
  ContenedorFormasPago,
  ContenedorIcono,
  FormaPago,
  NombreFormaPago,
  NombreFormaPagoAbsoluta,
  DescripcionFormaPago,
  Enlace,
} from "./PantallaFormasDomiciliacion.styled";
import EncabezadoGrande from "../../encabezado-grande";
import Constantes from "../../../recursos/constantes";
import IndicadorCarga from "../../indicador-carga";
import { ReactComponent as IconoTarjeta } from "../../../recursos/iconos/ico_pago_tarjeta.svg";
import { ReactComponent as IconoTelefono } from "../../../recursos/iconos/ico_pago_telefono.svg";
import { ReactComponent as IconoClabe } from "../../../recursos/iconos/ico_clabe_bancaria.svg";
import Switch from "../../Switch";

const nombreCookie = Constantes.nombreDeCookie;

const PantallaFormasDomiciliacion = () => {
  const history = useHistory();
  const location = useLocation();
  const estadoApp = useSelector((estado) => estado);
  const [objetoCookie] = useCookies([nombreCookie]);

  const [cargando, asignarValorCargando] = useState(false);
  const [ligaPago, setLigaPago] = useState(false);

  const { telPago } = Constantes;
  let poliza = {};
  let polizaGeneral = {};
  let recibosPorPagar = {};

  const verTerminosYCondiciones = () => {
    window.location.href = "https://google.com";
  };

  const diccionario = {
    titulo: "¿Por cuál medio te gustaría domiciliar tu pago?",
    descripcionPantalla: "Elige la forma de pago",
    domiciliarPago: "¿Quieres domiciliar tu pago?",
    mensaje: (
      <span>
        Al activar la domiciliación, aceptas los
        <Enlace onClick={verTerminosYCondiciones}>
          {" "}
          términos y condiciones de HDI.
        </Enlace>{" "}
        Nos autorizas el pago de tus pólizas mensualmente de forma automatica
        desde tu tarjeta registrada con nosotros, hasta que decidas cancelar.
      </span>
    ),
    formas: {
      clabe: "Clabe bancaria",
      telefono: "Por teléfono",
      telefonoDesc: "HDI *434",
      tarjeta: "Por tarjeta",
      tarjetaDesc: "de crédito o débito",
      otra: "Otra forma",
      otraDesc: "de pago",
    },
  };

  if (location.state?.poliza && estadoApp?.recibosPorPagar) {
    poliza = location.state.poliza;
    polizaGeneral = location.state.polizaGeneral;
    recibosPorPagar = estadoApp?.recibosPorPagar;
  } else {
    history.push("/mis-polizas");
  }

  const domiciliarPorTarjeta = () => {
    history.push("/domiciliacion", {
      poliza,
      detallePoliza: polizaGeneral,
      tipo: "Tarjeta",
    });
  };

  const domiciliarPorClabe = () => {
    history.push("/domiciliacion", {
      poliza,
      detallePoliza: polizaGeneral,
      tipo: "Clabe",
    });
  };

  const verFormasPagoUnico = () => {
    history.goBack();
  };

  return (
    <EnvolvedorPantallaPolizas key={v4()}>
      <EncabezadoGrande mostrarBack />
      {cargando ? <IndicadorCarga /> : null}
      <PantallaFondoBlanco>
        <Contenedor>
          <TituloMisPolizas id="titulo">{diccionario.titulo}</TituloMisPolizas>

          <MensajePequeno>{diccionario.descripcionPantalla}</MensajePequeno>

          {/*
            <Switch
              texto={diccionario.domiciliarPago}
              activo={true}
              alCambiar={verFormasPagoUnico}
            />
          */}

          <MensajePequeno id="mensajePequeno">
            {diccionario.mensaje}
          </MensajePequeno>

          <ContenedorFormasPago>
            <FormaPago onClick={domiciliarPorTarjeta}>
              <ContenedorIcono>
                <IconoTarjeta className="icono" />
              </ContenedorIcono>
              <NombreFormaPago>{diccionario.formas.tarjeta}</NombreFormaPago>
              <DescripcionFormaPago>
                {diccionario.formas.tarjetaDesc}
              </DescripcionFormaPago>
            </FormaPago>

            <FormaPago onClick={domiciliarPorClabe}>
              <ContenedorIcono>
                <IconoClabe className="icono" />
              </ContenedorIcono>
              <NombreFormaPagoAbsoluta>
                {diccionario.formas.clabe}
              </NombreFormaPagoAbsoluta>
            </FormaPago>
          </ContenedorFormasPago>
        </Contenedor>
      </PantallaFondoBlanco>
    </EnvolvedorPantallaPolizas>
  );
};

export default PantallaFormasDomiciliacion;
