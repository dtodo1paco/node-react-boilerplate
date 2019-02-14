/*
 *
 * App actions
 *
 */
import {
  SET_LOADING,
  SET_NOTIFICATION,
  AUTH_USER_START,
  AUTH_REAUTH_USER_START,
  AUTH_LOGOUT_START,
  AUTH_USER_OK,
  SESSION_EXPIRED,
} from './constants';

export function setAppLoading(isLoading) {
  return {
    type: SET_LOADING,
    loading: isLoading,
  };
}
export function setAppNotification(payload) {
  return {
    type: SET_NOTIFICATION,
    payload,
  };
}
export function authUserStart(payload) {
  return {
    type: AUTH_USER_START,
    payload,
  };
}
export function authLogoutUserStart(payload) {
  return {
    type: AUTH_LOGOUT_START,
    payload,
  };
}
export function authReauthUserStart(payload) {
  return {
    type: AUTH_REAUTH_USER_START,
    payload,
  };
}
export function authUserOk(payload) {
  return {
    type: AUTH_USER_OK,
    payload,
  };
}
export function sessionExpired(payload) {
  return {
    type: SESSION_EXPIRED,
    payload,
  };
}
