/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  TarjetaPoliza,
  TituloRecibo,
  ContenedorIcono,
  Costo,
  NumeroPoliza,
  EstatusRecibo,
  VigenciaRecibo,
  NumeroRecibo,
  ContenedorSeleccion,
  Check,
  TextoFactura,
} from "./ReciboPago.styled";
import { ReactComponent as IconoAutoVerde } from "../../../recursos/iconos/ico_info_vehiculo_green.svg";
import { ReactComponent as IconoDanoVerde } from "../../../recursos/iconos/ico_casa_verde.svg";

const diccionario = {
  seleccionPagar: "Seleccionar para pagar",
  facturaComplemento: "Factura / Complemento",
};

const ReciboPago = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const estadoApp = useSelector((estado) => estado);
  const {
    modo,
    poliza,
    recibo,
    tipo,
    polizaGeneral,
    evento,
    reciboSeleccionado,
    handlerCostoRecibo,
    tipoRecibo,
    esDxn
  } = props;
  const [seleccionado, setSeleccionado] = useState(false);

  console.log(esDxn);

  const DATOS = {
    AUTR: {
      obtenerIcono: () => (
        <IconoAutoVerde
          className={recibo?.estatus?.toUpperCase() === "PAGADO" ? "disable" : ""}
        />
      ),
      titulo: () => "Auto",
    },
    DAN: {
      obtenerIcono: () => (
        <IconoDanoVerde
          className={recibo?.estatus?.toUpperCase() === "PAGADO" ? "disable" : ""}
        />
      ),
      titulo: () => "Daños",
    },
  };

  const formatoFecha = (fecha) => {
    const f = new Date(fecha);
    return `${f.getDate()}/${parseInt(f.getMonth()) + 1}/${f.getFullYear()}`;
  };

  const pagarRecibo = () => {
    if (modo === "pago") {
      if (
        recibo.estatus.toUpperCase() !== "CANCELADA" ||
        recibo.estatus.toUpperCase() !== "PAGADO"
      ) {
        /*
          if (
            estadoApp?.recibosPorPagar?.length === 1 &&
            estadoApp?.recibosPorPagar?.find((el) => el.folio === recibo.folio)
          ) {
            history.push("/detalle-recibo", {
              poliza,
              tipo,
              recibo,
              polizaGeneral,
              modo,
            });
          }
        */
        history.push("/detalle-recibo", {
          poliza,
          tipo,
          recibo,
          polizaGeneral,
          modo,
        });
      }
    } else {
      history.push("/detalle-recibo", {
        poliza,
        tipo,
        recibo,
        polizaGeneral,
        modo,
        tipoRecibo,
      });
    }
  };

  const calcularTotal = () => {
    if (modo === "pago") {
      let total = 0;
      //  console.groupCollapsed("RECIBOS POR PAGAR REDUX");
      //  console.table(estadoApp?.recibosPorPagar);
      //  console.groupEnd();
      if (estadoApp?.recibosPorPagar) {
        const listaActual = estadoApp?.recibosPorPagar;
        listaActual.map(
          (e) =>
            (total += parseFloat(e.primaNeta.replace(",", "").replace("$", "")))
        );
      }

      handlerCostoRecibo(total.toFixed(2));
    }
  };

  const agregarRedux = (reciboNuevo) => {
    let listaActual = estadoApp?.recibosPorPagar;
    let listaNueva = [];
    if (esEnLista()) {
      return;
    }
    if (listaActual) {
      listaNueva = [...estadoApp?.recibosPorPagar, reciboNuevo];
    } else {
      listaNueva = [reciboNuevo];
    }
    dispatch({
      type: "AGREGAR",
      valor: listaNueva,
      indice: "recibosPorPagar",
    });
    setSeleccionado(true);
  };

  const eliminarDeRedux = (reciboPorEliminar) => {
    let listaActual = estadoApp?.recibosPorPagar;
    let listaNueva = listaActual.filter(
      (item) => item.folio !== reciboPorEliminar.folio
    );
    dispatch({
      type: "AGREGAR",
      valor: listaNueva,
      indice: "recibosPorPagar",
    });
    setSeleccionado(false);
  };

  const esEnLista = () =>
    estadoApp?.recibosPorPagar?.some((el) => el.folio === recibo.folio);

  useEffect(() => {
    //  console.groupCollapsed("Informacion de recibo ", recibo.numeroRecibo);
    //  console.table(recibo);
    //  console.groupEnd();
    if (modo === "pago") {
      if (esEnLista()) {
        setSeleccionado(true);
      } else if (reciboSeleccionado && !esEnLista()) {
        agregarRedux(recibo);
      }
    }
  }, []);

  const alDarClick = (e) => {
    if (evento != null) {
      evento(recibo);
    } else {
      pagarRecibo();
    }

    dispatch({
      type: "AGREGAR",
      valor: recibo.folio,
      indice: "folioDeRecibo"
    })

    console.log(estadoApp);
  };

  const toggleSeleccionarPagar = (e) => {
    e.stopPropagation();

    //if (seleccionado && recibo.estatus.toUpperCase() === "PENDIENTE") {
    if (seleccionado && reciboSeleccionado) {
      //    console.log("Este recibo debe permanecer seleccionado");
      return;
    }
    if (!seleccionado) {
      // Si no estaba seleccionado
      agregarRedux(recibo);
    } else {
      eliminarDeRedux(recibo);
    }
  };

  useEffect(() => {
    calcularTotal();
  }, [seleccionado]);

  return (
    <TarjetaPoliza
      estatus={recibo?.estatus?.toUpperCase()}
      onClick={(e) => alDarClick(e)}
      seleccionado={seleccionado}
    >
      {/* TODO: Implementación NO probada. Utilizar una poliza DxN que tenga recibos PAGADOS, en cuyo caso debe mostrarlos aquí */}
      {esDxn && recibo?.estatus !== null && recibo?.estatus?.toUpperCase === "PAGADO" && (
        <>
          <ContenedorIcono>{DATOS[tipo].obtenerIcono()}</ContenedorIcono>
          <TituloRecibo>{DATOS[tipo].titulo()}</TituloRecibo>
          <Costo>{`$ ${recibo?.primaNeta?.replace("$", "")}`}</Costo>
          <NumeroRecibo>{`Recibo ${recibo?.numeroRecibo}`}</NumeroRecibo>

          <EstatusRecibo
            estatus={recibo?.estatus?.toUpperCase()}
            colorEstatus={recibo?.colorEstatus?.toUpperCase()}
          >
            {recibo.estatus}
          </EstatusRecibo>
          {/* <NumeroPoliza>{`Poliza: ${polizaGeneral?.polizaFormato}`}</NumeroPoliza> */}


          {recibo?.estatus?.toUpperCase()?.startsWith("PAGAD") ? (
            <TextoFactura>{diccionario.facturaComplemento}</TextoFactura>
          ) : null}

          <VigenciaRecibo>
            {`Vigencia: ${formatoFecha(recibo?.vigenciaInicio)} al ${formatoFecha(
              recibo.vigenciaFin
            )}`}
          </VigenciaRecibo>
        </>
      )}
      <ContenedorIcono>{DATOS[tipo].obtenerIcono()}</ContenedorIcono>
      <TituloRecibo>{DATOS[tipo].titulo()}</TituloRecibo>
      <Costo>{`$ ${recibo?.primaNeta?.replace("$", "")}`}</Costo>
      <NumeroRecibo>{`Recibo ${recibo?.numeroRecibo}`}</NumeroRecibo>

      <EstatusRecibo
        estatus={recibo?.estatus?.toUpperCase()}
        colorEstatus={recibo?.colorEstatus?.toUpperCase()}
      >
        {recibo.estatus}
      </EstatusRecibo>
      {/* <NumeroPoliza>{`Poliza: ${polizaGeneral?.polizaFormato}`}</NumeroPoliza> */}


      {recibo?.estatus?.toUpperCase()?.startsWith("PAGAD") ? (
        <TextoFactura>{diccionario.facturaComplemento}</TextoFactura>
      ) : null}

      <VigenciaRecibo>
        {`Vigencia: ${formatoFecha(recibo?.vigenciaInicio)} al ${formatoFecha(
          recibo.vigenciaFin
        )}`}
      </VigenciaRecibo>
      {modo === "pago" ? (
        <ContenedorSeleccion onClick={(e) => toggleSeleccionarPagar(e)}>
          <Check checked={seleccionado} />
          {diccionario.seleccionPagar}
        </ContenedorSeleccion>
      ) : null}
    </TarjetaPoliza>
  );
};

ReciboPago.defaultProps = {
  recibo: {},
  poliza: {},
  tipo: "AUTR",
  modo: "consulta",
  tipoRecibo: "Recibo",
  polizaGeneral: {},
  evento: null,
  handlerCostoRecibo: null,
  reciboSeleccionado: false,
};

ReciboPago.propTypes = {
  recibo: PropTypes.instanceOf([]),
  poliza: PropTypes.instanceOf([]),
  tipo: PropTypes.string,
  modo: PropTypes.string,
  tipoRecibo: PropTypes.string,
  polizaGeneral: PropTypes.instanceOf([]),
  evento: PropTypes.func,
  handlerCostoRecibo: PropTypes.func,
  reciboSeleccionado: PropTypes.bool,
};

export default ReciboPago;
