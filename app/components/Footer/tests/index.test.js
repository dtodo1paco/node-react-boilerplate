import React from 'react';
import { mount } from 'enzyme';

import { IntlProvider, FormattedMessage } from 'react-intl';

import messages from '../messages';
import Footer from '../index';

const renderComponent = () =>
  mount(
    <IntlProvider messages={messages} locale="en">
      <Footer />
    </IntlProvider>,
  );

describe('<Footer />', () => {
  it('should contains 2 sections with h3', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find('h3')).toHaveLength(2);
  });
  it('should render the copyright notice', () => {
    const renderedComponent = renderComponent();
    const testMark = <FormattedMessage {...messages.licenseMessage} />;
    expect(renderedComponent.contains(testMark)).toBeTruthy();
  });
  it('should render the credits', () => {
    const renderedComponent = renderComponent();
    /*
    const testMark2 = (
      <FormattedMessage
              {...messages.authorMessage}
        values={{
          author: (
            <A
              theme={theme}
              href="https://dtodo1paco.github.io/"
            >
              @dtodo1paco
            </A>
          ),
        }}
      />
    );
    */
    // const testMark = "section [id='credits']";
    const testMark = "a [href='https://dtodo1paco.github.io/']";
    expect(renderedComponent.find(testMark).length).toBe(1);
  });
});
