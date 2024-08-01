/* eslint-disable */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import { EnvolvedorPantalla } from '../../componentes/componentes-styled-compartidos/Pantalla.styled';
import EncabezadoContenedor from '../../componentes/encabezado';
import { useHistory } from 'react-router-dom';
import { PantallaFondoGris } from '../../componentes/pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled';
import { TituloCuestionarioReporte } from '../../componentes/pantalla-cuestionario-reporte/pantalla-cuestionario-reporte-componente/PantallaCuestionarioReporte.styled';
import { MensajePequeno } from '../../componentes/pantalla-pruebas/PantallaTransaccionMitec.styled';
import { ContenedorPreguntas } from '../../componentes/pantalla-cuestionario-reportes/pantalla-cuestionario-reportes-componente/PantallaCuestionarioComponentes.styled';
import "./../../componentes/pantalla-cuestionario-reportes/pantalla-cuestionario-reportes-componente/styles.scss";
import { Boton } from '../../componentes';

const ContenedorNumeroPregunta = (props: any) => (
  <div className={`semi-circulo-2 color-${props.numero}`}>
    <p>{props.numero}</p>
  </div>
);

interface IData {
  id: number;
  texto: string;
}

const PantallaRequisitosLiberacionVehiculo = () => {

  const history = useHistory();

  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    setData([
      {
        id: 1,
        texto: "Denuncia con el relato de los hechos ante la fiscalía."
      },
      {
        id: 2,
        texto: "Acreditación de la propiedad ante la fiscalía con las autoridades."
      },
      {
        id: 3,
        texto: "Facturas subsecuentes del vehículo (en original)."
      },
      {
        id: 4,
        texto: "Identificación oficial."
      }
    ]);
  }, []);

  const irAsistenciaHDI = () => {
    history.push({
      pathname: "/asistencia-hdi",
      state: {
        tipoAtencion: "robo"
      },
    });
  };

  return (
    <EnvolvedorPantalla>
      <EncabezadoContenedor
        titulo="Conoce el proceso"
        funcionRegresar={history.goBack}
      />
      <PantallaFondoGris style={{ height: "calc(100vh - 136px)", overflowX: "hidden", overflowY: "auto", justifyContent: "flex-start", flexDirection: "column" }}>
        <TituloCuestionarioReporte>
          Requisitos trámite de liberación del vehículo
        </TituloCuestionarioReporte>
        <MensajePequeno>
          Anticípate y reúne los documentos necesarios para la liberación de tu vehículo
        </MensajePequeno>
        <ContenedorPreguntas numeroPreguntas={data.length} style={{ marginBottom: "auto" }}>
          {data.map((dato: IData, key: number) => (
            <div style={{ display: "flex" }} key={key}>
              <ContenedorNumeroPregunta numero={dato.id} />
              <MensajePequeno style={{ height: "20px", marginLeft: "10px" }}>
                {dato.texto}
              </MensajePequeno>
            </div>
          ))}
        </ContenedorPreguntas>
        <Boton
          tema="simple"
          etiqueta="Contacto HDI"
          style={{ marginTop: "auto" }}
          enClick={() => {
            irAsistenciaHDI();
          }}
          />
      </PantallaFondoGris>
    </EnvolvedorPantalla>
  );
};

export default PantallaRequisitosLiberacionVehiculo;
