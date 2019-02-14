/*
 *
 * LanguageToggle
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';

import { appLocales } from 'i18n';
import { changeLocale } from 'wrappers/LanguageProvider/actions';
import { makeSelectLocale } from 'wrappers/LanguageProvider/selectors';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import messages from './messages';
const styles = theme => ({
  inAppBar: {
    margin: theme.spacing.unit,
    '& *': {
      fontSize: 'x-small',
    },
  },
});

export class LocaleToggle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: this.setOptions(),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.setOptions();
    }
  }

  setOptions() {
    const opts = appLocales.map(key => (
      <option value={key} key={key}>
        <FormattedMessage {...messages[key]} />
      </option>
    ));
    return opts;
  }

  handleChange = event => {
    this.props.onLocaleToggle(event.target.value);
  };

  render() {
    const { inAppBar, classes, locale } = this.props;
    const { options } = this.state;
    const select = (
      <Select
        native={isMobile}
        value={locale}
        onChange={this.handleChange}
        name="locale"
        inputProps={{
          id: 'locale',
        }}
      >
        {options}
      </Select>
    );
    if (inAppBar) {
      return <div className={classes.inAppBar}>{select}</div>;
    }
    return (
      <div>
        <FormControl required>
          <InputLabel htmlFor="locale">
            <FormattedMessage {...messages.label} />
          </InputLabel>
          {select}
          <FormHelperText>
            <FormattedMessage {...messages.help} />
          </FormHelperText>
        </FormControl>
      </div>
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  inAppBar: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});
export const mapDispatchToProps = dispatch => ({
  onLocaleToggle: locale => dispatch(changeLocale(locale)),
  dispatch,
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const themeConnected = withStyles(styles, { withTheme: true });

export default compose(
  themeConnected,
  withConnect,
)(LocaleToggle);
