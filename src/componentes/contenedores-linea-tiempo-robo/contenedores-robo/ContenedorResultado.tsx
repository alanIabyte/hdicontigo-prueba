/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import React, { useState } from "react";
import IconoFlechaAbajo from "@material-ui/icons/KeyboardArrowDownRounded";
import IconoFlechaArriba from "@material-ui/icons/KeyboardArrowUpRounded";
import {
  BotonDesplegarSecciones,
  ContenedorElementosMenuDesplegable,
  ContenedorSecciones,
  EnvolvedorReporteAjuste,
  Secciones,
} from "../../contenedor-reporte-ajuste/contenedor-reporte-ajuste-componente/ContenedorReporteAjuste.styled";
import Seccion from "../../seccion-pasos-progreso";
import { SeccionResultadoRobo } from "../secciones-linea-tiempo/SeccionResultadoRobo";
import { SeccionPresencial } from "../../contenedores-linea-tiempo/Secciones/SeccionPresencial";

export const ContenedorResultado = () => {
  const [desplegarSecciones, setDesplegarSecciones] = useState(false);

  const asignarDesplegarSecciones = () => {
    setDesplegarSecciones(!desplegarSecciones);
    // abrirEtapa = !desplegarSecciones;
    if (!desplegarSecciones) {
      console.log("Llamando linea de tiempo");
      // asignarValorCargando(true);
    }
  };

  return (
    <EnvolvedorReporteAjuste style={{ marginBottom: "1rem" }}>
      <div style={{ position: "static" }}>
        <BotonDesplegarSecciones desplegado={desplegarSecciones} tema="blanco">
          <ContenedorElementosMenuDesplegable
            onClick={asignarDesplegarSecciones}
            desplegado={desplegarSecciones}
          >
            4. Resultado
            {desplegarSecciones ? <IconoFlechaArriba /> : <IconoFlechaAbajo />}
          </ContenedorElementosMenuDesplegable>
        </BotonDesplegarSecciones>
      </div>
      <ContenedorSecciones desplegado={desplegarSecciones}>
        <Secciones desplegado={desplegarSecciones}>
          {/* Esta sección contiene un resumen del reporte de robo */}
          <Seccion titulo="Estimación del robo" pendiente={false} abrirSeccion>
            {/* <SeccionResultadoRobo /> */}
          </Seccion>
          <SeccionPresencial
            desplegarSecciones={desplegarSecciones}
            esRobo={false}
            vehiculoRecuperado={false}
          />
        </Secciones>
      </ContenedorSecciones>
    </EnvolvedorReporteAjuste>
  );
};
