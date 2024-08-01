/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/prefer-default-export, arrow-body-style
import React from "react";
import { useHistory } from "react-router-dom";
import { EnvolvedorPantalla, Pantalla } from "../../componentes/componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../componentes/encabezado/encabezado-componente/Encabezado";
import { TituloMisPolizas } from "../../componentes/pantalla-pruebas/PantallaTransaccionMitec.styled";


const PantallaError = () => {
    const history = useHistory();
    return (
        <>
          <EnvolvedorPantalla>
            <Encabezado
              titulo="Pagina no disponible"
              mostrarBotonRegresar
              mostrarBotonCerrar={false}
              funcionRegresar={history.goBack}
            />
            <Pantalla>
              <TituloMisPolizas>
                 Pagina no Disponible.
              </TituloMisPolizas>
            </Pantalla>
          </EnvolvedorPantalla>
        </>
    );
}; 
export default PantallaError;