import React from 'react';
import { shallow } from 'enzyme';

import TestedComponent from '../index';

describe('<TestedComponent />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<TestedComponent />);
    expect(renderedComponent).toBeNotNull();
  });
});
