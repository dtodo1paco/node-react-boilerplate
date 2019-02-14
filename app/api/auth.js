import axios from 'axios';
import { getErrorFromResponse } from 'utils/errors';

export const doAuth = data => {
  const options = {
    method: data.method,
    url: data.endpoint + data.authId,
  };
  if (data.method === 'POST') {
    options.data = data.data;
  }
  if (data.token) {
    options.headers = { 'x-access-token': data.token };
  }
  return axios(options)
    .then(response => response.data)
    .catch(err => {
      throw getErrorFromResponse(err);
    });
};
