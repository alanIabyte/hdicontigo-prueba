/* eslint-disable */
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
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
  IconosFormaPago,
  Logo,
  PieDePagina,
  ContenedorBoton,
} from "./PantallaRecibosFormaPago.styled";
import EncabezadoGrande from "../../encabezado-grande";
import IndicadorCarga from "../../indicador-carga";
import ReciboPago from "../../recibo-pago/recibo-pago-componente/ReciboPago";

const diccionario = {
  BANCOS: {
    titulo: "Bancos / Cajeros automáticos",
    descripcionPantalla:
      "La modalidad de este pago es individual, realiza el pago de cada endoso",
  },
  TIENDAS: {
    titulo: "Tiendas de autoservicio",
    descripcionPantalla:
      "La modalidad de este pago es individual, realiza el pago de cada endoso",
  },
};

const OBTENER_REFERENCIA = loader(
  "../../../graphQL/query/cobranza/cobranza_referenciasDePago.graphql"
);

const PantallaRecibosFormaPago = () => {
  const history = useHistory();
  const location = useLocation();
  let poliza;
  let polizaGeneral;
  let formaPago = "BANCOS";

  const [obtenerReferencias, { loading, error, data }] = useLazyQuery(
    OBTENER_REFERENCIA,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const [cargando, asignarValorCargando] = useState(false);
  const [referencia, asignarValorReferencia] = useState(
    data?.cobranza_referenciasDePago?.dato || []
  );

  if (location.state.poliza) {
    poliza = location.state.poliza;
    polizaGeneral = location.state.polizaGeneral;
    formaPago = location.state.formaPago;
  } else {
    history.push("/mis-polizas");
  }

  const pagarBancosCajeros = () => {
    if (reciboSeleccionado) {
      history.push({
        pathname: "/pago-otra-bancos",
        state: { referencias: referencia },
      });
    } else {
      alert("selecciona un recibo");
      // TODO: LLevar a pantalla RecibosBancosCajeros
    }
  };

  const pagarAutoservicio = () => {
    if (reciboSeleccionado) {
      history.push({
        pathname: "/pago-otra-tiendas",
        state: { referencias: referencia },
      });
    } else {
      alert("selecciona un recibo");
      // TODO: LLevar a pantalla RecibosTiendas
    }
  };

  const descargarFormatoPago = () => {
    console.log("DESCARGAR FORMATO");
  };

  const consultarRecibo = (recibo) => {
    obtenerReferencias({
      variables: {
        agencia: polizaGeneral.oficina,
        cis: parseInt(polizaGeneral.inciso),
        lineaNegocio: polizaGeneral.lineaNegocio,
        poliza: polizaGeneral.poliza,
        serieRecibo: recibo?.serie || 1,
      },
    });
  };

  const irAReferencia = (respuestaReferencias) => {
    if (formaPago === "TIENDAS") {
      history.push({
        pathname: "/pago-otra-tiendas",
        state: { referencias: respuestaReferencias },
      });
    } else {
      history.push({
        pathname: "/pago-otra-bancos",
        state: { referencias: respuestaReferencias },
      });
    }
  };

  useEffect(() => {
    if (!loading) {
      asignarValorCargando(false);
      if (data && data.cobranza_referenciasDePago) {
        asignarValorReferencia(data.cobranza_referenciasDePago.dato);
        irAReferencia(data.cobranza_referenciasDePago.dato);
      } else {
        /*
        console.log("ERROR");
        console.log(error);
        console.log(data);
        */
      }
    } else {
      asignarValorCargando(true);
    }
  }, [loading, data]);

  return (
    <EnvolvedorPantallaPolizas key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <EncabezadoGrande mostrarBack />
      <PantallaFondoBlanco>
        <Contenedor>
          <TituloMisPolizas id="titulo">
            {diccionario[formaPago].titulo}
          </TituloMisPolizas>
          <MensajePequeno id="mensajePequeno">
            {diccionario[formaPago].descripcionPantalla}
          </MensajePequeno>

          <ContenedorFormasPago>
            {poliza?.recibos?.map((recibo) => (
              <ReciboPago
                recibo={recibo}
                tipo={polizaGeneral?.lineaNegocio}
                poliza={poliza}
                polizaGeneral={polizaGeneral}
                key={recibo.folio}
                evento={consultarRecibo}
              />
            ))}
          </ContenedorFormasPago>
        </Contenedor>
      </PantallaFondoBlanco>
    </EnvolvedorPantallaPolizas>
  );
};

export default PantallaRecibosFormaPago;

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
