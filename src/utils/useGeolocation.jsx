/* eslint-disable */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAccionesLog from "./useAccionesLog";

const useGeolocation = () => {
  const dispatch = useDispatch();
  const estadoApp = useSelector((state) => state);
  const { runAcceptLog, runDenialLog } = useAccionesLog((estadoApp.informacionContacto === undefined || estadoApp.informacionContacto === null) ? "" : estadoApp.informacionContacto.telefono);
  const [geolocation, setGeolocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onLocation = (pos) => {
    if (pos) {
      setLoading(false);
      setError(null);
      //asignarValorUbicacion(pos);
      setGeolocation({
        latitud: pos.coords.latitude,
        longitud: pos.coords.longitude,
      });
      const listaDetalle = [
        {"columna": "Latitud", "valor": `${pos.coords.latitude}`},
        {"columna": "Longitud", "valor": `${pos.coords.longitude}`},
      ];
      runAcceptLog(9, listaDetalle)
      dispatch({
        type: "AGREGAR",
        valor: {
          latitud: pos.coords.latitude,
          longitud: pos.coords.longitude,
        },
        indice: "geolocalizacion",
      });
    }
  };

  const onError = (error) => {
    //Pedir que active localizacion
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
    setLoading(false);
    setError(error);
    runDenialLog(9, [{ "columna": "ubicacion", "valor": "geolocalización no soportada" }])
    //setErrorUbicacion(error);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      let options = {
        enableHighAccuracy: true,
        setTimeout: 3000,
      };
      navigator.geolocation.getCurrentPosition(onLocation, onError, options);
    }
  };



  const getAsyncLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        let options = {
          enableHighAccuracy: true,
          setTimeout: 20000,
          maximumAge: 1000,
        };
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (pos) {
              setGeolocation({
                latitud: pos.coords.latitude,
                longitud: pos.coords.longitude,
              });
              const listaDetalle = [
                {"columna": "Latitud", "valor": `${pos.coords.latitude}`},
                {"columna": "Longitud", "valor": `${pos.coords.longitude}`},
              ];
              runAcceptLog(9, listaDetalle)
              dispatch({
                type: "AGREGAR",
                valor: {
                  latitud: pos.coords.latitude,
                  longitud: pos.coords.longitude,
                },
                indice: "geolocalizacion",
              });
              resolve({
                result: true,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              });
            }
          },
          (error) => {
            setError(error);
            reject(error);
          },
          options
        );
      } else {
        reject("La geolocalización no está soportada en este dispositivo");
        runDenialLog(9, [{ "columna": "ubicacion", "valor": "geolocalización no soportada" }])
        // alerta("No soportado en este dispositivo o navegador")
      }
    });
  };

  const hasPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        if (navigator.permissions && navigator.permissions.query) {
          navigator.permissions.query({ name: "geolocation" }).then((result) => {
            if (result.state == "granted") {
              resolve(true);
            } else if (result.state == "prompt") {
              runDenialLog(9, [{ "columna": "ubicacion", "valor": "no permitido" }])
              resolve(false);
            }
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    getLocation,
    getAsyncLocation,
    geolocation,
    setGeolocation,
    error,
    loading,
    hasPermission,
  };
};

export default useGeolocation;
