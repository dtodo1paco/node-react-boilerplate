/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import languageProviderReducer from 'wrappers/LanguageProvider/reducer';
import themeReducer from 'wrappers/ThemeProvider/reducer';

import { saveLastRoute } from 'api/storage';
/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
export function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE: {
      const lastRoute = action.payload.pathname;
      if (!lastRoute.startsWith('/auth/')) {
        saveLastRoute(action.payload.pathname);
      }
      return state.merge({
        location: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    language: languageProviderReducer,
    theme: themeReducer,
    ...injectedReducers,
  });
}
