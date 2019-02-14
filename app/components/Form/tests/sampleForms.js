import { required, email } from 'components/Form/validators';

const forms = {
  signup: {
    userid: {
      name: 'userid',
      type: 'text',
      value: '',
      help: {
        message: 'help_userid',
      },
      error: {
        isErrored: false,
        validator: required,
        message: 'error_required',
      },
    },
    name: {
      name: 'name',
      type: 'text',
      value: '',
      help: {
        message: 'help_name',
      },
      error: {
        isErrored: false,
        validator: required,
        message: 'error_required',
      },
    },
    email: {
      name: 'email',
      type: 'text',
      value: '',
      help: {
        message: 'help_email',
      },
      error: {
        isErrored: false,
        validator: email,
        message: 'error_email',
      },
    },
    password: {
      name: 'password',
      type: 'password',
      value: '',
      help: {
        message: 'help_password',
      },
      error: {
        isErrored: false,
        validator: required,
        message: 'error_required',
      },
    },
  },
};

export default forms;
