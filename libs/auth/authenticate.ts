import { startAuthentication } from "@simplewebauthn/browser";
import axios from "axios";
import { BASE_URL } from "./auth-types";

export const authenticate = async () => {
  const res = await axios.get(`${BASE_URL}/generate-authentication-options`);
  const opts = res.data;
  console.log("Authentication Options (Autofill)", opts);

  //Assertion
  startAuthentication(opts, true)
    .then(async (asseResp) => {
      const verificationResp = await axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        url: `${BASE_URL}/verify-authentication`,
        data: JSON.stringify(asseResp),
      });
      const verificationJSON = verificationResp.data;

      if (verificationJSON && verificationJSON.verified) {
        console.log("Authentication Successful");
        return true;
      }
    })
    .catch((err) => {
      console.log("Authentication Failed", err);
      return false;
    });
};
