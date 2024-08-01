/* eslint-disable */
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { useSelector } from "react-redux";
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
} from "./PantallaPagoOtra.styled";
import Boton from "../../boton";
import EncabezadoGrande from "../../encabezado-grande";
import BarraAlerta from "../../barra-alerta";
import IndicadorCarga from "../../indicador-carga";
import Constantes from "../../../recursos/constantes";
import IconoBancos from "../../../recursos/iconos/hdi-c/pagar-recibos/bancosCajeros.svg";
import IconoTiendas from "../../../recursos/iconos/hdi-c/pagar-recibos/tiendas.svg";
import LogoBBVA from "../../../recursos/imagenes/logo_bbva.png";
import LogoHSBC from "../../../recursos/imagenes/logo_hsbc.png";
import LogoOxxo from "../../../recursos/imagenes/logo_oxxo.png";
import LogoBara from "../../../recursos/imagenes/logo_bara.png";
import LogoSantander from "../../../recursos/imagenes/logo_santander.png";
import { diccionario, configAlertaError } from "./config";
import { Alerta } from "../../alerta";
import useRedirect from "../../../utils/useRedirect";
import useAlerta from "../../../utils/useAlerta";
import useAccionesLog from "../../../utils/useAccionesLog";

const OBTENER_REFERENCIA = loader(
  "../../../graphQL/query/cobranza/cobranza_referenciasDePago.graphql"
);

const OBTENER_FACTURA_FORMATO = loader(
  "../../../graphQL/query/cobranza/facturacion_impresionFacturaFormatoPago.graphql"
);

