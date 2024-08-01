/* eslint-disable no-param-reassign */
const reductor = (estado = {}, accion) => {
  switch (accion.type) {
    case "AGREGAR":
      return Object.assign(estado, { [accion.indice]: accion.valor });
    case "BORRAR":
      delete estado[accion.indice];
      return estado;
    case "ACTUALIZAR":
      estado[accion.indice] = {
        ...estado[accion.indice],
        [accion.indiceExtra]: accion.valor,
      };
      return estado;
    case "BORRAR_INDICES":
      if (accion && accion.indices) {
        accion.indices.forEach((indice) => {
          if (indice in estado) {
            delete estado[indice];
          }
        });
      }
      return estado;
    default:
      return estado;
  }
};

export default reductor;
