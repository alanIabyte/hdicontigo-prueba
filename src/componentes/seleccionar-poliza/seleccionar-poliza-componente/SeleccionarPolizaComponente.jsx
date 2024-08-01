/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import React from "react";
import { useHistory } from "react-router-dom";
import { EnvolvedorPantalla, Pantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoContenedor from "../../encabezado";
import { MensajePequeno, Titulo } from "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";
import {
  Contenedor,
  ContenedorBotones,
  ContenidoAcordeon,
  Encabezado,
  EnvolvedorIcono,
  EnvolvedorImagen,
  ParrafoAcordeon,
  TituloAcordeon,
} from "../../acordeon-registro-poliza/acordeon-registro-poliza-componente/AcordeonRegistroPoliza.styled";
import IconoAutoVerde from "../../../recursos/iconos/contigo/ico_autos_white-bg.svg";
import IconoDanoVerde from "../../../recursos/iconos/contigo/ico_daños.svg";
import IconoMaletinVerde from "../../../recursos/iconos/contigo/ico_gmm.svg";

const diccionario = {
  title: "Encuentra tu póliza",
  subtitle: "Elige el tipo de póliza que deseas buscar.",
};

export const SeleccionarPolizaComponente = ({ setShowInput, setPolicyType}) => {
  const history = useHistory();

  const botones = [
    {
      titulo: "HDI Auto",
      tipoPoliza: "AUTR",
      descripcion: "Busca una póliza de auto",
      icono: IconoAutoVerde,
    },
    {
      titulo: "HDI Daños",
      tipoPoliza: "DAN",
      descripcion: "Busca tu seguro de casa",
      icono: IconoDanoVerde,
    },
    {
      titulo: "HDI Gastos Médicos Mayores",
      tipoPoliza: "GMM",
      descripcion: "Busca tu seguro de Médica Total Plus o Médica Vital",
      icono: IconoMaletinVerde,
    },
  ];

  const selectPolicy = (policy) => {
    setPolicyType(policy);
    setShowInput(true);
  }

  return (
    <>
      <EnvolvedorPantalla key="envolvedor-pantalla-poliza">
          <EncabezadoContenedor
            titulo="Registro"
            funcionRegresar={() => {
              history.goBack();
              sessionStorage.removeItem("estadoRedux");
            }}
          />

          <Pantalla>
            <Titulo id="titulo">{diccionario.title}</Titulo>
            <MensajePequeno id="mensajePequeno">
              {diccionario.subtitle}
            </MensajePequeno>
            <ContenedorBotones>
              {botones.map((button) => (
                <Contenedor
                  show
                  key={button.tipoPoliza}
                  onClick={() => selectPolicy(button.tipoPoliza)}
                >
                  <Encabezado>
                    <EnvolvedorIcono>
                      <EnvolvedorImagen src={button.icono} />
                    </EnvolvedorIcono>
                    <ContenidoAcordeon>
                      <TituloAcordeon>{button.titulo}</TituloAcordeon>
                      <ParrafoAcordeon>{button.descripcion}</ParrafoAcordeon>
                    </ContenidoAcordeon>
                  </Encabezado>
                </Contenedor>
              ))}
            </ContenedorBotones>
          </Pantalla>
        </EnvolvedorPantalla>
    </>
  )
}
