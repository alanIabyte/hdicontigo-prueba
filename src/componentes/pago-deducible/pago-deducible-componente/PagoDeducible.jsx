/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-duplicates */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import {
  EnvolvedorPagoDeducible,
  PagoDeducibleCampo,
  PagoDeducibleMonto,
  PagoDeducibleReferencia,
  BotonPagoEnLinea,
  PagoDeducibleFormasPago,
  PagoDeducibleValor,
} from "./PagoDeducible.styled";
import ModalTexto from "../../modal-texto";
import Constantes from "../../../recursos/constantes";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import useAccionesLog from "../../../utils/useAccionesLog";
import Boton from "../../boton/boton-componente/Boton";
import { SeparadorEspacio } from "../../entrega/entrega-componente/Entrega.styled";

const { nombreDeCookie } = Constantes;

const PagoDeducible = (props) => {
  const history = useHistory();
  const { datosPagoDeducible, datosPagoDeduciblePagado } = props;
  const estadoApp = useSelector((state) => state);
  const { runDownloadLog, runCancelLog } = useAccionesLog(
    estadoApp.informacionContacto.telefono === undefined ||
      estadoApp.informacionContacto.telefono === null
      ? ""
      : estadoApp.informacionContacto.telefono
  );
  const [mostrarFormasPago, asignarValorMostrarFormasPago] = useState(false);
  const [cookie] = useCookies([nombreDeCookie]);
  const objetoCookie = cookie[nombreDeCookie];
  let ligaPagoLinea = obtenerValorDeArregloDeStrings(
    datosPagoDeducible,
    "UrlPagoEnLinea: "
  );
  const monto = obtenerValorDeArregloDeStrings(datosPagoDeducible, "Monto: ");

  if (!ligaPagoLinea.startsWith("https://")) {
    ligaPagoLinea = `https://${ligaPagoLinea}`;
  }
  const referencia = obtenerValorDeArregloDeStrings(
    datosPagoDeducible,
    "Referencia: "
  );
  const archivo = obtenerValorDeArregloDeStrings(
    datosPagoDeducible,
    "Documento: "
  );
  const pagado = obtenerValorDeArregloDeStrings(datosPagoDeduciblePagado, "Pagado: ");
  const deduciblePagado = pagado.toLowerCase() === "true";
  const fechaPago = obtenerValorDeArregloDeStrings(
    datosPagoDeducible,
    "FechaPago: "
  );
  const autorizacion = obtenerValorDeArregloDeStrings(
    datosPagoDeducible,
    "NumeroAutorizacion: "
  );

  const diccionario = {
    monto: "Monto de deducible",
    pagoLinea: "Pagar en línea",
    referencia: "Número de referencia para pago en banco",
    formasPago: "Ver otras formas de pago",
    tituloModal: "Otras formas de pago",
    cuerpoModal:
      // eslint-disable-next-line max-len
      "<p>Tarjeta de crédito o débito aceptamos Visa y Master Card en cualquiera de nuestras sucursales de lunes a viernes con horario de 09:00 a 17:00 hrs.</p><p>En línea al <b>018007246434</b><p>En efectivo directamente en cualquier sucursal de Bancomer con la referencia proporcionada.</p><p>Con transferencia deberá realizarlo con 5 días de anticipación a la fecha a la entrega de la unidad Cuenta Clave <b>012225004534523369</b> y proporcionando la referencia bancaria, la cual se encuentra en el formato de pago de deducible.</p><p>En caso de requerir factura por concepto del pago de deducible, podrá solicitarla una vez transcurridas 72 hrs. a la realización del pago en el mismo correo electrónico que le hicieron llegar la referencia y/o a los teléfonos 36417956 / 36165622. Donde validaremos con el número del siniestro el ingreso del monto en nuestro sistema y una vez así podrá emitir el documento a nombre del titular de su póliza.</p>",
    botonModal: "Descargar información",
    nombreArchivo: "FormasDePago.pdf",
    pagoRealizado: "Pago realizado",
    numeroAutorizacion: "Número de autorización",
  };

  const mascaraMonto = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(monto.replace(/[^0-9.]+/g, ""));

  const usuarioValidado = (ligaPagoDeducible) => {
    if (objetoCookie && !objetoCookie.Validado) {
      history.push({
        pathname: "/contrasena-pago-deducible",
        state: {
          ligaPagoDeducible,
          mascaraMonto
        },
      });
    } else {
      const listaDetalle = [{ "columna": "importe", "valor": mascaraMonto }];
      runDownloadLog(2, listaDetalle);
      window.location.assign(ligaPagoDeducible);
    }
  };

  const runDispatchLog = () => {
    asignarValorMostrarFormasPago(false);
    const listaDetalle = [{ "columna": "importe", "valor": mascaraMonto }];
    runDownloadLog(4, listaDetalle);
  };

  const closeModal = () => {
    asignarValorMostrarFormasPago(false);
    const listaDetalle = [{ "columna": "importe", "valor": mascaraMonto }];
    runCancelLog(4, listaDetalle);
  }

  const abrirPagoLineaMitec = () => {
    window.open(props.urlPagoMit);
  }

  return (
    <EnvolvedorPagoDeducible>
      {!deduciblePagado ? (
        <>
          <ModalTexto
            titulo={diccionario.tituloModal}
            texto={diccionario.cuerpoModal}
            mostrar={mostrarFormasPago}
            textoBoton={diccionario.botonModal}
            manejarCierre={closeModal}
            manejarCierreFun
            archivo={archivo}
            nombreArchivo={diccionario.nombreArchivo}
            runActionLog={runDispatchLog}
          />
          <PagoDeducibleCampo>{diccionario.monto}</PagoDeducibleCampo>
          <PagoDeducibleMonto>{mascaraMonto}</PagoDeducibleMonto>
          {/* TODO: El botón de pago en línea fue deshabilitado temporalmente en 
                    lo que se establece el servicio para realizarlo. */}
                    {/* parseFloat(monto) > 0 */}
          {false && (
            <BotonPagoEnLinea
              onClick={() => {
                usuarioValidado(ligaPagoLinea);
              }}
            >
              {diccionario.pagoLinea}
            </BotonPagoEnLinea>
          )}

          {/* Botón de pago en línea funcional */}
          {props.urlPagoMit !== "" && (
            <Boton pequeno etiqueta="Pagar en línea" tema="estandar" enClick={abrirPagoLineaMitec} />
          )}

          <SeparadorEspacio />

          {parseFloat(monto) > 0 && (
            <>
              <PagoDeducibleCampo>{diccionario.referencia}</PagoDeducibleCampo>
            </>
          )}

          <PagoDeducibleReferencia>{referencia}</PagoDeducibleReferencia>

          {parseFloat(monto) > 0 && (
            <PagoDeducibleFormasPago
              onClick={() => {
                asignarValorMostrarFormasPago(true);
              }}
            >
              {diccionario.formasPago}
            </PagoDeducibleFormasPago>
          )}
        </>
      ) : (
        <>
          <PagoDeducibleCampo>{diccionario.pagoRealizado}</PagoDeducibleCampo>
          <PagoDeducibleValor>{fechaPago}</PagoDeducibleValor>
          <PagoDeducibleCampo>
            {diccionario.numeroAutorizacion}
          </PagoDeducibleCampo>
          <PagoDeducibleValor>{autorizacion}</PagoDeducibleValor>
        </>
      )}
    </EnvolvedorPagoDeducible>
  );
};

PagoDeducible.defaultProps = {
  datosPagoDeducible: [],
  datosPagoDeduciblePagado: [],
  urlPagoMit: "",
};

PagoDeducible.propTypes = {
  datosPagoDeducible: PropTypes.arrayOf(PropTypes.string),
  datosPagoDeduciblePagado: PropTypes.arrayOf(PropTypes.string),
  urlPagoMit: PropTypes.string,
};

export default PagoDeducible;
