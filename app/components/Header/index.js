/* eslint-disable import/first */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { NavLink, Link as RLink } from 'react-router-dom';

/* local */
// import Banner from 'assets/images/dp.png';
// import Img from './Img';

/* App integration */
import { makeSelectLocale } from 'wrappers/LanguageProvider/selectors';
import LocaleToggle from 'components/LocaleToggle';
import UserMenu from 'components/UserMenu';
import { makeSelectUser, makeSelectLocation } from 'containers/App/selectors';
import messages from 'routes/messages';
import { getRoutesForRole } from 'routes/routes';

/* Material-UI */
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 350;

/* eslint-disable react/prefer-stateless-function */
export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      headerLinks: null,
      drawerLinks: null,
    };
  }

  componentDidMount() {
    this.generateLinks(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.user !== this.props.user ||
      this.props.location.pathname !== nextProps.location.pathname ||
      this.props.classes.headerLink !== nextProps.classes.headerLink
    ) {
      this.generateLinks(nextProps);
    }
  }

  generateLinks(props) {
    const navItems = getRoutesForRole(props.user);
    const { classes } = props;
    // console.log("Header regenerating links: " + navItems);
    const hLinks = [];
    const dLinks = [];
    const self = this;
    navItems.forEach(item => {
      // check the route header link
      if (item.to !== null) {
        const message = messages[item.id];
        if (!message) {
          /* eslint-disable no-console */
          console.error('TODO: translate in routes: %s', item.id);
        } else {
          // const cn = classNames(item.to === this.props.location.pathname?classes.headerLinkActive:'', classes.headerLink);
          const cn = classes.headerLink;
          if (!self.props.user.auth) {
            hLinks.push(
              <NavLink
                location={props.location}
                to={item.to}
                key={item.id}
                className={cn}
                activeClassName={classes.headerLinkActive}
              >
                <ListItem>
                  <ListItemText disableTypography>
                    <FormattedMessage
                      id={message.id}
                      defaultMessage={message.defaultMessage}
                    />
                  </ListItemText>
                </ListItem>
              </NavLink>,
            );
          }
          dLinks.push(
            <NavLink
              location={props.location}
              to={item.to}
              key={item.id}
              className={classes.headerLink}
              activeClassName={classes.headerLinkActive}
            >
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText disableTypography>
                  <FormattedMessage
                    id={message.id}
                    defaultMessage={message.defaultMessage}
                  />
                </ListItemText>
              </ListItem>
            </NavLink>,
          );
        }
      }
    });
    this.setState({
      headerLinks: hLinks,
      drawerLinks: dLinks,
    });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { theme, classes, user } = this.props;
    const { headerLinks, drawerLinks } = this.state;
    if (!headerLinks && !drawerLinks) {
      return null;
    }
    const title = (
      <Typography variant="headline" className={classes.header}>
        <FormattedMessage {...messages.title} />
      </Typography>
    );
    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift,
          )}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classes.menuButton}
              // classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <nav className={classes.content}>
              <div className={classes.title} id="header-title">
                <RLink to="/" className={classes.homeLink}>
                  {title}
                </RLink>
              </div>
              <div className={classes.headerLinks} id="header-links">
                <div className={classes.hideWhenMobile}>{headerLinks}</div>
                {user.auth && <UserMenu user={user} />}
                {!user.auth && <LocaleToggle inAppBar />}
              </div>
            </nav>
          </Toolbar>
        </AppBar>
        <Drawer
          id="header-drawer-links"
          open={this.state.open}
          onClick={this.handleDrawerClose}
          ModalProps={{ onBackdropClick: this.handleDrawerClose }}
        >
          <div className={classes.toolbar}>
            {title}
            <IconButton>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          {drawerLinks}
        </Drawer>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: theme.spacing.unit * 7,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    '@media (max-width: 300px)': {
      height: theme.spacing.unit * 12,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(110% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    float: 'left',
  },
  homeLink: {
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    '&:visited': {
      color: theme.palette.primary.main,
    },
    h1: {
      marginTop: theme.spacing.unit,
    },
  },
  headerLinks: {
    display: 'flex',
    position: 'absolute',
    right: theme.spacing.unit * 0,
    top: '0',
    margin: 0,
  },
  headerLink: {
    float: 'left',
    display: 'block',
    color: theme.palette.primary.main,
    textAlign: 'left',
    textDecoration: 'none',
    '&:hover': {
      background: theme.palette.primary.main,
      color: theme.palette.background.default,
      '& $icon': { color: theme.palette.background.default },
    },
    '&:visited': {},
  },
  headerLinkActive: {
    background: theme.palette.primary.main,
    color: theme.palette.background.default,
    '& $icon': { color: theme.palette.background.default },
  },
  icon: {}, // required for nested rules
  header: {
    padding: theme.spacing.unit,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 24,
    '@media (max-width: 500px)': {
      marginRight: 2,
    },
  },
  hide: {
    display: 'none',
  },
  hideWhenMobile: {
    // eslint-disable-next-line  "@media (max-width: `calc(500 + ${drawerWidth}px)`)": {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  hideWhenDesktop: {
    '@media (min-width: 640px)': {
      display: 'none',
    },
  },

  drawerPaper: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    color: theme.palette.primary.main,
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: 0,
  },
});

Header.propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  location: makeSelectLocation(),
  locale: makeSelectLocale(),
});
const withConnect = connect(mapStateToProps);
const themeConnected = withStyles(styles, { withTheme: true });

export default compose(
  themeConnected,
  withConnect,
)(Header);
