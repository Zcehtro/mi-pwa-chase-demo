import { startAuthentication } from '@simplewebauthn/browser';
import axios from 'axios';
import { BASE_URL } from './auth-types';

export const authenticate = async () => {
  const res = await axios.get(`${BASE_URL}/generate-authentication-options`);
  const opts = res.data;

  startAuthentication(opts, true)
    .then(async (asseResp) => {
      const verificationResp = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `${BASE_URL}/verify-authentication`,
        data: JSON.stringify(asseResp),
      });
      const verificationJSON = verificationResp.data;

      if (!verificationJSON && !verificationJSON.verified) {
        return false;
      }

      return true;
    })
    .catch((err) => {
      return false;
    });
  return false;
};
