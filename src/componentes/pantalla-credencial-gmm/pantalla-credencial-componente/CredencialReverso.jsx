/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import {
  EnvolvedorField,
  EnvolvedorDatos,
  CuerpoTexto,
  SeparadorLinea,
  EnvolvedorCentrar,
  Espacio,
  Leyenda,
  Hipervinculo,
  ContainerImgTxt,
  // ImageResize,
} from "./PantallaCredencialGmm.styled";
import { ReactComponent as IconoTelefono } from "../recursos/telefono_gmm.svg";

const diccionario = {
  tituloCabecera: "Notificaciones, Emergencias y Accidentes.",
  cuerpo1: "Llámanos sin costo a nuestra línea de",
  negritasCiudad1: "CDMX ",
  telefono1: "55 6826 9292",
  negritasCiudad2: "Resto del país",
  telefono2: "800 649 0165",
  cuerpo2:
    "Servicio al cliente por teléfono de lunes a viernes de 8:00 a 17:00 hrs. y sábado de 8:00 a 15:00hrs,",
  negritasCuerpo2:
    "opción 2 Bupa en Casa, opción 4 administración de tu póliza.",
  pregunta: "¿Cuentas con",
  preguntaNegritas: "Asistencia en el extranjero",
  pregunta2: "y tienes una emergencia? Llámanos a",
  telefonoPregunta: "+ 1 901 403 6440.",
  negritasCuerpo3: "Datos de Facturación de Servicios Médicos:",
  cuerpo3: "Bupa México Compañia de Seguros S.A. de C.V.",
  rfcCuerpo3: "RFC: BMS030731PC4 Corporativo Antara,",
  avenidaCuerpo3:
    "Avenida Ejercito Nacional 843 - B, Pio 9, Colonia Granada, Miguel Hidalgo, Ciudad de México.",
  urlHDI: "https://www.hdi.com.mx/personas/seguro-gastos-medicos-mayores/",
  letraPequena: "Esta tarjeta es únicamente para identificación.",
  letraPequena2: "Los beneficios están sujetos a los",
  negritasPoliza: "términos de la póliza",
  letraPequena3:
    " y los beneficios o restricciones adicionales estipulados en su certificado de cobertura.",
};

const CredencialReverso = () => {
  const fuenteFam = "var(--fuente-proxima-bold)";
  return (
    <>
      <EnvolvedorField color="azul">
        <Leyenda color="azul">{diccionario.tituloCabecera}</Leyenda>
        <EnvolvedorDatos>
          <EnvolvedorCentrar>
            <CuerpoTexto>
              {diccionario.cuerpo1}{" "}
              <span style={{ fontFamily: fuenteFam }}>
                atención nacional 24/7.
              </span>
            </CuerpoTexto>
            <Espacio />
            <ContainerImgTxt>
              <IconoTelefono
                width={30}
                height={20}
                style={{
                  transform: "scale(1.5)",
                  display: "none !important",
                  float: "left",
                }}
              />
              <CuerpoTexto
                style={{
                  fontFamily: fuenteFam,
                  color: "#1777bd",
                }}
              >
                {diccionario.negritasCiudad1}
                <span
                  style={{
                    fontFamily: fuenteFam,
                    color: "var(--texto-azul)",
                  }}
                >
                  <Hipervinculo href="tel:5568269292">
                    {diccionario.telefono1}
                  </Hipervinculo>
                </span>
              </CuerpoTexto>
            </ContainerImgTxt>
            <CuerpoTexto
              style={{
                fontFamily: fuenteFam,
                color: "#1777bd",
              }}
            >
              {diccionario.negritasCiudad2}
              <span
                style={{
                  fontFamily: fuenteFam,
                  color: "var(--texto-azul)",
                }}
              >
                {" "}
                <Hipervinculo href="tel:8006490165">
                  {diccionario.telefono2}
                </Hipervinculo>
              </span>
            </CuerpoTexto>
          </EnvolvedorCentrar>
        </EnvolvedorDatos>
        {/* <SeparadorLinea /> */}
        <EnvolvedorDatos
          style={{
            backgroundColor: "#f3f5f9",
          }}
        >
          <EnvolvedorCentrar>
            <CuerpoTexto>
              {diccionario.cuerpo2}
              <span
                style={{
                  fontFamily: fuenteFam,
                }}
              >
                {" "}
                {diccionario.negritasCuerpo2}
              </span>
            </CuerpoTexto>
            <Espacio />
            <CuerpoTexto>
              {diccionario.pregunta}{" "}
              <span
                style={{
                  fontFamily: fuenteFam,
                }}
              >
                {diccionario.preguntaNegritas}
              </span>
              <span> {diccionario.pregunta2} </span>
              <span
                style={{
                  fontFamily: fuenteFam,
                }}
              >
                {" "}
                {diccionario.telefonoPregunta}
              </span>
            </CuerpoTexto>
          </EnvolvedorCentrar>
        </EnvolvedorDatos>
        <Espacio />
        <EnvolvedorDatos
          style={{
            padding: "0",
            border: "5px",
          }}
        >
          <EnvolvedorCentrar>
            <CuerpoTexto
              style={{
                fontFamily: fuenteFam,
                color: "#1777bd",
              }}
            >
              {diccionario.negritasCuerpo3}
            </CuerpoTexto>
            <CuerpoTexto>{diccionario.cuerpo3}</CuerpoTexto>
            <CuerpoTexto>{diccionario.rfcCuerpo3}</CuerpoTexto>
            <CuerpoTexto>{diccionario.avenidaCuerpo3}</CuerpoTexto>
            <CuerpoTexto>
              <Hipervinculo href={diccionario.urlHDI}>
                https://www.hdi.com.mx/personas/seguro-gastos-medicos-mayores/
              </Hipervinculo>
            </CuerpoTexto>
          </EnvolvedorCentrar>
          <Espacio />
          <EnvolvedorCentrar
            style={{
              backgroundColor: "#1777bd",
              padding: "5px",
            }}
          >
            <CuerpoTexto
              style={{
                fontFamily: fuenteFam,
                color: "white",
              }}
            >
              {diccionario.letraPequena}
            </CuerpoTexto>
            <CuerpoTexto>
              <span style={{ color: "white" }}>
                {" "}
                {diccionario.letraPequena2}
              </span>
              <span
                style={{
                  fontFamily: fuenteFam,
                  color: "white",
                }}
              >
                {" "}
                {diccionario.negritasPoliza}
              </span>
              <span
                style={{
                  color: "white",
                }}
              >
                {diccionario.letraPequena3}
              </span>
            </CuerpoTexto>
          </EnvolvedorCentrar>
        </EnvolvedorDatos>
      </EnvolvedorField>
    </>
  );
};
export default CredencialReverso;
