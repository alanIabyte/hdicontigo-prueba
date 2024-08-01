/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import {
  EnvolvedorLista,
  ContenedorLista,
  BotonEliminar,
  NombreFactura,
  EnvolvedorDatos,
  EnvolvedorIcono,
  ContenedorBotonFactura,
  BotonBase,
  // Espacio,
} from "./FacturasV2.styled";
import { ReactComponent as IconList } from "../recursos/check_oscuro.svg";
import { ReactComponent as IconCloseBack } from "../recursos/ico_close_back.svg";
// import Boton from "../../boton/boton-componente/Boton";
import { Alerta } from "../../alerta";

const diccionario = {
  etiquetaBoton: "Editar",
};

const FacturasV2 = ({
  mostrar,
  listaFacturas,
  handleEliminar,
  handleEditar,
}) => {
  const [lista, setLista] = useState({});
  const [mostrarAlertaWarning, setMostrarAlertaWarning] = useState(false);
  const [idEliminar, setIdEliminar] = useState(0);

  function getElement(type) {
    const checkSelector = {
      BILL: "Factura XML",
      CFDI: "Factura CFDI",
      BANK: "Estado de cuenta",
      MEDICAL: "Formulario de reclamación",
      REEMBOLSO: "Formulario de solicitud de reembolso",
      OTHERS: "Documentación adicional",
      DEFAULT: <></>,
    };
    return checkSelector[type] || checkSelector[checkSelector.DEFAULT];
  }

  /**
   * groupBy - Método que retorna un objeto temporal utilizando reduce.
   * @param {*} xs Arreglo que voy a recorrer.
   * @param {*} key La llave que deseo poner para el agrupamiento de datos.
   * @param {*} rv Valor incrementable. Este va a ser sustituído en cada iteración.
   * @param {*} x El item que se está recorriendo actualmente.
   * @returns Un objeto agrupado por su ID.
   */
  const groupBy = (xs, key) =>
    xs.reduce((rv, x) => {
      // eslint-disable-next-line no-param-reassign
      (rv[x[key]] = rv[x[key]] || []).push({
        nombre: x.nombre,
        tipoDocumento: x.tipoDocumento,
      });
      return rv;
    }, {});

  useEffect(() => {
    const arr2 = [];
    const unique = [];

    listaFacturas.forEach((e) => {
      e.documentacion.forEach((j) => {
        arr2.push({
          id: e.id,
          nombre: j.nombre,
          tipoDocumento: j.tipoDocumento,
        });
      });
    });

    // Eliminar duplicados basados en id, tipoDocumento y nombre vacío en tipo "OTHERS"
    const seenIds = new Set();
    arr2.forEach((item) => {
      if (
        !(
          item.tipoDocumento === "OTHERS" &&
          item.nombre === "" &&
          seenIds.has(item.id)
        )
      ) {
        unique.push(item);
        if (item.tipoDocumento === "OTHERS" && item.nombre === "") {
          seenIds.add(item.id);
        }
      }
    });

    // Ordenar unique por tipoDocumento (medical, cfdi, bill, others)
    const sortedUnique = unique.sort((a, b) => {
      const order = ["MEDICAL", "CFDI", "BILL", "OTHERS"];
      return order.indexOf(a.tipoDocumento) - order.indexOf(b.tipoDocumento);
    });

    // Agrupar por ID
    const objeto = groupBy(sortedUnique, "id");

    // Actualizar estado local
    setLista(objeto);
  }, [listaFacturas]);

  const obtenerIcono = (flag) => {
    const tamanoIcono = 20;

    return flag ? (
      <IconList key={v4()} width={tamanoIcono} />
    ) : (
      <IconCloseBack key={v4()} width={tamanoIcono} />
    );
  };

  /**
   * obtenerInfoConIcono - Método creado para retornar el tipo de documento y su ícono respectivo.
   * @param {*} e Objeto que se recibe.
   * @returns Un fragment con el valor deseado.
   */
  const obtenerInfoConIcono = (e) => {
    let flag = false;
    if (e.nombre !== "") {
      flag = true;
    }
    console.log("Tipo de documento: ", e.tipoDocumento);
    return (
      <>
        <EnvolvedorIcono key={v4()}> {obtenerIcono(flag)} </EnvolvedorIcono>
        {getElement(e.tipoDocumento)}
      </>
    );
  };

  const eliminarFactura = (id) => {
    setMostrarAlertaWarning(true);
    setIdEliminar(id);
  };

  // TODO: Render.
  return (
    <>
      {mostrarAlertaWarning && (
        <Alerta
          colorAlerta="amarillo"
          tipoIcono="alerta"
          textoEncabezado="¿Quieres eliminar la factura?"
          textoCuerpo="Una vez eliminado no podrás recuperarlo."
          mostrarIcono
          mostrarModal={mostrarAlertaWarning}
          etiquetaBoton="Eliminar"
          funcionLlamadaBoton={() => handleEliminar(idEliminar)}
          etiquetaBoton2="Cancelar"
          funcionLlamadaBoton2={() => setMostrarAlertaWarning(false)}
          manejarCierre={() => setMostrarAlertaWarning(false)}
          temaBoton2="simple"
        />
      )}
      <EnvolvedorLista mostrar={mostrar} valida="true" key={v4()}>
        {Object.values(lista).map((factura, index) => (
          <>
            {/* eslint-disable-next-line react/no-array-index-key */}
            <ContenedorLista key={index + 1}>
              <>
                <NombreFactura key={v4()}>
                  Factura no. {index + 1}
                </NombreFactura>
                <BotonEliminar
                  key={v4()}
                  onClick={() => {
                    eliminarFactura(index + 1);
                  }}
                >
                  X
                </BotonEliminar>
                <EnvolvedorDatos key={v4()}>
                  <ul
                    key={v4()}
                    style={{
                      listStyle: "none",
                      padding: ".5rem 0",
                      margin: 0,
                      clear: true,
                    }}
                  >
                    {factura.map((e) => (
                      <>
                        <li style={{ display: "flex" }} key={v4()}>
                          {obtenerInfoConIcono(e)}
                        </li>
                      </>
                    ))}
                  </ul>
                </EnvolvedorDatos>
                <ContenedorBotonFactura key={v4()}>
                  <BotonBase
                    key={v4()}
                    onClick={() => {
                      handleEditar(index + 1);
                    }}
                  >
                    {diccionario.etiquetaBoton}
                  </BotonBase>
                </ContenedorBotonFactura>
              </>
            </ContenedorLista>
          </>
        ))}
      </EnvolvedorLista>
    </>
  );
};

FacturasV2.propTypes = {
  mostrar: PropTypes.bool,
  listaFacturas: PropTypes.arrayOf(PropTypes.shape({})),
  handleEliminar: PropTypes.func,
  handleEditar: PropTypes.func,
};

FacturasV2.defaultProps = {
  mostrar: true,
  listaFacturas: [{}],
  handleEliminar: () => {},
  handleEditar: () => {},
};

export default FacturasV2;
