/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import useRedirect from "../../../utils/useRedirect";
import {
  EnvolvedorPoliza,
  BotonEliminarPoliza,
  EnvolvedorIdentificacion,
  EnvolvedorFotografia,
  FotografiaPoliza,
  EnvolvedorDatosIdentificacion,
  NombrePoliza,
  NumeroPoliza,
  TextoClaro,
  EstatusPoliza,
  EnvolvedorEstado,
  PiePoliza,
  BotonVerDetalle,
  BotonReportarSiniestro,
  DiasGracia,
  BotonSolicitarReembolso,
} from "./Poliza.styled";
import ImagenAutoDummy from "../../../recursos/iconos/hdi-c/mis-poliza/autos.png";
import ImagenDanoDummy from "../../../recursos/iconos/hdi-c/mis-poliza/danos.png";
import MaletinDummy from "../../../recursos/iconos/hdi-c/mis-poliza/gmm.png";
import { ReactComponent as IconoVer } from "../../../recursos/iconos/ico_ojo.svg";
import constantes from "../../../recursos/constantes";
import showConfig from "../../../utils/configs";

const diccionario = {
  poliza: "Póliza: ",
  vigencia: "Póliza vigente hasta: ",
  etiquetaReportar: "Reportar siniestro",
  etiquetaVerDetalle: "Ver detalle",
  consultarReembolso: "Solicitar/consultar reembolso",
  mensajes: {
    pendiente: "Te invitamos a ponerte al corriente",
    activa: "Tienes hasta el",
  },
};

const nombreCookie = constantes.nombreDeCookie;

