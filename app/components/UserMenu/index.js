/* eslint-disable import/first */
import React from 'react';
import PropTypes from 'prop-types';
import messages from './messages';

import { Link as RLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import { USER_ACCOUNT_ITEMS } from 'routes/routes';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.black,
      },
    },
  },
  primary: {},
  icon: {},
  outerfocus: {
    '&:focus': {
      outlineColor: theme.palette.secondary.dark,
    },
  },
});

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      userLinks: this.getUserLinks(props),
      userId: this.getUserId(props),
    };
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({
        userLinks: this.getUserLinks(nextProps),
        userId: this.getUserId(nextProps),
      });
    }
  }

  getUserId(props) {
    if (props.user != null) {
      return props.user.data.userid;
    }
    return '';
  }

  getUserLinks(props) {
    return USER_ACCOUNT_ITEMS.map(item => (
      <RLink to={item.to} key={item.id} onClick={this.handleClose}>
        <ListItem className={props.classes.menuItem}>
          <ListItemIcon className={props.classes.icon}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            classes={{ primary: props.classes.primary }}
            inset
            primary={<FormattedMessage {...messages[item.id]} />}
          />
        </ListItem>
      </RLink>
    ));
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl, userLinks, userId } = this.state;
    const { user } = this.props;
    if (!user) return null;
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'account-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <AccountCircle />
        </Button>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Typography variant="display3" component="h3">
            {userId}
          </Typography>
          <Divider />
          <MenuList>{userLinks}</MenuList>
        </Menu>
      </div>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
};

export default withStyles(styles)(UserMenu);
