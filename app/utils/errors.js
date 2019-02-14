export function buildError(status, statusText) {
  return {
    id: status.toString(),
    text: statusText,
  };
}

export function getErrorFromResponse(err) {
  // console.log("getErrorFromResponse: " + JSON.stringify(err));
  let code = null;
  let message = null;
  if (err.response) {
    code = err.response.status;
    message = err.response.statusText;
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (err.response.data) {
      message = err.response.data;
      if (err.response.data.code) code = err.response.data.code; // eslint-disable-line
      if (err.response.data.message) message = err.response.data.message; // eslint-disable-line
    }
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    code = 403;
    message = 'error.server.down';
  } else {
    code = 500;
    message = 'error.internal';
  }
  // console.log("getErrorFromResponse: code: " + code + " message: " + message);
  return buildError(code, message);
}
