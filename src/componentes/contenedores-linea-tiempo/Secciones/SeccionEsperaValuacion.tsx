/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import { useCookies } from "react-cookie";
import { Secciones } from "../../contenedor-reporte-ajuste/contenedor-reporte-ajuste-componente/ContenedorReporteAjuste.styled";
import Seccion from "../../seccion-pasos-progreso";
import {
  EnlaceBienvenida,
  EnlaceRegistroBienvenida,
} from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import {
  ResolucionCampo,
  ResolucionValor,
} from "../../resolucion/resolucion-componente/Resolucion.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import Boton from "../../boton/boton-componente/Boton";
import { ContenedorBoton } from "../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import useAlerta from "../../../utils/useAlerta";
import { Alerta } from "../../alerta";
import { IRedux } from "../../../interfaces/Redux/IRedux";
import { IGuardarTipoAtencion } from "../../../interfaces/indemnizacion/Iindemnizacion";
import "../styles.scss";
import { EnvolvedorImagen } from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import IcoHelp from "../../../recursos/iconos/Insumos PT/help.svg";
import constantes from "../../../recursos/constantes";
import { IEventosNotificaciones } from "../../../interfaces/Graphql/IEventosNotificaciones";

interface IProps {
  desplegarSecciones: boolean;
  eventosValuacion?: IEventosNotificaciones | undefined;
  tipoAtencion: string;
}

const configAlertaAyuda = {
  textoEncabezado: "Valuacion de daños",
  tipoIcono: "ayudaValuacion",
  colorAlerta: "amarillo",
  textoCuerpo:
    "Estamos trabajando en la estimación de daños de tu vehículo. El proceso puede demorar hasta 36 horas.",
  etiquetaBoton2: "Contacto HDI",
};

export const SeccionEsperaValuacion = ({
  desplegarSecciones,
  tipoAtencion,
}: IProps) => {
  // Extraemos el objeto 'datosReporteCompleto' y de el extraemos cada una de sus propiedades
  const estadoApp = useSelector((state: IRedux) => state);
  const history = useHistory();

  const alertaAyuda = useAlerta(configAlertaAyuda);

  return (
    <>
      <Alerta
        {...alertaAyuda}
        mostrarIcono
        manejarCierre={() => alertaAyuda.cerrar()}
        funcionLlamadaBoton2={() => {
          window.open("tel:*434");
        }}
      />
      <Secciones desplegado={desplegarSecciones}>
        <Seccion titulo="Centro de reparación" pendiente={false}>
          <ResolucionCampo>Tipo atención</ResolucionCampo>
          <ResolucionValor>{tipoAtencion}</ResolucionValor>
        </Seccion>
        <Seccion titulo="Inicio de valuación" pendiente>
          <ResolucionCampo>Fecha de asignación de valuación</ResolucionCampo>
          <ResolucionValor>DD/MM/YYYY</ResolucionValor>
        </Seccion>

        {/* La sección de estimación de daños puede cambiar si la notificacion aun no cuenta con los valores de deducible y costo de reparacion */}
        {/* debe mostrarse la información de espera */}
        <Seccion titulo="Estimación de daños" pendiente={false}>
          <ResolucionValor style={{ display: "inline" }}>
            Estatus:{" "}
          </ResolucionValor>
          <ResolucionCampo style={{ display: "inline" }}>
            En proceso{" "}
          </ResolucionCampo>
          <EnvolvedorImagen
            src={IcoHelp}
            style={{ width: "15px", cursor: "pointer" }}
            onClick={() => {
              alertaAyuda.mostrar();
            }}
          />
          <br />
          <ResolucionValor style={{ display: "inline" }}>
            Espera promedio:{" "}
          </ResolucionValor>
          <ResolucionCampo style={{ display: "inline" }}>
            36 horas
          </ResolucionCampo>

          <br />
          <br />

          {/* ESTA INFORMACION DEBE PROVENIR DE LA NOTIFICACION  */}
          {/* <ResolucionCampo>Costo de reparación:</ResolucionCampo>
          <ResolucionValor>$25,000.000</ResolucionValor>

          <ResolucionCampo>Deducible:</ResolucionCampo>
          <ResolucionValor>$8,000.000</ResolucionValor> */}
          {/* <>
            <ContenedorBoton>
              <Boton
                customClass="boton-boton--valuacion"
                etiqueta="Solicitar indemnización"
                tema="estandar"
                pequeno
                enClick={() => alertaConfirmarDG.mostrar()}
              />
            </ContenedorBoton>
            <ContenedorBoton>
              <Boton
                customClass="boton-boton--valuacion"
                etiqueta="Solicitar reparación"
                tema="simple"
                pequeno
              />
            </ContenedorBoton>
            <EnlaceRegistroBienvenida style={{ marginBottom: "20px" }}>
              <EnlaceBienvenida
                id="enlaceRegistro"
                enlace
                onClick={() => {
                  history.push({
                    pathname: "indemnizacion-opciones",
                    search: "?tipoAtencion=DP",
                  });
                }}
              >
                Conocer el pago de daños
              </EnlaceBienvenida>
            </EnlaceRegistroBienvenida>
          </> */}
        </Seccion>
      </Secciones>
    </>
  );
};
