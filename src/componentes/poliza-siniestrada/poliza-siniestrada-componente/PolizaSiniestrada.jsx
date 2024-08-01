/* eslint-disable import/no-unresolved */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/es-mx";
import IconoFlechaAbajo from "@material-ui/icons/KeyboardArrowDownRounded";
import IconoFlechaArriba from "@material-ui/icons/KeyboardArrowUpRounded";
import {
  EnvolvedorPolizaSiniestrada,
  ImagenCarro,
  TituloSeccion,
  NumeroPoliza,
  VigenciaPoliza,
  SeparadorSiniestros,
  ContenedorSiniestros,
  EncabezadoSiniestros,
  TextoSiniestros,
  NumeroSiniestros,
  ContenedorIconoFlecha,
  Siniestro,
  ImagenPortapapeles,
  FechaSiniestro,
  ContenedorBoton,
} from "./PolizaSiniestrada.styled";
import Constantes from "../../../recursos/constantes";
import carroDefault from "../../../recursos/iconos/hdi-c/mis-poliza/autos.png";
import IconoGrua from "../../../recursos/iconos/hdi-c/reporte-siniestro/grua.svg";
import IconoRobo from "../../../recursos/iconos/hdi-c/reporte-siniestro/robo.svg";
// import portapapeles from "../../../recursos/imagenes/portapapeles.png";
import IconPortaPapeles from "../../../recursos/iconos/hdi-c/detalle/gmm/1Info.svg";
import { BotonReportarSiniestro } from "../../poliza/poliza-componente/Poliza.styled";
import showConfig from "../../../utils/configs";

const diccionario = {
  poliza: "Póliza: ",
  vigencia: "Vigente hasta: ",
  BotonRegistraSin: "Reportar choque",
  siniestros: "Siniestro(s) activo(s): ",
};

const nombreCookie = Constantes.nombreDeCookie;

