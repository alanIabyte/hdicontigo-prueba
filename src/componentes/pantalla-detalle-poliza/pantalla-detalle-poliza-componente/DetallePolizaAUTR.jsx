/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AcordeonPantallaPoliza from "../../acordeon-detalle-poliza";
import DetalleCuentaHabiente from "../detalle-cuentahabiente/DetalleCuentaHabiente";
import {
  Propiedad,
  Valor,
  GrupoDetalle,
  CirculoEstatusPoliza,
  ValoresColorAlterno,
  ColorAlterno,
  BotonPagar,
  NumeroPoliza,
  BotonDescargarPoliza,
  BotonDescargaPolizaIcono,
  TextoPoliza,
} from "./PantallaDetallePoliza.styled";
import Switch from "../../Switch";
//  Iconos
import { ReactComponent as IconoInfoPoliza } from "../../../recursos/iconos/hdi-c/detalle/autos/Info.svg";
import { ReactComponent as IconoInfoAuto } from "../../../recursos/iconos/hdi-c/detalle/autos/informacionVehiculo.svg";
import { ReactComponent as IconoPaquetes } from "../../../recursos/iconos/hdi-c/detalle/autos/paquetes.svg";
import { ReactComponent as IconoCoberturas } from "../../../recursos/iconos/hdi-c/detalle/autos/coberturas.svg";
import { ReactComponent as IconoCondiciones } from "../../../recursos/iconos/ico_condiciones_especiales.svg";
import { ReactComponent as IconoInfoPagos } from "../../../recursos/iconos/hdi-c/detalle/autos/infoPagos.svg";
import { ReactComponent as IconoDescargaPoliza } from "../../../recursos/iconos/hdi-c/detalle/autos/descargar.svg";
import { ReactComponent as IconoDescargaPolizaAzul } from "../../../recursos/iconos/ico_pdf_azul.svg";
import { obtenerLeyendaAdeudo, coberturasPorLineaNegocio } from "./utils";
import showConfig from "../../../utils/configs";
import { isCancelled } from "../../../utils/poliza";

