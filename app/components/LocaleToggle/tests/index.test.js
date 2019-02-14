import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import { shallow, mount } from 'enzyme';
import { translationMessages } from 'i18n';

import { changeLocale } from 'wrappers/LanguageProvider/actions';
import LanguageProvider from 'wrappers/LanguageProvider';
import LocaleToggle, { mapDispatchToProps } from '../index';

describe('<LocaleToggle />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render the default language messages', () => {
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>,
    );
    expect(renderedComponent.contains(<LocaleToggle />)).toBe(true);
  });

  it('should present English as default language', () => {
    const renderedComponent = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>,
    );
    const testMark = (
      <input name="locale" type="hidden" id="locale" value="en" />
    );
    expect(renderedComponent.contains(testMark)).toBeTruthy();
    expect(renderedComponent.contains(<span>English</span>)).toBeTruthy();
  });

  describe('mapDispatchToProps', () => {
    describe('onLocaleToggle', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onLocaleToggle).toBeDefined();
      });
      it('should dispatch changeLocale when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const locale = 'es';
        result.onLocaleToggle(locale);
        expect(dispatch).toHaveBeenCalledWith(changeLocale(locale));
      });
    });
  });
});
