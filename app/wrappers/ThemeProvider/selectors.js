import { createSelector } from 'reselect';
import parseToJSON from 'utils/parseToJSON';
import { initialState } from './reducer';

/**
 * Direct selector to the themeToggle state domain
 */
const selectTheme = state => state.get('theme', initialState);

/**
 * Select the theme
 */

const makeSelectTheme = () =>
  createSelector(selectTheme, state => parseToJSON(state));

export { selectTheme, makeSelectTheme };
