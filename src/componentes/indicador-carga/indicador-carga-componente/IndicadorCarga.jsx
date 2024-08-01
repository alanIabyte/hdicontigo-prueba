/* eslint-disable react/no-unused-state */
import React from "react";
import PropTypes from "prop-types";
// import { useSelector } from "react-redux";
import {
  IndicadorCarga,
  PantallaCarga,
  TextoCarga,
} from "./IndicadorCarga.styled";

const diccionario = {
  textoEspera: "Espera un momento...",
};

const IndicadorCargaComponente = (props) => {
  const { tema, pantallaCompleta, id } = props;
  // const estadoApp = useSelector((state) => state);

  return (
    <PantallaCarga id={id} tema={tema} pantallaCompleta={pantallaCompleta}>
      <IndicadorCarga tema={tema} />
      <TextoCarga tema={tema}>{diccionario.textoEspera}</TextoCarga>
      {/* <p>{JSON.stringify(estadoApp.geolocation)}</p> */}
    </PantallaCarga>
  );
};

// class IndicadorCargaComponente extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       reduxState: {},
//     };
//   }

//   dummy() {
//     const reducer = useSelector((estado) => estado);
//     useEffect(() => {
//       this.setState({
//         reduxState: reducer,
//       });
//     }, []);
//     return null;
//   }

//   render() {
//     const { tema, pantallaCompleta, id } = this.props;
//     return (
//       <PantallaCarga id={id} tema={tema} pantallaCompleta={pantallaCompleta}>
//         <IndicadorCarga tema={tema} />
//         <TextoCarga tema={tema}>{diccionario.textoEspera}</TextoCarga>
//         {this.dummy}
//       </PantallaCarga>
//     );
//   }
// }

IndicadorCargaComponente.propTypes = {
  tema: PropTypes.oneOf(["estandar", "verde", "verde-pequeno"]),
  pantallaCompleta: PropTypes.bool,
  id: PropTypes.string,
};

IndicadorCargaComponente.defaultProps = {
  tema: "estandar",
  pantallaCompleta: false,
  id: "",
};

export default IndicadorCargaComponente;
