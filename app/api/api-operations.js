import { buildError } from 'utils/errors';
import {
  AUTH_USER_START,
  AUTH_REAUTH_USER_START,
  AUTH_LOGOUT_START,
} from 'containers/App/constants';
import { USER_SETTINGS_SET_START } from 'containers/UserSettings/constants';
import { getUser } from './storage';
import { API_USER, API_AUTH } from './api-config';

//
// --- DEFINE ALL OPERATIONS DATA USING action.type CONSTANTS
//

const operationsMap = {};
operationsMap[USER_SETTINGS_SET_START] = {
  endpoint: `${API_USER}settings`,
  method: 'POST',
  requiresToken: true,
};
operationsMap[AUTH_REAUTH_USER_START] = {
  endpoint: API_AUTH,
  authId: 'me',
  method: 'GET',
  requiresToken: true,
};
operationsMap[AUTH_USER_START] = {
  endpoint: API_AUTH,
  method: 'POST',
  requiresToken: false,
};
operationsMap[AUTH_LOGOUT_START] = {
  endpoint: API_AUTH,
  authId: 'logout',
  method: 'POST',
  requiresToken: true,
};

//
// --- accessor to operation details
//
export const getOperationDetails = opId => {
  const opDet = operationsMap[opId];
  if (opDet) {
    // set token if required
    if (opDet.requiresToken) {
      opDet.token = getUser();
    }
  } else {
    // eslint-disable-next-line
    console.error(`Unknown operation: ${opId}`);
    throw buildError(500, `unknown.operation.${opId}`);
  }
  return opDet;
};
