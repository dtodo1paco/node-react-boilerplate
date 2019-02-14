/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  submit: {
    id: 'app.containers.AuthPage.submit',
    defaultMessage: 'Submit',
  },
  login: {
    id: 'app.containers.AuthPage.login',
    defaultMessage: 'Type your credentials',
  },
  login_message: {
    id: 'app.containers.AuthPage.login.message',
    defaultMessage: 'Already have an account? Please, {loginLink} here',
  },
  register: {
    id: 'app.containers.AuthPage.register',
    defaultMessage: 'Register',
  },
  register_message: {
    id: 'app.containers.AuthPage.register.message',
    defaultMessage:
      "Don't have an account yet? Maybe it's a good time to {registerLink}",
  },
  userid: {
    id: 'app.containers.AuthPage.userid',
    defaultMessage: 'Id',
  },
  help_userid: {
    id: 'app.containers.AuthPage.userid.help',
    defaultMessage: 'Your id',
  },
  password: {
    id: 'app.containers.AuthPage.password',
    defaultMessage: 'Password',
  },
  help_password: {
    id: 'app.containers.AuthPage.password.help',
    defaultMessage: 'Your password',
  },
  _password: {
    id: 'app.containers.AuthPage.password2',
    defaultMessage: 'Repeat your password',
  },
  help_password2: {
    id: 'app.containers.AuthPage.password2.help',
    defaultMessage: 'Type your password again to avoid typos',
  },
  name: {
    id: 'app.containers.AuthPage.name',
    defaultMessage: 'Name',
  },
  help_name: {
    id: 'app.containers.AuthPage.name.help',
    defaultMessage: 'Your name',
  },
  email: {
    id: 'app.containers.AuthPage.email',
    defaultMessage: 'Your email',
  },
  help_email: {
    id: 'app.containers.AuthPage.email.help',
    defaultMessage: 'A valid email for us to contact you',
  },
});
