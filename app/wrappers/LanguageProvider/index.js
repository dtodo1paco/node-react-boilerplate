/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

export class LanguageProvider extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    // console.log("LOCALE: " + this.props.locale)
    return (
      <IntlProvider
        locale={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale() || 'en',
});

export default connect(mapStateToProps)(LanguageProvider);
