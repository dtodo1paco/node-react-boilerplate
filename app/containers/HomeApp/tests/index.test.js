import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import TestedComponent from '../index';
import messages from '../messages';

describe('<TestedComponent />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<TestedComponent />);
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.header} />),
    ).toEqual(true);
  });
});
