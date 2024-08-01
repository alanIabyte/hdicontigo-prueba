/* eslint-disable */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es-mx';
import 'react-dates/initialize';
import { isInclusivelyBeforeDay, SingleDatePicker } from 'react-dates';
import PropTypes from 'prop-types';
import {
  ContenedorCampoTexto,
  ContenedorEtiquetaArriba,
  Icono,
  Boton,
  EnvolvedorBoton,
  EnvolvedorCampoTexto,
  Etiqueta,
  ContenedorSerie,
  Conteo,
} from './CampoTexto.styled';
import CampoTextoElemento from './CampoTextoElemento';
import './estilos.scss';

// const CampoTexto = ({
//   valor,
//   enCambio: enCambioFuncion,
//   autoenfoque,
//   clase,
//   conteoDeCaracteresArriba,
//   conteoDeCaracteres,
//   editable,
//   enClick,
//   enClickIcono,
//   esAreaDeTexto,
//   esCalendario,
//   esContrasena,
//   esNumerico,
//   esSerie,
//   etiqueta,
//   expresionRegular,
//   foco,
//   icono,
//   id,
//   marcador,
//   numeroDeCaracteres,
//   numeroDeRenglones,
//   valores,
// }) => {
//   const [fechaCalendario, setFechaCalendario] = useState('');
//   const [enfocadoCalendario, setEnfocadoCalendario] = useState(null);
//   const [focoInput, setFocoInput] = useState('');
//   const [conteo, setConteo] = useState(valor);

//   useEffect(() => {
//     console.log(valor);
//   }, []);

//   const enCambio = evento => {
//     if (evento) {
//       const valorScope = evento.target.value;
//       setConteo(valorScope.length);
//       enCambioFuncion(evento);
//     }
//   };

//   const alEnfocar = evento => {
//     setFocoInput('enfocado');
//     if (evento && evento.target && evento.target.value) {
//       const valorTemporal = evento.target.value;
//       evento.target.value = '';
//       evento.target.value = valorTemporal;
//     }
//   };

//   const establecerEnfocado = enfocadoCalendarioProp => {
//     let focoInputScope = '';
//     if (enfocadoCalendarioProp) {
//       focoInputScope = 'enfocado';
//     }
//     setFocoInput(focoInputScope);
//     setEnfocadoCalendario(enfocadoCalendario);
//   };

//   const cerrarCalendario = () => {
//     setEnfocadoCalendario(null);
//     setFechaCalendario(moment());
//   };

//   const cerrarCalendarioConFechaSeleccionada = () => {
//     setEnfocadoCalendario(null);
//   };

//   const renderControls = () => (
//     <EnvolvedorBoton>
//       <Boton onClick={() => cerrarCalendario()}>Cancelar</Boton>
//       <Boton
//         tema='estandar'
//         onClick={() => cerrarCalendarioConFechaSeleccionada()}>
//         Aceptar
//       </Boton>
//     </EnvolvedorBoton>
//   );

//   const alDesenfocar = () => {
//     setFocoInput('');
//   };

//   const establecerFecha = fechaCalendarioProp => {
//     setFechaCalendario(fechaCalendarioProp);
//   };

