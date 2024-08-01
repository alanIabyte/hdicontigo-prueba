/* eslint-disable */

import { base64url } from "./base64url";

export async function webAuthnAuthenticate(authnUseValue) {
  let isUserIdentified = true;
  if (!isUserIdentified) {
    doAuthenticate([]);
    return;
  }
  const autenticado = await checkAllowCredentials(authnUseValue);

  return autenticado;
}

async function checkAllowCredentials(authnUseValue) {
  let allowCredentials = [];

  allowCredentials.push({
    id: base64url.decode(authnUseValue, { loose: true }),
    type: "public-key",
  });

  const autenticado = await doAuthenticate(allowCredentials);
  return autenticado;
}

async function doAuthenticate(allowCredentials) {
  // Check if WebAuthn is supported by this browser
  //   if (!window.PublicKeyCredential) {
  //     $("#error").val(
  //       "WebAuthn is not supported by this browser. Try another one or contact your administrator."
  //     );
  //     $("#webauth").submit();
  //     return;
  //   }

  let challenge = "ieRcNEbJTsGEMu1G41ipkQ";
  let userVerification = "required";
  let rpId = window.location.hostname;
  let publicKey = {
    rpId: rpId,
    challenge: base64url.decode(challenge, { loose: true }),
  };

  let createTimeout = 0;
  if (createTimeout !== 0) publicKey.timeout = createTimeout * 1000;

  if (allowCredentials.length) {
    publicKey.allowCredentials = allowCredentials;
  }

  if (userVerification !== "not specified")
    publicKey.userVerification = userVerification;

  try {
    const result = await navigator.credentials.get({ publicKey });
    window.result = result;

    let clientDataJSON = result.response.clientDataJSON;
    let authenticatorData = result.response.authenticatorData;
    let signature = result.response.signature;

    if (clientDataJSON) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("error:", err);
    return false; // or handle the error as needed
  }
}
