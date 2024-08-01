/* eslint-disable */
// @ts-nocheck
import { useLazyQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { IObtenerPreguntasFrecuentes } from "../../interfaces/indemnizacion/Iindemnizacion";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../componentes-styled-compartidos/Pantalla.styled";
import {
  EnvolvedorCategoria,
  BotonDesplegarSecciones,
  ContenedorElementosMenuDesplegable,
  ContenedorSecciones,
  SeparadorReporteAjuste,
  Secciones,
} from "./PantallaPreguntasFrecuentesPT.styled";
import { SeparadorSeccionesOpcionales } from "../contenedor-perdida-total/contenedor-perdida-total-componente/ContenedorPerdidaTotal.styled";
import Encabezado from "../encabezado/encabezado-componente/Encabezado";
import IndicadorCarga from "../indicador-carga";
import {
  EnlaceBienvenida,
  EnlaceRegistroBienvenida,
} from "../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import { MensajePequeno } from "../pantalla-pruebas/PantallaTransaccionMitec.styled";
import { Titulo } from "../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";
import { Pregunta } from "./interfaces";
import PreguntaComponente from "./PreguntaComponente";
import IconoFlechaArriba from "@material-ui/icons/KeyboardArrowUpRounded";
import IconoFlechaAbajo from "@material-ui/icons/KeyboardArrowDownRounded";

const diccionario = {
  total: "Indemnización por pérdida total",
  globales: "Indemnización por daños globales",
  parciales: "Indemnización por daños parciales",
  robo: "Indemnización por robo total",
  grua: "Asistencia de grúa por avería",
  legalLibVheDetenido: "Liberación del vehículo detenido",
  legalLibConDetenido: "Liberación del conductor detenido",
};

type IPushState = {
  tipoPersona: string;
  tipoAtencion: string;
};

const OBTENER_PREGUNTAS = loader(
  "../../graphQL/query/indemnizacion/preguntas_preguntasFrecuentes.graphql"
);

const PantallaPreguntasFrecuentesPT = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);
  const location = useLocation<IPushState>();

  const [question, setQuestion] = useState<Pregunta>({
    question: "",
    answer: "",
  });

  const [preguntasState, setPreguntasState] = useState<Pregunta[]>([]);
  const [preguntasTotalState, setpreguntasTotalState] = useState<Pregunta[]>(
    []
  );
  const [preguntasGlobalState, setpreguntasGlobalState] = useState<Pregunta[]>(
    []
  );
  const [preguntasParcialState, setpreguntasParcialState] = useState<
    Pregunta[]
  >([]);
  const [preguntasRoboState, setpreguntasRoboState] = useState<Pregunta[]>([]);
  const [preguntasGruaState, setpreguntasGruaState] = useState<Pregunta[]>([]);
  const [preguntasLegalVheDetState, setpreguntasLegalVheDetState] = useState<
    Pregunta[]
  >([]);
  const [preguntasLegalConDetState, setpreguntasLegalConDetState] = useState<
    Pregunta[]
  >([]);

  const [loadingState, setLoadingState] = useState(true);

  const [obtenerPreguntas, { data, loading, error }] =
    useLazyQuery<IObtenerPreguntasFrecuentes>(OBTENER_PREGUNTAS);

  const assignQuestion = (questionArg: Pregunta) => {
    setQuestion(questionArg);
  };

  const [desplegarSeccionTotal, asignarValorDesplegarSeccionTotal] =
    useState(false);
  const [desplegarSeccionGlobales, asignarValorDesplegarSeccionGlobales] =
    useState(false);
  const [desplegarSeccionParciales, asignarValorDesplegarSeccionParciales] =
    useState(false);
  const [desplegarSeccionRobo, asignarValorDesplegarSeccionRobo] =
    useState(false);
  const [desplegarSeccionGrua, asignarValorDesplegarSeccionesGrua] =
    useState(false);
  const [desplegarSeccionLegalVheDet, asignarValorDesplegarSeccionLegalVheDet] =
    useState(false);
  const [desplegarSeccionLegalConDet, asignarValorDesplegarSeccionLegalConDet] =
    useState(false);

  const [titulo, setTitulo] = useState("");

  const asignarDesplegarSecciones = (event: any) => {
    dispatch({
      type: "AGREGAR",
      valor: event.target.id,
      indice: "categoria",
    });

    switch (event.target.id) {
      case "total":
        console.log(event.target.id);
        obtenerPreguntas({
          variables: {
            categoria: 1,
          },
        });
        asignarValorDesplegarSeccionTotal(!desplegarSeccionTotal);
        break;
      case "globales":
        obtenerPreguntas({
          variables: {
            categoria: 2,
          },
        });
        asignarValorDesplegarSeccionGlobales(!desplegarSeccionGlobales);
        break;
      case "parciales":
        obtenerPreguntas({
          variables: {
            categoria: 3,
          },
        });
        asignarValorDesplegarSeccionParciales(!desplegarSeccionParciales);
        break;
      case "robo":
        obtenerPreguntas({
          variables: {
            categoria: 4,
          },
        });
        asignarValorDesplegarSeccionRobo(!desplegarSeccionRobo);
        break;
      case "grua":
        obtenerPreguntas({
          variables: {
            categoria: 5,
          },
        });
        asignarValorDesplegarSeccionesGrua(!desplegarSeccionGrua);
        break;
      case "legalVheDet":
        obtenerPreguntas({
          variables: {
            categoria: 6,
          },
        });
        asignarValorDesplegarSeccionLegalVheDet(!desplegarSeccionLegalVheDet);
        break;
      case "legalConDet":
        obtenerPreguntas({
          variables: {
            categoria: 7,
          },
        });
        asignarValorDesplegarSeccionLegalConDet(!desplegarSeccionLegalConDet);
        break;
    }
  };

  useEffect(() => {
    if (location.state && location.state.tipoAtencion) {
      const { tipoAtencion } = location.state;
      if (tipoAtencion === "total") {
        setTitulo("Pérdida total");
        // En caso de que el tipo de atención sea total, puede ser PT (1) o DG (2)
        obtenerPreguntas({
          variables: {
            categoria: 1,
          },
        });
        return;
      }

      if (tipoAtencion === "parcial") {
        setTitulo("Daños parciales");
        obtenerPreguntas({
          variables: {
            categoria: 3,
          },
        });
        return;
      }

      if (tipoAtencion === "grua") {
        setTitulo("Grúa");
        // En caso de que el tipo de atención sea total, puede ser PT (1) o DG (2)
        obtenerPreguntas({
          variables: {
            categoria: 5,
          },
        });
        return;
      }

      if (tipoAtencion === "robo") {
        setTitulo("Robo total");
        obtenerPreguntas({
          variables: {
            categoria: 4,
          },
        });
        return;
      }

      if (tipoAtencion === "todo") {
        setTitulo("Todo");
        obtenerPreguntas({
          variables: {
            categoria: 0,
          },
        });
        return;
      }

      setTitulo("Daños globales");
      obtenerPreguntas({
        variables: {
          categoria: 2,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (
      (!loading && error) ||
      (!loading && !data?.preguntas_preguntasFrecuentes?.completado)
    ) {
      setLoadingState(false);
    }

    if (loading) {
      setLoadingState(true);
    }

    if (!loading && data?.preguntas_preguntasFrecuentes?.completado) {
      setLoadingState(false);
      const resp = data.preguntas_preguntasFrecuentes.dato;
      if (location.state && location.state.tipoAtencion) {
        const preguntasArr: Pregunta[] = resp.map((preguntaProp) => {
          const { pregunta, respuesta } = preguntaProp;
          const nuevoObbj = {
            question: pregunta,
            answer: respuesta,
          };
          return nuevoObbj;
        });
        setPreguntasState(preguntasArr);
      } else {
        if (estadoApp && estadoApp.categoria !== undefined) {
          const preguntasArr: Pregunta[] = resp.map((preguntaProp) => {
            const { pregunta, respuesta } = preguntaProp;
            const nuevoObbj = {
              question: pregunta,
              answer: respuesta,
            };
            return nuevoObbj;
          });
          switch (estadoApp.categoria) {
            case "total":
              setpreguntasTotalState(preguntasArr);
              break;
            case "globales":
              setpreguntasGlobalState(preguntasArr);
              break;
            case "parciales":
              setpreguntasParcialState(preguntasArr);
              break;
            case "robo":
              setpreguntasRoboState(preguntasArr);
              break;
            case "grua":
              setpreguntasGruaState(preguntasArr);
              break;
            case "legalVheDet":
              setpreguntasLegalVheDetState(preguntasArr);
              break;
            case "legalConDet":
              setpreguntasLegalConDetState(preguntasArr);
              break;
          }
        }
      }
    }
  }, [data, loading, error]);

  return (
    <EnvolvedorPantalla>
      {loadingState && <IndicadorCarga pantallaCompleta />}
      {question.question === "" && (
        <>
          <Encabezado
            titulo={"Preguntas frecuentes"}
            mostrarBotonCerrar
            funcionCerrar={() => history.goBack()}
          />
          <Pantalla>
            {titulo === "" && (
              <>
                <Titulo>Preguntas frecuentes{titulo}</Titulo>
                <MensajePequeno>
                  Consulta la informacíon relacionada a los diferentes servicios
                  que te ofrecemos a través de HDI Contigo.
                </MensajePequeno>
              </>
            )}
            {titulo !== "" && (
              <>
                <Titulo>Preguntas frecuentes: {titulo}</Titulo>
              </>
            )}
            {location.state && (
              <>
                {preguntasState.map((pregunta) => (
                  <>
                    <EnlaceRegistroBienvenida
                      style={{ justifyContent: "flex-start" }}
                      onClick={() => assignQuestion(pregunta)}
                    >
                      <EnlaceBienvenida enlace>
                        {pregunta.question}
                      </EnlaceBienvenida>
                    </EnlaceRegistroBienvenida>
                    <SeparadorSeccionesOpcionales />
                  </>
                ))}
              </>
            )}
          </Pantalla>
        </>
      )}

      {!location.state && (
        <>
          {question.question === "" && (
            <>
              <EnvolvedorCategoria>
                <div style={{ position: "static" }}>
                  <BotonDesplegarSecciones
                    desplegado={desplegarSeccionTotal}
                    // tema={temaBoton}
                    tema="blanco"
                  >
                    <ContenedorElementosMenuDesplegable
                      id="total"
                      onClick={(event: any) => {
                        asignarDesplegarSecciones(event);
                      }}
                      desplegado={desplegarSeccionTotal}
                    >
                      {diccionario.total}
                      {desplegarSeccionTotal ? (
                        <IconoFlechaArriba />
                      ) : (
                        <IconoFlechaAbajo />
                      )}
                    </ContenedorElementosMenuDesplegable>
                  </BotonDesplegarSecciones>
                </div>
                <ContenedorSecciones desplegado={desplegarSeccionTotal}>
                  <SeparadorReporteAjuste />
                  <Secciones desplegado={desplegarSeccionTotal}>
                    {preguntasTotalState.map((pregunta) => (
                      <>
                        <EnlaceRegistroBienvenida
                          style={{ justifyContent: "flex-start" }}
                          onClick={() => assignQuestion(pregunta)}
                        >
                          <EnlaceBienvenida enlace>
                            {pregunta.question}
                          </EnlaceBienvenida>
                        </EnlaceRegistroBienvenida>
                        <SeparadorSeccionesOpcionales />
                      </>
                    ))}
                  </Secciones>
                </ContenedorSecciones>
              </EnvolvedorCategoria>

              <EnvolvedorCategoria>
                <div style={{ position: "static" }}>
                  <BotonDesplegarSecciones
                    desplegado={desplegarSeccionGlobales}
                    // tema={temaBoton}
                    tema="blanco"
                  >
                    <ContenedorElementosMenuDesplegable
                      id="globales"
                      onClick={(event: any) => {
                        asignarDesplegarSecciones(event);
                      }}
                      desplegado={desplegarSeccionGlobales}
                    >
                      {diccionario.globales}
                      {desplegarSeccionGlobales ? (
                        <IconoFlechaArriba />
                      ) : (
                        <IconoFlechaAbajo />
                      )}
                    </ContenedorElementosMenuDesplegable>
                  </BotonDesplegarSecciones>
                </div>
                <ContenedorSecciones desplegado={desplegarSeccionGlobales}>
                  <SeparadorReporteAjuste />
                  <Secciones desplegado={desplegarSeccionGlobales}>
                    {preguntasGlobalState.map((pregunta) => (
                      <>
                        <EnlaceRegistroBienvenida
                          style={{ justifyContent: "flex-start" }}
                          onClick={() => assignQuestion(pregunta)}
                        >
                          <EnlaceBienvenida enlace>
                            {pregunta.question}
                          </EnlaceBienvenida>
                        </EnlaceRegistroBienvenida>
                        <SeparadorSeccionesOpcionales />
                      </>
                    ))}
                  </Secciones>
                </ContenedorSecciones>
              </EnvolvedorCategoria>

              <EnvolvedorCategoria>
                <div style={{ position: "static" }}>
                  <BotonDesplegarSecciones
                    desplegado={desplegarSeccionParciales}
                    // tema={temaBoton}
                    tema="blanco"
                  >
                    <ContenedorElementosMenuDesplegable
                      id="parciales"
                      onClick={(event: any) => {
                        asignarDesplegarSecciones(event);
                      }}
                      desplegado={desplegarSeccionParciales}
                    >
                      {diccionario.parciales}
                      {desplegarSeccionParciales ? (
                        <IconoFlechaArriba />
                      ) : (
                        <IconoFlechaAbajo />
                      )}
                    </ContenedorElementosMenuDesplegable>
                  </BotonDesplegarSecciones>
                </div>
                <ContenedorSecciones desplegado={desplegarSeccionParciales}>
                  <SeparadorReporteAjuste />
                  <Secciones desplegado={desplegarSeccionParciales}>
                    {preguntasParcialState.map((pregunta) => (
                      <>
                        <EnlaceRegistroBienvenida
                          style={{ justifyContent: "flex-start" }}
                          onClick={() => assignQuestion(pregunta)}
                        >
                          <EnlaceBienvenida enlace>
                            {pregunta.question}
                          </EnlaceBienvenida>
                        </EnlaceRegistroBienvenida>
                        <SeparadorSeccionesOpcionales />
                      </>
                    ))}
                  </Secciones>
                </ContenedorSecciones>
              </EnvolvedorCategoria>

              <EnvolvedorCategoria>
                <div style={{ position: "static" }}>
                  <BotonDesplegarSecciones
                    desplegado={desplegarSeccionRobo}
                    // tema={temaBoton}
                    tema="blanco"
                  >
                    <ContenedorElementosMenuDesplegable
                      id="robo"
                      onClick={(event: any) => {
                        asignarDesplegarSecciones(event);
                      }}
                      desplegado={desplegarSeccionRobo}
                    >
                      {diccionario.robo}
                      {desplegarSeccionRobo ? (
                        <IconoFlechaArriba />
                      ) : (
                        <IconoFlechaAbajo />
                      )}
                    </ContenedorElementosMenuDesplegable>
                  </BotonDesplegarSecciones>
                </div>
                <ContenedorSecciones desplegado={desplegarSeccionRobo}>
                  <SeparadorReporteAjuste />
                  <Secciones desplegado={desplegarSeccionRobo}>
                    {preguntasRoboState.map((pregunta) => (
                      <>
                        <EnlaceRegistroBienvenida
                          style={{ justifyContent: "flex-start" }}
                          onClick={() => assignQuestion(pregunta)}
                        >
                          <EnlaceBienvenida enlace>
                            {pregunta.question}
                          </EnlaceBienvenida>
                        </EnlaceRegistroBienvenida>
                        <SeparadorSeccionesOpcionales />
                      </>
                    ))}
                  </Secciones>
                </ContenedorSecciones>
              </EnvolvedorCategoria>

              <EnvolvedorCategoria>
                <div style={{ position: "static" }}>
                  <BotonDesplegarSecciones
                    desplegado={desplegarSeccionGrua}
                    // tema={temaBoton}
                    tema="blanco"
                  >
                    <ContenedorElementosMenuDesplegable
                      id="grua"
                      onClick={(event: any) => {
                        asignarDesplegarSecciones(event);
                      }}
                      desplegado={desplegarSeccionGrua}
                    >
                      {diccionario.grua}
                      {desplegarSeccionGrua ? (
                        <IconoFlechaArriba />
                      ) : (
                        <IconoFlechaAbajo />
                      )}
                    </ContenedorElementosMenuDesplegable>
                  </BotonDesplegarSecciones>
                </div>
                <ContenedorSecciones desplegado={desplegarSeccionGrua}>
                  <SeparadorReporteAjuste />
                  <Secciones desplegado={desplegarSeccionGrua}>
                    {preguntasGruaState.map((pregunta) => (
                      <>
                        <EnlaceRegistroBienvenida
                          style={{ justifyContent: "flex-start" }}
                          onClick={() => assignQuestion(pregunta)}
                        >
                          <EnlaceBienvenida enlace>
                            {pregunta.question}
                          </EnlaceBienvenida>
                        </EnlaceRegistroBienvenida>
                        <SeparadorSeccionesOpcionales />
                      </>
                    ))}
                  </Secciones>
                </ContenedorSecciones>
              </EnvolvedorCategoria>

              <EnvolvedorCategoria>
                <div style={{ position: "static" }}>
                  <BotonDesplegarSecciones
                    desplegado={desplegarSeccionLegalVheDet}
                    tema="blanco"
                  >
                    <ContenedorElementosMenuDesplegable
                      id="legalVheDet"
                      onClick={(event: any) => {
                        asignarDesplegarSecciones(event);
                      }}
                      desplegado={desplegarSeccionLegalVheDet}
                    >
                      {diccionario.legalLibVheDetenido}
                      {desplegarSeccionLegalVheDet ? (
                        <IconoFlechaArriba />
                      ) : (
                        <IconoFlechaAbajo />
                      )}
                    </ContenedorElementosMenuDesplegable>
                  </BotonDesplegarSecciones>
                </div>
                <ContenedorSecciones desplegado={desplegarSeccionLegalVheDet}>
                  <SeparadorReporteAjuste />
                  <Secciones desplegado={desplegarSeccionLegalVheDet}>
                    {preguntasLegalVheDetState.map((pregunta) => (
                      <>
                        <EnlaceRegistroBienvenida
                          style={{ justifyContent: "flex-start" }}
                          onClick={() => assignQuestion(pregunta)}
                        >
                          <EnlaceBienvenida enlace>
                            {pregunta.question}
                          </EnlaceBienvenida>
                        </EnlaceRegistroBienvenida>
                        <SeparadorSeccionesOpcionales />
                      </>
                    ))}
                  </Secciones>
                </ContenedorSecciones>
              </EnvolvedorCategoria>

              <EnvolvedorCategoria>
                <div style={{ position: "static" }}>
                  <BotonDesplegarSecciones
                    desplegado={desplegarSeccionLegalConDet}
                    // tema={temaBoton}
                    tema="blanco"
                  >
                    <ContenedorElementosMenuDesplegable
                      id="legalConDet"
                      onClick={(event: any) => {
                        asignarDesplegarSecciones(event);
                      }}
                      desplegado={desplegarSeccionLegalConDet}
                    >
                      {diccionario.legalLibConDetenido}
                      {desplegarSeccionLegalConDet ? (
                        <IconoFlechaArriba />
                      ) : (
                        <IconoFlechaAbajo />
                      )}
                    </ContenedorElementosMenuDesplegable>
                  </BotonDesplegarSecciones>
                </div>
                <ContenedorSecciones desplegado={desplegarSeccionLegalConDet}>
                  <SeparadorReporteAjuste />
                  <Secciones desplegado={desplegarSeccionLegalConDet}>
                    {preguntasLegalConDetState.map((pregunta) => (
                      <>
                        <EnlaceRegistroBienvenida
                          style={{ justifyContent: "flex-start" }}
                          onClick={() => assignQuestion(pregunta)}
                        >
                          <EnlaceBienvenida enlace>
                            {pregunta.question}
                          </EnlaceBienvenida>
                        </EnlaceRegistroBienvenida>
                        <SeparadorSeccionesOpcionales />
                      </>
                    ))}
                  </Secciones>
                </ContenedorSecciones>
              </EnvolvedorCategoria>
            </>
          )}
        </>
      )}
      {question.question !== "" && (
        <PreguntaComponente pregunta={question} setQuestion={setQuestion} />
      )}
    </EnvolvedorPantalla>
  );
};

export default PantallaPreguntasFrecuentesPT;
