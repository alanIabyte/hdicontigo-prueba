import React, { useState, useEffect, memo, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import RegresarIcono from "@material-ui/icons/ChevronLeftRounded";
import {
  EnvolvedorEncabezado,
  TituloContenedor,
  AvatarUsuario,
} from "./EncabezadoPolizasSiniestradas.styled";
import avatar from "../../../recursos/imagenes/default-avatar.png";
import Constantes from "../../../recursos/constantes";
import { BotonIcono } from "../../encabezado/encabezado-componente/Encabezado.styled";

const Menu = lazy(() => import("../../menu"));

const nombreCookie = Constantes.nombreDeCookie;

const OBTENER_PERFIL = loader(
  "../../../graphQL/query/seguridad/obtener_perfil.graphql"
);

const EncabezadoPolizasSiniestradas = ({
  regresar,
  funcionRegresar,
  mostrarMenu,
}) => {
  const [cookie] = useCookies([nombreCookie]);
  const [seAbrioMenu, asignarValorSeAbrioMenu] = useState(false);
  const objetoCookie = cookie[nombreCookie];
  const estadoApp = useSelector((estado) => estado);
  const dispatch = useDispatch();
  const usuario =
    objetoCookie && objetoCookie.NombreAsegurado
      ? objetoCookie.NombreAsegurado
      : "usuario";

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
        imagenes && imagenes.length ? imagenes[0].url : avatar
      );
      dispatch({
        type: "AGREGAR",
        valor: imagenes && imagenes.length ? imagenes[0].url : avatar,
        indice: "fotoPerfil",
      });
    }
  }, [data, loading, error]);

  const alAbrirOCerrarMenu = (seAbrio) => {
    asignarValorSeAbrioMenu(seAbrio);
  };

  return (
    <EnvolvedorEncabezado key="EncabezadoPolizas" seAbrioMenu={seAbrioMenu}>
      {regresar ? (
        <BotonIcono type="button" onClick={funcionRegresar}>
          <RegresarIcono id="botonRegresar" fontSize="large" />
        </BotonIcono>
      ) : (
        mostrarMenu && (
          <Suspense fallback={null}>
            <Menu
              alAbrirOCerrarMenu={alAbrirOCerrarMenu}
              abierto={seAbrioMenu}
              absoluto
            />
          </Suspense>
        )
      )}
      <TituloContenedor id="tituloEncabezado">
        <AvatarUsuario src={imagenUsuario} />
        {diccionario.titulo}
      </TituloContenedor>
    </EnvolvedorEncabezado>
  );
};

EncabezadoPolizasSiniestradas.propTypes = {
  regresar: PropTypes.bool,
  funcionRegresar: PropTypes.func,
  mostrarMenu: PropTypes.bool,
};

EncabezadoPolizasSiniestradas.defaultProps = {
  regresar: false,
  funcionRegresar: () => {},
  mostrarMenu: false,
};

export default memo(
  EncabezadoPolizasSiniestradas,
  (prevProps, nextProps) => prevProps.regresar === nextProps.regresar
);
