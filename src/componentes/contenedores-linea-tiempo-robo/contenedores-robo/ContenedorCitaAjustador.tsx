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
import { SeccionCitaAjustador } from "../secciones-linea-tiempo/SeccionCitaAjustador";

export const ContenedorCitaAjustador = () => {
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
            3. Cita con el ajustador
            {desplegarSecciones ? <IconoFlechaArriba /> : <IconoFlechaAbajo />}
          </ContenedorElementosMenuDesplegable>
        </BotonDesplegarSecciones>
      </div>
      <ContenedorSecciones desplegado={desplegarSecciones}>
        <Secciones desplegado={desplegarSecciones}>
          {/* Esta sección contiene un resumen del reporte de robo */}
          <Seccion
            titulo="Cita con el ajustador"
            pendiente={false}
            abrirSeccion
          >
            <SeccionCitaAjustador />
          </Seccion>
        </Secciones>
      </ContenedorSecciones>
    </EnvolvedorReporteAjuste>
  );
};
