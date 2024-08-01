/* eslint-disable */

import { base64url } from "./base64url";
import {
  validaDispositivoCelular,
  iOSDevice,
  isSafari,
} from "../validaDispositivo";

export async function registerSecurityKey(username) {
  // Check if WebAuthn is supported by this browser
  if (!window.PublicKeyCredential) {
    alert(
      "WebAuthn is not supported by this browser. Try another one or contact your administrator."
    );
    return;
  }

  // mandatory parameters
  let challenge = "yFyJCHE2TJmWNMGsAWtDPw";
  let userid = "NDRlNmJhNTMtYTM4YS00YTFjLWE3MmEtNWMzNGM3MmNiYjEz";

  let signatureAlgorithms = "-7";
  let pubKeyCredParams = getPubKeyCredParams(signatureAlgorithms);

  let rpEntityName = "HDI-Contigo";
  let rp = { name: rpEntityName };

  let publicKey = {
    challenge: base64url.decode(challenge, { loose: true }),
    rp: rp,
    user: {
      id: base64url.decode(userid, { loose: true }),
      name: username,
      displayName: username,
    },
    pubKeyCredParams: pubKeyCredParams,
  };

  // optional parameters
  let rpId = window.location.hostname;
  publicKey.rp.id = rpId;

  let attestationConveyancePreference = "not specified";
  if (attestationConveyancePreference !== "not specified")
    publicKey.attestation = attestationConveyancePreference;

  let authenticatorSelection = {};
  let isAuthenticatorSelectionSpecified = false;

  let authenticatorAttachment;
  if (validaDispositivoCelular()) {
     //alert("platform");

    authenticatorAttachment = "platform";
  } else {
    //alert("cross-platform");

    authenticatorAttachment = "cross-platform";
  }
  if (authenticatorAttachment !== "not specified") {
    authenticatorSelection.authenticatorAttachment = authenticatorAttachment;
    isAuthenticatorSelectionSpecified = true;
  }

  let requireResidentKey = "Yes";
  if (requireResidentKey !== "not specified") {
    if (requireResidentKey === "Yes")
      authenticatorSelection.requireResidentKey = true;
    else authenticatorSelection.requireResidentKey = false;
    isAuthenticatorSelectionSpecified = true;
  }

  let userVerificationRequirement = "required";
  if (userVerificationRequirement !== "not specified") {
    authenticatorSelection.userVerification = userVerificationRequirement;
    isAuthenticatorSelectionSpecified = true;
  }

  if (isAuthenticatorSelectionSpecified)
    publicKey.authenticatorSelection = authenticatorSelection;

  let createTimeout = 0;
  if (createTimeout !== 0) publicKey.timeout = createTimeout * 1000;

  let excludeCredentialIds = "";
  let excludeCredentials = getExcludeCredentials(excludeCredentialIds);
  if (excludeCredentials.length > 0)
    publicKey.excludeCredentials = excludeCredentials;

  let clientDataJSON;
  let attestationObject;
  let publicKeyCredentialId;

  await navigator.credentials
    .create({ publicKey })
    .then(function (result) {
      window.result = result;
      clientDataJSON = result.response.clientDataJSON;
      attestationObject = result.response.attestationObject;
      publicKeyCredentialId = result.rawId;

      if (typeof result.response.getTransports === "function") {
        let transports = result.response.getTransports();
        if (transports) {
          console.log("#transports:", getTransportsAsString(transports));
        }
      } else {
        console.log(
          "Your browser is not able to recognize supported transport media for the authenticator."
        );
      }
    })
    .catch(function (err) {
      console.log("error:", err);
    });

  return base64url.encode(new Uint8Array(publicKeyCredentialId), {
    pad: false,
  });
}

function getPubKeyCredParams(signatureAlgorithms) {
  let pubKeyCredParams = [];
  if (signatureAlgorithms === "") {
    pubKeyCredParams.push({ type: "public-key", alg: -7 });
    return pubKeyCredParams;
  }
  let signatureAlgorithmsList = signatureAlgorithms.split(",");

  for (let i = 0; i < signatureAlgorithmsList.length; i++) {
    pubKeyCredParams.push({
      type: "public-key",
      alg: signatureAlgorithmsList[i],
    });
  }
  return pubKeyCredParams;
}

function getExcludeCredentials(excludeCredentialIds) {
  let excludeCredentials = [];
  if (excludeCredentialIds === "") return excludeCredentials;

  let excludeCredentialIdsList = excludeCredentialIds.split(",");

  for (let i = 0; i < excludeCredentialIdsList.length; i++) {
    excludeCredentials.push({
      type: "public-key",
      id: base64url.decode(excludeCredentialIdsList[i], { loose: true }),
    });
  }
  return excludeCredentials;
}

function getTransportsAsString(transportsList) {
  if (transportsList === "" || transportsList.constructor !== Array) return "";

  let transportsString = "";

  for (let i = 0; i < transportsList.length; i++) {
    transportsString += transportsList[i] + ",";
  }

  return transportsString.slice(0, -1);
}

// <form id="register" class="form-horizontal" action="https://552b-189-203-25-74.ngrok-free.app/realms/R-Passwordless/login-actions/required-action?session_code=aC7QMaC6zc6PizcssTeGPoHBe9XE7KFq8vQeAtr7GKg&amp;execution=webauthn-register-passwordless&amp;client_id=account-console&amp;tab_id=cL6Zn3M_Vmw" method="post"></form>
