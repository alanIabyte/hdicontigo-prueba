/* eslint-disable */
/* eslint-disable arrow-body-style */
import React from "react";
import { useHistory } from "react-router-dom";
import { Pantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import { Titulo } from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import IconLocalizacion from "../../../recursos/iconos/RT/localizacion.svg";
import { Titulo3 } from "../../componentes-styled-compartidos/Textos";
import { ParrafoModal } from "../../solicitud/solicitud-componente/SolicitudModal.styled";
import { ContenedorBoton } from "../../pantalla-editar-informacion-contacto/pantalla-editar-informacion-contacto/PantallaEditarInformacionContacto.styled";
import Boton from "../../boton/boton-componente/Boton";
import { ContenedorBottom } from "./ComponentesOpciones.styled";
import { IContactoProveedor } from "../../../pantallas/pantallas-robo/utils";

interface IProps {
  setPantalla: React.Dispatch<React.SetStateAction<string>>;
  listaNumerosProveedor: IContactoProveedor[];
  nombreProveedorGPS: string;
}

const PantallaGPS = ({
  setPantalla,
  listaNumerosProveedor,
  nombreProveedorGPS,
}: IProps) => {
  const history = useHistory();

  const obtenerNumeroProveedor = () => {
    if (listaNumerosProveedor.length > 0) {
      window.open(`tel:${listaNumerosProveedor[0].numeroTelefono}`);
      return;
    }
    console.log("no se encuentra el numero de telefono");
  };

  const irAsistenciaHDI = () => {
    history.push({
      pathname: "/asistencia-hdi",
      state: {
        tipoAtencion: "robo",
      },
    });
  };

  return (
    <>
      <Pantalla
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Titulo style={{ textAlign: "center" }}>
          Servicio de localización GPS
        </Titulo>
        <img src={IconLocalizacion} alt="" />

        <Titulo3>Proveedor GPS</Titulo3>
        <ParrafoModal>{nombreProveedorGPS}</ParrafoModal>

        <ContenedorBottom>
          <ParrafoModal>
            No dudes en reportar con tu proveedor, si aún no lo has hecho.
            Recuerda que mientrás más rápido lo reportes, será más fácil
            encontrar el vehículo
          </ParrafoModal>

          <ContenedorBoton>
            <Boton
              tema="rojo"
              etiqueta="Llamar"
              enClick={() => {
                obtenerNumeroProveedor();
              }}
            />
          </ContenedorBoton>
          <Boton
            tema="simple"
            etiqueta="Contacto HDI"
            enClick={() => {
              irAsistenciaHDI();
            }}
          />
        </ContenedorBottom>
      </Pantalla>
    </>
  );
};

export default PantallaGPS;
