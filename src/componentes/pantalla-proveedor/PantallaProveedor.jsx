/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import React from 'react'
import { EnvolvedorPantalla, Pantalla } from '../componentes-styled-compartidos/Pantalla.styled'
import EncabezadoPolizasSiniestradas from '../encabezado-polizas-siniestradas'
import { Titulo } from '../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled'
import { Contenedor, PantallaFondoBlanco } from '../pantalla-transaccion-mitec/pantalla-transaccion-mitec-componente/PantallaTransaccionMitec.styled'
import { ContenedorForm, SelectInput } from './PantallaProveedor.styled';

const PantallaProveedor = (props) => {

  const cambiarEstado = () => {
    console.log('Hasta aqui llega el diseno');
  };

  return (
    <>
      <EnvolvedorPantalla>
        <Pantalla>
          <PantallaFondoBlanco>
            <Contenedor>
              <iframe src='https://www.bupasalud.com.mx/salud.php' className="iframe" title='salud'></iframe>
            </Contenedor>
          </PantallaFondoBlanco>
        </Pantalla>
      </EnvolvedorPantalla>
    </>
  )
}

export default PantallaProveedor