/* eslint-disable */
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  Contenedor,
  PieDePagina,
  ContenedorBoton,
} from "./PantallaTransaccionMitec.styled";
import EncabezadoGrande from "../../encabezado-grande";
import Boton from "../../boton";
import Constantes from "../../../recursos/constantes";
import IndicadorCarga from "../../indicador-carga";
import useAccionesLog from "../../../utils/useAccionesLog";

const nombreCookie = Constantes.nombreDeCookie;

const PantallaTransaccionMitec = () => {
  const history = useHistory();
  const location = useLocation();
  const estadoApp = useSelector((estado) => estado);
  const { runCancelLog } = useAccionesLog(estadoApp.informacionContacto.telefono);
  const [objetoCookie] = useCookies([nombreCookie]);
  const [cargando, asignarValorCargando] = useState(false);
  const [ligaPago, setLigaPago] = useState(false);

  let url = "";

  const usuario =
    objetoCookie && objetoCookie.Usuario ? objetoCookie.Usuario : "0";

  if (location?.state?.url) {
    url = location.state.url;
  } else {
    history.push("/mis-polizas");
  }

  return (
    <EnvolvedorPantallaPolizas key={v4()}>
      <EncabezadoGrande mostrarBack pantalla="mitec"/>
      {cargando ? <IndicadorCarga /> : null}
      <PantallaFondoBlanco>
        {/* Position Fixed agregado para que al moverse el scroll hacia la parte inferior, el contenido lo siga */}
        <Contenedor>
          <iframe src={url} className="iframe" id="mitecIframe" />
        </Contenedor>
      </PantallaFondoBlanco>
      <PieDePagina>
        <ContenedorBoton>
          <Boton
            etiqueta={"Volver"}
            tema="estandar"
            enClick={() => {
              window.scrollTo(0, 0);
              history.push("mis-polizas");
              runCancelLog(2);
            }}
          />
        </ContenedorBoton>
      </PieDePagina>
    </EnvolvedorPantallaPolizas>
  );
};

export default PantallaTransaccionMitec;
