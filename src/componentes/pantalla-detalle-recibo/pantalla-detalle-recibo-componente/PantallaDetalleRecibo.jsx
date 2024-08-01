/* eslint-disable */
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  TituloMisPolizas,
  MensajePequeno,
  Contenedor,
  InformacionRecibo,
  TituloRecibo,
  ContenedorIcono,
  Costo,
  Informacion,
  Descripcion,
  Valor,
  ContenedorBoton,
  EstatusRecibo,
} from "./PantallaDetalleRecibo.styled";
import EncabezadoGrande from "../../encabezado-grande";
import Constantes from "../../../recursos/constantes";
import IndicadorCarga from "../../indicador-carga";
import Boton from "../../boton";
import { ReactComponent as IconoAutoVerde } from "../../../recursos/iconos/ico_info_vehiculo_green.svg";
import { ReactComponent as IconoDanoVerde } from "../../../recursos/iconos/ico_casa_verde.svg";
import BarraAlerta from "../../barra-alerta";
import useAccionesLog from "../../../utils/useAccionesLog";

const diccionario = {
  titulo: "Información de tu recibo de pago",
  mensajeDeErrorDefault: "Ocurrió un error.",
  poliza: "Póliza",
  recibo: "Recibo",
  marca: "Marca",
  numSerie: "Número de serie",
  vigencia: "Vigencia",
  medioPago: "Continuar",
  llamar: "Llamar a HDI *434",
  descargarFactura: "Descargar factura/complemento",
  endoso: "Endoso",
};

const OBTENER_FACTURA_FORMATO = loader(
  "../../../graphQL/query/cobranza/facturacion_impresionFacturaFormatoPago.graphql"
);

