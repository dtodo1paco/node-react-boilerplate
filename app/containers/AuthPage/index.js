/*
 * AuthPage
 *
 * This page groups all Auth forms like login, register, forgotPass, resetPass,...
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import Form from 'components/Form';
import Typography from '@material-ui/core/Typography';
import MyLink from 'components/Link';
import { authUserStart } from 'containers/App/actions';
import messages from './messages';
import forms from './forms';

const styles = theme => ({
  form: {
    display: 'grid',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
  },
  subtext: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 5,
  },
});

class AuthPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      authId: '',
      submitting: false,
      error: false,
      inputs: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getAuthType(location) {
    let loc;
    if (!location) {
      loc = this.props.location.pathname;
    } else {
      loc = location;
    }
    return loc.substr(loc.lastIndexOf('/') + 1);
  }

  componentWillMount() {
    const authId = this.getAuthType(null);
    const inputs = forms[authId];
    this.setState({
      inputs,
      authId,
    });
  }
  componentWillReceiveProps(nextProps) {
    const authId = this.getAuthType(nextProps.location.pathname);
    const inputs = forms[authId];
    this.setState({
      inputs,
      authId,
    });
  }

  handleChange(event) {
    this.handleChangeValue(event.target.name, event.target.value);
  }

  /**
   *
   * @param id
   * @param value
   */
  handleChangeValue(id, value) {
    const { inputs } = this.state;
    // eslint-disable-next-line
    const validator = inputs[id].error.validator;
    let error = false;
    if (!validator(value)) {
      error = true;
    }
    //
    // CUSTOM VALIDATION
    //
    if (id.endsWith('password')) {
      // eslint-disable-next-line
      const secondPassword = inputs['_password'];
      if (secondPassword) {
        // eslint-disable-next-line
        if (id === '_password' && value !== inputs['password'].value) {
          error = true;
        } else if (id === 'password' && value !== secondPassword.value) {
          secondPassword.error.isErrored = true;
        } else {
          secondPassword.error.isErrored = false;
        }
      }
    }
    //
    // CUSTOM VALIDATION
    //

    this.setState({
      ...this.state,
      inputs: {
        ...this.state.inputs,
        [id]: {
          ...this.state.inputs[id],
          value,
          error: {
            ...this.state.inputs[id].error,
            isErrored: error,
          },
        },
      },
    });
  }

  handleSubmit() {
    let error = false;
    const dataToSend = {};
    Object.keys(this.state.inputs).every(key => {
      const input = this.state.inputs[key];
      if (input.error.isErrored) {
        error = true;
      }
      dataToSend[key] = input.value;
      return !error;
      // continue while no error found
    });
    this.setState({
      error,
    });
    if (!error) {
      this.setState({ submitting: true });
      this.props.authUserStart({
        authId: this.state.authId,
        data: dataToSend,
      });
      if (this.state.authId !== 'register') {
        this.reset();
      }
    }
  }

  reset() {
    const newInputs = {};
    Object.keys(this.state.inputs).forEach(key => {
      const input = this.state.inputs[key];
      input.value = '';
      newInputs[key] = input;
    });
    this.setState({
      submitting: false,
      inputs: newInputs,
    });
  }

  render() {
    const { inputs, authId } = this.state;
    const { classes, theme } = this.props;
    if (!authId) return null;
    return (
      <div>
        <Form
          id={authId}
          inputs={inputs}
          messages={messages}
          classes={classes}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        {authId !== 'register' && (
          <div className={classes.subtext}>
            <Typography variant="subheading" color="secondary">
              <FormattedMessage
                {...messages.register_message}
                values={{
                  registerLink: (
                    <MyLink theme={theme} to="/auth/register">
                      <FormattedMessage {...messages.register} />
                    </MyLink>
                  ),
                }}
              />
            </Typography>
          </div>
        )}
        {authId !== 'login' && (
          <div className={classes.subtext}>
            <Typography variant="subheading" color="secondary">
              <FormattedMessage
                {...messages.login_message}
                values={{
                  loginLink: (
                    <MyLink theme={theme} to="/auth/login">
                      <FormattedMessage {...messages.login} />
                    </MyLink>
                  ),
                }}
              />
            </Typography>
          </div>
        )}
      </div>
    );
  }
}

AuthPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired, // comes from Route element in parent
  authUserStart: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  authUserStart: data => dispatch(authUserStart(data)),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const themeConnected = withStyles(styles, { withTheme: true });
export default compose(
  themeConnected,
  withConnect,
)(AuthPage);
