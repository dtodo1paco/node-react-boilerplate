/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../../i18n'; // eslint-disable-line

export const initialState = fromJS({
  locale: DEFAULT_LOCALE,
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      if (action.payload === state.get('locale')) {
        return state;
      }
      return state.set('locale', action.payload);
    default:
      return state;
  }
}

export default languageProviderReducer;
