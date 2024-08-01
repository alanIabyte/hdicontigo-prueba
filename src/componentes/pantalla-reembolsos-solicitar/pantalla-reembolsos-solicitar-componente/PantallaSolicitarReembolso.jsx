/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useState } from "react";
import { v4 } from "uuid";
import IconoLupa from "@material-ui/icons/SearchRounded";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  Contenedor,
  ContenedorPolizas,
  ContenidoAcordeon,
  Encabezado,
  ParrafoAcordeon,
  TituloAcordeon,
} from "./PantallaSolicitarReembolso.styled";
import {
  EnvolvedorImagen,
  MensajePequeno,
  Titulo,
} from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import {
  BuscadorPolizas,
  ContenedorBuscadorPolizas,
} from "../../pantalla-consulta-reembolsos/pantalla-consulta-reembolsos-componente/PantallaConsultaReembolsos.styled";
import IconoMaletin from "../recursos/ico_dependiente.svg";
import Solicitud from "../../solicitud/solicitud-componente/Solicitud";
// eslint-disable-next-line no-unused-vars
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import darFormatoFecha from "../../../helpers/formatearFecha/formatearFecha";
import IndicadorCarga from "../../indicador-carga";
import ListaSolicitudesV2 from "../../solicitud-version-dos/solicitud-componente/ListaSolicitudesV2";

const diccionario = {
  busqueda: "Buscar reembolso",
  titulo: "Solicitar reembolso",
  // mensaje: "Selecciona la persona que utilizó el seguro",
  mensaje: "Selecciona al beneficiario de la póliza que usó el seguro.",
};

const PantallaSolicitarReembolso = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    establecerEstadoPantalla,
    establecerEstadoOpciones,
    asegurados,
    numeroPoliza,
    vigencia,
    vigenciaInicio,
  } = props;
  const [polizaDatos, establecerPolizaDatos] = useState();
  const [estadoCargando, establecerEstadoCargando] = useState(true);
  // ! Agregar un juego de bandera aquí para version 1 o 2 del servicio de reembolsos.
  const [versionReem, setVersionReem] = useState(false); // true = version1, false = version2
  const establecerOpcion = (asegurado) => {
    // eslint-disable-next-line no-console
    console.log(asegurado);
    establecerPolizaDatos(asegurado);
    establecerEstadoCargando(false);
  };

  const eliminarSlash = (nombre) => nombre.split("/").join(" ");

  return (
    <>
      <EnvolvedorPantalla>
        {/* {estadoCargando && <IndicadorCarga />} */}
        <EncabezadoPolizasSiniestradas
          regresar
          funcionRegresar={() => {
            establecerEstadoOpciones("");
            establecerEstadoPantalla(true);
          }}
        />
        <Pantalla>
          {!polizaDatos && (
            <>
              <Titulo>{diccionario.titulo}</Titulo>
              <MensajePequeno>{diccionario.mensaje}</MensajePequeno>
              {/* <ContenedorBuscadorPolizas>
                <IconoLupa style={{ fontSize: 20 }} />
                <BuscadorPolizas
                  placeholder={diccionario.busqueda}
                  defaultValue=""
                  onChange={(e) => console.log(e.target.value)}
                />
              </ContenedorBuscadorPolizas> */}
              <ContenedorPolizas>
                {asegurados.map((reembolso) => (
                  <Contenedor
                    show
                    key={v4()}
                    onClick={() => establecerOpcion(reembolso)}
                  >
                    <Encabezado>
                      <EnvolvedorImagen
                        src={IconoMaletin}
                        style={{ width: 35 }}
                      />
                      <ContenidoAcordeon>
                        <TituloAcordeon>
                          {eliminarSlash(reembolso.nombre)}
                        </TituloAcordeon>
                        <ParrafoAcordeon>
                          Vigencia {`${darFormatoFecha(vigenciaInicio)}`} a{" "}
                          {` ${darFormatoFecha(vigencia)}`}
                        </ParrafoAcordeon>
                      </ContenidoAcordeon>
                    </Encabezado>
                  </Contenedor>
                ))}
              </ContenedorPolizas>
            </>
          )}
        </Pantalla>
      </EnvolvedorPantalla>
      {versionReem ? (
        <>
          {polizaDatos && (
            <Solicitud
              poliza={polizaDatos}
              establecerEstadoOpciones={establecerEstadoOpciones}
              establecerEstadoPantalla={establecerEstadoPantalla}
              numeroPoliza={numeroPoliza}
            />
          )}
        </>
      ) : (
        <>
          {polizaDatos && (
            <ListaSolicitudesV2
              poliza={polizaDatos}
              establecerEstadoOpciones={establecerEstadoOpciones}
              establecerEstadoPantalla={establecerEstadoPantalla}
              numeroPoliza={numeroPoliza}
            />
          )}
        </>
      )}
    </>
  );
};

export default PantallaSolicitarReembolso;
