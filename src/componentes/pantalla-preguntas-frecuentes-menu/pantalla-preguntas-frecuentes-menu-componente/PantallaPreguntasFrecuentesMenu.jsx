/* eslint-disable */
import React, { useState } from "react";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  MensajePequeno,
  TituloPrincipal,
  ContenedorPregunta,
  ContendidoPregunta,
  ContenedorFlexBoton,
  FlechaVerde,
  // ---------------------------------
  EnvolvedorCategoria,
  BotonDesplegarSecciones,
  ContenedorElementosMenuDesplegable,
  ContenedorSecciones,
  SeparadorReporteAjuste,
  Secciones,
  // ---------------------------------
} from "./PantallaPreguntasFrecuentesMenu.styled";
import Encabezado from "../../encabezado";
import IconoFlechaVerde from "../../../recursos/iconos/RT/flecha-verde.svg";
import IconoFlechaAbajo from "@material-ui/icons/KeyboardArrowDownRounded";
import IconoFlechaArriba from "@material-ui/icons/KeyboardArrowUpRounded";

const diccionario = {
  botonEtapa1: "1. Reporte y ajuste",
  servicios: [
    {
      servicio: "ASistencia de grua",
      history: {
        pathname: "/preguntas-frecuentes",
        state: {
          tipoPersona: "f",
          tipoAtencion: "grua",
        },
      },
    },
  ],
};

const PantallaPreguntasFrecuentesMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);

  const [desplegarSecciones, asignarValorDesplegarSecciones] = useState(true);

  const [respuesta1, asignarValorRespuesta1] = useState(
    estadoApp && estadoApp.informacionVehiculo !== undefined
      ? estadoApp.informacionVehiculo.respuesta1
      : null
  );

  const deshabilitarBoton = (e) => {
    console.log(e.target.id);
    if (false == true) asignarValorDesplegarSecciones(false);
  };

  return (
    <EnvolvedorPantalla key={v4()}>
      <Encabezado
        titulo="Encabezado"
        //   funcionRegresar={() => {
        //     if (estadoApp && estadoApp.patallaReporte) {
        //       history.push("/resumen-reporte");
        //     } else {
        //       history.push("/cuestionario-reporte");
        //     }
        //   }}
      />
      <Pantalla>
        <TituloPrincipal id="tituloPrincipal">TituloPrincipal</TituloPrincipal>
        <MensajePequeno id="mensajePequeno">Mensjae pequeño</MensajePequeno>
        <ContenedorPregunta>
          <ContendidoPregunta>ContendidoPregunta</ContendidoPregunta>
          <FlechaVerde
            src={IconoFlechaVerde}
            alt=""
            onClick={() => {
              // history.push({
              //   pathname: "/preguntas-frecuentes",
              //   state: {
              //     tipoPersona: "f",
              //     tipoAtencion: "grua",
              //   },
              // });
              history.push("/registro-usuario-sms", {
                telefono: "4771208693",
              });
            }}
            className="elemento-click"
          />
        </ContenedorPregunta>

        <EnvolvedorCategoria>
          <div style={{ position: "static" }}>
            <BotonDesplegarSecciones
              desplegado={desplegarSecciones}
              // tema={temaBoton}
              tema="blanco"
            >
              <ContenedorElementosMenuDesplegable
                id="total"
                onClick={(event) => {
                  deshabilitarBoton(event);
                }}
                desplegado={desplegarSecciones}
              >
                {diccionario.botonEtapa1}
                {desplegarSecciones ? (
                  <IconoFlechaArriba />
                ) : (
                  <IconoFlechaAbajo />
                )}
              </ContenedorElementosMenuDesplegable>
            </BotonDesplegarSecciones>
          </div>
          <ContenedorSecciones desplegado={desplegarSecciones}>
            <SeparadorReporteAjuste />
            <Secciones desplegado={desplegarSecciones}></Secciones>
          </ContenedorSecciones>
        </EnvolvedorCategoria>

        <EnvolvedorCategoria>
          <div style={{ position: "static" }}>
            <BotonDesplegarSecciones
              desplegado={desplegarSecciones}
              // tema={temaBoton}
              tema="blanco"
            >
              <ContenedorElementosMenuDesplegable
                // onClick={asignarDesplegarSecciones}
                desplegado={desplegarSecciones}
              >
                {diccionario.botonEtapa1}
                {desplegarSecciones ? (
                  <IconoFlechaArriba />
                ) : (
                  <IconoFlechaAbajo />
                )}
              </ContenedorElementosMenuDesplegable>
            </BotonDesplegarSecciones>
          </div>
          <ContenedorSecciones desplegado={desplegarSecciones}>
            <SeparadorReporteAjuste />
            <Secciones desplegado={desplegarSecciones}></Secciones>
          </ContenedorSecciones>
        </EnvolvedorCategoria>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaPreguntasFrecuentesMenu;
