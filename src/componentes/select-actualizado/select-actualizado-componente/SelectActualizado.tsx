/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { v4 } from "uuid";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import Box from "@mui/material/Box";
import React, { RefObject, useEffect } from "react";
import { ContenedorSelect, OptionSelect } from "./SelectActualizado.styled";
import "./styles.scss";

type IOpcion = {
  id: string;
  nombre: string;
};

interface IProps {
  id: string;
  etiqueta: string;
  enCambio: (e: HTMLSelectElement, name: string) => void;
  foco?: boolean;
  valor: string | boolean | null | number;
  opciones: IOpcion[];
  inputholder: string;
  labelInput: string;
}

// ! Este componente es un intento para reemplazar el actual <Select />, puesto que no es dinamico ni esta bien escrito semanticamente (como todo en HDI)

const SelectActualizado = ({
  enCambio,
  etiqueta,
  foco,
  id,
  inputholder,
  opciones,
  valor,
  labelInput,
}: IProps) => {
  return (
    <Box
      sx={{ width: "100%" }}
      key={v4()}
      style={{
        border: "solid var(--color-gris-claro) 1px",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          padding: "10px 14px 0 14px"
        }}
      >
        <FormControl
          fullWidth
          key={v4()}
        >
          <InputLabel
            id={`label-${id}`}
            style={{
              color: "var(--color-verde-normal)",
              fontSize: "14px",
              zIndex: "1",
              fontFamily: "var(--fuente-proxima-regular)"
            }}
          >
            {labelInput}
          </InputLabel>

          <Select
            key={v4()}
            labelId={`label-id-${id}`}
            id={id}
            value={valor}
            label={labelInput}
            onChange={(event: any) => enCambio(event, id)}
          >
            {opciones.map((opcion) => (
              <MenuItem key={v4()} value={opcion.nombre}>
                {opcion.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Box>
  );
};

export default SelectActualizado;
