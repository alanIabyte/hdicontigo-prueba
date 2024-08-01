/* eslint-disable */
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import { useEffect } from "react";

const CREAR_NOTIFICACION = loader(
  "../graphQL/mutation/notificaciones/notificaciones_crear.graphql"
);

const useNotificaciones = () => {

  const [crearNoti, { data: dataCrearNoti, loading: loadingCrearNoti, error: errorCrearNoti }] = useMutation(CREAR_NOTIFICACION);

  useEffect(() => {
    if (errorCrearNoti) {
      console.log("Error al crear la notificación");
      console.log(errorCrearNoti);
    }
  }, [dataCrearNoti, loadingCrearNoti, errorCrearNoti]);

  const crearNotificacion = (titulo, contenido, tipo, infoadicional, usuario) => {
    crearNoti({
      variables: {
        titulo: titulo,
        contenido: contenido,
        tipo: tipo,
        infoadicional: infoadicional,
        usuario: usuario,
      }
    });
  }

  return {
    crearNotificacion,
  }

}

export default useNotificaciones;