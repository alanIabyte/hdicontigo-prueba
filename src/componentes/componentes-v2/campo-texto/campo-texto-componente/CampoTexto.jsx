/* eslint-disable */
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es-mx";
import "react-dates/initialize";
import { isInclusivelyBeforeDay, SingleDatePicker } from "react-dates";
import PropTypes from "prop-types";
import {
  ContenedorCampoTextoInput,
  ContenedorCampoTextoArea,
  ContenedorEtiquetaArriba,
  Icono,
  Boton,
  EnvolvedorBoton,
  EnvolvedorCampoTexto,
  Etiqueta,
  ContenedorSerie,
  Conteo,
  EtiquetaWithIcon,
  EnvolvedorGrid,
  MensajeError,
} from "./CampoTexto.styled";
import CampoTextoElemento from "./CampoTextoElemento";
import "./estilos.scss";
import IconHelp from "../../../../recursos/iconos/ico_help.svg";
import { ContenedorIconoAyuda, ContenedorIconoReloj } from "./CampoTextoTarjeta.styled";

import ReactDatetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

class CampoTexto extends React.Component {
  constructor(props) {
    super(props);
    const { fechaCalendario, valor, times } = this.props;
    this.state = {
      fechaCalendario,
      times,
      enfocadoCalendario: null,
      enfocadoTime: null,
      focoInput: "",
      conteo: valor.length,
    };

    // console.log(props);
  }

