/* eslint-disable */
const URLBase = "https://a5f1-189-203-25-74.ngrok-free.app";

const data = {
  grant_type: "client_credentials",
  client_id: "c-testmike",
  client_secret: "FR3uh4OkSURFqOytAcaHx9CXF9zBN7ME",
};

export let dataInsertaUsuario = {
  username: "4771208693",
  firstName: "ROSARIO   ",
  lastName: "VALSEZ JUSZKIEWCZ ",
  email: "4771208693@cambiaremail",
  enabled: true,
  createdTimestamp: 1588880747548,
  totp: false,
  emailVerified: true,
  notBefore: 1,
  realmRoles: ["mb-use", "offline_access", "admin-role"],
  requiredActions: [""],
  disableableCredentialTypes: [],
  attributes: {
    CodigoActivacion: ["2835"],
    Validado: ["false"],
    PassEncriptado: [""],
    RecNumReporte: [null],
    FechaNacimiento: ["1900-01-01T00:00:00Z"],
    Genero: ["0"],
  },
  access: {
    manageGroupMembership: true,
    view: true,
    mapRoles: true,
    impersonate: true,
    manage: true,
  },
  credentials: null,
};

let requestGenerico = null;

const urlencodedData = new URLSearchParams(data);

const obtenerTokenRequest = new Request(
  `${URLBase}/realms/R-Passwordless/protocol/openid-connect/token`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlencodedData.toString(),
  }
);

async function obtenerToken() {
  try {
    const response = await peticionFetch(obtenerTokenRequest);
    console.log("access_token: ", response.access_token);
    return response.access_token;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function insertaUsuario({ idUsuario }) {
  try {
    const token = await obtenerToken();

    requestGenerico = new Request(
      `${URLBase}/admin/realms/R-Passwordless/users?username=${idUsuario}`,
      {
        method: "POST",
        Authorization: `Bearer ${token}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataInsertaUsuario),
      }
    );

    const response = await peticionFetch(requestGenerico);

    console.log("insertaUsuario: ", response);
    return response.access_token;
  } catch (error) {
    console.error("Error:", error);
  }
}

const actualizaContraseña = () => {
  requestContraseña = new Request(
    "https://a5f1-189-203-25-74.ngrok-free.app/admin/realms/R-Passwordless/users/799dd91e-21c6-4fed-a853-456c4f1d78ae/reset-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlencodedData.toString(),
    }
  );
};

export const insertaUsuarioFetch = (request) => {};

export const peticionFetch = async (request) => {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Error en la petición: " + response.status);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-lanzar el error para que el llamador pueda manejarlo
  }
};
