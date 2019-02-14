/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

/* eslint-disable */
export const AUTH_USER_START          = 'app/App/AUTH_USER_START';
export const AUTH_REAUTH_USER_START   = 'app/App/AUTH_REAUTH_USER_START';
export const AUTH_LOGOUT_START        = 'app/App/AUTH_LOGOUT_START';
export const AUTH_LOGOUT_OK           = 'app/App/AUTH_LOGOUT_OK';
export const AUTH_USER_OK             = 'app/App/AUTH_USER_OK';
export const AUTH_USER_ERROR          = 'app/App/AUTH_USER_ERROR';
export const SET_LOADING              = 'app/App/SET_LOADING';
export const SET_NOTIFICATION         = 'app/App/SET_NOTIFICATION';
export const SESSION_EXPIRED          = 'app/App/SESSION_EXPIRED';