  enCambio = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      this.setState({ conteo: valor.length });
      const { enCambio: enCambioFuncion } = this.props;
      if (typeof enCambioFuncion === "function") enCambioFuncion(evento);
    }
  };

  alEnfocar = (evento) => {
    this.setState({ focoInput: "enfocado" });
    if (evento && evento.target && evento.target.value) {
      const valorTemporal = evento.target.value;
      evento.target.value = "";
      evento.target.value = valorTemporal;
    }
  };

  // ! ===== Pendiente
  establecerFecha(fechaCalendario) {
    this.setState({ fechaCalendario });
  }

  establecerTime(time) {
    this.setState({ times: time });
  }

  establecerEnfocado(enfocadoCalendario) {
    let focoInput = "";
    if (enfocadoCalendario) {
      focoInput = "enfocado";
    }
    this.setState({ enfocadoCalendario, focoInput });
  }

  establecerEnfocadoTime(enfocadoTime) {
    let focoInput = "";
    if (enfocadoTime) {
      focoInput = "enfocado";
    }
    this.setState({ enfocadoTime, focoInput });
  }

  cerrarCalendario() {
    this.setState({
      enfocadoCalendario: null,
      fechaCalendario: moment(),
    });
  }

  cerrarTime() {
    this.setState({
      enfocadoTime: null,
      time: moment().format('HH:mm'),
    });
  }

  cerrarCalendarioConFechaSeleccionada() {
    this.setState({ enfocadoCalendario: null });
  }
  
  cerrarTimeConHoraSeleccionada() {
    this.setState({ enfocadoTime: null });
  }

  renderControls = () => (
    <EnvolvedorBoton>
      <Boton onClick={this.cerrarCalendario.bind(this)}>Cancelar</Boton>
      <Boton
        tema="estandar"
        onClick={this.cerrarCalendarioConFechaSeleccionada.bind(this)}
      >
        Aceptar
      </Boton>
    </EnvolvedorBoton>
  );

  alDesenfocar() {
    this.setState({ focoInput: "" });
  }

  render() {
    const {
      autoenfoque,
      clase,
      conteoDeCaracteresArriba,
      conteoDeCaracteres,
      editable,
      enCambio,
      enClick,
      enClickIcono,
      esAreaDeTexto,
      esCalendario,
      esTime,
      esContrasena,
      esNumerico,
      esSerie,
      etiqueta,
      expresionRegular,
      foco,
      icono,
      id,
      marcador,
      numeroDeCaracteres,
      numeroDeRenglones,
      valor,
      valores,
      disabledProp,
      marginTop,
      domiciliacion,
      estilo,
      iconoAyuda,
      openHelp,
      mensajeError,
      referencia,
    } = this.props;
    const { fechaCalendario, times, enfocadoCalendario, focoInput, conteo } =
      this.state;
    const focoFinal = foco || focoInput;
    const ContenedorCampoTexto = esAreaDeTexto
      ? ContenedorCampoTextoArea
      : ContenedorCampoTextoInput;
    let elementoAMostrar = null;
    const identificadorEnvolvedor = id;
    const identificadorEtiqueta = `${id}-etiqueta`;
    const identificadorContenedor = `${id}-contenedorCampoDeTexto`;
    if (esCalendario) {
      elementoAMostrar = (
        <EnvolvedorCampoTexto id={identificadorEnvolvedor}>
          <Etiqueta id={identificadorEtiqueta} foco={focoFinal}>
            {etiqueta}
          </Etiqueta>
          <ContenedorCampoTexto id={identificadorContenedor} className={clase}>
            <SingleDatePicker
              date={fechaCalendario || moment()}
              onDateChange={(date) => {
                enCambio(date);
                return this.establecerFecha(date);
              }}
              focused={enfocadoCalendario}
              onFocusChange={({ focused }) => this.establecerEnfocado(focused)}
              id={`${id}-campoDeTexto`}
              numberOfMonths={1}
              displayFormat="DD/MMMM/YYYY"
              customInputIcon={icono}
              hideKeyboardShortcutsPanel
              withPortal
              renderCalendarInfo={this.renderControls}
              keepOpenOnDateSelect
              isOutsideRange={(dia) => !isInclusivelyBeforeDay(dia, moment())}
            />
          </ContenedorCampoTexto>
        </EnvolvedorCampoTexto>
      );
    } else if (esTime) {
      elementoAMostrar = (
        <EnvolvedorCampoTexto id={identificadorEnvolvedor}>
          <Etiqueta id={identificadorEtiqueta} foco={focoFinal}>
            {etiqueta}
          </Etiqueta>
          <ContenedorCampoTexto id={identificadorContenedor} className={clase} style={{ position: "relative" }}>
            <ReactDatetime
              inputProps={{ readOnly: true }}
              value={times}
              onChange={(time) => {
                const timee = time.format("HH:mm");
                const formatoHoraRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
                if (formatoHoraRegex.test(timee)){
                  enCambio({ target: { value: timee } });
                  return this.establecerTime(timee);
                }
              }}
              dateFormat={false}
              timeFormat="HH:mm"
              className="campo-times"
            />
            { icono && <ContenedorIconoReloj src={icono} /> }
          </ContenedorCampoTexto>
        </EnvolvedorCampoTexto>
      );
    } else if (esSerie) {
      const elementosSerie = [];
      const numeroElementos = 4;
      for (let i = 0; i < numeroElementos; i += 1) {
        let valorSerie = "";
        if (valores.length === numeroElementos) {
          valorSerie = valores[i];
        }
        elementosSerie.push(
          <CampoTextoElemento
            id={identificadorEnvolvedor}
            key={i}
            marcador={marcador}
            valor={valorSerie}
            enClick={(evento) => {
              evento.target.select();
              enClick();
            }}
            clase={`${clase} campo-texto-serie`}
            esNumerico
            moverEnfoque
            ultimoElemento={i === numeroElementos - 1}
            numeroDeCaracteres={1}
            foco={focoFinal}
            enFoco={this.alEnfocar}
            enDesenfoque={() => {
              this.alDesenfocar();
            }}
            enCambio={enCambio}
            indice={i}
          />
        );
      }

      elementoAMostrar = (
        <>
          <EnvolvedorCampoTexto id={identificadorEnvolvedor}>
            {iconoAyuda && (
              <>
                <ContenedorIconoAyuda
                  src={IconHelp}
                  onClick={openHelp}
                  style={{ left: "200px" }}
                />
              </>
            )}
            <Etiqueta id={identificadorEtiqueta} foco={focoFinal}>
              {etiqueta}
            </Etiqueta>
            <ContenedorSerie id={identificadorContenedor}>
              {elementosSerie}
            </ContenedorSerie>
          </EnvolvedorCampoTexto>
        </>
      );
    } else {
      elementoAMostrar = (
        // <EnvolvedorGrid>
        <EnvolvedorCampoTexto
          marginTop={marginTop}
          id={identificadorEnvolvedor}
          esAreaDeTexto={esAreaDeTexto}
        >
          {conteoDeCaracteresArriba ? (
            <ContenedorEtiquetaArriba>
              <Etiqueta id={identificadorEtiqueta} foco={focoFinal}>
                {etiqueta}
              </Etiqueta>
              <Conteo>{`${conteo}/${numeroDeCaracteres}`}</Conteo>
            </ContenedorEtiquetaArriba>
          ) : (
            <>
              {iconoAyuda && (
                <>
                  <ContenedorIconoAyuda src={IconHelp} onClick={openHelp} />

                  <Etiqueta
                    id={identificadorEtiqueta}
                    foco={focoFinal}
                    style={{ left: "12px" }}
                  >
                    {etiqueta}
                  </Etiqueta>
                </>
              )}

              {!iconoAyuda && (
                <Etiqueta
                  id={identificadorEtiqueta}
                  foco={focoFinal}
                  domiciliacion={domiciliacion}
                >
                  {etiqueta}
                </Etiqueta>
              )}
            </>
          )}
          <ContenedorCampoTexto
            id={identificadorContenedor}
            className={clase}
            numeroDeRenglones={numeroDeRenglones}
          >
            <CampoTextoElemento
              estilo={estilo}
              id={identificadorEnvolvedor}
              marcador={marcador}
              valor={valor}
              disabledProp={disabledProp}
              enClick={enClick}
              esContrasena={esContrasena}
              esNumerico={esNumerico}
              numeroDeCaracteres={numeroDeCaracteres}
              foco={focoFinal}
              enFoco={this.alEnfocar}
              enDesenfoque={() => {
                this.alDesenfocar();
              }}
              expresionRegular={expresionRegular}
              enCambio={this.enCambio}
              esAreaDeTexto={esAreaDeTexto}
              autoenfoque={autoenfoque}
              editable={editable}
              numeroDeRenglones={numeroDeRenglones}
              referencia={referencia}
            />
            {icono ? <Icono onClick={enClickIcono}>{icono}</Icono> : null}
            {conteoDeCaracteres ? (
              <Conteo>{`${conteo}/${numeroDeCaracteres}`}</Conteo>
            ) : null}
          </ContenedorCampoTexto>
          {foco === "error" && <MensajeError> {mensajeError}</MensajeError>}
        </EnvolvedorCampoTexto>
        // </EnvolvedorGrid>
      );
    }
    return elementoAMostrar;
  }
}

