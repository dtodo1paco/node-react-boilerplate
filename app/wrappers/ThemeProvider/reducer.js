/*
 *
 * ThemeProvider reducer
 *
 */
import { fromJS } from 'immutable';
import { DEFAULT_THEME } from 'theme/themes';
import { CHANGE_THEME } from './constants';

export const initialState = fromJS(DEFAULT_THEME);

function themeProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      if (action.payload.props.id === state.get('props').get('id')) {
        return state;
      }
      return state.merge(action.payload);
    default:
      return state;
  }
}

export default themeProviderReducer;
