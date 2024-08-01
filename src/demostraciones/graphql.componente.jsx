/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import React from "react";

const VALIDAR_POLIZA = loader("../graphQL/query/poliza/validar_poliza.graphql");

function GraphQLPrueba({ poliza, vin, fechaOcurrencia }) {
  const { loading, error, data } = useQuery(VALIDAR_POLIZA, {
    variables: { poliza, vin, fechaOcurrencia },
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  if (data) {
    const { validar_poliza: polizaValidada } = data;
    return (
      <section style={{ margin: "50px" }}>
        <h2>Poliza validada</h2>
        {polizaValidada && (
          <>
            {polizaValidada.mensaje && (
              <p>
                <strong>Mensaje: </strong>
                {polizaValidada.mensaje}
              </p>
            )}
            {polizaValidada.dato && (
              <>
                {Object.keys(polizaValidada.dato).map((key) => (
                  <p>
                    <strong>{key}: </strong>
                    {polizaValidada.dato[key]}
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

export default GraphQLPrueba;
