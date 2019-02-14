/*
 *
 * AuthPage saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'api/request';
import { getOperationDetails } from 'api/api-operations';
import { buildNotification } from 'components/Notification/builder';
import { setAppNotification, sessionExpired } from 'containers/App/actions';
import { USER_SETTINGS_SET_START } from './constants';

export function* send(action) {
  try {
    const opDetails = getOperationDetails(action.type);
    const payload = {
      ...opDetails,
      ...action.payload,
    };
    const resp = yield call(request, payload);
    yield put(setAppNotification(buildNotification(resp)));
  } catch (error) {
    // eslint-disable-next-line
    console.error(`eRROR on SAGA:  ${JSON.stringify(error)}`);
    if (error.id === '409') {
      yield put(sessionExpired(buildNotification(error)));
    } else {
      yield put(setAppNotification(buildNotification(error)));
    }
  }
}

export default function* watcher() {
  yield takeLatest(USER_SETTINGS_SET_START, send);
}