CampoTexto.propTypes = {
  autoenfoque: PropTypes.bool,
  clase: PropTypes.string,
  conteoDeCaracteresArriba: PropTypes.bool,
  conteoDeCaracteres: PropTypes.bool,
  editable: PropTypes.bool,
  enCambio: PropTypes.func,
  enClick: PropTypes.func,
  enClickIcono: PropTypes.func,
  esAreaDeTexto: PropTypes.bool,
  esCalendario: PropTypes.bool,
  esContrasena: PropTypes.bool,
  esNumerico: PropTypes.bool,
  esSerie: PropTypes.bool,
  etiqueta: PropTypes.string,
  expresionRegular: PropTypes.instanceOf(RegExp),
  fechaCalendario: PropTypes.instanceOf(moment),
  foco: PropTypes.oneOf(["error", "enfocado", ""]),
  icono: PropTypes.node,
  id: PropTypes.string,
  marcador: PropTypes.string,
  numeroDeCaracteres: PropTypes.number,
  numeroDeRenglones: PropTypes.number,
  valor: PropTypes.string,
  valores: PropTypes.arrayOf(PropTypes.string),
  disabledProp: PropTypes.bool,
  iconoAyuda: PropTypes.bool,
  openHelp: PropTypes.func,
  mensajeError: PropTypes.string,
  referencia: React.createRef(),
};

CampoTexto.defaultProps = {
  autoenfoque: false,
  clase: "",
  conteoDeCaracteresArriba: false,
  conteoDeCaracteres: false,
  editable: true,
  enCambio: null,
  enClick() {},
  enClickIcono: null,
  esAreaDeTexto: false,
  esCalendario: false,
  esContrasena: false,
  esNumerico: false,
  esSerie: false,
  etiqueta: "",
  expresionRegular: /(?:)/,
  fechaCalendario: moment(),
  foco: "",
  icono: null,
  id: "CampoDeTextoEnvolvedor",
  marcador: "",
  numeroDeCaracteres: 0,
  numeroDeRenglones: 2,
  valor: "",
  valores: [],
  disabledProp: false,
  iconoAyuda: false,
  openHelp: () => {},
  mensajeError: "",
  referencia: null,
};

// export default CampoTexto;
export default CampoTexto;
