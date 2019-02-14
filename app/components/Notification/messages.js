/*
 * Form Messages
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  '401': {
    id: 'app.components.Notification.error.401',
    defaultMessage: 'Unauthorized. Try again with valid data.',
  },
  'error.unauthorized': {
    id: 'app.components.Notification.error.401.unauthorized',
    defaultMessage: 'This credentials are not valid. Please, try login again.',
  },
  '403': {
    id: 'app.components.Notification.error.403',
    defaultMessage: 'Forbidden',
  },
  '404': {
    id: 'app.components.Notification.error.404',
    defaultMessage:
      'Something went wrong, but you can continue without consecuences',
  },
  '409': {
    id: 'app.components.Notification.error.409',
    defaultMessage: 'Invalid data. Try again after changing some data.',
  },
  'error.register.user.already.exists': {
    id: 'app.components.Notification.error.409.user.already.exists',
    defaultMessage:
      'This user id is already taken. Please, try with another one',
  },
  '500': {
    id: 'app.components.Notification.error.500',
    defaultMessage: 'Server problem. We are in a hurry to fix it. Sorry :)',
  },
  'error.TokenExpiredError': {
    id: 'app.components.Notification.error.500.TokenExpiredError',
    defaultMessage:
      'Your session has expired. Please, type your credentials again',
  },
  'error.server.down': {
    id: 'app.components.Notification.error.500.server.down',
    defaultMessage:
      'There are some problems connecting with server. Try again in a minute.',
  },
  unexpected: {
    id: 'app.components.Notification.error.unexpected',
    defaultMessage:
      'Something really bad happened. We have alerted all our engineers to solve it ASAP',
  },
  'success.saved': {
    id: 'app.components.Notification.success.saved',
    defaultMessage: 'Data successfully saved',
  },
});