const DetallePolizaAUTR = ({
  _detalle,
  poliza,
  diccionario,
  iniciarProcesoDomiciliacion,
  cuentaHabiente,
  handleEditarDatosCuentaHabiente,
  redirectInfoPagos,
  descargarPoliza,
  switchDomiciliacion,
  diasDeGracia,
}) => {
  const location = useLocation();
  const [detalle, setDetalle] = useState({});
  const estadoApp = useSelector((state) => state);
  const { showContainer } = location.state;
  const validarShow = (seccion) => seccion === showContainer;

  useEffect(() => {
    if (_detalle.vehiculo) {
      setDetalle(_detalle);
    }
  }, [_detalle]);

  const evaluateShow = () => {
    if (!detalle?.permiteRecYDom) {
      return false;
    }

    if (
      isCancelled(poliza.estatus) ||
      detalle?.totalRecibos?.noPagado === null
    ) {
      return false;
    }

    return true;
  };

  return (
    <Fragment key={poliza.poliza}>
      {detalle.vehiculo ? (
        <>
          {/*
      INFORMACIÓN GENERAL
    */}
          <AcordeonPantallaPoliza
            titulo={diccionario.acordeones.informacion}
            Icono={IconoInfoPoliza}
            show
            mantenerAbierto={validarShow("informacionPoliza")}
          >
            <GrupoDetalle>
              <Propiedad>
                {diccionario.acordeonInformacion.numeroPoliza}
              </Propiedad>
              <Valor>{poliza.polizaFormato}</Valor>
            </GrupoDetalle>

            <GrupoDetalle>
              <Propiedad>
                {diccionario.acordeonInformacion.vigenciaPoliza}
              </Propiedad>
              <Valor>Inicio {poliza.fechaInicio}</Valor>
              <Valor>Fin {poliza.fechaTermino}</Valor>
            </GrupoDetalle>

            <GrupoDetalle>
              <Propiedad>{diccionario.acordeonInformacion.agente}</Propiedad>
              <Valor>{detalle.nombreAgente}</Valor>
            </GrupoDetalle>

            <GrupoDetalle>
              <Propiedad>
                {diccionario.acordeonInformacion.estatusPoliza}
              </Propiedad>
              <Valor>
                <CirculoEstatusPoliza estatus={poliza.estatus} />
                {poliza.estatus}
              </Valor>
            </GrupoDetalle>
          </AcordeonPantallaPoliza>

          {/*
    DATOS DEL VEHÍCULO
*/}

          <AcordeonPantallaPoliza
            titulo={diccionario.acordeones.vehiculo}
            Icono={IconoInfoAuto}
            show
            mantenerAbierto={validarShow("datosVehiculo")}
          >
            <>
              <GrupoDetalle>
                <Propiedad>{diccionario.acordeonVehiculo.marca}</Propiedad>
                <Valor>{`${detalle.vehiculo.marca} ${detalle.vehiculo.version} ${detalle.vehiculo.modelo} `}</Valor>
              </GrupoDetalle>
              <GrupoDetalle>
                <Propiedad>
                  {diccionario.acordeonVehiculo.numeroSerie}
                </Propiedad>
                <Valor>{poliza.numSerie}</Valor>
              </GrupoDetalle>
              {detalle.vehiculo.color !== "No registrado" ? (
                <GrupoDetalle>
                  <Propiedad>{diccionario.acordeonVehiculo.color}</Propiedad>
                  <Valor>{detalle.vehiculo.color}</Valor>
                </GrupoDetalle>
              ) : null}
              {detalle.vehiculo.placas !== "No registrado" ? (
                <GrupoDetalle>
                  <Propiedad>{diccionario.acordeonVehiculo.placas}</Propiedad>
                  <Valor>{detalle.vehiculo.placas}</Valor>
                </GrupoDetalle>
              ) : null}
            </>
          </AcordeonPantallaPoliza>

          {/*
    PAQUETE
*/}
          <AcordeonPantallaPoliza
            titulo={diccionario.acordeones.paquete}
            Icono={IconoPaquetes}
            show
            mantenerAbierto={validarShow("paquete")}
          >
            <GrupoDetalle>
              <Propiedad>{diccionario.acordeonPaquete.paquete}</Propiedad>
              <Valor>{detalle.paquete}</Valor>
            </GrupoDetalle>
            <GrupoDetalle>
              {detalle.modulosAmanteAutos?.coberturasModulos?.nombreModulo ||
              detalle.modulosAmanteAutos?.coberturasModulos?.nombreModulo ? (
                <Propiedad>{diccionario.acordeonPaquete.modulos}</Propiedad>
              ) : null}
              <Valor compact>
                {detalle.modulosAmanteAutos?.coberturasModulos?.nombreModulo}
              </Valor>
              <Valor compact>
                {detalle.modulosAutoSiempre?.coberturasModulos?.nombreModulo}
              </Valor>
            </GrupoDetalle>
          </AcordeonPantallaPoliza>

          {/*
    COBERTURAS
*/}
          <AcordeonPantallaPoliza
            titulo={coberturasPorLineaNegocio(
              poliza.lineaNegocio,
              detalle,
              null
            ).titulo()}
            mantenerAbierto={false}
            Icono={IconoCoberturas}
            show
          >
            {coberturasPorLineaNegocio(
              poliza.lineaNegocio,
              detalle,
              null
            ).listado()}
          </AcordeonPantallaPoliza>

          {/*
    CONDICIONES
*/}
          <AcordeonPantallaPoliza
            titulo={diccionario.acordeones.condiciones}
            show={false}
            Icono={IconoCondiciones}
            mantenerAbierto={validarShow("condiciones")}
          >
            <ValoresColorAlterno>
              {detalle.condicionesEspeciales?.length > 0 ? (
                detalle.condicionesEspeciales?.map((condicion) => (
                  <ColorAlterno key={condicion.descripcionCondicion}>
                    {condicion.descripcionCondicion}
                  </ColorAlterno>
                ))
              ) : (
                <ColorAlterno>No hay condiciones especiales</ColorAlterno>
              )}
            </ValoresColorAlterno>
          </AcordeonPantallaPoliza>

          {/*
    PAGOS
*/}
          <AcordeonPantallaPoliza
            titulo={diccionario.acordeones.pagos}
            show={evaluateShow()}
            Icono={IconoInfoPagos}
            mantenerAbierto={validarShow("informacionPagos")}
          >
            <GrupoDetalle>
              {detalle.esDxn === 0 &&
                obtenerLeyendaAdeudo(detalle?.totalRecibos?.noPagado) !==
                  diccionario.acordeonPagos.noPendiente &&
                (detalle.recibos[0]?.aplicaMeses === undefined
                  ? true
                  : detalle.recibos.length !== 0 ||
                    detalle.recibos[0].aplicaMeses === "No") &&
                showConfig.showDomiciliacion &&
                detalle.permiteRecYDom && (
                  <>
                    <Switch
                      {...switchDomiciliacion}
                      onChange={() =>
                        iniciarProcesoDomiciliacion(
                          detalle?.totalRecibos?.noPagado
                        )
                      }
                    />
                    <DetalleCuentaHabiente
                      cuentahabiente={cuentaHabiente}
                      callback={() =>
                        handleEditarDatosCuentaHabiente(
                          detalle?.totalRecibos?.noPagado
                        )
                      }
                    />
                  </>
                )}

              <Propiedad>
                {diccionario.acordeonPagos.pagarProximoRecibo}
              </Propiedad>
              <Valor
                grande={
                  obtenerLeyendaAdeudo(detalle?.totalRecibos?.noPagado) !==
                  diccionario.acordeonPagos.noPendiente
                }
              >
                {obtenerLeyendaAdeudo(detalle?.totalRecibos?.noPagado)}
              </Valor>
              <BotonPagar
                onClick={() => {
                  redirectInfoPagos({
                    poliza,
                    tipo: poliza.lineaNegocio,
                    modo: "Recibos",
                  });
                }}
                deshabilitado={
                  obtenerLeyendaAdeudo(detalle?.totalRecibos?.noPagado) ===
                  diccionario.acordeonPagos.noPendiente
                }
              >
                {diccionario.verRecibosPagos}
              </BotonPagar>

              <br />
              {/*
                <Propiedad>
                {diccionario.acordeonPagos.pagarProximoEndoso}
              </Propiedad>
              <Valor
                grande={
                  obtenerLeyendaAdeudo(detalle.totalEndosos.noPagado) !==
                  diccionario.acordeonPagos.noPendiente
                }
              >
                {obtenerLeyendaAdeudo(detalle.totalEndosos.noPagado)}
              </Valor>
              <BotonPagar
                onClick={() => {
                  redirectInfoPagos({
                    poliza,
                    tipo: poliza.lineaNegocio,
                    modo: "Endosos",
                  });
                }}
                deshabilitado={
                  obtenerLeyendaAdeudo(detalle.totalEndosos.noPagado) ===
                  diccionario.acordeonPagos.noPendiente
                }
                {diccionario.verEndososPagos}
              </BotonPagar>
              >
            */}
            </GrupoDetalle>
          </AcordeonPantallaPoliza>

          {/*
    DESCARGA DE PÓLIZA
*/}
          <AcordeonPantallaPoliza
            titulo={diccionario.acordeones.descargaPoliza}
            show
            Icono={IconoDescargaPoliza}
            mantenerAbierto={validarShow("descargaPoliza")}
          >
            <NumeroPoliza pequeno>
              {`Póliza: ${poliza.polizaFormato}`}

              {detalle?.endosos?.map((endoso) => (
                <BotonDescargarPoliza onClick={() => descargarPoliza(endoso)}>
                  <TextoPoliza>{endoso.movimiento}</TextoPoliza>
                  <BotonDescargaPolizaIcono>
                    Descargar
                    <IconoDescargaPolizaAzul
                      className="icono"
                      width={24}
                      height={24}
                    />
                  </BotonDescargaPolizaIcono>
                </BotonDescargarPoliza>
              ))}
            </NumeroPoliza>
          </AcordeonPantallaPoliza>
        </>
      ) : null}
    </Fragment>
  );
};

export default DetallePolizaAUTR;
