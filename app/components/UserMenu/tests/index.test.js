import React from 'react';
import { shallow } from 'enzyme';
// import { IntlProvider, defineMessages } from 'react-intl';
import TestedComponent from '../index';

describe('<TestedComponent />', () => {
  it('should contain default text', () => {
    shallow(<TestedComponent />);
  });
  it('should not have Notification if props.values is not defined', () => {
    // const renderedComponent = shallow(<TestedComponent />);
    shallow(<TestedComponent />);
  });
});
