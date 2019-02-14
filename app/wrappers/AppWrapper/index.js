/*
 * AppWrapper
 *
 * This component wraps App component passing general props such as theme and locale (others may be included)
 * Accessing store.state props (vía mapStateToProps) guarantees re-rendering on specific state changes
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// connect with theme and locale in state
import { makeSelectTheme } from 'wrappers/ThemeProvider/selectors';
import { makeSelectLocale } from 'wrappers/LanguageProvider/selectors';

// Theme provider from MUI
import { MuiThemeProvider } from '@material-ui/core/styles';

// Main App to render
import App from 'containers/App';

/* eslint-disable react/prefer-stateless-function */
class AppWrapper extends React.PureComponent {
  render() {
    const { theme } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    );
  }
}

AppWrapper.propTypes = {
  theme: PropTypes.object.isRequired,
  // eslint-disable-next-line
  locale: PropTypes.string.isRequired, // required to render the app when locale changes
};
const mapStateToProps = createStructuredSelector({
  theme: makeSelectTheme(),
  locale: makeSelectLocale(),
});
export default connect(mapStateToProps)(AppWrapper);
