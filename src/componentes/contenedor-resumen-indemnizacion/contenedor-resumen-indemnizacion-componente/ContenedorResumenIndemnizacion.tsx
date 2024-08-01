/* eslint-disable */
import React, { useEffect, useState } from "react";
import IconoFlechaAbajo from "@material-ui/icons/KeyboardArrowDownRounded";
import IconoFlechaArriba from "@material-ui/icons/KeyboardArrowUpRounded";
import { IPropsResumenIndemnizacion } from "../../../interfaces/indemnizacion/Iindemnizacion"
import { BotonDesplegarSecciones, ContenedorElementosMenuDesplegable, ContenedorSecciones, EnvolvedorReparacion, Secciones } from "../../contenedor-perdida-total/contenedor-perdida-total-componente/ContenedorPerdidaTotal.styled";
import { IRedux } from "../../../interfaces/Redux/IRedux";
import { useSelector } from "react-redux";
import { SeparadorEspacio } from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import Seccion from "../../seccion-pasos-progreso";
import { DocumentacionCampo, DocumentacionValor } from "../../documentacion/documentacion-componente/Documentacion.styled";

let mostrarSecciones = false;

const ContenedorResumenIndemnizacion = (props: IPropsResumenIndemnizacion) => {

  const {
    temaBoton,
    montos,
    esRobo,
  } = props;

  const estadoApp = useSelector((state: IRedux) => state);

  const [desplegarSecciones, asignarValorDesplegarSecciones] = useState(mostrarSecciones);
  const [num, setNum] = useState<number>(4);

  const asignarDesplegarSecciones = () => {
    asignarValorDesplegarSecciones(!desplegarSecciones);
    mostrarSecciones = !desplegarSecciones;
  };

  const [pendienteResumen, setPendienteResumen] = useState<boolean>(true);

  useEffect(() => {
    if (parseFloat(montos.MontoIndemnizacion) > 0 || parseFloat(montos.MontoDeducible) > 0 || parseFloat(montos.TotalAPagar) > 0) {
      setPendienteResumen(false);
    }

    if (esRobo) {
      setNum(5);
    }
  }, []);

  const currencyFormat = (num: string) => {
    return '$' + parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const validarMetodoSeleccionadoTransferencia = () => {
    return montos.MetodoPago.toUpperCase() === "TRANSFERENCIA" && montos.NumeroTransferencia != "0";
  };

  return (
    <EnvolvedorReparacion>
      <BotonDesplegarSecciones desplegado={desplegarSecciones} tema={temaBoton}>
        <ContenedorElementosMenuDesplegable onClick={asignarDesplegarSecciones}>
          {num}. Resumen de indemnización
          {desplegarSecciones ? <IconoFlechaArriba /> : <IconoFlechaAbajo />}
        </ContenedorElementosMenuDesplegable>
      </BotonDesplegarSecciones>
      <ContenedorSecciones desplegado={desplegarSecciones}>
        <SeparadorEspacio />
        <Secciones desplegado={desplegarSecciones}>
        <Seccion titulo="Resúmen de indemnizacion" pendiente={pendienteResumen}>
            <>
              <DocumentacionCampo>Monto indemnización:</DocumentacionCampo>
              <DocumentacionValor>{currencyFormat(montos?.MontoIndemnizacion||"0")} MXN</DocumentacionValor>

              <DocumentacionCampo>Monto deducible:</DocumentacionCampo>
              <DocumentacionValor>{currencyFormat(montos?.MontoDeducible||"0")} MXN</DocumentacionValor>

              <DocumentacionCampo>Monto a pagar:</DocumentacionCampo>
              <DocumentacionValor>{currencyFormat(montos?.TotalAPagar||"0")} MXN</DocumentacionValor>
            </>
          </Seccion>
          <Seccion titulo="Método de pago" pendiente={false}>
            <>
              <DocumentacionCampo>Método seleccionado:</DocumentacionCampo>
              <DocumentacionValor>{montos?.MetodoPago||"---"}</DocumentacionValor>
              {validarMetodoSeleccionadoTransferencia() && (
                <>
                  <DocumentacionCampo>Número de transferencia:</DocumentacionCampo>
                  <DocumentacionValor>{montos?.NumeroTransferencia||"---"}</DocumentacionValor>
                </>
              )}
            </>
          </Seccion>
        </Secciones>
      </ContenedorSecciones>
    </EnvolvedorReparacion>
  )
}

export default ContenedorResumenIndemnizacion;