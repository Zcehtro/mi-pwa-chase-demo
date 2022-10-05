import axios from 'axios';
import { BASE_URL } from './auth-types';
import { startRegistration } from '@simplewebauthn/browser';

export const registration = async () => {
  const resp = await axios.get(`${BASE_URL}/generate-registration-options`);

  let attResp;

  try {
    const opts = resp.data;

    opts.authenticatorSelection.residentKey = 'required';
    opts.authenticatorSelection.requireResidentKey = true;
    opts.extensions = {
      credProps: true,
    };

    attResp = await startRegistration(opts);
    return true;
  } catch (err: any) {
    if (err.message === 'InvalidStateError') {
    }
    return false;
  }
};
