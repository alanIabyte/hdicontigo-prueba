/* eslint-disable import/no-cycle */
/* eslint-disable no-inner-declarations */

import React, { useEffect, useState, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Contenedor,
  ContenedorBotones,
  ContenidoAcordeon,
  Encabezado,
  EnvolvedorIcono,
  EnvolvedorImagen,
  ParrafoAcordeon,
  TituloAcordeon,
} from "./AcordeonRegistroPoliza.styled";
import IconoAutoVerde from "../../../recursos/iconos/contigo/ico_autos_white-bg.svg";
import IconoDanoVerde from "../../../recursos/iconos/contigo/ico_daños.svg";
import IconoMaletinVerde from "../../../recursos/iconos/contigo/ico_gmm.svg";
// import PantallaRegistroUsuario from "../../pantalla-registro-usuario";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoContenedor from "../../encabezado";
import {
  MensajePequeno,
  Titulo,
} from "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";
// import PantallaRegistroPoliza from "../../pantalla-registro-poliza";
import { showGMM } from "../../../utils/merge_congif";
// import showConfig from "../../../utils/configs"; // solo para demo keycloak

const PantallaRegistroPoliza = lazy(() =>
  import("../../pantalla-registro-poliza")
);

const PantallaRegistroUsuario = lazy(() =>
  import("../../pantalla-registro-usuario")
);

/* eslint-disable no-unused-vars */
const AcordeonRegistroPoliza = (props) => {
  const { show, pantalla } = props;

  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const paginaAnterior =
    location && location.state && location.state.paginaAnterior
      ? location.state.paginaAnterior
      : "/";

  const [mostrarAcordeon, setMostrarAcordeon] = useState(true);
  const [tipoPolizaState, setTipoPoliza] = useState("");
  const [usuarioAutenticado, asignarValorusuarioAutenticado] = useState(
    estadoApp && estadoApp.usuarioAutenticado
      ? estadoApp.usuarioAutenticado
      : false
  );

  const botones = [
    {
      titulo: "HDI Auto",
      tipoPoliza: "AUTR",
      descripcion: "Registra una póliza de auto",
      icono: IconoAutoVerde,
    },
    {
      titulo: "HDI Daños",
      tipoPoliza: "DAN",
      descripcion: "Registra tu póliza de casa",
      icono: IconoDanoVerde,
    },
    {
      titulo: "HDI Gastos Médicos Mayores",
      tipoPoliza: "GMM",
      descripcion: "Registra tu póliza de Médica Total Plus o Médica Vital",
      icono: IconoMaletinVerde,
    },
  ];

  const mostrarPantallaRegistro = (poliza) => {
    setTipoPoliza(poliza);
    setMostrarAcordeon(false);
  };

  const componenteAMostrar = () => {
    if (pantalla === "registro-poliza") {
      return (
        <PantallaRegistroPoliza
          tipoPolizaProps={tipoPolizaState}
          setMostrarAcordeon={setMostrarAcordeon}
        />
      );
    }

    return (
      <Suspense fallback={null}>
        <PantallaRegistroUsuario
          tipoPolizaButton={tipoPolizaState}
          setMostrarAcordeon={setMostrarAcordeon}
        />
      </Suspense>
    );
  };

  useEffect(() => {
    if (params.poliza) {
      setTipoPoliza("GMM");
      setMostrarAcordeon(false);
    }
    if (location.state === "/ingreso-gmm") {
      setTipoPoliza("GMM");
      setMostrarAcordeon(false);
    }
  }, []);

  useEffect(() => {
    console.log("antes if usuarioAutenticado");
    if (!usuarioAutenticado) {
      async function fetchData() {
        // const autenticado = await inicializarKeycloak();
        // HABILITAR CUANDO TENGOA EL REGISTRO
        // dispatch({
        //   type: "AGREGAR",
        //   valor: autenticado,
        //   indice: "usuarioAutenticado",
        // });
        // asignarValorusuarioAutenticado(autenticado);
      }

      fetchData();
    }

    if (usuarioAutenticado) {
      history.push("/inicio");
    }

    // La acción a ejecutar después de que el componente esté completamente renderizado
    // if (isMounted.current) {
    // } else {
    //   isMounted.current = true;
    // }
  });

  return (
    <>
      {/* {!showConfig.showKeycloak ? (
        <> */}
      {mostrarAcordeon ? (
        <EnvolvedorPantalla key="envolvedor-pantalla-registro">
          <EncabezadoContenedor
            titulo="Registro"
            funcionRegresar={() => {
              history.push(paginaAnterior);
              sessionStorage.removeItem("estadoRedux");
            }}
          />

          <Pantalla>
            <Titulo id="titulo">Ayúdanos a registrarte correctamente</Titulo>
            <MensajePequeno id="mensajePequeno">
              Elige el tipo de póliza que deseas registrar
            </MensajePequeno>
            <ContenedorBotones>
              {botones.map((button) => (
                <Contenedor
                  show={!(!showGMM && button.tipoPoliza === "GMM")}
                  key={button.tipoPoliza}
                  onClick={() => mostrarPantallaRegistro(button.tipoPoliza)}
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
      ) : (
        componenteAMostrar()
      )}
    </>
    //   ) : (
    //     <></>
    //   )}
    // </>
  );
};

AcordeonRegistroPoliza.propTypes = {
  show: PropTypes.bool,
  pantalla: PropTypes.string,
};

AcordeonRegistroPoliza.defaultProps = {
  show: true,
  pantalla: "registro-usuarios",
};

export default AcordeonRegistroPoliza;
