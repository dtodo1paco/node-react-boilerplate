import { required, email } from 'components/Form/validators';

const forms = {
  login: {
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
  register: {
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
    _password: {
      name: '_password',
      type: 'password',
      value: '',
      help: {
        message: 'help_password2',
      },
      error: {
        isErrored: false,
        validator: required,
        message: 'error_passwords_do_not_match',
      },
    },
  },
};

export default forms;
