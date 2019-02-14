/*
 *
 * ThemeProvider actions
 *
 */

import { CHANGE_THEME } from './constants';

export function changeTheme(payload) {
  return {
    type: CHANGE_THEME,
    payload,
  };
}
