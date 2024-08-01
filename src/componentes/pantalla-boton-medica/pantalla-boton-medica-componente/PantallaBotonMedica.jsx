/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import React, { Fragment, useState } from "react";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Encabezado, EnvolvedorIcono } from "../../acordeon-detalle-poliza/acordeon-detalle-poliza-componente/AcordeonDetallePoliza.styled";
import {
  TituloAcordeon,
  Contenedor,
  ContenedorBotones,
  ContenidoAcordeon,
  ParrafoAcordeon,
  EnvolvedorImagen,
} from "../../acordeon-registro-poliza/acordeon-registro-poliza-componente/AcordeonRegistroPoliza.styled";
import { EnvolvedorPantalla, Pantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import PantallaOficinas from "../../pantalla-oficinas/PantallaOficinas";
import PantallaProveedor from "../../pantalla-proveedor/PantallaProveedor";
import {
  MensajePequeno,
  Titulo,
} from "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";
import IconoOficinas from "../../../recursos/iconos/hdi-c/ico_gmm_oficina.svg";
import IconoProveedor from "../../../recursos/iconos/hdi-c/ico_gmm_proveedores.svg"
import IconoServicio from "../../../recursos/iconos/hdi-c/ico_gmm_clientes.svg"
import Constantes from "../../../recursos/constantes";

const nombreCookie = Constantes.nombreDeCookie;


const PantallaBotonMedica = () => {
  const location = useLocation();
  const history = useHistory();
  const { boton: botonLocation } = location.state;
  const [estadoBotones] = useState(botonLocation);
  const [estadoPantalla, establecerEstadoPantalla] = useState("");
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }

  const botones = [
    {
      titulo: "Atención a clientes",
      descripcion: "Marca para apoyarte a resolver tus dudas.",
      tipo: "servicio",
      icono: IconoServicio
    }, 
    {
      titulo: "HDI Seguros",
      descripcion: "Ubica la ubicación más cercana",
      tipo: "oficinas",
      icono: IconoOficinas
    } 
  ];

  const botones2 = [
    {
      titulo: "Red de proveedores médicos",
      descripcion: "Encuentra el servicio médico que necesitas.",
      tipo: "proveedor",
      icono: IconoProveedor
    }, 
    {
      titulo: "Atención a clientes",
      descripcion: "Marca para apoyarte a resolver tus dudas.",
      tipo: "servicio",
      icono: IconoServicio
    }, 
    {
      titulo: "HDI Seguros",
      descripcion: "Ubica la oficina más cercana a ti.",
      tipo: "oficinas",
      icono: IconoOficinas
    } 
  ];

  const reedireccionar = () => {
    window.location.href = "tel: +55 6826 929"
  };

  return (
    <Fragment key={v4()}>
       <EnvolvedorPantalla>
        <EncabezadoPolizasSiniestradas 
                key={v4()}
                regresar={true}
                funcionRegresar={() => window.history.back()}
              />
        { estadoBotones === "HDIP" && estadoPantalla === "" && (
            <Pantalla>
              <Titulo>Hospitales y consultorios</Titulo>
              <MensajePequeno>
                Elige la opcion que quieres consultar
              </MensajePequeno>

              <ContenedorBotones>
                {botones.map((boton) => (
                  <Contenedor
                    show 
                    key={v4()}
                    onClick={() => establecerEstadoPantalla(boton.tipo)}
                  >
                    <Encabezado>
                      <EnvolvedorIcono>
                        <EnvolvedorImagen src={boton.icono} style={{width: "30px"}}/>
                      </EnvolvedorIcono>
                      <ContenidoAcordeon>
                        <TituloAcordeon>{boton.titulo}</TituloAcordeon>
                        <ParrafoAcordeon>{boton.descripcion}</ParrafoAcordeon>
                      </ContenidoAcordeon>
                    </Encabezado>
                  </Contenedor>
                ))}
              </ContenedorBotones>
            </Pantalla>
        )}

        { estadoBotones === "HDIV" && estadoPantalla === "" && (
            <Pantalla>
              <Titulo>Hospitales y consultorios</Titulo>
              <MensajePequeno>
                Elige la opcion que deseas realizar
              </MensajePequeno>

              <ContenedorBotones>
                {botones2.map((boton) => (
                  <Contenedor
                    show 
                    key={v4()}
                    onClick={() => establecerEstadoPantalla(boton.tipo)}
                  >
                    <Encabezado>
                      <EnvolvedorIcono>
                        <EnvolvedorImagen src={boton.icono} style={{width: "25px"}}/>
                      </EnvolvedorIcono>
                      <ContenidoAcordeon>
                        <TituloAcordeon>{boton.titulo}</TituloAcordeon>
                        <ParrafoAcordeon>{boton.descripcion}</ParrafoAcordeon>
                      </ContenidoAcordeon>
                    </Encabezado>
                  </Contenedor>
                ))}
              </ContenedorBotones>
            </Pantalla>
        )}
       </EnvolvedorPantalla>

      { estadoPantalla === "proveedor" && (
        <PantallaProveedor establecerEstadoPantalla={establecerEstadoPantalla}/>
      )}

      { estadoPantalla === "servicio" && reedireccionar()}

      { estadoPantalla === "oficinas" && (
        <PantallaOficinas establecerEstadoPantalla={establecerEstadoPantalla}/>
      )}
    </Fragment>
  )
}

export default PantallaBotonMedica;
