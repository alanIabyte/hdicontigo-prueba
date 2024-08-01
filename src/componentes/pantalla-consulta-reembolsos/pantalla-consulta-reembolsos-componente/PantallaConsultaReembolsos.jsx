/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IconoLupa from "@material-ui/icons/SearchRounded";
import { v4 } from "uuid";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  BuscadorPolizas,
  ContenedorBuscadorPolizas,
} from "./PantallaConsultaReembolsos.styled";
import { ContenedorPolizas } from "../../pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";
import { Titulo } from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import Reembolso from "../../reembolso/reembolso-componente/Reembolso";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import IndicadorCarga from "../../indicador-carga";
import Alerta from "../../alerta/alerta-componente/Alerta";


const diccionario = {
  titulo: "Consulta tus reembolsos",
  busqueda: "Buscar reembolso",
};

const valores = {
  nombre: ""
};

const PantallaConsultaReembolsos = ({
  establecerEstadoPantalla,
  establecerEstadoOpciones,
  reembolsos,
}) => {
  // const [terminoBusqueda, establecerTerminoBusqueda] = useState("");
  const [reembolsosState, establecerReembolsosState] = useState([]);
  const [mostrarInfoReembolsos, establecerMostrarInfoReembolsos] = useState(true);

  const alCambiarBusqueda = (evento) => {
    if (evento) {
      valores.nombre = evento.target.value.toUpperCase();
      // Si no hay info, va a hacer el filtrado de algo que no existe. 
      if (reembolsos.length > 0) { 
        const polizasFiltradas = reembolsos.filter(
          (reembolso) =>
          reembolso.asegurado.nombre.toUpperCase().includes(valores.nombre) 
        );
        reembolsosState(polizasFiltradas)
      }
    }
    // establecerTerminoBusqueda(e.target.value);
  };

  useEffect(() => {
    if (reembolsos) {
      console.log(reembolsos)
      establecerReembolsosState(reembolsos);
    } else {
      console.log("cargando reembolsos");
    }
  }, []);

  return (
    <>
      <EnvolvedorPantalla>
        <EncabezadoPolizasSiniestradas
          regresar
          funcionRegresar={() => {
            establecerEstadoPantalla(true);
            establecerEstadoOpciones("");
          }}
        />
        { mostrarInfoReembolsos && (
          <Alerta
          colorAlerta="amarillo"
          tipoIcono="trianguloAlerta"
          textoEncabezado="Importante"
          textoCuerpoJsx="Recuerda que tus reembolsos pueden tardar de 24 a 48 horas en aparecer despues de tu solicitud"
          mostrarModal={mostrarInfoReembolsos}
          manejarCierre={() => {
            establecerMostrarInfoReembolsos(false);
          }}
          mostrarIcono
          etiquetaBoton="Comprendo"
          funcionLlamadaBoton={() => {
            establecerMostrarInfoReembolsos(false);
          }}
          temaBoton="estandar"
        />
        )}

        <Pantalla>
          <Titulo>{diccionario.titulo}</Titulo>
          <ContenedorBuscadorPolizas>
            <IconoLupa style={{ fontSize: 20 }} />
            <BuscadorPolizas
              placeholder={diccionario.busqueda}
              defaultValue={valores.nombre}
              onChange={(e) => alCambiarBusqueda(e)}
            />
          </ContenedorBuscadorPolizas>
          {reembolsosState ? (
            <>
              <ContenedorPolizas>
                {reembolsosState.map((reembolso) => (
                  <Reembolso poliza={reembolso} key={v4()} />
                ))}
              </ContenedorPolizas>
            </>
          ) : (
            <IndicadorCarga />
          )}
        </Pantalla>
      </EnvolvedorPantalla>
    </>
  );
};

PantallaConsultaReembolsos.propTypes = {
  establecerEstadoPantalla: PropTypes.func,
  establecerEstadoOpciones: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  reembolsos: PropTypes.arrayOf(PropTypes.object),
};

PantallaConsultaReembolsos.defaultProps = {
  establecerEstadoPantalla: () => {},
  establecerEstadoOpciones: () => {},
  reembolsos: [],
};

export default PantallaConsultaReembolsos;
