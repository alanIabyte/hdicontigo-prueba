/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import React from "react";

const OBTENER_UBICACION_DEL_AJUSTADOR = loader(
  "../graphQL/query/ubicacion-ajustador/obtener_ubicacion_ajustador.graphql"
);

function GraphQLPruebaTiempoReal({ numeroReporte }) {
  const { loading, error, data } = useQuery(OBTENER_UBICACION_DEL_AJUSTADOR, {
    variables: { numeroReporte },
    pollInterval: 1000,
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  if (data) {
    const { obtener_ubicacion_ajustador: ubicacion } = data;
    return (
      <section style={{ margin: "50px" }}>
        <h2>Datos del Ajustador</h2>
        {ubicacion && (
          <>
            {ubicacion.mensaje && (
              <p>
                <strong>Mensaje: </strong>
                {ubicacion.mensaje}
              </p>
            )}
            {ubicacion.dato && (
              <>
                {Object.keys(ubicacion.dato).map((key) => (
                  <p>
                    <strong>{key}: </strong>
                    {ubicacion.dato[key]}
                  </p>
                ))}
              </>
            )}
          </>
        )}
      </section>
    );
  }
}

export default GraphQLPruebaTiempoReal;
