/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import React, { Fragment } from 'react'
import { v4 } from 'uuid'
import { EnvolvedorPantalla, Pantalla } from '../componentes-styled-compartidos/Pantalla.styled'
import EncabezadoPolizasSiniestradas from '../encabezado-polizas-siniestradas'
import { MensajePequeno, Titulo } from '../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled'
import { EnvolvedorImagen } from '../acordeon-registro-poliza/acordeon-registro-poliza-componente/AcordeonRegistroPoliza.styled'
import { Contenedor, PantallaFondoBlanco } from '../pantalla-transaccion-mitec/pantalla-transaccion-mitec-componente/PantallaTransaccionMitec.styled'

const PantallaOficinas = (props) => {
  return (
    <Fragment key={v4()}>
      <EnvolvedorPantalla>
        <PantallaFondoBlanco>
          <Contenedor>
            <iframe src='https://www.hdi.com.mx/contactanos/oficinas-hdi/' className="iframe" title='oficinas' id="mitecIframe"/>
          </Contenedor>

        </PantallaFondoBlanco>
      </EnvolvedorPantalla>
    </Fragment>
  )
}

export default PantallaOficinas