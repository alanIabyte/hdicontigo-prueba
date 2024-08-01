/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { loader } from "graphql.macro";
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { AvatarUsuario } from "../../encabezado-polizas-siniestradas/encabezado-polizas-siniestradas-componente/EncabezadoPolizasSiniestradas.styled";
import { TituloContenedor } from "../../encabezado/encabezado-componente/Encabezado.styled";
import EnvolvedorEncabezadoSimple from "./EncabezadoSimple.styled";
import constantes from "../../../recursos/constantes";

const OBTENER_PERFIL = loader(
  "../../../graphQL/query/seguridad/obtener_perfil.graphql"
);

const nombreCookie = constantes.nombreDeCookie;


const EncabezadoSimple = () => {

  const estadoApp = useSelector((state) => state);
  const [imagenUsuario, asignarValorImagenUsuario] = useState("");
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const [obtenerPerfil, { loading, error, data }] = useLazyQuery(
    OBTENER_PERFIL,
    {
      fetchPolicy: "cache-first",
    }
  );

  const usuarioPerfil = objetoCookie && objetoCookie.Usuario;
  const token = objetoCookie && objetoCookie.access_token;
  const usuario =
  objetoCookie && objetoCookie.NombreAsegurado
    ? objetoCookie.NombreAsegurado
    : "usuario";


  useEffect(() => {
    if (!estadoApp.fotoPerfil) {
      obtenerPerfil({
        variables: { token, usuario: usuarioPerfil },
      });
      return;
    }
    asignarValorImagenUsuario(estadoApp.fotoPerfil);
  }, []);

  useEffect(() => {
    if (
      !loading &&
      data &&
      data.obtener_perfil &&
      data.obtener_perfil.completado
    ) {
      const {
        obtener_perfil: {
          dato: { imagenes },
        },
      } = data;
      asignarValorImagenUsuario(
        imagenes && imagenes.length ? imagenes[0].url : ""
      );
    }
  }, [data, loading, error]);

  return (
    <EnvolvedorEncabezadoSimple>
      <AvatarUsuario src={imagenUsuario} />
      <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px", overflow: "hidden"}}>
        <TituloContenedor style={{ textAlign: "start", color: "black", marginBottom: "0px", fontWeight: "500" }}>¡Hola!</TituloContenedor>
        <TituloContenedor style={{ textAlign: "start", letterSpacing: "1px", fontWeight: "600" }}> {usuario|| "Usuario"} </TituloContenedor>
      </div>

    </EnvolvedorEncabezadoSimple>
  )
};

export default EncabezadoSimple;
