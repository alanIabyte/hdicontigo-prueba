/* eslint-disable */
import React, { Fragment, useState, useEffect } from "react";
import { v4 } from "uuid";
import AcordeonPantallaPoliza from "../../acordeon-detalle-poliza";
import {
  Propiedad,
  Valor,
  GrupoDetalle,
  CirculoEstatusPoliza,
  ValoresColorAlterno,
  ColorAlterno,
  BotonSolicitarReembolso
} from "./PantallaDetallePoliza.styled";
import moment from "moment";
import { darFormatoFecha } from "../../../helpers";
import useRedirect from "../../../utils/useRedirect";
import { ReactComponent as IconoVer } from "../../../recursos/iconos/ico_ojo.svg";
import { useDispatch } from "react-redux";
import Boton from "../../boton/boton-componente/Boton";
import { useHistory, useLocation, Link } from "react-router-dom";
import "./estilos.scss";
import Alert from "@mui/material/Alert";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import {
  BarraAlertaIcono,
  BarraAlertaContenedor,
  Hipervinculo,
  BarraAlertaCierre
} from "./alerta-gmm/AlertaGmm.styled.jsx";
import { Espacio } from "./alerta-gmm/AlertaGmm.styled.jsx";

const credencialDict = {
  mensajeCredencial: "Ya puedes descargar tu credencial digital. ",
  mensajeDeErrorDefault:
    "Por el momento no está disponible tu credencial digital."
};

