/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import ComponenteValidacionPoliza from "./graphql.componente";
import ComponenteDemoTiempoReal from "./graphql.componente.tiempo.real";

class GraphQLContenedor extends Component {
  constructor() {
    super();
    this.state = {
      poliza: "1-2345-6",
      vin: "8371",
      fechaOcurrencia: "2021-01-01T16:59:29.590Z",
      renderValidarPoliza: false,
    };
  }

  validarPoliza = () => {
    this.setState((prevState) => ({
      renderValidarPoliza:
        prevState.poliza !== "" &&
        prevState.vin !== "" &&
        prevState.fechaOcurrencia !== "",
    }));
  };

  render() {
    const { fechaOcurrencia } = this.state;
    const fecha = new Date(fechaOcurrencia);
    return (
      <>
        <section style={{ margin: "50px" }}>
          <h2>Enviar poliza</h2>
          <input
            onChange={(e) => this.setState({ poliza: e.target.value })}
            value={this.state.poliza}
            placeholder="Numero de poliza"
          />
          <input
            onChange={(e) => this.setState({ vin: e.target.value })}
            value={this.state.vin}
            placeholder="VIN"
          />
          <input
            onChange={(e) => this.setState({ fechaOcurrencia: e.target.value })}
            value={this.state.fechaOcurrencia}
            placeholder="Fecha de ocurrencia"
          />
          <button type="button" onClick={this.validarPoliza}>
            Validar poliza
          </button>
        </section>
        {this.state.renderValidarPoliza && (
          <ComponenteValidacionPoliza
            poliza={this.state.poliza}
            vin={this.state.vin}
            fechaOcurrencia={fecha}
          />
        )}
        <section style={{ margin: "50px" }}>
          <h2>Ubicacion Ajustador</h2>
          <ComponenteDemoTiempoReal numeroReporte={12345} />
        </section>
      </>
    );
  }
}

export default GraphQLContenedor;
