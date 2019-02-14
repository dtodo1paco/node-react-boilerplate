import axios from 'axios';
import { getErrorFromResponse } from 'utils/errors';

export const request = data => {
  const options = {
    method: data.method,
    url: data.endpoint,
  };
  if (data.method === 'POST') {
    options.data = data.data;
  }
  if (data.token) {
    options.headers = { 'x-access-token': data.token };
  }
  // console.log("AXIOS: " + JSON.stringify(options));
  return axios(options)
    .then(response => response.data)
    .catch(err => {
      throw getErrorFromResponse(err);
    });
};
