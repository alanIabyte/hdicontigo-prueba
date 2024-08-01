/* eslint-disable */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  keysValores,
  IValores,
  IErroresValores,
} from "../../pantallas/pantallas-robo/utils";
import constantes from "../../recursos/constantes";
// import CampoTexto from "../campo-texto";
import { SeparadorLinea } from "../pantalla-editar-informacion-contacto/pantalla-editar-informacion-contacto/PantallaEditarInformacionContacto.styled";
import {
  ContenedorValor,
  Separador,
  SeparadorEspacio,
} from "../pantalla-formulario-informacion-contacto/pantalla-formulario-informacion-contacto/PantallaFormularioInformacionContacto.styled";
import { CampoRequeridoSeleccionCuestionario } from "../seleccion-cuestionario/seleccion-cuestionario-componente/SeleccionCuestionario.styled";
import CampoTexto from "../componentes-v2/campo-texto";

type IProps = {
  valores: IValores;
  alCambiarValor: (e: HTMLInputElement, valor: string) => void;
  usuarioLogeado: boolean;
  errores?: IErroresValores;
};

const nombreCookie = constantes.nombreDeCookie;

export const CamposContactoReportes = ({
  valores,
  alCambiarValor,
  usuarioLogeado,
  errores,
}: IProps) => {
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];

  const validaTelefono = () => {
    if (usuarioLogeado) {
      return objetoCookie.Usuario;
    }
    return valores.telefono;
  }

  return (
    <>
      <Separador id="separadorInfoContacto">Información de contacto</Separador>
      <SeparadorLinea />
      <div>
        <CampoTexto
          id="campoTelefono"
          etiqueta={"Teléfono"}
          marcador="Ingresa tu número de teléfono"
          valor={validaTelefono()}
          enCambio={(e: HTMLInputElement) =>
            alCambiarValor(e, keysValores.telefono)
          }
        />
        {errores?.errorTelefono && (
          <CampoRequeridoSeleccionCuestionario
            id="error-razon-duplicado"
            mostrar={errores?.errorTelefono}
            style={{ marginTop: "-30px", marginBottom: "0px" }}
          >
            {"Campo requerido para poder continuar"}
          </CampoRequeridoSeleccionCuestionario>
        )}
      </div>
      <SeparadorEspacio />
      <div>
        <CampoTexto
          etiqueta="Correo electrónico"
          marcador="Ingresa tu correo electrónico"
          enCambio={(e: HTMLInputElement) => alCambiarValor(e, keysValores.email)}
          // foco={focoNombre}
          id="campoTelefono"
          valor={valores.email}
        />
        {errores?.errorEmail && (
          <CampoRequeridoSeleccionCuestionario
            id="error-razon-duplicado"
            mostrar={errores?.errorEmail}
            style={{ marginTop: "-30px", marginBottom: "0px" }}
          >
            {"Campo requerido para poder continuar"}
          </CampoRequeridoSeleccionCuestionario>
        )}
      </div>

      <Separador id="separadorInfoVehiculo" style={{ marginTop: "30px" }}>
        Información del vehículo
      </Separador>
      <SeparadorLinea />
      <div>
        <CampoTexto
          etiqueta="Color del vehículo"
          marcador="Ingresa el color de tu vehículo"
          enCambio={(e: HTMLInputElement) => alCambiarValor(e, keysValores.color)}
          // foco={focoNombre}
          id="campoColor"
          valor={valores.color}
        />
        {errores?.errorColor && (
          <CampoRequeridoSeleccionCuestionario
            id="error-razon-duplicado"
            mostrar={errores?.errorColor}
            style={{ marginTop: "-30px", marginBottom: "0px" }}
          >
            {"Campo requerido para poder continuar"}
          </CampoRequeridoSeleccionCuestionario>
        )}
      </div>
      <SeparadorEspacio />
      <div>
        <CampoTexto
          etiqueta="Características del vehículo"
          marcador="Ingresa las caracteristicas de tu vehículo"
          enCambio={(e: HTMLInputElement) =>
            alCambiarValor(e, keysValores.caracteristicas)
          }
          // foco={focoNombre}
          id="campoCaracteristicas"
          valor={valores.caracteristicas}
        />
        {errores?.errorCaracteristicas && (
          <CampoRequeridoSeleccionCuestionario
            id="error-razon-duplicado"
            mostrar={errores?.errorCaracteristicas}
            style={{ marginTop: "-30px", marginBottom: "0px" }}
          >
            {"Campo requerido para poder continuar"}
          </CampoRequeridoSeleccionCuestionario>
        )}
      </div>
    </>
  );
};
