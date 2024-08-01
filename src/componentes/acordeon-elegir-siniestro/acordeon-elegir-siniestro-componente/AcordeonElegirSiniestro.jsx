/* eslint-disable prefer-const */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import useRedirect from "../../../utils/useRedirect";
import useValidateLogin from "../../../utils/useValidateLogin";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoContenedor from "../../encabezado";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import {
  Titulo,
  SubTitulo,
} from "../../pantalla-registro-poliza/pantalla-registro-poliza-componente/PantallaRegistroPoliza.styled";
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
import IconoDanosVehiculo from "../../../recursos/iconos/hdi-c/reporte-siniestro/danos.svg";
import IconoGrua from "../../../recursos/iconos/hdi-c/reporte-siniestro/grua.svg";
import IconoCristal from "../../../recursos/iconos/hdi-c/reporte-siniestro/cristal.svg";
import IconoRobo from "../../../recursos/iconos/hdi-c/reporte-siniestro/robo.svg";
import showConfig from "../../../utils/configs";
import MenuBottomComponente from "../../menu-bottom";
import { validaDispositivoCelular } from "../../../utils/validaDispositivo";
import { ContenedorBoton } from "../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import Boton from "../../boton/boton-componente/Boton";
import { Alerta } from "../../alerta";

// const nombreCookie = constantes.nombreDeCookie;

const configAlertCall911 = {
  textoEncabezado: "Antes de comenzar, notifica a las autoridades",
  tipoIcono: "911",
  colorAlerta: "rojo",
  textoCuerpo:
    "Ellos te brindarán protección y primeros auxilios, también facilitarás la recuperación del vehículo.",
  etiquetaBoton: "Llamar al 911",
  temaBoton: "rojo",
  etiquetaBoton2: "Continuar",
  temaBoton2: "simple",
};

