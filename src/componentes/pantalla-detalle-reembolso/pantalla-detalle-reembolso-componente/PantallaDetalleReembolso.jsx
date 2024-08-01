import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory, useLocation } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { iniciarDescargaPDF } from "../../../helpers/index";
import constantes from "../../../recursos/constantes";
import BotonContenedor from "../../boton";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import IndicadorCarga from "../../indicador-carga";
import {
  CirculoEstatusPoliza,
  Propiedad,
  TituloMisPolizas,
  Valor,
} from "../../pantalla-detalle-poliza/pantalla-detalle-poliza-componente/PantallaDetallePoliza.styled";
import {
  Contenedor2Secciones,
  ContenedorDividido,
  TextoDerecha,
  TextoIzquierdo,
} from "./PantallaDetalleReembolso.styled";
import Alerta from "../../alerta/alerta-componente/Alerta";

const nombreCookie = constantes.nombreDeCookie;

const OBTENER_FINIQUITO_EOB = loader(
  "../../../graphQL/query/poliza/gmm_consultarFiniquitoEOB.graphql"
);

const PantallaDetalleReembolso = () => {
  const history = useHistory();
  const location = useLocation();
  const [cargando, establecerIndicadorCargando] = useState(false);
  const [cookie] = useCookies([nombreCookie]);

  const [obtenerFiniquitoEOB] = useLazyQuery(OBTENER_FINIQUITO_EOB);
  const [mostrarModalFiniquito, setMostrarModalFiniquito] = useState(false);

  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }
  const paginaAnterior =
    location && location.state && location.state.paginaAnterior
      ? location.state.paginaAnterior
      : "/";

  const { reembolso } = location.state;
  console.log(reembolso);
  const { fechaSolicitud, montoFactura, montoCubierto } = reembolso;
  const sumaTotal = montoFactura + montoCubierto;
  const fecha = new Date(fechaSolicitud).toLocaleDateString();

  const handleDownload = (claimDetailId) => {
    establecerIndicadorCargando(true);

    const response = obtenerFiniquitoEOB({
      variables: { claimDetailId },
    });

    response
      .then((r) => {
        if (r.data.gmm_consultarFiniquitoEOB.completado) {
          const { base64, nombre, extension } =
            r.data.gmm_consultarFiniquitoEOB.dato;

          try {
            console.log(base64, nombre, extension);
            iniciarDescargaPDF(base64, nombre, extension);
          } catch (e) {
            setMostrarModalFiniquito(true);
          }
        } else {
          setMostrarModalFiniquito(true);
        }
      })
      .catch(() => {
        setMostrarModalFiniquito(true);
      })
      .finally(() => {
        establecerIndicadorCargando(false);
      });
  };

  useEffect(() => {
    if (!reembolso) {
      history.push(paginaAnterior);
    }
  }, []);

  return (
    <>
      <EnvolvedorPantalla>
        <EncabezadoPolizasSiniestradas
          regresar
          funcionRegresar={() => {
            history.goBack();
          }}
        />
        <Alerta
          colorAlerta="amarillo"
          tipoIcono="trianguloAlerta"
          textoEncabezado="Importante"
          textoCuerpoJsx="El archivo aún no está disponible."
          mostrarModal={mostrarModalFiniquito}
          manejarCierre={() => {
            setMostrarModalFiniquito(false);
          }}
          mostrarIcono
          etiquetaBoton="Comprendo"
          funcionLlamadaBoton={() => {
            setMostrarModalFiniquito(false);
          }}
          temaBoton="estandar"
        />
        <Pantalla>
          <TituloMisPolizas style={{ marginRight: "auto" }}>
            Detalle del reembolso
          </TituloMisPolizas>
          {cargando && <IndicadorCarga />}
          <ContenedorDividido style={{ marginTop: "7px" }}>
            <Contenedor2Secciones>
              <TextoIzquierdo>No. de reembolso</TextoIzquierdo>
              <TextoIzquierdo>{reembolso.folio}</TextoIzquierdo>
            </Contenedor2Secciones>

            <Contenedor2Secciones
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <CirculoEstatusPoliza
                estatus={
                  reembolso.asegurado.status
                    ? reembolso.asegurado.status
                    : "Procesado"
                }
              />
              <TextoDerecha>
                {reembolso.asegurado.status
                  ? reembolso.asegurado.status
                  : "Procesado"}
              </TextoDerecha>
            </Contenedor2Secciones>
          </ContenedorDividido>
          <ContenedorDividido>
            <Propiedad>Titular</Propiedad>
            <Valor>{reembolso.asegurado.nombre}</Valor>
          </ContenedorDividido>

          <ContenedorDividido>
            <Propiedad>Fecha de solicitud</Propiedad>
            <Valor>{fecha}</Valor>
          </ContenedorDividido>

          <ContenedorDividido>
            <Propiedad>Poliza</Propiedad>
            <Valor>123456</Valor>
          </ContenedorDividido>

          <ContenedorDividido>
            <Propiedad>Cantidad facturada</Propiedad>
            <Valor>MXN {reembolso.montoCubierto}</Valor>
          </ContenedorDividido>

          <ContenedorDividido>
            <Propiedad>Deducible</Propiedad>
            <Valor>MXN 0.00</Valor>
          </ContenedorDividido>

          <ContenedorDividido>
            <Propiedad>Coaseguro</Propiedad>
            <Valor>MXN 0.00</Valor>
          </ContenedorDividido>

          <ContenedorDividido>
            <Propiedad>Responsabilidad asegurado</Propiedad>
            <Valor>MXN 0.00</Valor>
          </ContenedorDividido>

          <ContenedorDividido>
            <Propiedad>Reesponsabilidad de proveedor</Propiedad>
            <Valor>MXN 0.00</Valor>
          </ContenedorDividido>

          <ContenedorDividido>
            <Propiedad>Gastos no cubiertos</Propiedad>
            <Valor>MXN {reembolso.montoFactura}</Valor>
          </ContenedorDividido>

          <ContenedorDividido style={{ marginBottom: "40px" }}>
            <Propiedad>Total Cubierto</Propiedad>
            <Valor>{sumaTotal}</Valor>
          </ContenedorDividido>
          <BotonContenedor
            etiqueta="Generar finiquito (EOB)"
            tema="estandar"
            tipo="button"
            enClick={() => handleDownload(reembolso.claimDetailId)}
          />
        </Pantalla>
      </EnvolvedorPantalla>
    </>
  );
};

export default PantallaDetalleReembolso;