const PantallaInformacionPagos = () => {
  const location = useLocation();
  const { telPago } = Constantes;
  const history = useHistory();
  const estadoApp = useSelector(state => state);
  const dispatch = useDispatch();
  const { runDownloadLog } = useAccionesLog((estadoApp.informacionContacto) ? estadoApp.informacionContacto.telefono : "");
  const [cargando, asignarValorCargando] = useState(false);
  const [facturaFormato, asignarValorFacturaFormato] = useState([]);
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [mensajeAlerta, asignarValorMensajeAlerta] = useState(
    diccionario.mensajeDeErrorDefault
  );

  const {
    poliza,
    tipo,
    recibo,
    polizaGeneral,
    modo,
    tipoRecibo,
  } = location.state;

  const [obtenerFactura, { data, loading, error }] = useLazyQuery(
    OBTENER_FACTURA_FORMATO
  );

  /*
  console.group("PANTALLA DETALLE RECIBO");
  console.groupCollapsed("Poliza");
  console.table(poliza);
  console.groupEnd();

  console.groupCollapsed("Poliza General");
  console.table(polizaGeneral);
  console.groupEnd();

  console.groupCollapsed("Recibo");
  console.table(recibo);
  console.groupEnd();

  console.groupEnd();
  */

  const DATOS = {
    AUTR: {
      obtenerIcono: () => (
        <IconoAutoVerde
          className={
            recibo.estatus.toUpperCase() === "PAGADO" ? "disable" : "icono"
          }
        />
      ),
      titulo: () => "Auto",
      obtenerInformacion: () => (
        <>
          <Informacion>
            <Descripcion>{diccionario.marca}</Descripcion>
            <Valor>{`${poliza?.vehiculo?.marca} ${poliza?.vehiculo?.version} ${poliza?.vehiculo?.modelo}`}</Valor>
          </Informacion>
          <Informacion>
            <Descripcion>{diccionario.numSerie}</Descripcion>
            <Valor>{`${polizaGeneral?.numSerie}`}</Valor>
          </Informacion>
        </>
      ),
    },
    DAN: {
      obtenerIcono: () => (
        <IconoDanoVerde
          className={
            recibo.estatus.toUpperCase() === "PAGADO" ? "disable" : "icono"
          }
        />
      ),
      titulo: () => "Daños",
      obtenerInformacion: () => {
        <></>;
      },
    },
  };

  const formatoFecha = (fecha) => {
    const f = new Date(fecha);
    return `${f.getDate()}/${parseInt(f.getMonth()) + 1}/${f.getFullYear()} ${
      fecha.split("T")[1]
    } hrs.`;
  };

  const consultarFormasDePago = () => {
    dispatch({
      type: "AGREGAR",
      valor: [recibo],
      indice: "recibosPorPagar",
    });
    history.push({
      pathname: "/formas-pago",
      state: { poliza, polizaGeneral, totalPorPagar: recibo.primaNeta },
    });
  };

  const pagarPorTelefono = () => {
    window.location.href = `tel:${telPago}`;
  };

  const descargarFactura = () => {
    asignarValorCargando(true);
    if (facturaFormato.pdf) {
      const listaDetalle = [
        { "columna": "LineaNegocio", "valor": tipo}
      ]
      runDownloadLog(5, listaDetalle);
      iniciarDescargaPDF(
        facturaFormato.pdf,
        facturaFormato.nombreArchivo,
        "pdf"
      ).then((res) => {
        if (res === 200) {
          iniciarDescargaXML(
            facturaFormato.xml,
            facturaFormato.nombreArchivo,
            "xml"
          ).then((res) => {
            if (res === 200) {
              asignarValorCargando(false);
            }
          });
        }
      });
    } else {
      const listaDetalle = [
        { "columna": "LineaNegocio", "valor": tipo}
      ]
      runDownloadLog(5, listaDetalle);
      obtenerFactura({
        variables: { numeroRecibo: recibo.folio },
        fetchPolicy: "no-cache",
      });
    }
  };

  useEffect(() => {
    if (!loading && data && data.facturacion_impresionFacturaFormatoPago) {
      if (data.facturacion_impresionFacturaFormatoPago.dato) {
        asignarValorFacturaFormato(
          data.facturacion_impresionFacturaFormatoPago.dato[0]
        );
        let respuesta = data.facturacion_impresionFacturaFormatoPago.dato[0];
        const listaDetalle = [
          { "columna": "LineaNegocio", "valor": tipo}
        ]
        runDownloadLog(5, listaDetalle);
        iniciarDescargaPDF(respuesta.pdf, respuesta.nombreArchivo, "pdf").then(
          (res) => {
            if (res === 200) {
              iniciarDescargaXML(
                respuesta.xml,
                respuesta.nombreArchivo,
                "xml"
              ).then((res) => {
                if (res === 200) {
                  asignarValorCargando(false);
                }
              });
            }
          }
        );
      } else {
        //No hay dato
        asignarValorCargando(false);
        asignarValorMensajeAlerta(
          data.facturacion_impresionFacturaFormatoPago.mensaje
        );
        asignarValorMostrarBarraAlerta(true);
      }
    } else if (loading) {
      asignarValorCargando(true);
    }
  }, [data, loading]);

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

  const iniciarDescargaXML = (base64, nombre, tipo) => {
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
      {cargando && <IndicadorCarga />}
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

          <InformacionRecibo estatus={recibo.estatus.toUpperCase()}>
            <ContenedorIcono>{DATOS[tipo].obtenerIcono()}</ContenedorIcono>
            <TituloRecibo>{DATOS[tipo].titulo()}</TituloRecibo>
            <Costo>{`$ ${recibo.primaNeta.replace("$", "")}`}</Costo>

            <Informacion>
              <Descripcion>{diccionario.poliza}</Descripcion>
              <Valor>{polizaGeneral.polizaFormato}</Valor>
            </Informacion>

            <Informacion>
              <Descripcion>{diccionario.recibo}</Descripcion>
              <Valor>{`${recibo.numeroRecibo}`}</Valor>
            </Informacion>

            {tipoRecibo === "Endoso" ? (
              <Informacion>
                <Descripcion>{diccionario.endoso}</Descripcion>
                <Valor>{`${recibo.noEndoso}`}</Valor>
              </Informacion>
            ) : (
              DATOS[tipo].obtenerInformacion()
            )}

            <Informacion>
              <Descripcion>{diccionario.vigencia}</Descripcion>
              <Valor>{`${formatoFecha(recibo.vigenciaInicio)} al ${formatoFecha(
                recibo.vigenciaFin
              )}`}</Valor>
            </Informacion>

            {/* recibo.estatus.toUpperCase() !== "PAGADO" &&
              recibo.estatus.toUpperCase() !== "PAGAR" && (
                <EstatusRecibo colorEstatus={recibo.colorEstatus.toUpperCase()}>
                  {recibo.estatus}
                </EstatusRecibo>
              ) */}
            <EstatusRecibo colorEstatus={recibo.colorEstatus.toUpperCase()}>
              {recibo.estatus}
            </EstatusRecibo>
          </InformacionRecibo>
        </Contenedor>

        {modo === "pago" ? (
          <ContenedorBoton>
            {recibo.estatus.toUpperCase() === "CANCELADA" ||
            recibo.estatus.toUpperCase() === "CANCELADO" ? (
              <Boton
                etiqueta={diccionario.llamar}
                tema="simple"
                enClick={pagarPorTelefono}
              />
            ) : (
              <Boton
                etiqueta={diccionario.medioPago}
                tema="estandar"
                deshabilitado={
                  recibo.estatus.toUpperCase() === "PAGADO" ||
                  recibo.estatus.toUpperCase() === "CANCELADA" ||
                  recibo.estatus.toUpperCase() === "CANCELADO"
                }
                enClick={consultarFormasDePago}
              />
            )}
          </ContenedorBoton>
        ) : (
          <ContenedorBoton>
            <Boton
              etiqueta={diccionario.descargarFactura}
              tema={
                recibo.estatus.toUpperCase() === "PAGADA" ||
                recibo.estatus.toUpperCase() === "PAGADO"
                  ? "estandar"
                  : "deshabilitado"
              }
              enClick={
                recibo.estatus.toUpperCase() === "PAGADA" ||
                recibo.estatus.toUpperCase() === "PAGADO"
                  ? descargarFactura
                  : () => {}
              }
            />
          </ContenedorBoton>
        )}
      </PantallaFondoBlanco>
    </EnvolvedorPantallaPolizas>
  );
};

export default PantallaInformacionPagos;
