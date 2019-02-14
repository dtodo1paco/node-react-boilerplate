/**
 * Testing our link component
 */

import React from 'react';
import TestHelper from 'utils/testHelper';
import { DEFAULT_THEME } from 'theme/themes';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import Link from '../index';

const href = 'https://dtodo1paco.org/';
const defaultProps = {
  href: '/',
  theme: DEFAULT_THEME,
  to: href,
};

const children = <h1>Test</h1>;
const getComponent = props => <Link {...props}>{children}</Link>;
const buildComponent = props =>
  props ? getComponent(props) : getComponent(defaultProps);
const buildWithRouter = props => (
  <MemoryRouter>{buildComponent(props)}</MemoryRouter>
);
const renderComponent = props =>
  TestHelper.shallow(buildWithRouter(props)).dive();
const findComponent = props => renderComponent(props).find(Link);

describe('<Link />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer
      .create(buildWithRouter(defaultProps))
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render a <Link> as base element', () => {
    const renderedComponent = findComponent(defaultProps);
    expect(renderedComponent).toHaveLength(1);
  });

  it('should have a href attribute', () => {
    const renderedComponent = findComponent(defaultProps);
    expect(renderedComponent.prop('href')).toBe(defaultProps.href);
  });

  it('should adopt a valid attribute (target)', () => {
    const props = defaultProps;
    props.target = '_blank';
    const renderedComponent = findComponent(props);
    expect(renderedComponent.prop('target')).toBe(props.target);
  });

  it('should adopt a valid attribute (type)', () => {
    const props = defaultProps;
    props.type = 'text/html';
    const renderedComponent = findComponent(props);
    expect(renderedComponent.prop('type')).toBe(props.type);
  });

  it('should have the correct children', () => {
    const renderedComponent = findComponent(defaultProps);
    expect(renderedComponent.children().type()).toBe('h1');
  });
});
