/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MyLink from 'components/Link';

import Banner from 'assets/images/dog_ate_page.png';

import messages from './messages';
const styles = theme => ({
  card: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.unit * 3,
    maxWidth: 250,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 300,
    },
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
  link: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
/* eslint-disable react/prefer-stateless-function */
class NotFound extends React.PureComponent {
  render() {
    const { classes, theme } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          height="200"
          component="img"
          image={Banner}
          title={<FormattedMessage {...messages.header} />}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            <FormattedMessage {...messages.header} />
          </Typography>
          <Typography component="h3">
            <FormattedMessage {...messages.text_1} />
          </Typography>
          <Typography component="p">
            <FormattedMessage {...messages.text_2} />
          </Typography>
        </CardContent>
        <CardActions>
          <MyLink theme={theme} className={classes.link} to="/">
            <FormattedMessage {...messages.goHome} />
          </MyLink>
        </CardActions>
      </Card>
    );
  }
}
NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NotFound);
