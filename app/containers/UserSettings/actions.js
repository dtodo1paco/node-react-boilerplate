/*
 *
 * App actions
 *
 */
import { USER_SETTINGS_SET_START, USER_SETTINGS_SET_OK } from './constants';

export function userSettingsSetStart(payload) {
  return {
    type: USER_SETTINGS_SET_START,
    payload,
  };
}
export function userSettingsSetOk(payload) {
  return {
    type: USER_SETTINGS_SET_OK,
    payload,
  };
}
