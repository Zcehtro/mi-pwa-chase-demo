import axios from "axios";
import { BASE_URL } from "./auth-types";
import { startRegistration } from "@simplewebauthn/browser";

export const registration = async () => {
  //Generate the registration options
  const resp = await axios.get(`${BASE_URL}/generate-registration-options`);

  //Attestation resp
  let attResp;

  try {
    const opts = resp.data;

    //Resident key is set to required
    opts.authenticatorSelection.residentKey = "required";
    opts.authenticatorSelection.requireResidentKey = true;
    opts.extensions = {
      credProps: true,
    };

    attResp = await startRegistration(opts);
    console.log("Attestation Response", attResp);
    return true;
  } catch (err: any) {
    if (err.message === "InvalidStateError") {
      console.log("Error: Authenticator was probably already registered by user");
    }
    console.log("Registration Failed", err);
    return false;
  }
};
