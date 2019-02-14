/*
 *
 * AuthPage saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { authUserOk, setAppNotification } from 'containers/App/actions';
import { changeLocale } from 'wrappers/LanguageProvider/actions';
import { changeTheme } from 'wrappers/ThemeProvider/actions';
import { findThemeOrDefault } from 'theme/themes';
import {
  AUTH_USER_START,
  AUTH_REAUTH_USER_START,
  AUTH_LOGOUT_START,
} from 'containers/App/constants';
import { doAuth } from 'api/auth';
import { getOperationDetails } from 'api/api-operations';
import { buildNotification } from 'components/Notification/builder';

const userLang = navigator.language || navigator.userLanguage;
const navigatorLang = userLang.split('-')[0];
export function* sendAuth(action) {
  try {
    const opDetails = getOperationDetails(action.type);
    const payload = {
      ...opDetails,
      ...action.payload,
    };
    const authData = yield call(doAuth, payload);
    yield put(authUserOk(authData));

    if (authData.auth) {
      yield put(
        changeLocale(
          authData.data.settings
            ? authData.data.settings.locale
            : navigatorLang,
        ),
      );
      yield put(
        changeTheme(
          findThemeOrDefault(
            authData.data.settings ? authData.data.settings.theme : 'default',
          ),
        ),
      );
    } else {
      yield put(changeLocale(navigatorLang));
      yield put(changeTheme(findThemeOrDefault(null)));
    }
  } catch (error) {
    yield put(setAppNotification(buildNotification(error)));
  }
}

export default function* authWatcher() {
  yield takeLatest(AUTH_USER_START, sendAuth);
  yield takeLatest(AUTH_REAUTH_USER_START, sendAuth);
  yield takeLatest(AUTH_LOGOUT_START, sendAuth);
}