//   const focoFinal = foco || focoInput;
//   let elementoAMostrar = null;
//   const identificadorEnvolvedor = id;
//   const identificadorEtiqueta = `${id}-etiqueta`;
//   const identificadorContenedor = `${id}-contenedorCampoDeTexto`;
//   if (esCalendario) {
//     elementoAMostrar = (
//       <EnvolvedorCampoTexto id={identificadorEnvolvedor}>
//         <Etiqueta id={identificadorEtiqueta} foco={focoFinal}>
//           {etiqueta}
//         </Etiqueta>
//         <ContenedorCampoTexto id={identificadorContenedor} className={clase}>
//           <SingleDatePicker
//             date={fechaCalendario || moment()}
//             onDateChange={date => {
//               enCambio(date);
//               return establecerFecha(date);
//             }}
//             focused={enfocadoCalendario}
//             onFocusChange={({ focused }) => establecerEnfocado(focused)}
//             id={`${id}-campoDeTexto`}
//             numberOfMonths={1}
//             displayFormat='DD/MMMM/YYYY'
//             customInputIcon={icono}
//             hideKeyboardShortcutsPanel
//             withPortal
//             renderCalendarInfo={renderControls}
//             keepOpenOnDateSelect
//             isOutsideRange={dia => !isInclusivelyBeforeDay(dia, moment())}
//           />
//         </ContenedorCampoTexto>
//       </EnvolvedorCampoTexto>
//     );
//   } else if (esSerie) {
//     const elementosSerie = [];
//     const numeroElementos = 4;
//     for (let i = 0; i < numeroElementos; i += 1) {
//       let valorSerie = '';
//       if (valores.length === numeroElementos) {
//         valorSerie = valores[i];
//       }
//       elementosSerie.push(
//         <CampoTextoElemento
//           id={identificadorEnvolvedor}
//           key={i}
//           marcador={marcador}
//           valor={valorSerie}
//           enClick={evento => {
//             evento.target.select();
//             enClick();
//           }}
//           clase={`${clase} campo-texto-serie`}
//           esNumerico
//           moverEnfoque
//           ultimoElemento={i === numeroElementos - 1}
//           numeroDeCaracteres={1}
//           foco={focoFinal}
//           enFoco={alEnfocar}
//           enDesenfoque={() => {
//             alDesenfocar();
//           }}
//           enCambio={enCambio}
//           indice={i}
//         />
//       );
//     }
//     elementoAMostrar = (
//       <EnvolvedorCampoTexto id={identificadorEnvolvedor}>
//         <Etiqueta id={identificadorEtiqueta} foco={focoFinal}>
//           {etiqueta}
//         </Etiqueta>
//         <ContenedorSerie id={identificadorContenedor}>
//           {elementosSerie}
//         </ContenedorSerie>
//       </EnvolvedorCampoTexto>
//     );
//   } else {
//     elementoAMostrar = (
//       <EnvolvedorCampoTexto
//         id={identificadorEnvolvedor}
//         esAreaDeTexto={esAreaDeTexto}>
//         {conteoDeCaracteresArriba ? (
//           <ContenedorEtiquetaArriba>
//             <Etiqueta id={identificadorEtiqueta} foco={focoFinal}>
//               {etiqueta}
//             </Etiqueta>
//             <Conteo>{`${conteo}/${numeroDeCaracteres}`}</Conteo>
//           </ContenedorEtiquetaArriba>
//         ) : (
//           <Etiqueta id={identificadorEtiqueta} foco={focoFinal}>
//             {etiqueta}
//           </Etiqueta>
//         )}
//         <ContenedorCampoTexto id={identificadorContenedor} className={clase}>
//           <CampoTextoElemento
//             id={identificadorEnvolvedor}
//             marcador={marcador}
//             valor={valor}
//             enClick={enClick}
//             esContrasena={esContrasena}
//             esNumerico={esNumerico}
//             numeroDeCaracteres={numeroDeCaracteres}
//             foco={focoFinal}
//             enFoco={alEnfocar}
//             enDesenfoque={() => {
//               alDesenfocar();
//             }}
//             expresionRegular={expresionRegular}
//             enCambio={enCambio}
//             esAreaDeTexto={esAreaDeTexto}
//             autoenfoque={autoenfoque}
//             editable={editable}
//             numeroDeRenglones={numeroDeRenglones}
//           />
//           {icono ? <Icono onClick={enClickIcono}>{icono}</Icono> : null}
//           {conteoDeCaracteres ? (
//             <Conteo>{`${conteo}/${numeroDeCaracteres}`}</Conteo>
//           ) : null}
//         </ContenedorCampoTexto>
//       </EnvolvedorCampoTexto>
//     );
//   }

//   return elementoAMostrar;
// };

// ==========================

class CampoNumeros extends React.Component {
  constructor(props) {
    super(props);
    const { fechaCalendario, valor } = this.props;
    this.state = {
      fechaCalendario,
      enfocadoCalendario: null,
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
      enCambioFuncion(evento);
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

  establecerEnfocado(enfocadoCalendario) {
    let focoInput = "";
    if (enfocadoCalendario) {
      focoInput = "enfocado";
    }
    this.setState({ enfocadoCalendario, focoInput });
  }

  cerrarCalendario() {
    this.setState({
      enfocadoCalendario: null,
      fechaCalendario: moment(),
    });
  }

  cerrarCalendarioConFechaSeleccionada() {
    this.setState({ enfocadoCalendario: null });
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
      disabledProp
    } = this.props;
    const {
      fechaCalendario,
      enfocadoCalendario,
      focoInput,
      conteo,
    } = this.state;
    const focoFinal = foco || focoInput;
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
        <EnvolvedorCampoTexto id={identificadorEnvolvedor}>
          <Etiqueta id={identificadorEtiqueta} foco={focoFinal}>
            {etiqueta}
          </Etiqueta>
          <ContenedorSerie id={identificadorContenedor}>
            {elementosSerie}
          </ContenedorSerie>
        </EnvolvedorCampoTexto>
      );
    } else {
      elementoAMostrar = (
        <EnvolvedorCampoTexto
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
            <Etiqueta id={identificadorEtiqueta} foco={focoFinal}>
              {etiqueta}
            </Etiqueta>
          )}
          <ContenedorCampoTexto id={identificadorContenedor} className={clase}>
            <CampoTextoElemento
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
            />
            {icono ? <Icono onClick={enClickIcono}>{icono}</Icono> : null}
            {conteoDeCaracteres ? (
              <Conteo>{`${conteo}/${numeroDeCaracteres}`}</Conteo>
            ) : null}
          </ContenedorCampoTexto>
        </EnvolvedorCampoTexto>
      );
    }
    return elementoAMostrar;
  }
}

CampoNumeros.propTypes = {
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
  foco: PropTypes.oneOf(['error', 'enfocado', '']),
  icono: PropTypes.node,
  id: PropTypes.string,
  marcador: PropTypes.string,
  numeroDeCaracteres: PropTypes.number,
  numeroDeRenglones: PropTypes.number,
  valor: PropTypes.string,
  valores: PropTypes.arrayOf(PropTypes.string),
  disabledProp: PropTypes.bool,
};

CampoNumeros.defaultProps = {
  autoenfoque: false,
  clase: '',
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
  etiqueta: '',
  expresionRegular: /(?:)/,
  fechaCalendario: moment(),
  foco: '',
  icono: null,
  id: 'CampoDeTextoEnvolvedor',
  marcador: '',
  numeroDeCaracteres: 0,
  numeroDeRenglones: 2,
  valor: '',
  valores: [],
  disabledProp: false,
};

// export default CampoTexto;
export default CampoNumeros;
