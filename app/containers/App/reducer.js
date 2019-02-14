import { fromJS } from 'immutable';
import { saveUser, getUser } from 'api/storage';
import {
  SET_LOADING,
  SET_NOTIFICATION,
  AUTH_USER_START,
  AUTH_REAUTH_USER_START,
  AUTH_USER_OK,
  AUTH_LOGOUT_START,
  SESSION_EXPIRED,
} from './constants';

// for testing purposes
export const loggedUser = {
  auth: true,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTExZDExYjlmNWQ4NWI3OTYxM2Y2YyIsImlhdCI6MTUzOTkyNzYzNSwiZXhwIjoxNTM5OTI3OTM1fQ.bt4jv-tecy2qjRgC9S5xTkl1PkY7bN_BwaWSWIVbu_Q',
  data: {
    userid: '44',
    name: '44',
    email: '11@ascasd.co',
    lastLogin: '2018-10-18T16:12:03.565Z',
    settings: {
      theme: 'material',
      locale: 'es',
      lastRoute: '/account/settings',
    },
  },
};

export const anonymousUser = {
  auth: false,
  token: null,
  data: null,
};
const currentUser = {
  auth: false,
  token: getUser(),
  data: null,
};
export const initialState = fromJS({
  user: currentUser,
  notification: null,
  loading: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGOUT_START:
    case AUTH_REAUTH_USER_START:
    case AUTH_USER_START:
      return state.merge({
        loading: true,
        user: anonymousUser,
      });
    case SESSION_EXPIRED:
      saveUser(null);
      return state.merge({
        loading: false,
        user: anonymousUser,
        notification: action.payload,
      });
    case AUTH_USER_OK:
      saveUser(action.payload);
      return state.merge({
        loading: false,
        user: action.payload,
      });
    case SET_NOTIFICATION:
      return state.merge({
        loading: false,
        notification: action.payload,
      });
    case SET_LOADING:
      return state.set('loading', action.payload);
    default:
      return state;
  }
}
export default appReducer;
