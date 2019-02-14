/*
 *
 * ThemeProvider
 *
 * this component connects the redux state theme
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';

import { makeSelectLocale } from 'wrappers/LanguageProvider/selectors';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { THEMES } from 'theme/themes';
import { changeTheme } from './actions';
import { makeSelectTheme } from './selectors';
import messages from './messages';

export class ThemeProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    const themes = Object.keys(THEMES).map(key => (
      <option key={key} value={key}>
        <FormattedMessage {...messages[key]} />
      </option>
    ));
    this.state = {
      themes,
    };
  }
  handleChange = event => {
    const val = event.target.value;
    const theme = THEMES[val];
    if (theme) {
      this.props.changeTheme(theme);
    }
  };

  render() {
    const { theme } = this.props;
    const { themes } = this.state;
    return (
      <FormControl required>
        <InputLabel htmlFor="theme">
          <FormattedMessage {...messages.label} />
        </InputLabel>
        <Select
          native={isMobile}
          value={theme.props.id}
          onChange={this.handleChange}
          name="theme"
          inputProps={{
            id: 'theme',
          }}
        >
          {themes}
        </Select>
        <FormHelperText>
          <FormattedMessage {...messages.help} />
        </FormHelperText>
      </FormControl>
    );
  }
}

ThemeProvider.propTypes = {
  theme: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  changeTheme: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  theme: makeSelectTheme(),
  locale: makeSelectLocale(),
});
const mapDispatchToProps = dispatch => ({
  changeTheme: theme => dispatch(changeTheme(theme)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThemeProvider);
