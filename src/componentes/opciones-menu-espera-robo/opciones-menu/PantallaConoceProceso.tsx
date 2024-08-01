/* eslint-disable */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Boton from "../../boton/boton-componente/Boton";
import { EnvolvedorPantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado/encabezado-componente/Encabezado";
import { PantallaFondoGris } from "../../pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";
import { LineaProcesoRT } from "../../pantalla-proceso-indemnizacion/pantalla-proceso-indemnizacion-componente/LineasProceso/LineaProcesoRT";
import {
  MensajePequeno,
  TituloMisPolizas,
} from "../../pantalla-pruebas/PantallaTransaccionMitec.styled";
import { IRedux } from "../../../interfaces/Redux/IRedux";
import { Separador } from "../../pantalla-cuenta/pantalla-cuenta-componente/PantallaCuenta.styled";
import { useHistory } from "react-router-dom";

interface IProps {
  cambiarPantalla: any;
  setAnterior: any;
}

const PantallaConoceProceso = ({
  cambiarPantalla,
  setAnterior,
}: IProps) => {
  
  const history = useHistory();
  const { tipoAtencionIndemnizacion } = useSelector((state: IRedux) => state);

  const irAsistenciaHDI = () => {
    history.push({
      pathname: "/asistencia-hdi",
      state: {
        tipoAtencion: "robo"
      },
    });
  }

  const irRequisitos = () => {
    cambiarPantalla("requisitos", "conoce");
  }

  useEffect(() => {
    setAnterior("");
  }, []);

  return (
    <>
      <PantallaFondoGris
        style={{ display: "flex", justifyContent: "flex-start", overflowY: "auto", overflowX: "hidden" }}
      >
        <TituloMisPolizas>Robo de mi vehículo</TituloMisPolizas>
        <MensajePequeno>
          Recibe tu indemnización del vehículo robado en pocos pasos:
        </MensajePequeno>

        <div style={{ position: "relative", zIndex: "9" }}>
          <LineaProcesoRT/>
        </div>
        
        <MensajePequeno style={{ marginTop: "20px" }}>
          Consulta los documentos y requisitos a presentar para iniciar el trámite {" "}
          <span onClick={() => { irRequisitos(); }} className="enlace">
            aquí
          </span>
          {" "}
        </MensajePequeno>
        <Separador />
        <Boton
          etiqueta="Contacto HDI"
          enClick={() => { irAsistenciaHDI(); }}
          tema="simple"
        />
      </PantallaFondoGris>
    </>
  );
};

export default PantallaConoceProceso;
