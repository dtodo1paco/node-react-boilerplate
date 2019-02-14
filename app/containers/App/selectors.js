import parseToJSON from 'utils/parseToJSON';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Router state domain
 */
const selectRoute = state => state.get('route');
const makeSelectLocation = () =>
  createSelector(selectRoute, routeState =>
    parseToJSON(routeState.get('location')),
  );

/**
 * Direct selector to the App state domain
 */
const selectApp = state => state.get('app', initialState);
const makeSelectLoading = () =>
  createSelector(selectApp, state => state.get('loading'));

const makeSelectNotification = () =>
  createSelector(selectApp, state => parseToJSON(state.get('notification')));

const makeSelectUser = () =>
  createSelector(selectApp, state => parseToJSON(state.get('user')));

export {
  makeSelectLoading,
  makeSelectNotification,
  makeSelectUser,
  makeSelectLocation,
};