const DetallePolizaGMM = ({
  _detalle,
  poliza,
  diccionario,
  asignarPaquetePolizaGMM,
  mantenerCoberturasAbierto,
  mostrarModal,
  asignarMantenerCoberturasAbierto,
  dataCredencial
}) => {
  const [detalle, setDetalle] = useState({});
  const [beneficiosAbiertos, establecerBeneficiosAbiertos] = useState(false);
  // const [showSection, setShowSection] = useState(false);
  const { redirect: redirectReembolsos } = useRedirect("/mis-reembolsos");
  const dispatch = useDispatch();
  const history = useHistory();
  // const [cDigital, setCDigital] = useState(false);
  const [alertaCredencial, asignarValorBarraAlertaCredencial] = useState(false);
  const [alertaBotonCredencial, asignarAlertaBotonCredencial] = useState(false);
  const location = useLocation();
  const { showContainer } = location.state;
  const validarShow = (seccion) => seccion === showContainer;

  useEffect(() => {
    if (_detalle.poliza) {
      setDetalle(_detalle);
    }
    console.log("Detalle: ", _detalle);
  }, [_detalle]);

  const reedirigir = (seccion) => {
    redirectReembolsos({
      seccion,
      polizaReembolso: detalle,
      paginaAnterior: "/detalle-poliza"
    });
  };

  // ! CREDENCIAL DIGITAL
  useEffect(() => {
    console.log("Valor del error credencial: ", dataCredencial);
    if (dataCredencial?.gmm_ObtCredencialDigital.dato) {
      // console.log("Que ondas", dataCredencial.dato);
      if (
        Object.keys(dataCredencial?.gmm_ObtCredencialDigital.dato).length > 0
      ) {
        console.log("La dataCredencial tiene información.");
        if (
          dataCredencial.gmm_ObtCredencialDigital.dato.code === 200
          // && dataCredencial.gmm_ObtCredencialDigital.dato.status === true
        ) {
          asignarValorBarraAlertaCredencial(true);
          asignarAlertaBotonCredencial(true);
        } else {
          console.log(
            "La dataCredencial no es 200, por lo tanto no la mostramos."
          );
          asignarValorBarraAlertaCredencial(false);
          asignarAlertaBotonCredencial(false);
        }
      } else {
        console.log("El servicio funciona, pero no tiene información.");
        asignarValorBarraAlertaCredencial(false);
        asignarAlertaBotonCredencial(false);
      }
    } else {
      console.log("La dataCredencial no trae datos.");
      asignarValorBarraAlertaCredencial(false);
      asignarAlertaBotonCredencial(false);
    }
  }, [dataCredencial]);

  const credencialDigital = () => {
    // console.log(poliza);
    console.log(_detalle);

    history.push("/credencial-gmm", {
      poliza: poliza,
      detalle: _detalle,
      base64: dataCredencial?.gmm_ObtCredencialDigital.dato
    });
  };

  const mostrarModalyCoberturas = (idSeccion) => {
    asignarMantenerCoberturasAbierto(true);
    dispatch({
      type: "AGREGAR",
      valor: true,
      indice: "mantenerCoberturasAbierto"
    });
    mostrarModal(idSeccion);
  };

  const reedirigirBotonPrueba = (plan) => {
    if (plan === "HDIV") {
      history.push("/hospitales-consultorios", { boton: "HDIV" });
      return;
    }
    // MTP
    history.push("/hospitales-consultorios", { boton: "HDIP" });
  };

  const eliminarCeros = (poliza) => poliza.slice(4, 10);
  const asignarEstatus = (estatus) =>
    estatus === "EN VIGOR" ? "Activa" : "Cancelada";
  const eliminarSlash = (nombre) => nombre.split("/").join(" ");

  useEffect(() => {
    dispatch({
      type: "AGREGAR",
      valor: false,
      indice: "mantenerCoberturasAbierto"
    });
  }, []);

  return (
    <Fragment key={poliza.poliza}>
      {beneficiosAbiertos ? (
        <ModalSeccionCobertura
          seccion={idSeccionState}
          coberturas={detalle.coberturas}
          cerrar={() => asignarMantenerCoberturasAbierto(false)}
          lineaNegocio={poliza.lineaNegocio}
        />
      ) : null}
      {detalle.poliza ? (
        <>
          {/*
        INFORMACIÓN GENERAL
      */}
          {alertaCredencial && (
            <Alert
              key={v4()}
              severity="info"
              icon={false}
              style={{
                padding: "12px 0px",
                maxWidth: "var(--ancho-maximo-movil)",
                overflow: "hidden",
                overflow: "auto",
                backgroundColor: "#00A3A8",
                position: "absolute",
                top: "80px",
                zIndex: "3",
                color: "var(--texto-blanco)",
                width: "100%",
                marginLeft: "-24px",
                fontFamily: "var(--fuente-proxima-regular)"
              }}
            >
              <BarraAlertaContenedor>
                <BarraAlertaIcono>
                  <InfoRoundedIcon />
                </BarraAlertaIcono>
                <span>
                  {credencialDict.mensajeCredencial}
                  <Link
                    style={{
                      color: "#ffff",
                      backgroundColor: "transparent",
                      textDecoration: "underline"
                    }}
                    to={{
                      pathname: "/credencial-gmm",
                      state: {
                        poliza: poliza,
                        detalle: _detalle,
                        base64: dataCredencial?.gmm_ObtCredencialDigital.dato
                      }
                    }}
                  >
                    Haz click aquí para verla.
                  </Link>
                </span>
                <BarraAlertaCierre
                  type="submit"
                  onClick={() => {
                    asignarValorBarraAlertaCredencial(false);
                  }}
                >
                  <CloseRoundedIcon />
                </BarraAlertaCierre>
              </BarraAlertaContenedor>
            </Alert>
          )}

          <AcordeonPantallaPoliza
            key={v4()}
            titulo={diccionario.acordeones.informacion}
            mantenerAbierto={validarShow("informacionPoliza")}
          >
            <GrupoDetalle>
              <Propiedad>
                {diccionario.acordeonInformacion.numeroPoliza}
              </Propiedad>
              <Valor>{detalle.poliza.numeroPoliza}</Valor>
            </GrupoDetalle>

            <GrupoDetalle>
              <Propiedad>
                {diccionario.acordeonInformacion.vigenciaPoliza}
              </Propiedad>
              <Valor>
                Inicio: {darFormatoFecha(detalle.poliza.fechaInicioVigencia)}
              </Valor>
              <Valor>
                Fin: {darFormatoFecha(detalle.poliza.fechaFinVigencia)}
              </Valor>
            </GrupoDetalle>

            <GrupoDetalle>
              <Propiedad>{diccionario.acordeonInformacion.agente}</Propiedad>
              <Valor>{detalle.poliza.agentes[0].nombre}</Valor>
            </GrupoDetalle>

            <GrupoDetalle>
              <Propiedad>
                {diccionario.acordeonInformacion.estatusPoliza}
              </Propiedad>
              <Valor>
                <CirculoEstatusPoliza
                  estatus={asignarEstatus(detalle.poliza.estatus)}
                />
                {asignarEstatus(detalle.poliza.estatus)}
              </Valor>
            </GrupoDetalle>
          </AcordeonPantallaPoliza>

          {/*
        ASEGURADOS
      */}
          <AcordeonPantallaPoliza
            key={v4()}
            titulo={diccionario.acordeones.asegurados}
            show={true}
            mantenerAbierto={validarShow("asegurados")}
          >
            <ValoresColorAlterno>
              {detalle.asegurados.length > 0 &&
                detalle.asegurados.slice(0, 4).map((persona, index) => (
                  <ColorAlterno key={v4()}>
                    <GrupoDetalle>
                      <Propiedad>
                        {persona.tipoRelacion}
                      </Propiedad>
                      <Valor>{eliminarSlash(persona.nombre)}</Valor>
                    </GrupoDetalle>
                  </ColorAlterno>
                ))}
            </ValoresColorAlterno>
            <Espacio tamano="10px" />
            {alertaBotonCredencial && (
              <Boton
                etiqueta={diccionario.acordeones.credencial}
                tema="estandar"
                pequeno
                enClick={() => credencialDigital()}
              />
            )}
          </AcordeonPantallaPoliza>

          {/*
        PLAN
      */}
          <AcordeonPantallaPoliza
            titulo={diccionario.acordeones.plan}
            key={v4()}
            mantenerAbierto={validarShow("plan")}
          >
            <GrupoDetalle>
              <Propiedad>Plan del seguro</Propiedad>
              <Valor>{asignarPaquetePolizaGMM(detalle.poliza.paquete)}</Valor>
            </GrupoDetalle>
          </AcordeonPantallaPoliza>

          {/*
        COBERTURAS
      */}
          <AcordeonPantallaPoliza
            key={v4()}
            titulo={diccionario.acordeones.coberturas}
            onClick={() =>
              asignarMantenerCoberturasAbierto(!mantenerCoberturasAbierto)
            }
            mantenerAbierto={mantenerCoberturasAbierto}
            show={true}
          >
            <ValoresColorAlterno>
              {detalle.seccionesCoberturas.map((cobertura) => (
                <ColorAlterno>
                  {cobertura.seccion}
                  <IconoVer
                    onClick={() => mostrarModalyCoberturas(cobertura.idSeccion)}
                    style={{ cursor: "pointer" }}
                  />
                </ColorAlterno>
              ))}
            </ValoresColorAlterno>
          </AcordeonPantallaPoliza>

          {/*
        REEMBOLSOS
      */}

          {detalle.poliza.paquete !== "HDIV" && (
            <AcordeonPantallaPoliza
              key={v4()}
              titulo={diccionario.acordeones.reembolso}
            >
              <GrupoDetalle>
                <Valor>Consultar reembolsos</Valor>
                <Propiedad>
                  Conoce el estatus de tus reembolsos generados{" "}
                  <span
                    onClick={() => reedirigir("consultar")}
                    className="link"
                  >
                    aquí
                  </span>
                </Propiedad>
              </GrupoDetalle>

              <GrupoDetalle style={{ marginTop: "30px" }}>
                <Valor>Solicitar un reembolso</Valor>
                <Propiedad>
                  Solicitar un reembolso. Hazlo{" "}
                  <span
                    className="link"
                    onClick={() => reedirigir("solicitar")}
                  >
                    aquí
                  </span>
                </Propiedad>
              </GrupoDetalle>
            </AcordeonPantallaPoliza>
          )}

          {/* Medica red vital */}
          {detalle.poliza.paquete === "HDIV" ? (
            <Boton
              tema="estandar"
              etiqueta="Ver hospitales y consultorios"
              enClick={() => reedirigirBotonPrueba("HDIV")}
            />
          ) : (
            <Boton
              tema="estandar"
              etiqueta="Atención al cliente"
              enClick={() => reedirigirBotonPrueba("HDIP")}
            />
          )}
        </>
      ) : null}
    </Fragment>
  );
};

export default DetallePolizaGMM;
