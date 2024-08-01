/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { v4 } from "uuid";
import { PropTypes } from "prop-types";
import moment from "moment";
import {
  EnvolvedorField,
  LogoTamano,
  Espacio,
  NotFound,
  TablaInformativa,
  TablaCabecera,
  TablaTitular,
  SpanUnderline,
  TituloNegritas,
  TablaDependientes,
  EnvolvedorLogo,
  Datos,
} from "./PantallaCredencialGmm.styled";
import iconoBupaHdi from "../recursos/logo.svg";
import { ReactComponent as IconoUsuario } from "../recursos/usuario_gmm.svg";
import { ReactComponent as IconoDependiente } from "../recursos/dependiente_gmm.svg";

const datos = {
  nombre: "Carlos Uriel Trujillo Reyes",
  poliza: "10-261442-1",
  plan: "HDIP",
  fechaIngreso: "DD/MM/YYYY",
  fechaAntiguedad: "DD/MM/YYYY",
  fechaEfectiva: "DD/MM/YYYY",
  Asegurada: "0000",
  Deducible: "0000",
  Coaseguro: "0000",
  dependientes: [
    {
      nombre: "Carlos Roberto Trujillo",
      fechaIngreso: "DD/MM/YYYY",
      fechaAntiguedad: "DD/MM/YYYY",
    },
    {
      nombre: "Alma Delia Trujillo",
      fechaIngreso: "DD/MM/YYYY",
      fechaAntiguedad: "DD/MM/YYYY",
    },
    {
      nombre: "Carlos Roberto Trujillo",
      fechaIngreso: "DD/MM/YYYY",
      fechaAntiguedad: "DD/MM/YYYY",
    },
  ],
};

