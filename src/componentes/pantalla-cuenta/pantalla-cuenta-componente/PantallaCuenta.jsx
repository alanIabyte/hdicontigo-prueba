import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import moment from "moment";
import "moment/locale/es-mx";
import EditarIcono from "@material-ui/icons/EditRounded";
import CirculoMasIcono from "@material-ui/icons/AddCircle";
import SiguienteIcono from "@material-ui/icons/NavigateNext";
import IconoCamara from "@material-ui/icons/PhotoCamera";
import IconoFoto from "@material-ui/icons/PhotoSizeSelectActual";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { useCookies } from "react-cookie";
import {
  Archivo,
  ContenedorBotonSubidaDeFotos,
  ContenedorImagen,
  ContenedorOpcionSubidaDeFotos,
  ContenedorOpcionSubidaDeFotosTexto,
  ContenedorParrafo,
  ContenedorSubidaDeFotos,
  ContenedorSubidaDeFotosCompleto,
  ContenedorTextoEditar,
  Etiqueta,
  EnvolvedorPantallaCuenta,
  ImagenPerfil,
  LigaEditar,
  LigaEtiqueta,
  MensajeErrorImagen,
  Seccion,
  Separador,
  SeparadorLinea,
  PantallaCuenta,
  Valor,
} from "./PantallaCuenta.styled";
import Boton from "../../boton";
import Encabezado from "../../encabezado";
import Constantes from "../../../recursos/constantes";
import avatar from "../../../recursos/imagenes/default-avatar.png";
import IndicadorCarga from "../../indicador-carga";
import PantallaCamara from "../../pantalla-camara";
import Configuraciones from "../../../servicios/configuraciones";
import PantallaEditarCuenta from "./PantallaEditarCuenta";
import MenuBottomComponente from "../../menu-bottom/menu-bottom-component/Menu-bottom";
import { validaDispositivoCelular } from "../../../utils/validaDispositivo";

const OBTENER_PERFIL = loader(
  "../../../graphQL/query/seguridad/obtener_perfil.graphql"
);

const { nombreDeCookie } = Constantes;

const diccionario = {
  encabezado: "Mi cuenta",
  separadorPerfil: "Mi Perfil",
  separadorContrasena: "Contraseña",
  editar: "Editar",
  etiquetas: {
    nombre: "Nombre",
    genero: "Género",
    fechaDeNacimiento: "Fecha de nacimiento",
    email: "Email",
    modificarContrasena: "Modificar contraseña",
  },
  tomarFoto: "Tomar una foto",
  elegirFotoDeLaGaleria: "Elegir foto de la galería",
  cancelar: "Cancelar",
  tituloCamara: "Foto de póliza",
  textoError1: "Carga fallida, reintentar",
  textoError2: "La foto superó el límite de 3 MB, reintentar con otra",
};

