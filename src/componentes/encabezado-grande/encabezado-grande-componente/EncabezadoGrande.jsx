/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import RegresarIcono from "@material-ui/icons/ChevronLeftRounded";
import {
  EnvolvedorEncabezado,
  TituloContenedor,
  AvatarUsuario,
  ContenedorIcono,
} from "./EncabezadoGrande.styled";
import avatar from "../../../recursos/imagenes/default-avatar.png";
import Constantes from "../../../recursos/constantes";
import useAccionesLog from "../../../utils/useAccionesLog";

const nombreCookie = Constantes.nombreDeCookie;

const OBTENER_PERFIL = loader(
  "../../../graphQL/query/seguridad/obtener_perfil.graphql"
);

const EncabezadoGrande = (props) => {
  const [cookie] = useCookies([nombreCookie]);
  const { pantalla } = props;
  const history = useHistory();
  const objetoCookie = cookie[nombreCookie];
  const estadoApp = useSelector((estado) => estado);
  const { runCancelLog } = useAccionesLog(
    estadoApp.informacionContacto.telefono
  );
  let usuario =
    objetoCookie && objetoCookie.NombreAsegurado
      ? objetoCookie.NombreAsegurado
      : "usuario";
  if (estadoApp.NombreUsuarioPerfil && estadoApp.NombreUsuarioPerfil.data) {
    usuario = estadoApp.NombreUsuarioPerfil.data;
  }
  const diccionario = {
    titulo: `Hola, ${usuario}`,
  };

  const usuarioPerfil = objetoCookie && objetoCookie.Usuario;
  const token = objetoCookie && objetoCookie.access_token;
  const [obtenerPerfil, { loading, error, data }] = useLazyQuery(
    OBTENER_PERFIL,
    {
      fetchPolicy: "cache-first",
    }
  );
  const [imagenUsuario, asignarValorImagenUsuario] = useState(avatar);

  useEffect(() => {
    obtenerPerfil({
      variables: { token, usuario: usuarioPerfil },
    });
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
        imagenes && imagenes.length ? imagenes[0].url : avatar
      );
    }
  }, [data, loading, error]);

  const regresar = () => {
    if (pantalla === "mitec") {
      runCancelLog(2);
    }
    history.goBack();
  };

  return (
    <EnvolvedorEncabezado key={v4()}>
      <ContenedorIcono>
        <RegresarIcono className="icono" onClick={regresar} />
      </ContenedorIcono>
      <TituloContenedor id="tituloEncabezado">
        <AvatarUsuario src={imagenUsuario} />
        {diccionario.titulo}
      </TituloContenedor>
    </EnvolvedorEncabezado>
  );
};

export default EncabezadoGrande;

/*
{diccionario.titulo},{" "}
        {data?.obtener_perfil?.dato?.nombre
          ? data?.obtener_perfil?.dato?.nombre
          : "asegurado."}
*/
