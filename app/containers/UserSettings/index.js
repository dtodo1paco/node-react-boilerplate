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
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import injectSaga from 'utils/injectSaga';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import ThemeProvider from 'wrappers/ThemeProvider';
import LocaleToggle from 'components/LocaleToggle';
import { makeSelectLocale } from 'wrappers/LanguageProvider/selectors';

import { userSettingsSetStart } from './actions';
import messages from './messages';
import saga from './saga';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  headline: {
    display: 'flex',
    '& *': {
      margin: 'auto 0',
    },
    '& button': {
      right: theme.spacing.unit * 3,
      position: 'absolute',
    },
  },
  table: {
    display: 'inline-table',
    width: '100%',
    overflowX: 'auto',
  },
  setting: {
    display: 'flex-grid',
    '& div': {
      float: 'left',
      padding: theme.spacing.unit * 3,
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing.unit * 1,
      },
    },
    '& .description': {
      [theme.breakpoints.down('sm')]: {
        fontSize: 'x-small',
      },
    },
    '& .title': {
      fontWeight: 'bold',
    },
  },
});

const rows = [
  {
    id: 'theme_id',
    description: 'theme_description',
    field: <ThemeProvider />,
  },
  {
    id: 'language_id',
    description: 'language_description',
    field: <LocaleToggle />,
  },
];

class UserSettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const data = {
      theme: this.props.theme.props.id,
      locale: this.props.locale,
    };
    this.props.userSettingsSetStart({
      data,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.headline}>
          <Typography variant="title">
            <FormattedMessage {...messages.header} />
          </Typography>
          <Button variant="outlined" onClick={this.onSave}>
            <FormattedMessage {...messages.save} />
          </Button>
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell
                    component="td"
                    scope="row"
                    className={classes.setting}
                  >
                    <div className="title">
                      <FormattedMessage {...messages[row.id]} />
                    </div>
                    <div className="description">
                      <FormattedMessage {...messages[row.description]} />
                    </div>
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {row.field}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

UserSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  userSettingsSetStart: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});
const mapDispatchToProps = dispatch => ({
  userSettingsSetStart: data => dispatch(userSettingsSetStart(data)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const themeConnected = withStyles(styles, { withTheme: true });
const withSaga = injectSaga({ key: 'userSettings', saga });

export default compose(
  withSaga,
  withConnect,
  themeConnected,
)(UserSettings);
