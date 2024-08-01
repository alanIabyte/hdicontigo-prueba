import React, { useEffect } from "react";
import PropTypes from "prop-types";
import IconoCerrar from "@material-ui/icons/CloseRounded";
import {
  EnvolvedorModalTexto,
  ModalContenedor,
  EncabezadoModal,
  CuerpoModal,
  ContenedorIconoCierre,
  PiePaginaModal,
  LigaDescargaModal,
} from "./ModalTexto.styled";
import Boton from "../../boton";

const ModalTexto = (props) => {
  const {
    mostrar,
    manejarCierre,
    titulo,
    texto,
    archivo,
    nombreArchivo,
    textoBoton,
    runActionLog,
    manejarCierreFun,
  } = props;

  useEffect(() => {
    if (mostrar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mostrar]);

  const despliegaTextoCuerpo = () => ({ __html: texto });

  return (
    <EnvolvedorModalTexto mostrar={mostrar}>
      <ModalContenedor>
        <EncabezadoModal>
          {titulo}
          <ContenedorIconoCierre
            onClick={() => {
              // eslint-disable-next-line no-unused-expressions
              !manejarCierreFun ? manejarCierre(false) : manejarCierre();
            }}
          >
            <IconoCerrar />
          </ContenedorIconoCierre>
        </EncabezadoModal>
        <CuerpoModal dangerouslySetInnerHTML={despliegaTextoCuerpo()} />
        {archivo && nombreArchivo && (
          <PiePaginaModal>
            <LigaDescargaModal
              target="_blank"
              rel="noreferrer"
              href={archivo}
              download={nombreArchivo}
            >
              <Boton etiqueta={textoBoton} enClick={runActionLog} />
            </LigaDescargaModal>
          </PiePaginaModal>
        )}
      </ModalContenedor>
    </EnvolvedorModalTexto>
  );
};

ModalTexto.propTypes = {
  titulo: PropTypes.string,
  texto: PropTypes.string,
  mostrar: PropTypes.bool,
  manejarCierre: PropTypes.func,
  textoBoton: PropTypes.string,
  archivo: PropTypes.string,
  nombreArchivo: PropTypes.string,
  runActionLog: PropTypes.func,
  manejarCierreFun: PropTypes.bool,
};

ModalTexto.defaultProps = {
  titulo: "",
  texto: "",
  mostrar: false,
  manejarCierre() {},
  textoBoton: "",
  archivo: "",
  nombreArchivo: "",
  runActionLog: () => {},
  manejarCierreFun: false,
};

export default ModalTexto;
