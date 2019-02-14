import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

import classNames from 'classnames';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';

import Snackbar from '@material-ui/core/Snackbar';

import messages from './messages';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  },
});

export class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ open: false });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  getMessageObject(data) {
    let messageObj = null;
    if (data.text) {
      if (messages[data.text]) {
        messageObj = messages[data.text];
      } else {
        // eslint-disable-next-line
        console.error(`message not found: ${data.text}`);
      }
    } else if (data.id) {
      if (messages[data.id]) {
        messageObj = messages[data.id];
      } else {
        messageObj = { id: data.id, defaultMessage: data.text };
      }
    } else {
      // eslint-disable-next-line
      console.error(`Notif message: WTF!!! unexpected data: ${JSON.stringify(data)}`);
    }
    if (!messageObj) {
      // eslint-disable-next-line
      console.error('Unexpected programming error when building Notification');
      // eslint-disable-next-line
      console.error(data);
      // eslint-disable-next-line
      console.error(data.stack);
      messageObj = messages.unexpected;
    }
    return messageObj;
  }

  render() {
    const { open } = this.state;
    const { data, classes, variant = 'info' } = this.props;
    const Icon = variantIcon[variant];
    if (!open) return null;
    const msg = this.getMessageObject(data);
    const contentProps = {
      'aria-describedby': 'message-id',
      className: classes[variant],
    };
    return (
      // TODO: autoHideDuration={6000} for non-errors
      <div>
        <Snackbar
          autoHideDuration={variant === 'error' ? null : 6000}
          className={classes[variant]}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          onClose={this.handleClose}
          ContentProps={contentProps}
          message={
            <span id="message-id" className={classes.message}>
              <Icon
                className={classNames(
                  classes.icon,
                  classes.iconVariant,
                  classes.message,
                )}
              />
              <FormattedMessage {...msg} />
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              className={classNames(classes.message, classes.icon)}
              onClick={this.handleClose}
            >
              <CloseIcon className={classes.message} />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(Notification);
