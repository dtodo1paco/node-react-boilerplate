import React from 'react';

import HomeApp from 'containers/HomeApp/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import AuthPage from 'containers/AuthPage/index';
import Logout from 'components/Logout';
import UserSettings from 'containers/UserSettings';

import AccountCircle from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import ExitToApp from '@material-ui/icons/ExitToApp';

// TODOS del sistema de navegación
// TODO C: anidar menús
//
export const PUBLIC_NAVIGATION_ITEMS = [
  {
    id: 'home',
    icon: <HomeIcon />,
    to: null,
    path: '/',
    component: HomePage,
  },
  {
    id: 'login',
    icon: <AccountCircle />,
    to: '/auth/login',
    path: '/auth/login',
    component: AuthPage,
  },
  {
    id: 'register',
    icon: null,
    to: null, // we don't want a link to register page (LoginPage will include it)
    path: '/auth/register',
    component: AuthPage,
  },
  {
    id: 'help',
    icon: <HelpIcon />,
    to: '/help',
    path: '/help',
    component: null,
  },
  /*
  Features,
  Benefits,
  Pricing,
  ...
   */
];

export const USER_ACCOUNT_ITEMS = [
  {
    id: 'app',
    icon: <HomeIcon />,
    to: '/app',
    path: '/app',
    component: HomeApp,
  },
  {
    id: 'settings',
    icon: <AccountCircle />,
    to: '/account/settings',
    path: '/account/settings',
    component: UserSettings,
  },
  {
    id: 'logout',
    icon: <ExitToApp />,
    to: '/auth/logout',
    path: '/auth/logout',
    component: Logout,
  },
];

export const PRIVATE_NAVIGATION_ITEMS = [...USER_ACCOUNT_ITEMS]; // <--- include here more groups of routes

export function getRoutesForRole(user) {
  if (!user.auth) {
    return PUBLIC_NAVIGATION_ITEMS;
  } // TODO: return routes group based on user info (role, permissions,...whatever...)
  return PRIVATE_NAVIGATION_ITEMS;
}
/**
 * True if the specified path is included in routes array
 * @param routes - array of routes (see above definitions)
 * @param path - string to search in the array of routes
 * @returns {boolean}
 */
export const routeExists = (routes, path) =>
  filterRoutes(routes, path).length > 0;

export const filterRoutes = (routes, path) =>
  routes.filter(el => el.path === path);
