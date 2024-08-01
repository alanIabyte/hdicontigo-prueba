/* eslint-disable */
const isCancelled = (status) => {
  return status.toUpperCase() == "CANCELADA";
};

const asignarCerosAgencia = (texto, longitud) => {
  switch (longitud) {
    case 1:
      return `0000${texto.join("")}`;
    case 2:
      return `000${texto.join("")}`;
    case 3:
      return `00${texto.join("")}`;
    case 4:
      return `0${texto.join("")}`;
    case 5:
      return `${texto.join("")}`;
    default:
      return texto.join("");
  }
};

const asignarCerosPoliza = (texto, longitud) => {
  switch (longitud) {
    case 1:
      return `000000000${texto.join("")}`;
    case 2:
      return `00000000${texto.join("")}`;
    case 3:
      return `0000000${texto.join("")}`;
    case 4:
      return `000000${texto.join("")}`;
    case 5:
      return `00000${texto.join("")}`;
    case 6:
      return `0000${texto.join("")}`;
    case 7:
      return `000${texto.join("")}`;
    case 8:
      return `00${texto.join("")}`;
    case 9:
      return `0${texto.join("")}`;
    case 10:
      return `${texto.join("")}`;
    default:
      return texto.join("");
  }
};

export { isCancelled, asignarCerosAgencia, asignarCerosPoliza };
