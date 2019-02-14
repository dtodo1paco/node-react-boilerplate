const DEBUG = false;

const debug = message => {
  if (DEBUG) {
    // eslint-disable-next-line
    console.log(`storage: ${message}`);
  }
};

export const saveUser = user => {
  debug(`saving user: ${JSON.stringify(user)}`);
  if (user && user.auth) {
    sessionStorage.setItem('user', JSON.stringify(user.token));
  } else {
    sessionStorage.removeItem('user');
  }
};

export const getUser = () => {
  const user = sessionStorage.getItem('user');
  if (user !== null) {
    return JSON.parse(user);
  }
  return null;
};

export const saveLastRoute = route => {
  debug(`saving route: ${JSON.stringify(route)}`);
  if (route) {
    sessionStorage.setItem('route', JSON.stringify(route));
  } else {
    sessionStorage.removeItem('route');
  }
};

export const getLastRoute = () => {
  const route = sessionStorage.getItem('route');
  if (route !== null) {
    return JSON.parse(route);
  }
  return null;
};
