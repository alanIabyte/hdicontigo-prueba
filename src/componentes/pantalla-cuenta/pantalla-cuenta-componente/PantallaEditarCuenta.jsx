/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import { useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import moment from "moment";
import "moment/locale/es-mx";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux"; // , useSelector } from "react-redux";
// import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { DatePicker } from "@mui/x-date-pickers";
import {
  ContenedorBotones,
  ContenedorParrafo,
  CuentaMensaje,
  EnvolvedorPantallaCuenta,
  MensajeError,
  PantallaCuenta,
  SeccionEditar,
  SeccionEditarPrimera,
  Separador,
  SeparadorLineaEditar,
  SeparadorTransparente,
} from "./PantallaCuenta.styled";
import Encabezado from "../../encabezado";
import Constantes from "../../../recursos/constantes";
import IndicadorCarga from "../../indicador-carga";
import CampoTexto from "../../campo-texto";
import RadioBoton from "../../radio-boton";
import Boton from "../../boton";
import { Alerta } from "../../alerta";

const { nombreDeCookie } = Constantes;

const EDITAR_PERFIL = loader(
  "../../../graphQL/mutation/seguridad/editar_perfil.graphql"
);

// const iconoCalendario = <CalendarTodayIcon />;

const diccionario = {
  encabezado: "Editar Mi perfil",
  separadorNombre: "Mis datos",
  separadorGenero: "Género",
  separadorFechaDeNacimiento: "Fecha de Nacimiento",
  separadorEmail: "Correo Electrónico",
  emailMensaje:
    // eslint-disable-next-line max-len
    "Todas las nuevas notificaciones serán enviadas a la cuenta de correo que indiques aquí.",
  etiquetas: {
    nombre: "Nombre",
    apellidos: "Apellido",
    femenino: "Femenino",
    masculino: "Masculino",
    dia: "Día",
    mes: "Mes",
    ano: "Año",
    email: "Correo electrónico",
  },
  errores: {
    excesoDeCaracteres: "El texto supera los 250 caracteres permitidos.",
    campoRequerido: "Campo requerido para poder continuar.",
    emailFormato: "El correo electrónico no tiene un formato válido.",
  },
  botonGuardar: "Guardar cambios",
  botonCancelar: "Cancelar",
  meses: {
    enero: "Enero",
    febrero: "Febrero",
    marzo: "Marzo",
    abril: "Abril",
    mayo: "Mayo",
    junio: "Junio",
    julio: "Julio",
    agosto: "Agosto",
    septiembre: "Septiembre",
    octubre: "Octubre",
    noviembre: "Noviembre",
    diciembre: "Diciembre",
  },
  error: {
    titulo: "Ocurrió un problema",
    cuerpo:
      "La información de tu perfil no pudo ser actualizada en este momento.",
    boton: "Reintentar",
    boton2: "Cancelar",
  },
  exito: {
    titulo: "Perfil actualizado",
    cuerpo: "La información de tu perfil se ha actualizado con éxito.",
    boton: "Aceptar",
  },
};

const valores = {
  nombre: "",
  apellidos: "",
  genero: "",
  fecha: "",
};

let controlFuncion = false;

const PantallaEditarCuenta = (props) => {
  const { funcionRegresar } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  // const estadoApp = useSelector((estado) => estado);
  const [cookie] = useCookies([nombreDeCookie]);
  const objetoCookie = cookie[nombreDeCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }
  const [cargando, asignarValorCargando] = useState(false);
  const [focoNombre, asignarValorFocoNombre] = useState("");
  const [errorNombre, asignarErrorNombre] = useState("");
  const [focoApellidos, asignarValorFocoApellidos] = useState("");
  const [errorApellidos, asignarErrorApellidos] = useState("");
  const [focoEmail, asignarValorFocoEmail] = useState("");
  const [errorEmail, asignarErrorEmail] = useState("");
  const [mostrarModalError, asignarValorMostrarModalError] = useState(false);
  const [mostrarModalExito, asignarValorMostrarModalExito] = useState(false);
  const [wrongDate, setWrongDate] = useState(false);
  // const [NombreUsuarioPerfil, asignarValorNombreUsuarioPerfil] = useState(
  //   estadoApp.NombreUsuarioPerfil ? estadoApp.NombreUsuarioPerfil : []
  // );
  const [editarPerfil, { loading, error, data }] = useMutation(EDITAR_PERFIL);
  const {
    config: { nombre, apellidos, genero, fechaDeNacimiento, email },
  } = props;

  controlFuncion = true;

  // const fechaDeNacimientoObjetoMoment = moment.utc(
  //   fechaDeNacimiento,
  //   "DD/MMM/YYYY"
  // );
  valores.nombre = nombre;
  valores.apellidos = apellidos;
  valores.genero = genero;
  // valores.dia = `${fechaDeNacimientoObjetoMoment.date()}`;
  // valores.mes = `${fechaDeNacimientoObjetoMoment.month() + 1}`;
  // valores.ano = `${fechaDeNacimientoObjetoMoment.year()}`;
  valores.email = email;

  const alCambiarNombre = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.nombre = valor;
    }
  };

  const alCambiarApellidos = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.apellidos = valor;
    }
  };

  const alSeleccionarGenero = (opcion) => {
    if (opcion) {
      const { valor } = opcion;
      valores.genero = valor === "Femenino" ? "2" : "1";
    }
  };

  const alCambiarFecha = (event) => {
    console.log(event);
    valores.fecha = event;
  };

  const alCambiarEmail = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.email = valor;
    }
  };

  useEffect(() => {
    if (!loading && data && data.editar_perfil) {
      asignarValorCargando(false);
      if (!data.editar_perfil.completado) {
        asignarValorMostrarModalError(true);
        return;
      }
      // asignarValorNombreUsuarioPerfil(valores.nombre);
      // console.log(NombreUsuarioPerfil);
      dispatch({
        type: "AGREGAR",
        valor: {
          data: valores.nombre,
        },
        indice: "NombreUsuarioPerfil",
      });
      asignarValorMostrarModalExito(true);
      asignarValorCargando(false);
      return;
    }

    if (loading) {
      asignarValorCargando(true);
      return;
    }

    if (error) {
      asignarValorMostrarModalError(true);
      asignarValorCargando(false);
    }
  }, [loading, data, error]);

  const alGuardarCambios = () => {
    const {
      nombre: nombreValor,
      apellidos: apellidosValor,
      genero: generoValor,
      email: emailValor,
    } = valores;
    let { fecha } = valores;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

    let formularioValido = true;

    if (!nombreValor) {
      asignarValorFocoNombre("error");
      asignarErrorNombre(diccionario.errores.campoRequerido);
      formularioValido = false;
    } else if (nombreValor.length > 250) {
      asignarValorFocoNombre("error");
      asignarErrorNombre(diccionario.errores.excesoDeCaracteres);
      formularioValido = false;
    } else {
      asignarValorFocoNombre("");
      asignarErrorNombre("");
    }

    if (!apellidosValor) {
      asignarValorFocoApellidos("error");
      asignarErrorApellidos(diccionario.errores.campoRequerido);
      formularioValido = false;
    } else if (apellidosValor.length > 250) {
      asignarValorFocoApellidos("error");
      asignarErrorApellidos(diccionario.errores.excesoDeCaracteres);
      formularioValido = false;
    } else {
      asignarValorFocoApellidos("");
      asignarErrorApellidos("");
    }

    if (fecha === "") {
      fecha = moment.utc();
    }

    if (!fecha.isValid) {
      setWrongDate(true);
      formularioValido = false;
    }

    if (!emailValor) {
      asignarValorFocoEmail("error");
      asignarErrorEmail(diccionario.errores.campoRequerido);
      formularioValido = false;
    } else if (emailValor && !emailRegex.test(emailValor)) {
      asignarValorFocoEmail("error");
      asignarErrorEmail(diccionario.errores.emailFormato);
      formularioValido = false;
    } else if (emailValor.length > 250) {
      asignarValorFocoEmail("error");
      asignarErrorEmail(diccionario.errores.excesoDeCaracteres);
      formularioValido = false;
    } else {
      asignarValorFocoEmail("");
      asignarErrorEmail("");
    }

    if (formularioValido) {
      console.log("LLAMADO A EDITAR PERFIL");
      // console.log(fechaDeNacimientoObjeto.toDate());
      console.log(objetoCookie.access_token);
      console.log(objetoCookie.Usuario);
      editarPerfil({
        variables: {
          apellido: apellidosValor,
          correoElectronico: emailValor,
          fechaNacimiento: fecha,
          genero: generoValor,
          nombre: nombreValor,
          token: objetoCookie.access_token,
          usuario: objetoCookie.Usuario,
        },
      });
    }
  };

  const regresar = () => {
    valores.nombre = "";
    valores.apellidos = "";
    valores.genero = "";
    valores.dia = "";
    valores.mes = "";
    valores.ano = "";
    valores.email = "";
    controlFuncion = false;
    console.log(controlFuncion);
    funcionRegresar();
  };

  return (
    <EnvolvedorPantallaCuenta key={v4()} id="pantallaEditarCuenta">
      <Alerta
        textoEncabezado={diccionario.error.titulo}
        colorAlerta="rojo"
        textoCuerpo={diccionario.error.cuerpo}
        mostrarModal={mostrarModalError}
        etiquetaBoton={diccionario.error.boton}
        funcionLlamadaBoton={() => {
          asignarValorMostrarModalError(false);
          alGuardarCambios();
        }}
        etiquetaBoton2={diccionario.error.boton2}
        funcionLlamadaBoton2={() => {
          asignarValorMostrarModalError(false);
        }}
        temaBoton2="simple"
        mostrarCierre={false}
      />
      <Alerta
        textoEncabezado={diccionario.exito.titulo}
        colorAlerta="azul"
        textoCuerpo={diccionario.exito.cuerpo}
        mostrarModal={mostrarModalExito}
        etiquetaBoton={diccionario.exito.boton}
        funcionLlamadaBoton={() => {
          asignarValorMostrarModalExito(false);
          funcionRegresar();
        }}
        mostrarCierre={false}
      />
      <Encabezado titulo={diccionario.encabezado} funcionRegresar={regresar} />
      <PantallaCuenta>
        {cargando ? <IndicadorCarga id="carga" /> : null}
        <SeccionEditarPrimera>
          <Separador id="separadorNombre">
            {diccionario.separadorNombre}
          </Separador>
        </SeccionEditarPrimera>
        <SeparadorLineaEditar />
        <ContenedorParrafo>
          <CampoTexto
            id="campoNombre"
            etiqueta={diccionario.etiquetas.nombre}
            enCambio={alCambiarNombre}
            foco={focoNombre}
            valor={valores.nombre}
          />
          {errorNombre !== "" && (
            <MensajeError style={{ marginTop: "15px" }} id="errorNombre">
              {errorNombre}
            </MensajeError>
          )}
          <SeparadorTransparente />
          <CampoTexto
            estilo={{ marginTop: "7px" }}
            id="campoApellidos"
            etiqueta={diccionario.etiquetas.apellidos}
            enCambio={alCambiarApellidos}
            foco={focoApellidos}
            valor={valores.apellidos}
          />
          {errorApellidos !== "" && (
            <MensajeError id="errorNombre" style={{ marginTop: "25px" }}>
              {errorApellidos}
            </MensajeError>
          )}
        </ContenedorParrafo>
        <SeccionEditar>
          <Separador id="separadorGenero">
            {diccionario.separadorGenero}
          </Separador>
        </SeccionEditar>
        <SeparadorLineaEditar />
        <ContenedorParrafo>
          <RadioBoton
            config={[
              {
                valor: diccionario.etiquetas.femenino,
                etiqueta: diccionario.etiquetas.femenino,
                seleccionado: valores.genero === "2",
              },
              {
                valor: diccionario.etiquetas.masculino,
                etiqueta: diccionario.etiquetas.masculino,
                seleccionado: valores.genero === "1",
              },
            ]}
            alSeleccionar={alSeleccionarGenero}
          />
        </ContenedorParrafo>
        <SeccionEditar>
          <Separador id="separadorFechaDeNacimiento">
            {diccionario.separadorFechaDeNacimiento}
          </Separador>
        </SeccionEditar>
        <SeparadorLineaEditar />
        <ContenedorParrafo>
          <DatePicker
            value={valores.fecha}
            onChange={alCambiarFecha}
            defaultValue={() => moment.now()}
          />
          {/* <CampoTexto
            esCalendario
            enCambio={alCambiarFecha}
            fechaCalendario={valores.fecha}
            id="campoFecha"
          /> */}
          {wrongDate && (
            <MensajeError>Fecha inválida o no introducida</MensajeError>
          )}
        </ContenedorParrafo>
        <SeccionEditar>
          <Separador id="separadorEmail">
            {diccionario.separadorEmail}
          </Separador>
        </SeccionEditar>
        <SeparadorLineaEditar />
        <ContenedorParrafo>
          <CuentaMensaje>{diccionario.emailMensaje}</CuentaMensaje>
          <SeparadorTransparente />
          <CampoTexto
            id="campoEmail"
            etiqueta={diccionario.etiquetas.email}
            enCambio={alCambiarEmail}
            foco={focoEmail}
            valor={valores.email}
          />
          {errorEmail !== "" && (
            <MensajeError id="errorEmail">{errorEmail}</MensajeError>
          )}
          <SeparadorTransparente />
        </ContenedorParrafo>
        <ContenedorBotones>
          <Boton
            etiqueta={diccionario.botonGuardar}
            tema="estandar"
            id="botonGuardar"
            enClick={() => {
              alGuardarCambios();
            }}
          />
          <Boton
            etiqueta={diccionario.botonCancelar}
            tema="simple-gris"
            id="botonCancelar"
            enClick={regresar}
          />
        </ContenedorBotones>
      </PantallaCuenta>
    </EnvolvedorPantallaCuenta>
  );
};

PantallaEditarCuenta.propTypes = {
  config: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    apellidos: PropTypes.string.isRequired,
    genero: PropTypes.string.isRequired,
    fechaDeNacimiento: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  funcionRegresar: PropTypes.func.isRequired,
};

PantallaEditarCuenta.defaultProps = {};

export default PantallaEditarCuenta;