const PantallaCuentaComponente = () => {
  const history = useHistory();
  const [cookie] = useCookies([nombreDeCookie]);
  moment.locale("es-mx", {
    monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dec".split("_"),
  });
  const objetoCookie = cookie[nombreDeCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }
  const usuario = objetoCookie && objetoCookie.Usuario;
  const token = objetoCookie && objetoCookie.access_token;
  const [obtenerPerfil, { loading, error, data }] = useLazyQuery(
    OBTENER_PERFIL,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const [nombre, asignarValorNombre] = useState("");
  const [apellidos, asignarValorApellidos] = useState("");
  const [genero, asignarValorGenero] = useState("");
  const [fechaDeNacimiento, asignarValorFechaNacimiento] = useState("");
  const [correoElectronico, asignarValorCorreoElectronico] = useState("");
  const [imagenUsuario, asignarValorImagenUsuario] = useState(avatar);
  const [cargando, asignarValorCargando] = useState(false);
  const [cargandoSubidaImagen, asignarValorCargandoSubidaImagen] =
    useState(false);
  const [mostrarInteraccionFotos, asignarValorMostrarInteraccionFotos] =
    useState(false);
  const [mostrarCamara, asignarValorMostrarCamara] = useState(false);
  const [errorImagen, asignarValorErrorImagen] = useState("");
  const archivoRef = useRef(null);
  const limiteTamanoArchivo = 3145728;
  const [editarPerfil, asignarValorEditarPerfil] = useState(false);
  const [config, asignarValorConfig] = useState({});

  useEffect(() => {
    obtenerPerfil({
      variables: { token, usuario },
    });
  }, []);

  useEffect(() => {
    if (
      !loading &&
      data &&
      data.obtener_perfil &&
      data.obtener_perfil.completado
    ) {
      const {
        obtener_perfil: {
          dato: {
            apellido: apellidoValor,
            nombre: nombreValor,
            genero: generoValor,
            fechaNacimiento,
            correoElectronico: correElectronicoValor,
            imagenes,
          },
        },
      } = data;
      asignarValorNombre(nombreValor);
      asignarValorApellidos(apellidoValor);
      asignarValorGenero(generoValor === "2" ? "Femenino" : "Masculino");
      asignarValorFechaNacimiento(
        fechaNacimiento && moment.utc(fechaNacimiento).year() > 1900
          ? moment.utc(fechaNacimiento).format("DD/MMM/YYYY")
          : ""
      );
      asignarValorCorreoElectronico(correElectronicoValor);
      asignarValorImagenUsuario(
        imagenes && imagenes.length ? imagenes[0].url : avatar
      );
      asignarValorConfig({
        nombre: nombreValor,
        apellidos: apellidoValor,
        genero: generoValor,
        fechaDeNacimiento:
          fechaNacimiento && moment.utc(fechaNacimiento).format("DD/MMM/YYYY"),
        email: correElectronicoValor,
      });
      asignarValorCargando(false);
    } else if (error) {
      asignarValorCargando(false);
    } else if (loading) {
      asignarValorCargando(true);
    }
  }, [data, loading, error]);

  const alDarClickEnImagen = () => {
    asignarValorMostrarInteraccionFotos(true);
  };

  const cerrarCamara = () => {
    asignarValorMostrarCamara(false);
  };

  const cargaImagenAServidor = async (imagenBase64) => {
    const stringBase64Imagen = imagenBase64.split("base64,")[1];
    console.log(stringBase64Imagen);
    const tamanoArchivo = atob(stringBase64Imagen).length;
    const esDeTamanoAdecuado = tamanoArchivo <= limiteTamanoArchivo;
    if (esDeTamanoAdecuado) {
      const imagenBase64Datos = await fetch(imagenBase64);
      const imagenBlob = await imagenBase64Datos.blob();
      if (imagenBlob) {
        const respuestaServidor = await fetch(
          // eslint-disable-next-line max-len
          `${Configuraciones.api}/usuario/imagen/${usuario}/perfil.jpg`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/octet-stream",
              authorization: token,
            },
            body: imagenBlob,
          }
        )
          .then((respuesta) => respuesta.json())
          .then((respuesta) => respuesta)
          .catch((errorEnRespuesta) => ({ error: errorEnRespuesta }));
        if (respuestaServidor.error) {
          asignarValorErrorImagen(diccionario.textoError1);
        } else {
          asignarValorImagenUsuario(imagenBase64);
          // console.log();
          console.log(respuestaServidor);
          asignarValorErrorImagen("");
        }
        return respuestaServidor;
      }
    }
    asignarValorErrorImagen(diccionario.textoError2);
    return null;
  };

  const alAceptarImagen = async (imagen) => {
    console.log(imagen);
    asignarValorCargandoSubidaImagen(true);
    asignarValorMostrarCamara(false);
    await cargaImagenAServidor(imagen);
    asignarValorMostrarInteraccionFotos(false);
    asignarValorCargandoSubidaImagen(false);
  };

  const alDarClickEnContenedor = () => {
    archivoRef.current.click();
  };

  const convertirABase64 = (archivo) =>
    new Promise((resuelve, rechaza) => {
      const lector = new FileReader();
      lector.readAsDataURL(archivo);
      lector.onload = () => resuelve(lector.result);
      lector.onerror = (errorLector) => rechaza(errorLector);
    });

  const alSeleccionarArchivo = async (e) => {
    const regex = new RegExp("image/");
    if (
      !e.target.files ||
      e.target.files.length === 0 ||
      !regex.test(e.target.files[0].type)
    ) {
      return null;
    }
    const archivoEnBase64 = await convertirABase64(e.target.files[0]);
    asignarValorCargandoSubidaImagen(true);
    await cargaImagenAServidor(archivoEnBase64);
    asignarValorMostrarInteraccionFotos(false);
    asignarValorCargandoSubidaImagen(false);
    return null;
  };

  const [verMenuInferior, setVerMenuInferior] = useState(false);

  useEffect(() => {
    setVerMenuInferior(validaDispositivoCelular());
  }, []);

  const pantallaAMostrar = editarPerfil ? (
    <PantallaEditarCuenta
      config={config}
      funcionRegresar={() => {
        asignarValorEditarPerfil(false);
        obtenerPerfil({
          variables: { token, usuario },
        });
      }}
    />
  ) : (
    <EnvolvedorPantallaCuenta key={v4()} id="pantallaCuenta">
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={() => {
          history.push("/inicio");
        }}
      />
      <PantallaCuenta>
        {cargando ? <IndicadorCarga id="carga" /> : null}
        <ContenedorImagen onClick={alDarClickEnImagen}>
          <ImagenPerfil error={errorImagen} src={imagenUsuario} />
          <CirculoMasIcono />
        </ContenedorImagen>
        {errorImagen !== "" && (
          <MensajeErrorImagen id="errorImagen">
            {errorImagen}
          </MensajeErrorImagen>
        )}
        <Seccion>
          <Separador id="separadorMiPerfil">
            {diccionario.separadorPerfil}
          </Separador>
          <LigaEditar
            id="editarMiPerfil"
            onClick={() => {
              asignarValorEditarPerfil(true);
            }}
          >
            <ContenedorTextoEditar>{diccionario.editar}</ContenedorTextoEditar>
            <EditarIcono />
          </LigaEditar>
        </Seccion>
        <SeparadorLinea />
        <ContenedorParrafo>
          <Etiqueta id="etiquetaNombre">
            {diccionario.etiquetas.nombre}
          </Etiqueta>
          <Valor id="valorNombre">{`${nombre} ${apellidos}`}</Valor>
        </ContenedorParrafo>
        <ContenedorParrafo>
          <Etiqueta id="etiquetaGenero">
            {diccionario.etiquetas.genero}
          </Etiqueta>
          <Valor id="valorGenero">{genero}</Valor>
        </ContenedorParrafo>
        {fechaDeNacimiento !== "" && (
          <ContenedorParrafo>
            <Etiqueta id="etiquetaFechaDeNacimiento">
              {diccionario.etiquetas.fechaDeNacimiento}
            </Etiqueta>
            <Valor id="valorFechaDeNacimiento">{fechaDeNacimiento}</Valor>
          </ContenedorParrafo>
        )}
        <ContenedorParrafo>
          <Etiqueta id="etiquetaEmail">{diccionario.etiquetas.email}</Etiqueta>
          <Valor id="valorEmail">{correoElectronico}</Valor>
        </ContenedorParrafo>
        <Seccion>
          <Separador id="separadorContrasena">
            {diccionario.separadorContrasena}
          </Separador>
        </Seccion>
        <SeparadorLinea />
        <ContenedorParrafo>
          <LigaEtiqueta
            id="etiquetaContrasena"
            onClick={() => {
              history.push("/contrasena-cambiar");
            }}
          >
            {diccionario.etiquetas.modificarContrasena}
          </LigaEtiqueta>
          <SiguienteIcono
            onClick={() => {
              history.push("/contrasena-cambiar");
            }}
          />
        </ContenedorParrafo>
      </PantallaCuenta>
      {mostrarInteraccionFotos && (
        <ContenedorSubidaDeFotosCompleto>
          {cargandoSubidaImagen ? (
            <IndicadorCarga tema="verde-pequeno" />
          ) : null}
          <ContenedorSubidaDeFotos bottomSinBar={verMenuInferior ? "1" : "0"}>
            <ContenedorOpcionSubidaDeFotos>
              <IconoCamara />
              <ContenedorOpcionSubidaDeFotosTexto
                onClick={() => {
                  asignarValorMostrarCamara(true);
                }}
              >
                {diccionario.tomarFoto}
              </ContenedorOpcionSubidaDeFotosTexto>
            </ContenedorOpcionSubidaDeFotos>
            <ContenedorOpcionSubidaDeFotos onClick={alDarClickEnContenedor}>
              <Archivo
                ref={archivoRef}
                type="file"
                onChange={alSeleccionarArchivo}
                accept="image/*"
              />
              <IconoFoto />
              <ContenedorOpcionSubidaDeFotosTexto>
                {diccionario.elegirFotoDeLaGaleria}
              </ContenedorOpcionSubidaDeFotosTexto>
            </ContenedorOpcionSubidaDeFotos>
            <ContenedorBotonSubidaDeFotos>
              <Boton
                etiqueta={diccionario.cancelar}
                tema="simple-gris"
                id="botonCancelar"
                enClick={() => {
                  asignarValorMostrarInteraccionFotos(false);
                }}
              />
            </ContenedorBotonSubidaDeFotos>
          </ContenedorSubidaDeFotos>
        </ContenedorSubidaDeFotosCompleto>
      )}
      {verMenuInferior ? <MenuBottomComponente /> : <></>}
    </EnvolvedorPantallaCuenta>
  );

  return mostrarCamara ? (
    <PantallaCamara
      titulo={diccionario.tituloCamara}
      alCerrar={cerrarCamara}
      alAceptar={alAceptarImagen}
    />
  ) : (
    pantallaAMostrar
  );
};

export default PantallaCuentaComponente;