const AcordeonElegirSiniestro = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  // const { redirect: redirectIngreso } = useRedirect("/ingreso-poliza");
  const { validateUser } = useValidateLogin();
  const [verMenuInferior, setVerMenuInferior] = useState(false);

  const [alertaCall911, setAlertaCall911] = useState(false);

  let header = "polizasSiniestradas";
  if (!validateUser) {
    header = "noLogin";
  }
  // const redirect = useRedirect("/");
  const redirect = () => {
    history.push("/mis-polizas");
  };
  const claims = [
    {
      title: "Daños a tu vehículo",
      desc: "Reporta tu accidente",
      action: "crash",
      business: "AUTR",
      icon: IconoDanosVehiculo,
    },
    {
      title: "Asistencia de grúa",
      desc: "Asistencia de grúa en caso de avería",
      action: "tow",
      business: "AUTR",
      icon: IconoGrua,
    },
  ];
  if (showConfig.showRobo) {
    claims.push({
      title: "Robo total",
      desc: "Reporta el robo de tu vehículo",
      action: "robbery",
      business: "AUTR",
      icon: IconoRobo,
    });
  }
  if (showConfig.ShowCristaleras) {
    claims.push({
      title: "Cristal",
      desc: "Solicita tu cambio de cristal",
      action: "cristal",
      business: "AUTR",
      icon: IconoCristal,
    });
  }

  const realizarReedireccion = (claim) => {
    dispatch({
      type: "AGREGAR",
      indice: "seatedClaim",
      valor: claim,
    });

    if (location.state) {
      let { poliza, numSerie } = location.state;
      if (numSerie.length > 4) {
        numSerie = numSerie.slice(-4);
      }
      if (claim === "crash") {
        history.push({
          pathname: "/ingreso-poliza",
          search: `?numeroPoliza=${poliza}&vin=${numSerie}`,
          state: {
            paginaAnterior: "/elegir-siniestro",
            claim,
          },
        });
        return;
      }

      if (claim === "robbery") {
        const request = window.indexedDB.open("mediaRobo", 2);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          const objectStore = db.createObjectStore("audios", {
            keyPath: "id",
            autoIncrement: true,
          });
          console.log("Base de datos de robo creada");
        };

        request.onsuccess = (event) => {
          const db = event.target.result;
          console.log("Base de datos de robo abierta");
        };

        request.onerror = (event) => {
          console.log(
            "Error al abrir la base de datos de robo",
            event.target.error
          );
        };
        setAlertaCall911(true);
        dispatch({
          type: "AGREGAR",
          indice: "datosReportePoliza",
          valor: {
            poliza,
            numSerie,
          },
        });
        return;
      }

      if (claim === "cristal") {
        history.push({
          pathname: "/ingreso-poliza",
          search: `?numeroPoliza=${poliza}&vin=${numSerie}&Ser=${claim}`,
          state: {
            paginaAnterior: "/elegir-siniestro",
            claim,
          },
        });
        return;
      }

      if (showConfig.showSegimientoGruas && claim === "tow") {
        history.push({
          pathname: "/ingreso-poliza",
          search: `?numeroPoliza=${poliza}&vin=${numSerie}`,
          state: {
            paginaAnterior: "/elegir-siniestro",
            claim,
          },
        });
        return;
      }

      // history.push({
      //   pathname: "/reporte-identificar",
      //   search: `?numeroPoliza=${poliza}&vin=${numSerie}`,
      //   state: {
      //     paginaAnterior: "/elegir-siniestro",
      //     claim,
      //   },
      // });
      return;
    }

    if (claim === "crash") {
      history.push("/ingreso-poliza", {
        paginaAnterior: "/elegir-siniestro",
        claim,
      });
      return;
    }

    if (claim === "cristal") {
      history.push("/ingreso-poliza", {
        paginaAnterior: "/elegir-siniestro",
        claim,
      });
      return;
    }

    if (claim === "robbery") {
      setAlertaCall911(true);
      return;
    }
    if (showConfig.showSegimientoGruas && claim === "tow") {
      history.push({
        pathname: "/ingreso-poliza",
        state: {
          claim,
        },
      });
    } else {
      window.open("tel:*434");
    }

    // history.push("reporte-identificar", {
    //   paginaAnterior: "elegir-siniestro",
    //   claim,
    // });
  };

  const irConoceQueHacer = () => {
    let search = "?reporte=robo";
    if (location.state) {
      let { poliza, numSerie } = location.state;
      if (numSerie.length > 4) {
        numSerie = numSerie.slice(-4);
      }
      search = `${search}&numeroPoliza=${poliza}&vin=${numSerie}`;
    }
    history.push({
      pathname: "conoce-que-hacer",
      search,
      state: {
        claim: "robbery",
      },
    });
  };

  useEffect(() => {
    if (validateUser) {
      setVerMenuInferior(validaDispositivoCelular());
    }
  }, []);

  useEffect(() => {
    if (location?.state?.claimRecuperar) {
      const { polizaRecuperada, vin } = location.state;
      dispatch({
        type: "AGREGAR",
        indice: "datosIngresoPolizaCobranza",
        valor: {
          vin,
          poliza: polizaRecuperada,
        },
      });
      if (location?.state?.claimRecuperar === "crash") {
        history.push({
          pathname: "/ingreso-poliza",
          search: `?numeroPoliza=${polizaRecuperada}&vin=${vin}`,
          state: {
            paginaAnterior: "/elegir-siniestro",
            recuperarPoliza: true,
          },
        });
        return;
      }
      history.push({
        pathname: "/reporte-identificar",
        search: `?numeroPoliza=${polizaRecuperada}&vin=${vin}`,
        state: {
          claim: location.state.claimRecuperar,
          paginaAnterior: "/elegir-siniestro",
          recuperarPoliza: true,
        },
      });
    }
  }, []);

  return (
    <EnvolvedorPantalla>
      {header === "polizasSiniestradas" && (
        <EncabezadoPolizasSiniestradas
          funcionRegresar={redirect}
          regresar="true"
        />
      )}
      {header === "noLogin" && (
        <EncabezadoContenedor
          titulo="Reportar Siniestro"
          funcionRegresar={() => {
            history.push("/");
            sessionStorage.removeItem("estadoRedux");
          }}
        />
      )}

      <Alerta
        {...configAlertCall911}
        mostrarModal={alertaCall911}
        funcionLlamadaBoton={() => window.open("tel: 911")}
        funcionLlamadaBoton2={() => {
          irConoceQueHacer();
        }}
        manejarCierre={() => {
          setAlertaCall911(false);
        }}
      />

      <Pantalla style={{ marginTop: "10px" }}>
        <Titulo>¡Estamos contigo!</Titulo>
        <SubTitulo>Selecciona el reporte que quieres iniciar</SubTitulo>
        <ContenedorBotones>
          {claims.map((claim) => (
            <Contenedor
              show
              key={`claims-container${claim.action}`}
              onClick={() => realizarReedireccion(claim.action)}
            >
              <Encabezado>
                <EnvolvedorIcono>
                  <EnvolvedorImagen src={claim.icon} />
                </EnvolvedorIcono>
                <ContenidoAcordeon>
                  <TituloAcordeon>{claim.title}</TituloAcordeon>
                  <ParrafoAcordeon>{claim.desc}</ParrafoAcordeon>
                </ContenidoAcordeon>
              </Encabezado>
            </Contenedor>
          ))}
        </ContenedorBotones>
        <ContenedorBoton style={{ marginTop: "70px" }}>
          {showConfig.fase2 && (
            <Boton
              flot
              etiqueta="Contacto HDI"
              enClick={() => history.push("/asistencia-hdi")}
              tema="estandar"
            />
          )}

          {!showConfig.fase2 && (
            <Boton
              flot
              etiqueta=" Llamar a HDI "
              enClick={() => window.open("tel:*434")}
              tema="estandar"
            />
          )}
        </ContenedorBoton>
      </Pantalla>
      {verMenuInferior ? <MenuBottomComponente /> : <></>}
    </EnvolvedorPantalla>
  );
};

export default AcordeonElegirSiniestro;
