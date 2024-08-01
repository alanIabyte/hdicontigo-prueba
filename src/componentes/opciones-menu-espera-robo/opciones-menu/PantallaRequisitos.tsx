/* eslint-disable */

import { PantallaFondoGris } from "../../pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";
import { MensajePequeno, TituloMisPolizas } from "../../pantalla-pruebas/PantallaTransaccionMitec.styled";
import { ContenedorRequisitos, PantallaFondoGrisRobo } from "./ComponentesOpciones.styled";
import "../../pantalla-cuestionario-reportes/pantalla-cuestionario-reportes-componente/styles.scss";
import { useEffect, useState } from "react";
import { ContenedorBoton } from "../../pantalla-polizas-siniestradas/pantalla-polizas-siniestradas-componente/PantallaPolizasSiniestradas.styled";
import { Boton } from "../..";
import { SeparadorEspacio } from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import { useHistory } from "react-router-dom";

const ContenedorNumeroPregunta = (props: any) => (
  <div className={`semi-circulo-2 color-${props.numero}`}>
    <p>{props.numero}</p>
  </div>
);

interface IRequisito {
  id: number;
  texto: string;
}

interface IProps {
  cambiarPantalla: any;
  setAnterior: any;
}

const PantallaRequisitos = ({cambiarPantalla, setAnterior} : IProps) => {
  const history = useHistory();
  const [requisitos] = useState<IRequisito[]>([
    {
      id: 1,
      texto: "Declaración ante el ministerio público",
    },
    {
      id: 2,
      texto: "Identificación oficial",
    },
    {
      id: 3,
      texto: "Factura del vehículo",
    }
  ]);

  const irAsistenciaHDI = () => {
    history.push({
      pathname: "/asistencia-hdi",
      state: {
        tipoAtencion: "robo"
      },
    });
  }

  const irAgilizaProceso = () => {
    setAnterior("conoce");
    cambiarPantalla("agiliza", "requisitos");
  };

  useEffect(() => {
    setAnterior("conoce");
  },[]);

  return (
    <>
      <PantallaFondoGrisRobo>
        <TituloMisPolizas>Requisitos de reunión con ajustador</TituloMisPolizas>
        <MensajePequeno>
          Previo a la reunión con tu ajustador, reúne y comparte los siguientes documentos:
        </MensajePequeno>

        <ContenedorRequisitos numeroRequisitos={requisitos.length}>
            <div style={{ display: "flex" }} key={requisitos[0].id}>
              <ContenedorNumeroPregunta numero={requisitos[0].id} />
              <MensajePequeno style={{ height: "20px", marginLeft: "10px" }}>
                {requisitos[0].texto}
              </MensajePequeno>
            </div>
            <div style={{ display: "flex" }} key={requisitos[1].id}>
              <ContenedorNumeroPregunta numero={requisitos[1].id} />
              <MensajePequeno style={{ height: "20px", marginLeft: "10px" }}>
                {requisitos[1].texto}
              </MensajePequeno>
            </div>
            <div style={{ display: "flex" }} key={requisitos[2].id}>
              <ContenedorNumeroPregunta numero={requisitos[2].id} />
              <MensajePequeno style={{ height: "20px", marginLeft: "10px" }}>
                {requisitos[2].texto}
              </MensajePequeno>
            </div>
        </ContenedorRequisitos>


        <ContenedorBoton
          style={{
            padding: "0",
            width: "100%",
            margin: "auto 0 0 0"
          }}
        >
          <Boton
            etiqueta="Subir documentos"
            tema="estandar"
            enClick={() => {irAgilizaProceso()}}
          />
          <SeparadorEspacio />
          <Boton
            etiqueta="Contacto HDI"
            tema="simple"
            enClick={irAsistenciaHDI}
          />
        </ContenedorBoton>
      </PantallaFondoGrisRobo>
    </>
  )
};

export default PantallaRequisitos;