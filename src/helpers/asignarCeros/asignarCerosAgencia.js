const asignarCerosAgencia = (texto, longitud) => {
  switch (longitud) {
    case 1:
      return `000${texto.join("")}`;
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

export default asignarCerosAgencia;
