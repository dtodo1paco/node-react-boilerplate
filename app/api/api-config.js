let backendHost;
export const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  backendHost = '';
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || window.location.origin;
}
// eslint-disable-next-line
console.log("---- API_ROOT for env ["+process.env.NODE_ENV+"]:" + backendHost);
export const API_ROOT = `${backendHost}/api`;
export const API_AUTH = `${API_ROOT}/auth/`;
export const API_USER = `${API_ROOT}/user/`;