const DelanteCredencial = (props) => {
  const { infoPoliza, infoDetalle } = props;
  const formatoDeFechas = (fecha) => {
    const date = fecha ?? "1970/01/01";
    return moment(date).format("yyyy-MM-DD");
  };
  function obtenerNombrePaquete(type) {
    const checkSelector = {
      HDIV: "Medica Vital",
      HDIP: "Medica Total Plus",
      DEFAULT: "N/A",
    };
    return checkSelector[type] || checkSelector.DEFAULT;
  }

  const obtenerFormateadorMonedaMXN = () =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  const formatoMonedaMXN = obtenerFormateadorMonedaMXN();
  const formatoPorcentaje = new Intl.NumberFormat("es", { style: "percent" });

  return (
    <>
      <EnvolvedorField color="verde">
        <Espacio tamano="15px" />
        <EnvolvedorLogo>
          <LogoTamano src={iconoBupaHdi} alt="hdi-bupa-logo" />
        </EnvolvedorLogo>
        <Espacio tamano="10px" />
        <TablaInformativa>
          <tbody>
            <tr key={v4()}>
              <td>
                <TituloNegritas>Plan:</TituloNegritas>{" "}
                <SpanUnderline>{infoDetalle.poliza.paquete}</SpanUnderline>
              </td>
              <td>
                {" "}
                <TituloNegritas>Póliza No:</TituloNegritas>{" "}
                <SpanUnderline>{infoDetalle.poliza.numeroPoliza}</SpanUnderline>
              </td>
            </tr>
            <tr key={v4()}>
              <td>
                {" "}
                <TituloNegritas>F. Efectiva:</TituloNegritas>{" "}
                <SpanUnderline>
                  {formatoDeFechas(
                    infoDetalle.poliza.titular.fechaInicioSeguro
                  )}
                </SpanUnderline>
              </td>
              <td>
                {" "}
                <TituloNegritas>S. Asegurada:</TituloNegritas>{" "}
                <SpanUnderline>
                  {infoDetalle.poliza.titular.sumaAsegurada}
                </SpanUnderline>
              </td>
            </tr>
            <tr key={v4()}>
              <td>
                {" "}
                <TituloNegritas>Deducible:</TituloNegritas>{" "}
                <SpanUnderline>
                  {infoDetalle.poliza.titular.deducibleCobertura}
                </SpanUnderline>
              </td>
              <td>
                {" "}
                <TituloNegritas>Coaseguro:</TituloNegritas>{" "}
                <SpanUnderline>
                  {infoDetalle.poliza.titular.coaseguro}
                </SpanUnderline>
              </td>
            </tr>
          </tbody>
        </TablaInformativa>
        <Espacio tamano="10px" />
        <>
          {datos.dependientes.length === 0 ? (
            <tr>
              <td>
                <NotFound key={v4()}>
                  No hay información de este titular.
                </NotFound>
              </td>
            </tr>
          ) : (
            <>
              <TablaCabecera cellSpacing="0" cellPadding="0">
                <thead
                  style={{
                    background: "#65A518",
                  }}
                >
                  <tr>
                    <td className="centrar">
                      <Datos>Asegurado (s)</Datos>
                    </td>
                    <td className="centrar">
                      <Datos>Fecha Ingreso</Datos>
                    </td>
                    <td className="centrar">
                      <Datos>Fecha </Datos>
                      <Datos>Antigüedad</Datos>
                    </td>
                  </tr>
                </thead>
              </TablaCabecera>
              <Espacio tamano="5px" />
              <TablaTitular cellSpacing="3" cellPadding="0">
                <thead>
                  <tr>
                    <th className="nombreTitular">
                      <IconoUsuario
                        width={28}
                        height={20}
                        style={{
                          transform: "scale(1.0)",
                        }}
                      />
                      <TituloNegritas alinear="top">Titular:</TituloNegritas>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={v4()}>
                    <td className="nombreTitular cell">
                      {/* {infoDetalle.poliza.titular.nombre} */}
                      {infoDetalle.poliza.titular.nombre ?? "N/A"}
                    </td>
                    <td className="centrar cell">
                      <Datos>
                        {formatoDeFechas(infoDetalle.poliza.titular.fechaAlta)}
                      </Datos>
                    </td>
                    <td className="centrar cell">
                      <Datos>
                        {formatoDeFechas(
                          infoDetalle.poliza.titular.fechaAntiguedadCompania
                        )}
                      </Datos>
                    </td>
                  </tr>
                </tbody>
              </TablaTitular>
              <Espacio tamano="10px" />
              <TablaDependientes cellSpacing="3" cellPadding="0">
                <thead>
                  <tr>
                    <th className="dependientes-container" width="20px">
                      <IconoDependiente
                        width={30}
                        height={20}
                        style={{
                          transform: "scale(1.2)",
                          display: "none !important",
                        }}
                      />
                      <TituloNegritas alinear="top">
                        Dependientes:
                      </TituloNegritas>
                    </th>
                  </tr>
                </thead>
                <tbody className="tbody-container">
                  {infoDetalle.asegurados.length < 1 ? (
                    <tr key={v4()}>
                      <td>
                        <NotFound key={v4()}>
                          No hay dependientes para este titular
                        </NotFound>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {infoDetalle.asegurados.map((e) => (
                        <tr
                          key={v4()}
                          style={{
                            lineHeight: 1.5,
                          }}
                        >
                          <td className="dependientes-container">
                            <Datos>
                              <SpanUnderline>{e.nombre}</SpanUnderline>
                            </Datos>
                          </td>
                          <td className="centrar">
                            <Datos>
                              <SpanUnderline>
                                {formatoDeFechas(e.fechaAlta)}
                              </SpanUnderline>
                            </Datos>
                          </td>
                          <td className="centrar">
                            <Datos>
                              <SpanUnderline>
                                {formatoDeFechas(e.fechaAntiguedadCompania)}
                              </SpanUnderline>
                            </Datos>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </TablaDependientes>
            </>
          )}
        </>
      </EnvolvedorField>
    </>
  );
};

DelanteCredencial.propTypes = {
  infoPoliza: PropTypes.oneOfType({}),
  infoDetalle: PropTypes.oneOfType({}),
};

DelanteCredencial.defaultProps = {
  infoPoliza: {},
  infoDetalle: {},
};

export default DelanteCredencial;