const PantallaPagoOtra = () => {
  const history = useHistory();
  const { telContactanos } = Constantes;
  const location = useLocation();
  const { goBack } = useRedirect();
  const estadoApp = useSelector((estado) => estado);
  const { runEnterLog, runNoConcludeTransactionLog, runDownloadLog } = useAccionesLog((estadoApp.informacionContacto) ? estadoApp.informacionContacto.telefono : "");
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const alertaError = useAlerta(configAlertaError);
  const [mensajeAlerta, asignarValorMensajeAlerta] = useState(
    diccionario.mensajeDeErrorDefault
  );

  let poliza;
  let polizaGeneral;
  let reciboSeleccionado;

  if (location.state.poliza) {
    poliza = location.state.poliza;
    polizaGeneral = location.state.polizaGeneral;
    reciboSeleccionado = estadoApp?.recibosPorPagar[0];
    console.groupCollapsed("PANTALLA PAGO OTRA");
    console.groupCollapsed("Poliza");
    console.table(poliza);
    console.groupEnd();

    console.groupCollapsed("Poliza General");
    console.table(polizaGeneral);
    console.groupEnd();

    console.groupCollapsed("Recibo Seleccionado");
    console.table(reciboSeleccionado);
    console.groupEnd();

    console.groupEnd();
  } else {
    history.push("/mis-polizas");
  }

  const { data, loading, error } = useQuery(OBTENER_REFERENCIA, {
    variables: {
      agencia: polizaGeneral.oficina,
      cis: parseInt(polizaGeneral.inciso),
      lineaNegocio: polizaGeneral.lineaNegocio,
      poliza: polizaGeneral.poliza,
      serieRecibo: reciboSeleccionado?.serie,
    },
    fetchPolicy: "no-cache",
  });

  const [
    obtenerFactura,
    { data: dataFactura, loading: loadingFactura, error: errorFactura },
  ] = useLazyQuery(OBTENER_FACTURA_FORMATO);

  const [cargando, asignarValorCargando] = useState(false);
  const [facturaFormato, asignarValorFacturaFormato] = useState([]);
  const [referencia, asignarValorReferencia] = useState(
    data?.cobranza_referenciasDePago?.dato || []
  );

  useEffect(() => {
    runEnterLog(6)
  }, []);

  useEffect(() => {
    if (!loading) {
      asignarValorCargando(false);
      if (data && data.cobranza_referenciasDePago) {
        asignarValorReferencia(data.cobranza_referenciasDePago.dato);
        console.groupCollapsed("REFERENCIAS");
        console.table(data.cobranza_referenciasDePago.dato);
        console.groupEnd();
      } else {
        alertaError.mostrar();
      }
    } else {
      asignarValorCargando(true);
    }

    if (!loading && error) {
      asignarValorCargando(false);
      alertaError.mostrar();
      const listaDetalle = [
        {"columna": "causa", "valor": "referencia de pago no generada"}
      ]
      runNoConcludeTransactionLog(3, listaDetalle);
    }
  }, [loading, data, error]);

  const pagarBancosCajeros = () => {
    if (reciboSeleccionado) {
      history.push({
        pathname: "/pago-otra-bancos",
        state: { referencias: referencia },
      });
    } else {
      // TODO: LLevar a pantalla RecibosBancosCajeros
      history.push({
        pathname: "/recibos-forma-pago",
        state: { poliza, polizaGeneral, formaPago: "BANCOS" },
      });
    }
  };

  const pagarAutoservicio = () => {
    if (reciboSeleccionado) {
      history.push({
        pathname: "/pago-otra-tiendas",
        state: { referencias: referencia },
      });
    } else {
      // TODO: LLevar a pantalla RecibosTiendas
      history.push({
        pathname: "/recibos-forma-pago",
        state: { poliza, polizaGeneral, formaPago: "TIENDAS" },
      });
    }
  };

  useEffect(() => {
    if (
      !loadingFactura &&
      dataFactura &&
      dataFactura.facturacion_impresionFacturaFormatoPago
    ) {
      if (dataFactura.facturacion_impresionFacturaFormatoPago.dato) {
        asignarValorFacturaFormato(
          dataFactura.facturacion_impresionFacturaFormatoPago.dato[0]
        );
        let respuesta =
          dataFactura.facturacion_impresionFacturaFormatoPago.dato[0];
        iniciarDescargaPDF(respuesta.pdf, respuesta.nombreArchivo, "pdf").then(
          (res) => {
            if (res === 200) {
              asignarValorCargando(false);
              runDownloadLog(2);
            }
          }
        );
      } else {
        //No hay dato
        asignarValorCargando(false);
        runNoConcludeTransactionLog(2)
        asignarValorMensajeAlerta(
          dataFactura.facturacion_impresionFacturaFormatoPago.mensaje
        );
        asignarValorMostrarBarraAlerta(true);
      }
    } else if (loadingFactura) {
      asignarValorCargando(true);
    }
  }, [dataFactura, loadingFactura]);

  const descargarFormatoPago = () => {
    asignarValorCargando(true);
    const listaDetalle = [
      {"columna": "LineaNegocio", "valor": polizaGeneral.lineaNegocio}
    ]
    runDownloadLog(6, listaDetalle);
    if (facturaFormato.pdf) {
      iniciarDescargaPDF(
        facturaFormato.pdf,
        facturaFormato.nombreArchivo,
        "pdf"
      )
        .then((res) => {
          if (res === 200) {
            asignarValorCargando(false);
          } else {
            alertaError.mostrar();
          }
        })
        .catch((error) => {
          alertaError.mostrar();
        });
    } else {
      // const listaDetalle = [
      //   {"columna": "LineaNegocio", "valor": polizaGeneral.lineaNegocio}
      // ]
      // runDownloadLog(6, listaDetalle);
      obtenerFactura({
        variables: { numeroRecibo: reciboSeleccionado?.folio },
        fetchPolicy: "no-cache",
      });
    }
  };

  const iniciarDescargaPDF = (base64, nombre, tipo) => {
    return new Promise((resolve, reject) => {
      try {
        const linkSource = `data:application/${tipo};base64,${base64}`;
        const downloadLink = document.createElement("a");
        const fileName = nombre + `.${tipo}`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        resolve(200);
      } catch (error) {
        reject(500);
      }
    });
  };

  return (
    <EnvolvedorPantallaPolizas key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <Alerta
        {...alertaError}
        manejarCierre={() => {
          goBack();
        }}
        funcionLlamadaBoton={() => {
          goBack();
        }}
      />
      <EncabezadoGrande mostrarBack />
      <PantallaFondoBlanco>
        <BarraAlerta
          etiqueta={mensajeAlerta}
          mostrarAlerta={mostrarBarraAlerta}
          manejarCierre={() => {
            asignarValorMostrarBarraAlerta(false);
          }}
          estilo="error"
          posicionAbsoluta
        />
        <Contenedor>
          <TituloMisPolizas id="titulo">{diccionario.titulo}</TituloMisPolizas>
          <ContenedorFormasPago>
            <FormaPago onClick={pagarBancosCajeros}>
              <ContenedorIcono>
                {/* <IconoBancos className="icono" /> */}
                <img src={IconoBancos} alt="" />
              </ContenedorIcono>
              <NombreFormaPago>{diccionario.formas.bancos}</NombreFormaPago>
              <IconosFormaPago>
                <Logo src={LogoBBVA} />
                <Logo src={LogoHSBC} />
                <Logo src={LogoSantander} />
              </IconosFormaPago>
            </FormaPago>

            <FormaPago onClick={pagarAutoservicio} deshabilitada={false}>
              <ContenedorIcono>
                {/* <IconoTiendas className="icono" /> */}
                <img src={IconoTiendas} alt="" />
              </ContenedorIcono>
              <NombreFormaPago>{diccionario.formas.tiendas}</NombreFormaPago>
              <IconosFormaPago>
                <Logo src={LogoOxxo} medio />
                <Logo src={LogoBara} medio />
              </IconosFormaPago>
            </FormaPago>
          </ContenedorFormasPago>
        </Contenedor>
        <PieDePagina>
          <ContenedorBoton>
            <Boton
              etiqueta={diccionario.descargarFormato}
              tema="estandar"
              enClick={descargarFormatoPago}
            />
          </ContenedorBoton>
        </PieDePagina>
      </PantallaFondoBlanco>
    </EnvolvedorPantallaPolizas>
  );
};

export default PantallaPagoOtra;
