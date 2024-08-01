/* eslint-disable */
/* eslint-disable no-case-declarations */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import IconoFlechaArriba from "@material-ui/icons/KeyboardArrowUpRounded";
import IconoFlechaAbajo from "@material-ui/icons/KeyboardArrowDownRounded";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EnvolvedorReporteAjuste,
  ContenedorSecciones,
  BotonDesplegarSecciones,
  ContenedorElementosMenuDesplegable,
} from "../contenedor-reporte-ajuste/contenedor-reporte-ajuste-componente/ContenedorReporteAjuste.styled";
import { SeparadorEspacio } from "../entrega/entrega-componente/Entrega.styled";
import { SeccionPresencial } from "./Secciones/SeccionPresencial";
import { SeccionEsperaValuacion } from "./Secciones/SeccionEsperaValuacion";
import obtenerValorDeArregloDeStrings from "../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import SeccionDeducible from "./Secciones/SeccionDeducible";
import { IEventosNotificaciones } from "../../interfaces/Graphql/IEventosNotificaciones";
import { IRedux } from "../../interfaces/Redux/IRedux";

type IProps = {
  temaBoton: string;
  numItem: number;
  eventos: IEventosNotificaciones[];
};

let mostrarSecciones = false;

export const ContenedorValuacion = ({ temaBoton, numItem = 1, eventos = [] }: IProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const estadoApp: IRedux = useSelector((estado: IRedux) => estado);

  const [valuacion, setValuacion] = useState("evaluando");
  const [desplegarSecciones, asignarValorDesplegarSecciones] =
    useState(mostrarSecciones);

  const asignarDesplegarSecciones = () => {
    asignarValorDesplegarSecciones(!desplegarSecciones);
    mostrarSecciones = !desplegarSecciones;
  };

  const [tipoAtencion, setTipoAtencion] = useState("Presencial");
  const [resultadoValuacion, setResultadoValuacion] = useState("");

  const [esRobo, setEsRobo] = useState<boolean>(false);
  const [vehiculoRecuperado, setVehiculoRecuperado] = useState<boolean>(false);

  useEffect(() => {
      /**
       * La validación inicial es que se revise la notificación 26 "Montos valuación"
       * Valores disponibles: [Evaluando, Pago de daños, Reparacion, Perdida total, Pago de daños globales]
       * 
       * Validación principal:
       * Si el estatus es igual a Perdida total espera la notificación 3 "Tipo probable de accidente"
       * y valida que sea true en "EsPerdidaTotal"
       * 
       * Si una vez que llega la notificación y resulta que no es Perdida total, se muestra todo
       * acorde al nuevo estatus que venga. En caso de que no sea PT y el estatus siga mandando PT
       * se mostrara el componente de espera.
       * 
       * Si el estatus es diferente de PT se muestra inmediatamente el componente de deducible aplicando
       * validaciones correspondientes para los botones.
       * 
       * Actualización:
       * Se guardará el estatus en una variable que se guardará en el redux 
       * Este estatus determinará el tipo de valuación y en base a este tipo se mostrará los diferente botones
       */
      const montosDeducibleNoti: IEventosNotificaciones | undefined = eventos.find(
        (e:IEventosNotificaciones) => e.tipoMensaje === 25);
      const descripciones = montosDeducibleNoti?.descripciones||[];
      const estatusValuacion: string = obtenerValorDeArregloDeStrings(
        descripciones,
        "Status: "
      );

      const tipoProbableAccidenteNoti: IEventosNotificaciones | undefined = eventos.find((evento: IEventosNotificaciones) => evento.tipoMensaje === 3);
      const existeNotiTipoProbableAccidente: boolean = !!tipoProbableAccidenteNoti?.tipoMensaje;

      const notiSiniestroRobo: IEventosNotificaciones | undefined = eventos.find((evento: IEventosNotificaciones) => evento.tipoMensaje === 31);
      const existeRobo: boolean = !!notiSiniestroRobo?.tipoMensaje;
      setEsRobo(existeRobo);

      eventos.forEach(
        (evento: IEventosNotificaciones) => {
          switch (evento.tipoMensaje) {
            case 3:
              const esPerdidaTotal = obtenerValorDeArregloDeStrings(
                evento.descripciones,
                "EsPerdidaTotal: "
              );
              // setValuacion(
              //   esPerdidaTotal.toLowerCase() === "true" ? "perdida total" : "evaluando"
              // );
              break;

            case 13:
              dispatch({
                type: "AGREGAR",
                valor: {
                  data: evento.descripciones,
                },
                indice: "datosIngresoTaller",
              });
              break;

            case 14:
              dispatch({
                type: "AGREGAR",
                valor: {
                  data: evento.descripciones,
                },
                indice: "datosValuacion",
              });
              break;
            
            case 22:
              /**
               * Acción: Validar si es tipo de atención Presencial ó Virtual
               * Descripción: Valida dependiendo del tipo de ajuste.
               *  Ajuste tradicional  => Tipo de atención: Presencial
               *  Ajuste digital      => Tipo de atención: Virtual
               * 
               *  La variable "tradicional" define si es tradicional o virtual
               *  Es tradicional  => "True"
               *  Es virtual      => "False"
               * 
               */
              const esTradicional = obtenerValorDeArregloDeStrings(
                estadoApp?.AjusteDigital?.data?.descripciones || [],
                "EsTradicional: "
              );
              
              if (esTradicional) {
                setTipoAtencion(esTradicional === "True" ? "Presencial" : "Virtual");
              }
              break;
            
            case 25:
              // Esta es la notificación para conocer el estatus de la valuación
              dispatch({
                type: "AGREGAR",
                indice: "eventoEvaluacionSiniestro",
                valor: evento,
              });

              // !Si la valuación es diferente de esperando y no esta vacía se aplican las validaciones
              if (estatusValuacion != "" && estatusValuacion.toLowerCase() != "evaluando") {
                if (estatusValuacion.toLocaleLowerCase().includes("total") || estatusValuacion.toLocaleLowerCase().includes("pt")) {
                  // !Es PT desde la notificación 25. Se valida si ya llego la notificación 3
                  if (existeNotiTipoProbableAccidente) {
                    const esPerdidaTotal = obtenerValorDeArregloDeStrings(
                      tipoProbableAccidenteNoti?.descripciones,
                      "EsPerdidaTotal: "
                    );
                    if (esPerdidaTotal.toLowerCase() === "true") {
                      // !Ya se recibió la notificación de PT se valida si es PT
                      setValuacion("perdida total");
                      setResultadoValuacion("Pérdida total");
                    } else {
                      // !El estatus es pt pero la notificación no
                      setValuacion("deducible");
                    }
                  } else {
                    // !Estatus PT pero no ha llegado la notificiación
                    setValuacion("evaluando");
                  }
                } else {
                  // !No es perdida total puede ser Reparación, Pago daños, Pago de daños global
                  // !Si es en reparación se mostrará el mismo que perdida total
                  if (
                    estatusValuacion.toLocaleLowerCase().includes("globales") ||
                    estatusValuacion.toLocaleLowerCase().includes("pago de daños globales") ||
                    estatusValuacion.toLocaleLowerCase().includes("global")
                  ) {
                    setValuacion("perdida total");
                    setResultadoValuacion("Pago de daños globales");
                  } else if (estatusValuacion.toLocaleLowerCase().includes("no procede")) {
                    setValuacion("perdida total");
                    setResultadoValuacion("no procede");
                  } else if (estatusValuacion.toLocaleLowerCase().includes("reparacion") || estatusValuacion.toLocaleLowerCase().includes("reparación")) {
                    setValuacion("deducible");
                    setResultadoValuacion("Reparación");
                  } else if (estatusValuacion.toLocaleLowerCase().includes("pago de daños")) {
                    setValuacion("deducible");
                    setResultadoValuacion("Pago de daños parciales");
                  }
                }

              }

              dispatch({
                type: "AGREGAR",
                valor: {
                  data: evento.descripciones,
                },
                indice: "datosValuacionMontos",
              });
              break;
            case 34:
              /**
               * Validar si el vehículo ha sido localizado
               */
              const esRecuperado: string = obtenerValorDeArregloDeStrings(
                evento.descripciones,
                "Recuperado: "
              );
              setVehiculoRecuperado(esRecuperado.toLocaleLowerCase() === "true");
              break;
            default:
          }
        }
      );
  }, [eventos]);

  return (
    // ! NOTA: La valuación de daños depende del tipo de atención: presencial o pago de daños
    <React.Fragment key="contenedor-valuacion-danios">
      <EnvolvedorReporteAjuste>
        <BotonDesplegarSecciones
          desplegado={desplegarSecciones}
          tema={temaBoton}
        >
          <ContenedorElementosMenuDesplegable
            onClick={asignarDesplegarSecciones}
          >
            {numItem}. Valuación de daños
            {desplegarSecciones ? <IconoFlechaArriba /> : <IconoFlechaAbajo />}
          </ContenedorElementosMenuDesplegable>
        </BotonDesplegarSecciones>
        <ContenedorSecciones desplegado={desplegarSecciones}>
          <SeparadorEspacio />

          {/* Secciones para cuando la valuacion es pérdida total */}
          {valuacion === "perdida total" && (
            <SeccionPresencial
              desplegarSecciones={desplegarSecciones}
              key="seccion-prescencial"
              tipoAtencionP={tipoAtencion}
              resultadoValuacion={resultadoValuacion}
              esRobo={esRobo}
              vehiculoRecuperado={vehiculoRecuperado}
            />
          )}

          {/* Secciones para cuando la valuación concluyó con pago de daños (deducible) */}
          {valuacion === "deducible" && (
            <SeccionDeducible
              desplegarSecciones={desplegarSecciones}
              key="seccion-pago-parcial"
              tipoAtencionP={tipoAtencion}
              resultadoValuacion={resultadoValuacion}
            />
          )}

          {valuacion === "evaluando" && (
            <SeccionEsperaValuacion
              desplegarSecciones={desplegarSecciones}
              key="seccion-espera-valuacion"
              tipoAtencion={tipoAtencion}
            />
          )}
        </ContenedorSecciones>
      </EnvolvedorReporteAjuste>
    </React.Fragment>
  );
};
