/*
 * Form Messages
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  error_required: {
    id: 'app.components.form.error.required',
    defaultMessage: 'This field is required',
  },
  error_email: {
    id: 'app.components.form.error.email',
    defaultMessage: 'We need a valid email',
  },
  error_passwords_do_not_match: {
    id: 'app.components.form.error.passwords.do.not.match',
    defaultMessage: 'Passwords do not match',
  },
});
