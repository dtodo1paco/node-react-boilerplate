import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { authLogoutUserStart } from 'containers/App/actions';
import { getLastRoute } from 'api/storage';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Button from '@material-ui/core/Button';
import messages from './messages';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    margin: `${theme.spacing.unit * 6}px auto`,
    padding: `${theme.spacing.unit * 4}px 0`,
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: `${theme.spacing.unit * 2}px auto`,
      padding: `${theme.spacing.unit * 1}px 0`,
    },
  },
  header: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  buttonBar: {
    '& span': {
      padding: `0 ${theme.spacing.unit * 2}px`,
      [theme.breakpoints.down('sm')]: {
        padding: `0 ${theme.spacing.unit * 1}px`,
      },
    },
  },
  button2: {
    float: 'right',
  },
});

export class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  logout() {
    const logoutData = {
      lastRoute: getLastRoute(),
    };
    this.props.logout({
      data: logoutData,
    });
  }
  goBack() {
    if (this.props.history) {
      this.props.history.goBack();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={10} id="logout-component">
        <Typography
          variant="display1"
          color="primary"
          className={classes.header}
        >
          <FormattedMessage {...messages.logout} />
        </Typography>
        <div className={classes.buttonBar}>
          <Button
            className={classes.button1}
            variant="flat"
            color="secondary"
            aria-label="back"
            onClick={this.goBack}
          >
            <BackspaceIcon />
            <FormattedMessage {...messages.back} />
          </Button>
          <Button
            className={classes.button2}
            variant="flat"
            color="secondary"
            aria-label="exit"
            onClick={this.logout}
          >
            <FormattedMessage {...messages.leave} />
            <DoneIcon />
          </Button>
        </div>
      </Paper>
    );
  }
}
Logout.propTypes = {
  theme: PropTypes.object,
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  logout: data => dispatch(authLogoutUserStart(data)),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);
const themeConnected = withStyles(styles, { withTheme: true });

export default compose(
  themeConnected,
  withConnect,
)(Logout);
