/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";
import Facturas from "../facturas-componente/FacturasV2";
import Solicitud from "./SolicitudV2";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  MensajePequeno,
  Titulo,
} from "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";
import BotonContenedor from "../../boton/boton-componente/Boton.contenedor";
import {
  Separador,
  Seccion,
  SeparadorLinea,
  ContenedorBotonFactura,
  ContenedorFacturas,
} from "./SolicitudV2.styled";

const diccionario = {
  titulo: "Solicitar Reembolso",
  separadorFacturas: "Facturas agregadas",
  boton: "Siguiente",
};

/* 
TODO: Al momento de traer la información debemos validar que esos archivos sean los correctos a través del props.
*/
const ListaSolicitudesV2 = (props) => {
  const history = useHistory();
  const {
    establecerEstadoPantalla,
    establecerEstadoOpciones,
    // asegurados,
    numeroPoliza,
    // vigencia,
    poliza,
  } = props;
  const [linkSolicitud, setLinkSolicitud] = useState(false); // para mostrar el agregar/editar facturas.
  const [botonResumen, setBotonResumen] = useState(false);
  const [botonAgregado, setBotonAgregado] = useState(false);
  // TODO: flagFactura true = editar, false = agregar.
  const [flagFactura, setFlagFactura] = useState(false); // bandera de agregar/editar facturas.
  const [listaReembolsos, setListaReembolsos] = useState([]); // La lista principal.
  const [verLista, setVerLista] = useState(true); // ver la lista principal ya rellenada.
  const [idFactura, setIdFactura] = useState(0);
  // TODO: Inputs para agregar/editar. Se moverán desde la vista principal.

  // TODO: Métodos botones Agregar Factura y Siguiente
  const handleAgregar = () => {
    setIdFactura(listaReembolsos.length + 1);
    setLinkSolicitud(true); // se visualiza el agregar/editar.
    setFlagFactura(false); // cambio de bandera.
  };
  // * Obtener la nueva lista y actualizarla.
  const handleFactura = (factura) => {
    console.log("Actualización de la lista:", factura);
    setListaReembolsos(factura);
  };
  // * Se cambia el valor y se muestra el menú una vez que se añade toda la info.
  const handleMenuReembolsos = () => {
    setLinkSolicitud(!linkSolicitud);
  };

  useEffect(() => {
    console.log(" lista reem==> ", listaReembolsos);

    if (listaReembolsos.length > 0) {
      if (listaReembolsos.length >= 5) {
        setBotonResumen(false);
        setBotonAgregado(true);
      } else {
        setBotonResumen(false);
        setBotonAgregado(false);
      }
    } else {
      handleAgregar();
      setBotonResumen(true);
      setBotonAgregado(false);
    }
  }, [listaReembolsos]);

  // * Envio a resumen reembolso.
  const handleResumen = () => {
    console.log("Botón siguiente...", listaReembolsos);

    if (listaReembolsos.length > 0) {
      // Lo enviamos al resumen de reembolsos.
      history.push({
        pathname: "/resumen-reembolso-v2",
        state: {
          poliza,
          // documentacion,
          numeroPoliza,
          listaReembolsos,
        },
      });
    }
  };

  // TODO: Métodos para editar o eliminar elementos de la lista.
  const handleEditar = (objId) => {
    console.log("Factura que se va a editar: ", objId);
    setLinkSolicitud(true);
    setFlagFactura(true);
    setIdFactura(objId);
  };

  const handleEliminar = (facturaId) => {
    // Se necesita el index de la lista o el key (id).
    console.log("eliminando elemento: ", facturaId);
    const nuevaLista = listaReembolsos.filter((e) => e.id !== facturaId);
    nuevaLista.forEach((elemento, index) => {
      // eslint-disable-next-line no-param-reassign
      elemento.id = index + 1;
    });
    setListaReembolsos(nuevaLista);
  };

  return (
    <>
      <EnvolvedorPantalla>
        <Pantalla>
          {!linkSolicitud && (
            <>
              <Titulo> {diccionario.titulo} </Titulo>
              <MensajePequeno>
                Administra las facturas que has agregado y añade las que
                necesites (5 máximo)
              </MensajePequeno>
              <ContenedorBotonFactura>
                <BotonContenedor
                  etiqueta="+ Agregar factura"
                  tema="estandar"
                  tipo="button"
                  pequeno
                  enClick={handleAgregar}
                  deshabilitado={botonAgregado}
                />
              </ContenedorBotonFactura>
              <ContenedorFacturas>
                <Seccion>
                  <Separador id="idSepFacturas">
                    {diccionario.separadorFacturas}
                  </Separador>
                </Seccion>
                <SeparadorLinea />
                {listaReembolsos.length > 0 ? (
                  <Facturas
                    key={v4()}
                    mostrar={verLista}
                    listaFacturas={listaReembolsos}
                    handleEliminar={handleEliminar}
                    handleEditar={handleEditar}
                  />
                ) : (
                  <></>
                )}

                <BotonContenedor
                  etiqueta="Siguiente"
                  tema="estandar"
                  tipo="button"
                  enClick={handleResumen}
                  deshabilitado={botonResumen}
                />
              </ContenedorFacturas>
            </>
          )}
        </Pantalla>
      </EnvolvedorPantalla>

      {linkSolicitud && (
        <Solicitud
          poliza={props.poliza}
          listaReembolsos={listaReembolsos}
          flagFactura={flagFactura}
          handleMenuReembolsos={handleMenuReembolsos}
          handleFactura={handleFactura}
          idFactura={idFactura}
          establecerEstadoOpciones={establecerEstadoOpciones}
          establecerEstadoPantalla={establecerEstadoPantalla}
        />
      )}
    </>
  );
};

ListaSolicitudesV2.propTypes = {
  poliza: PropTypes.oneOfType([PropTypes.object]),
  numeroPoliza: PropTypes.string,
  establecerEstadoPantalla: PropTypes.func,
  establecerEstadoOpciones: PropTypes.func,
};

ListaSolicitudesV2.defaultProps = {
  poliza: {},
  numeroPoliza: "",
  establecerEstadoPantalla: () => {},
  establecerEstadoOpciones: () => {},
};
export default ListaSolicitudesV2;
