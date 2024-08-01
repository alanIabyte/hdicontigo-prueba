/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";
import {
  Contenedor,
  ContenidoAcordeon,
  TituloAcordeon,
  BotonDetalle,
  PieReembolso,
} from "./Reembolso.styled";
import {
  CirculoEstatusPoliza,
  GrupoDetalle,
  Propiedad,
  Valor,
} from "../../pantalla-detalle-poliza/pantalla-detalle-poliza-componente/PantallaDetallePoliza.styled";

const Reembolso = ({ poliza }) => {
  const { asegurado, fechaSolicitud, folio } = poliza;
  const history = useHistory();
  const fechaFormateada = new Date(fechaSolicitud).toLocaleDateString();

  const reedirigir = (reembolso) => {
    history.push("/detalle-reembolso", { reembolso });
  };

  return (
    <Contenedor show key={v4()} style={{ cursor: "default", width: "auto" }}>
      <ContenidoAcordeon>
        <GrupoDetalle>
          <TituloAcordeon>{asegurado.nombre}</TituloAcordeon>
        </GrupoDetalle>

        <GrupoDetalle>
          <Propiedad>Estatus del reembolso</Propiedad>
          <Valor>
            <CirculoEstatusPoliza
              estatus={
                asegurado.estatus !== null ? asegurado.estatus : "En proceso"
              }
            />
            {asegurado.estatus ? asegurado.estatus : "En proceso"}
          </Valor>
        </GrupoDetalle>

        <GrupoDetalle>
          <Propiedad> No. de reembolso: #{folio}</Propiedad>
        </GrupoDetalle>

        <PieReembolso style={{ display: "flex", width: "100%" }}>
          <Propiedad>Fecha: {fechaFormateada}</Propiedad>
          {asegurado.estatus === "Processed" && (
            <Propiedad>
              <BotonDetalle
                etiqueta="Ver detalle"
                tema="estandar"
                onClick={() => reedirigir(poliza)}
              >
                Ver detalle
              </BotonDetalle>
            </Propiedad>
          )}
        </PieReembolso>
      </ContenidoAcordeon>
    </Contenedor>
  );
};

Reembolso.propTypes = {
  poliza: PropTypes.object,
};

Reembolso.defaultProps = {
  poliza: {},
};

export default Reembolso;
