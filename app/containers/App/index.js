/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */
/* eslint-disable import/first */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { isNil } from 'lodash';

import reducer from './reducer';
import saga from './saga';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectLoading,
  makeSelectNotification,
  makeSelectUser,
  makeSelectLocation,
} from './selectors';
import { authReauthUserStart, setAppNotification } from './actions';

import { makeSelectLocale } from 'wrappers/LanguageProvider/selectors';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { getRoutesForRole } from 'routes/routes';
import { Switch, Route } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from 'components/Notification';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import diff from 'deep-diff'; // TODO: remove when console.log disappear
/**
 * Maps navItems for user-role to Routes to navigate (if navItems has a path)
 * @param navItems
 * @returns Route for every navItems with path defined
 */
const mapNavItems = function cb(navItems) {
  return navItems.map(
    item =>
      item.path ? (
        <Route exact path={item.path} component={item.component} />
      ) : null,
  );
};

const styles = theme => ({
  content: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  root: {
    backgroundColor: theme.palette.background.default,
  },
});

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
  }

  isUserToken(user) {
    return user.auth === false && user.token !== null;
  }

  componentWillMount() {
    // eslint-disable-next-line
    console.log('!!!!!! APP WILL MOUNT !!!!!!');
    if (this.isUserToken(this.props.user)) {
      // eslint-disable-next-line
      console.log('Retrieving user from server...');
      this.props.authReauthUserStart();
    }
  }

  componentDidMount() {
    if (!this.isUserToken(this.props.user)) {
      this.setContentForUser(this.props.user);
    }
    /*
    if (this.isUserToken(this.props.user)) {
      console.log("componentDidMount: We are waiting for user to come... then content will be set properly");
    } else { // no previous login
      console.log("componentDidMount: no previous login");
      this.setContentForUser(this.props.user);
    }
    */
  }

  componentWillReceiveProps(nextProps) {
    const hasLoggedIn = !this.props.user.auth && nextProps.user.auth;
    const hasLoggedOut = this.props.user.auth && !nextProps.user.auth;
    const loginFailed =
      !this.props.user.auth &&
      !nextProps.user.auth &&
      nextProps.notification != null;
    const sessionExpired = hasLoggedOut && nextProps.notification != null;

    const userLoggedX = hasLoggedIn || hasLoggedOut;
    // console.log(">> props arrives");
    // this.printProps(nextProps);
    // console.log("loggedIn ["+hasLoggedIn+"] loginFailed ["+loginFailed+"] loggedOut ["+hasLoggedOut+"] sessionExpired ["+sessionExpired+"]");

    let route = nextProps.location.pathname;
    if (!nextProps.loading && !this.state.content) {
      // console.log("props says --- we need some content");
      this.setContentForUser(nextProps.user);
      if (loginFailed) {
        route = '/auth/login';
      }
    } else if (userLoggedX) {
      // console.log("props says --- you logged X -- content is: " + this.state.content);
      this.setContentForUser(nextProps.user);
      /* eslint-disable */
      route = nextProps.user.auth ?
                nextProps.user.data.settings ?
                  nextProps.user.data.settings.lastRoute :
                  '/app' :
              loginFailed ?
                '/auth/login' :
                sessionExpired ?
                  '/auth/login' :
                  '/';
      /* eslint-enable */
    }
    if (route !== nextProps.location.pathname) {
      // eslint-disable-next-line
      console.log(`====> navigating to: ${route}`);
      this.context.router.history.push(route);
    }
  }

  setContentForUser(user) {
    // eslint-disable-next-line
    const routes = getRoutesForRole(user);
    // console.log("  -* SET CONTENT *- [auth:"+JSON.stringify(user.auth)+"] content ["+routes.length+"]");
    this.setState({
      content: mapNavItems(routes),
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    /* eslint-disable */
    const contentChanged = !isNil(nextState.content) && this.state.content !== nextState.content;
    const userLoggedX = !this.isUserToken(nextProps.user) && !this.isUserToken(this.props.user) && this.props.user != nextProps.user;
    const loadingChanged = this.props.loading !== nextProps.loading;
    const locationChanged = this.props.location.pathname !== nextProps.location.pathname;
    const themeChanged = this.props.theme.props.id != nextProps.theme.props.id;
    const classesChanged = this.props.classes.content != nextProps.classes.content;
    const localeChanged = this.props.locale != nextProps.locale;
    const scu = locationChanged || loadingChanged || userLoggedX || contentChanged || classesChanged || themeChanged || localeChanged;
    if (!scu) { // TODO: remove also import of deep-diff
      console.log("  scu: ···skip rendering app. WHY ?");
      console.log(JSON.stringify(diff(this.props, nextProps)));
      console.log("  -----");
      console.log(JSON.stringify(diff(this.state, nextState)));
    }
    /* eslint-enable */
    return scu;
  }

  render() {
    const { content } = this.state;
    const { notification, loading, location, classes } = this.props;
    /*
    const isNull = !content ? " --- NULL ---": '';
    console.log("*** RENDER ["+this.props.location.pathname+"] "+isNull+"  user Auth: " + user.auth + " loading ["+loading+"] notif ["+notification+"] theme ["+theme.props.id+"] locale ["+locale+"]");
    */
    if (!content) return null;
    return (
      <div className={classnames('appRoot', classes.root)}>
        <Header />
        <main id="content" className={classes.content}>
          {loading && (
            <div className="progress">
              <CircularProgress color="secondary" />
            </div>
          )}
          {!loading && (
            <Switch location={location}>
              {content}
              <Route component={NotFoundPage} />
            </Switch>
          )}
          {notification && (
            <Notification
              open
              variant={notification.type}
              data={notification}
              onClose={this.props.resetNotification}
            />
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

// get access to router and history to push routes if necessary
App.contextTypes = { router: PropTypes.object };

App.propTypes = {
  authReauthUserStart: PropTypes.func.isRequired,
  resetNotification: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  // eslint-disable-next-line
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  notification: makeSelectNotification(),
  loading: makeSelectLoading(),
  location: makeSelectLocation(),
  user: makeSelectUser(),
  locale: makeSelectLocale(),
});
const mapDispatchToProps = dispatch => ({
  authReauthUserStart: data => dispatch(authReauthUserStart(data)),
  resetNotification: () => dispatch(setAppNotification(null)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });
const themeConnected = withStyles(styles, { withTheme: true });

export default compose(
  withReducer,
  withSaga,
  themeConnected,
  withConnect,
)(App);
