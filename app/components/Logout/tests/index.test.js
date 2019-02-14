import React from 'react';
// import { browserHistory } from 'react-router-dom';
import TestHelper from 'utils/testHelper';
import TestedComponent from '../index';

// const mockLogout = jest.fn();
/*
const defaultProps = {
  classes: {},
  logout: mockLogout,
  history: browserHistory,
};
*/
const connectedComponent = <TestedComponent />;
// const getComponent = props => <Logout {...props} />;
/*
const wrapComponent3 = component =>
  TestHelper.wrapComponentWithStore(
    TestHelper.wrapComponentWithRouter(
      TestHelper.wrapComponentWithIntl(component),
    ),
  );
*/
const wrapComponent2 = component =>
  TestHelper.wrapComponentWithStore(
    TestHelper.wrapComponentWithIntl(component),
  );

/*
const renderComponent = (props = defaultProps) =>
  TestHelper.dive(TestHelper.shallow(wrapComponent2(getComponent(props))));
*/

describe('<Logout />', () => {
  it('should match the snapshot', () => {
    const comp = wrapComponent2(connectedComponent);
    // const comp = getComponent(defaultProps);
    const renderedComponent = TestHelper.renderer.create(comp).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
  /*
  it('should render the correct type for root element', () => {
    const renderedComponent = renderComponent(defaultProps);
    // console.log(renderedComponent.debug());
    expect(renderedComponent.type()).toBe('div');
  });
  */
});
