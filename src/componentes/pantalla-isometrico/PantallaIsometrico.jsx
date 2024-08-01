/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable arrow-body-style */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react'
// import Encabezado from '../encabezado/encabezado-componente/Encabezado';
import { Contenedor, EnvolvedorPantallaPolizas } from '../pantalla-pruebas/PantallaTransaccionMitec.styled';

const PantallaIsometrico = () => {
  return (
    <EnvolvedorPantallaPolizas>
      {/* <Encabezado /> */}
      <Contenedor>
        <iframe width="700" height="400" src="https://xd.adobe.com/embed/db47f3cb-a453-409a-b677-8c11661377cc-8e14/" frameborder="0" allowfullscreen></iframe>
      </Contenedor>
    </EnvolvedorPantallaPolizas>
  )
}

export default PantallaIsometrico;