const PolizaSiniestrada = (props) => {
  const {
    enClickEnFoto,
    error,
    imagen,
    numeroPoliza,
    numeroPolizaCompuesto,
    siniestros,
    vehiculo,
    vigencia,
  } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const [mostrarSiniestros, asignarValorMostrarSiniestros] = useState(false);
  const [cookie] = useCookies([nombreCookie]);
  let objetoCookie = cookie[nombreCookie];

  const elegirSiguientePantalla = (siniestro) => {
    const {
      estatusReporte,
      numeroReporte,
      nombreReporta,
      ubicacion,
      tipoAtencion,
      idSubEvento,
    } = siniestro;
    dispatch({
      type: "AGREGAR",
      valor: {
        data: vehiculo,
      },
      indice: "datosVehiculo",
    });

    if (
      (estatusReporte === "A" || estatusReporte === "B") &&
      tipoAtencion === 0 &&
      idSubEvento !== 1 &&
      idSubEvento !== 21 &&
      idSubEvento !== 22
    ) {
      objetoCookie = { ...objetoCookie, nombreReporta };
      // establecerCookie(nombreCookie, JSON.stringify(objetoCookie), {
      //   path: "/",
      // });
      const { latitud, longitud } = ubicacion;
      if (latitud && longitud) {
        dispatch({
          type: "AGREGAR",
          valor: { lat: latitud, lng: longitud },
          indice: "coordenadasIniciales",
        });
      }
      history.push({
        pathname: "menu-espera",
        search: `?numeroReporte=${numeroReporte}`,
      });
    } else if (idSubEvento === 1) {
      /**
       * 1 => Reporte de grúa
       */
      dispatch({
        type: "AGREGAR",
        valor: numeroReporte,
        indice: "numeroReporteGrua",
      });
      history.push({
        pathname: "/pasos-progreso-grua",
      });
    } else if (idSubEvento === 21 || idSubEvento === 22) {
      /**
       * Cuando es de robo
       * 21 => Robo con violencia
       * 22 => Robo estacionado
       */
      dispatch({
        type: "AGREGAR",
        indice: "datosReporteRobo",
        valor: {
          numeroPoliza: numeroPolizaCompuesto,
        },
      });

      dispatch({
        type: "AGREGAR",
        valor: estatusReporte,
        indice: "estadoReporte",
      });
      dispatch({
        type: "AGREGAR",
        valor: siniestro.numeroSiniestro,
        indice: "numeroSiniestroReporte",
      });
      if (showConfig.showRobo) {
        // !Se cambia la redirección de pasos-progreso a menu-espera-robo ya que ahí se hará la validación para redirigir a pasos progreso
        history.push({
          pathname: "menu-espera-robo",
          search: `?numeroReporte=${numeroReporte}`,
        });
      } else {
        history.push({
          pathname: "pasos-progreso",
          search: `?numeroReporte=${numeroReporte}`,
        });
      }
    } else {
      dispatch({
        type: "AGREGAR",
        valor: estatusReporte,
        indice: "estadoReporte",
      });
      dispatch({
        type: "AGREGAR",
        valor: siniestro.numeroSiniestro,
        indice: "numeroSiniestroReporte",
      });
      history.push({
        pathname: "pasos-progreso",
        search: `?numeroReporte=${numeroReporte}`,
      });
    }
  };

  const validaIcono = (idSubEvento) => {
    switch (idSubEvento) {
      case 1:
        return IconoGrua;
      case 21:
      case 22:
        return IconoRobo;
      default:
        return IconPortaPapeles;
    }
  };
  return (
    <EnvolvedorPolizaSiniestrada>
      <ImagenCarro
        src={imagen || carroDefault}
        onClick={enClickEnFoto}
        data-numero-poliza={numeroPoliza}
        error={error}
      />
      <TituloSeccion>{vehiculo}</TituloSeccion>
      <NumeroPoliza>
        {diccionario.poliza} {numeroPoliza}
      </NumeroPoliza>
      <VigenciaPoliza>
        {diccionario.vigencia} {moment(vigencia).format("DD/MMM/YY")}
        {/* <BotonRegistraSin
          onClick={() => {
            history.push({
              pathname: "/ingreso-poliza",
              search: `?numeroPoliza=${numeroPolizaCompuesto}&vin=${vin}`,
            });
          }}
        >
          {diccionario.BotonRegistraSin}
        </BotonRegistraSin> */}
      </VigenciaPoliza>

      <SeparadorSiniestros />
      <ContenedorSiniestros>
        <EncabezadoSiniestros
          onClick={() => {
            asignarValorMostrarSiniestros(!mostrarSiniestros);
          }}
        >
          <TextoSiniestros>{diccionario.siniestros}</TextoSiniestros>
          <NumeroSiniestros>{siniestros.length}</NumeroSiniestros>
          <ContenedorIconoFlecha>
            {mostrarSiniestros ? <IconoFlechaArriba /> : <IconoFlechaAbajo />}
          </ContenedorIconoFlecha>
        </EncabezadoSiniestros>
        {mostrarSiniestros &&
          siniestros.map((valor, indice) => (
            <Siniestro key={valor.numeroReporte}>
              <ImagenPortapapeles
                src={validaIcono(siniestros[indice].idSubEvento)}
              />
              {siniestros[indice].numeroSiniestro ? (
                <TituloSeccion>
                  {siniestros[indice].numeroSiniestro}
                </TituloSeccion>
              ) : (
                <TituloSeccion>
                  {siniestros[indice].numeroReporte}
                </TituloSeccion>
              )}
              <ContenedorBoton>
                <BotonReportarSiniestro
                  reporte={false}
                  onClick={() => {
                    elegirSiguientePantalla(siniestros[indice]);
                  }}
                  deshabilitado={false}
                >
                  {/* <IconoInfoPagos className="ico" width={22} style={{color: "white"}}/> */}
                  Seleccionar
                </BotonReportarSiniestro>
              </ContenedorBoton>
              <FechaSiniestro>
                {moment(siniestros[indice].fechaReporte).format("DD/MMM/YY")}
              </FechaSiniestro>
            </Siniestro>
          ))}
      </ContenedorSiniestros>
    </EnvolvedorPolizaSiniestrada>
  );
};

PolizaSiniestrada.defaultProps = {
  vehiculo: "#Nombre o modelo de auto YYYY",
  numeroPoliza: "XXX-XX-XXX",
  numeroPolizaCompuesto: "x-x-x",
  vigencia: "DD/MM/YYY",
  siniestros: [
    {
      numeroSiniestro: "000000",
      numeroReporte: "321832",
      fechaReporte: "01/Ene/2021",
    },
  ],
  enClickEnFoto: () => {},
  imagen: "",
  error: false,
};

PolizaSiniestrada.propTypes = {
  enClickEnFoto: PropTypes.func,
  error: PropTypes.bool,
  imagen: PropTypes.string,
  numeroPoliza: PropTypes.string,
  numeroPolizaCompuesto: PropTypes.string,
  siniestros: PropTypes.arrayOf(PropTypes.object),
  vehiculo: PropTypes.string,
  vigencia: PropTypes.string,
};

export default PolizaSiniestrada;