const Poliza = (props) => {
  const {
    tipo,
    nombrePoliza,
    numeroPoliza,
    vigencia,
    estatus,
    enClickEnFoto,
    datos,
    desactivar,
    listaDiasGracia,
    aplicaReembolso,
  } = props;

  const history = useHistory();
  const [cookie] = useCookies([nombreCookie]);
  const dispatch = useDispatch();
  const { redirect: redirectInfoPagos } = useRedirect("/informacion-pagos");
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }

  const { redirect } = useRedirect("/elegir-siniestro");
  const [diasDeGracia, asignarValorDiasDeGracia] = useState("");
  // const formatoDeFechas = (fecha) => moment(fecha).format("DD-MM-yyyy");
  const formatoDeFechas = (fecha) =>
    moment(fecha, "DD/MM/YYYY HH:mm:ss").format("DD-MM-yyyy");
  // eslint-disable-next-line no-unused-vars
  const verDetallePoliza = () => {
    dispatch({
      type: "BORRAR",
      indice: "informacionPolizaDetalle",
    });

    dispatch({
      type: "AGREGAR",
      valor: { ...datos, diasDeGracia },
      indice: "informacionPolizaDetalle",
    });
    history.push("/detalle-poliza", {
      poliza: { ...datos, diasDeGracia },
      diasGracia: diasDeGracia,
    });
  };

  const reportarSiniestro = () => {
    // history.push({
    //   pathname: "/ingreso-poliza",
    //   search: `?numeroPoliza=${numeroPoliza}&vin=${datos.numSerie}`,
    //   state: {
    //     paginaAnterior: "/mis-polizas",
    //   },
    // });
    redirect({
      poliza: numeroPoliza,
      tipo: datos.lineaNegocio,
      numSerie: datos.numSerie,
    });
  };

  const solicitarReembolso = () => {
    console.log(props.datos);
    history.push({
      pathname: "/mis-reembolsos",
      state: {
        poliza: props.datos,
        paginaAnterior: "/mis-polizas",
      },
    });
  };

  const eliminarPoliza = () => {
    //  console.log("enviando..", tipo, numeroPoliza);
    desactivar(tipo, numeroPoliza);
  };

  useEffect(() => {
    const datoPoliza = listaDiasGracia?.find(
      (el) => el.poliza === datos.poliza
    );
    if (datoPoliza) {
      if (datoPoliza.notificacionDias.split(" ")[1] < 16) {
        asignarValorDiasDeGracia(datoPoliza.notificacionDias);
      }
    }
  }, []);

  const asignarIcono = () => {
    if (tipo === "AUTR") {
      return ImagenAutoDummy;
    }
    if (tipo === "GMM") {
      return MaletinDummy;
    }
    return ImagenDanoDummy;
  };

  const asignarEstadoPolizaGMM = (estado) => {
    if (estado === "Activo") {
      return "Activa";
    }
    return "Cancelada";
  };

  return (
    <EnvolvedorPoliza>
      {tipo !== "GMM" ? (
        <>
          <EnvolvedorIdentificacion>
            <BotonEliminarPoliza onClick={eliminarPoliza}>
              X
            </BotonEliminarPoliza>
            <EnvolvedorFotografia>
              <FotografiaPoliza
                src={asignarIcono()}
                onClick={() => enClickEnFoto()}
              />
            </EnvolvedorFotografia>
            <EnvolvedorDatosIdentificacion>
              <NombrePoliza>{nombrePoliza}</NombrePoliza>
              <NumeroPoliza>{`${diccionario.poliza} ${numeroPoliza}`}</NumeroPoliza>
            </EnvolvedorDatosIdentificacion>
          </EnvolvedorIdentificacion>

          <EnvolvedorEstado>
            <EstatusPoliza estatus={estatus}>{estatus}</EstatusPoliza>

            <TextoClaro>{`${diccionario.vigencia} ${vigencia}`}</TextoClaro>

            <TextoClaro completo>{datos.mensajePago}</TextoClaro>

            {diasDeGracia.length > 0 &&
            estatus.toUpperCase() !== "CANCELADA" ? (
              <DiasGracia completo>{diasDeGracia}</DiasGracia>
            ) : null}
          </EnvolvedorEstado>

          <PiePoliza>
            <BotonVerDetalle onClick={verDetallePoliza}>
              <IconoVer className="ico" width={22} />
              {diccionario.etiquetaVerDetalle}
            </BotonVerDetalle>

            {datos.lineaNegocio === "AUTR" &&
              datos.estatus === "Pendiente de pago" && (
                <BotonReportarSiniestro
                  reporte={false}
                  onClick={() => {
                    redirectInfoPagos({
                      poliza: datos,
                      tipo: datos.lineaNegocio,
                      modo: "Recibos",
                    });
                  }}
                  deshabilitado={false}
                >
                  {/* <IconoInfoPagos className="ico" width={22} style={{color: "white"}}/> */}
                  Pagar recibos
                </BotonReportarSiniestro>
              )}

            {tipo === "AUTR" &&
            estatus !== "Cancelada" &&
            estatus !== "Vencida" ? (
              <BotonReportarSiniestro onClick={reportarSiniestro} reporte>
                {diccionario.etiquetaReportar}
              </BotonReportarSiniestro>
            ) : null}
          </PiePoliza>
        </>
      ) : (
        <>
          <EnvolvedorIdentificacion>
            <BotonEliminarPoliza onClick={eliminarPoliza}>
              X
            </BotonEliminarPoliza>
            <EnvolvedorFotografia>
              <FotografiaPoliza
                src={asignarIcono()}
                onClick={() => enClickEnFoto()}
              />
            </EnvolvedorFotografia>
            <EnvolvedorDatosIdentificacion>
              <NombrePoliza>{nombrePoliza}</NombrePoliza>
              <NumeroPoliza>{numeroPoliza}</NumeroPoliza>
              <NumeroPoliza>Gastos Médicos Mayores</NumeroPoliza>
            </EnvolvedorDatosIdentificacion>
          </EnvolvedorIdentificacion>
          <EnvolvedorEstado>
            <EstatusPoliza estatus={estatus}>
              {asignarEstadoPolizaGMM(estatus)}
            </EstatusPoliza>

            <TextoClaro>{`${diccionario.vigencia} ${formatoDeFechas(
              vigencia
            )}`}</TextoClaro>

            <TextoClaro completo>{datos.mensajePago}</TextoClaro>

            {diasDeGracia.length > 0 ? (
              <DiasGracia completo>{diasDeGracia}</DiasGracia>
            ) : null}
          </EnvolvedorEstado>
          <PiePoliza>
            <BotonVerDetalle onClick={verDetallePoliza}>
              <IconoVer className="ico" width={22} />
              {diccionario.etiquetaVerDetalle}
            </BotonVerDetalle>

            {estatus === "Activo" &&
              aplicaReembolso &&
              showConfig.showBotonReembolsos && (
                <BotonSolicitarReembolso onClick={solicitarReembolso}>
                  {diccionario.consultarReembolso}
                </BotonSolicitarReembolso>
              )}
          </PiePoliza>
        </>
      )}
    </EnvolvedorPoliza>
  );
};

Poliza.defaultProps = {
  tipo: "AUTR",
  numeroPoliza: "XXX-XX-XXX",
  nombrePoliza: "CASA HABITACIÓN",
  vigencia: "DD/MM/YYY",
  estatus: "Activa",
  enClickEnFoto: () => {},
  datos: {},
  desactivar: () => {},
  listaDiasGracia: {},
  aplicaReembolso: false,
};

Poliza.propTypes = {
  tipo: PropTypes.string,
  enClickEnFoto: PropTypes.func,
  numeroPoliza: PropTypes.string,
  nombrePoliza: PropTypes.string,
  vigencia: PropTypes.string,
  estatus: PropTypes.string,
  datos: PropTypes.oneOfType({}),
  desactivar: PropTypes.func,
  listaDiasGracia: PropTypes.oneOfType({}),
  aplicaReembolso: PropTypes.bool,
};

export default Poliza;
