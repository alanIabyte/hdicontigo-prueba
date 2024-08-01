/* eslint-disable */
/**
 * Archivo base para solicitudes al gateway de portal asegurado
 */

const baseUrl = "http://gwportalasegurado.ts01.hdi.net:8139/api/";

export const usarApi = async (recurso, path, options) => {
  try {
    const apiCompleta = `${baseUrl}${recurso}${path}`;
    const response = await fetch(apiCompleta, options);
    if (!response.ok) {
      throw new Error('Error en la respuesta');
    }
    return await response.json();
  } catch(error) {
    console.log("Error al ejecutar la solicitud a la url: " + baseUrl + recurso + path, error);
    throw error;
  }
};