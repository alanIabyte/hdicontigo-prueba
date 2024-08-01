/* eslint-disable */
import React, { Fragment, useState, useEffect } from "react";
import AcordeonPantallaPoliza from "../../acordeon-detalle-poliza";
import DetalleCuentaHabiente from "../detalle-cuentahabiente/DetalleCuentaHabiente";
import ModalSeccionCobertura from "../modal-seccion-cobertura-componente/ModalSeccionCobertura";
import { ReactComponent as IconoVer } from "../../../recursos/iconos/ico_ojo.svg";
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
  TextoPoliza
} from "./PantallaDetallePoliza.styled";
import Switch from "../../Switch/";
//  Iconos
import { ReactComponent as IconoInfoPoliza } from "../../../recursos/iconos/hdi-c/detalle/danos/1Info.svg";
import { ReactComponent as IconoInfoBien } from "../../../recursos/iconos/hdi-c/detalle/danos/2BienAsegurado.svg";
import { ReactComponent as IconoPaquetes } from "../../../recursos/iconos/hdi-c/detalle/danos/3Paquetes.svg";
import { ReactComponent as IconoCoberturas } from "../../../recursos/iconos/hdi-c/detalle/danos/4Coberturas.svg";
import { ReactComponent as IconoCondiciones } from "../../../recursos/iconos/ico_condiciones_especiales.svg";
import { ReactComponent as IconoInfoPagos } from "../../../recursos/iconos/hdi-c/detalle/danos/5Pagos.svg";
import { ReactComponent as IconoDescargaPoliza } from "../../../recursos/iconos/hdi-c/detalle/danos/6Descarga.svg";
import { ReactComponent as IconoDescargaPolizaAzul } from "../../../recursos/iconos/ico_pdf_azul.svg";
import { obtenerLeyendaAdeudo } from "./utils";
import showConfig from "../../../utils/configs";
import { isCancelled } from "../../../utils/poliza";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const DetallePolizaDAN = ({
  _detalle,
  poliza,
  diccionario,
  iniciarProcesoDomiciliacion,
  cuentaHabiente,
  handleEditarDatosCuentaHabiente,
  redirectInfoPagos,
  descargarPoliza,
  switchDomiciliacion
}) => {
  const [detalle, setDetalle] = useState({});
  const [section, setSection] = useState([]);
  const [showSection, setShowSection] = useState(false);
  // console.log("detalle: ", detalle);
  const estadoApp = useSelector((state) => state);

  const location = useLocation();
  const { showContainer } = location.state;
  const validarShow = (seccion) => seccion === showContainer;

  useEffect(() => {
    if (_detalle.datosBien) {
      setDetalle(_detalle);
    }
  }, [_detalle]);

  const handleShowSection = (section) => {
    setSection({
      lista: detalle?.coberturas.filter(
        (s) => s.idSeccion === section.idSeccion
      ),
      titulo: section.seccion
    });
    setShowSection(true);
  };

  return (
    <Fragment key={poliza.poliza}>
      {showSection ? (
        <ModalSeccionCobertura
          seccion={section}
          cerrar={() => setShowSection(false)}
        />
      ) : null}
      {detalle.datosBien ? (
        <>
          {/*
        INFORMACIÓN GENERAL
      */}
          <AcordeonPantallaPoliza
            titulo={diccionario.acordeones.informacion}
            Icono={IconoInfoPoliza}
            show={true}
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
              <Valor>
                {detalle?.nombreAgente ? detalle.nombreAgente : poliza.agente}
              </Valor>
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
        DATOS DEL BIEN
    */}

          <AcordeonPantallaPoliza
            titulo={diccionario.acordeones.bien}
            Icono={IconoInfoBien}
            show={true}
            mantenerAbierto={validarShow("datosDelBien")}
          >
            <>
              <GrupoDetalle>
                <Propiedad>{diccionario.acordeonBien.tipo}</Propiedad>
                <Valor>{detalle.datosBien.tipoBien}</Valor>
              </GrupoDetalle>
              <GrupoDetalle>
                <Propiedad>{diccionario.acordeonBien.descripcion}</Propiedad>
                <Valor>{detalle.datosBien.descripcion}</Valor>
              </GrupoDetalle>
            </>
          </AcordeonPantallaPoliza>

          {/*
        PAQUETE
    */}
          <AcordeonPantallaPoliza
            titulo={diccionario.acordeones.paquete}
            Icono={IconoPaquetes}
            show={true}
            mantenerAbierto={validarShow("paquete")}
          >
            <GrupoDetalle>
              {/* <Propiedad>{diccionario.acordeonPaquete.paquete}</Propiedad> */}
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
            titulo={diccionario.acordeones.coberturasPorSeccion}
            mantenerAbierto={showSection || validarShow("informacionPoliza")}
            Icono={IconoCoberturas}
            show={true}
          >
            <ValoresColorAlterno>
              {detalle?.seccionesCoberturas?.map((section) => (
                <ColorAlterno
                  key={section.idSeccion}
                  onClick={() => handleShowSection(section)}
                >
                  {section.seccion}
                  <IconoVer />
                </ColorAlterno>
              ))}
            </ValoresColorAlterno>
            {/* 
                    <BotonPagar
                  onClick={() => {
                    redirectInfoPagos({
                      poliza,
                      tipo: poliza.lineaNegocio,
                      modo: "Recibos",
                    });
                  }}
                  deshabilitado={false}
                >
                  {diccionario.pagarDeducible}
                </BotonPagar>
                  */}
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
            show={
              !isCancelled(poliza.estatus) &&
              detalle?.totalRecibos?.noPagado !== null
            }
            Icono={IconoInfoPagos}
            mantenerAbierto={validarShow("informacionPagos")}
          >
            {/* detalle.totalRecibos.noPagado !== "$ 0.00" &&
                !estadoApp.funcionesLimitadasDomiciliacion && */}
            <GrupoDetalle>
              {detalle.esDxn === 0 &&
                obtenerLeyendaAdeudo(detalle?.totalRecibos?.noPagado) !==
                  diccionario.acordeonPagos.noPendiente &&
                detalle.recibos[0].aplicaMeses === "No" &&
                showConfig.domiciliacionDAN &&
                detalle.permiteRecYDom && (
                  <>
                    <Switch
                      {...switchDomiciliacion}
                      onChange={() =>
                        iniciarProcesoDomiciliacion(
                          detalle.totalRecibos.noPagado
                        )
                      }
                    />
                    <DetalleCuentaHabiente
                      cuentahabiente={cuentaHabiente}
                      callback={() =>
                        handleEditarDatosCuentaHabiente(
                          detalle.totalRecibos.noPagado
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
                    modo: "Recibos"
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
              <Propiedad>{diccionario.acordeones.dolaresDAN}</Propiedad>
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
            show={true}
            Icono={IconoDescargaPoliza}
            mantenerAbierto={validarShow("descargaPoliza")}
          >
            <NumeroPoliza pequeno={true}>
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

export default DetallePolizaDAN;
