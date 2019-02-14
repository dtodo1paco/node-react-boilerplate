import React from 'react';
import TestHelper from 'utils/testHelper';
import { DEFAULT_THEME } from 'theme/themes';
import { anonymousUser, loggedUser } from 'containers/App/reducer';
import LocaleToggle from 'components/LocaleToggle';
import { getRoutesForRole, routeExists } from 'routes/routes';
import { Header } from '../index';

describe('<Header />', () => {
  describe('when no user logged in...', () => {
    const noLoginProps = {
      user: anonymousUser,
      location: {
        hash: 'tEsT',
        pathname: '/',
        search: '',
      },
      theme: DEFAULT_THEME,
      classes: {},
      locale: TestHelper.DEFAULT_LOCALE,
    };
    const publicHeader = <Header {...noLoginProps} />;
    const anonymousNavItems = getRoutesForRole(anonymousUser);
    const anonymousLinks = anonymousNavItems.filter(el => el.to !== null);

    it('snapshot', () => {
      const wrapper = TestHelper.shallow(publicHeader);
      expect(wrapper).toMatchSnapshot();
    });
    it('should render a div as base element', () => {
      const renderedComponent = TestHelper.shallow(publicHeader);
      expect(renderedComponent.type()).toEqual('div');
    });
    it('should render title', () => {
      const renderedComponent = TestHelper.shallow(publicHeader);
      expect(renderedComponent.find('#header-title').length).toBe(1);
    });
    it('should render nav bar', () => {
      const renderedComponent = TestHelper.shallow(publicHeader);
      expect(renderedComponent.find('#header-links').length).toBe(1);
    });
    it(`should render nav bar with ${anonymousLinks.length} links and correct "to" props`, () => { // eslint-disable-line
      const renderedComponent = TestHelper.shallow(publicHeader);
      const headerLinks = renderedComponent
        .find('#header-links')
        .children()
        .first()
        .children();
      expect(headerLinks).toHaveLength(anonymousLinks.length);
      headerLinks.forEach(node => {
        const linkRoute = node.props('key').to;
        expect(routeExists(anonymousNavItems, linkRoute)).toBeTruthy();
      });
    });
    it('should render 1 LocaleToggle', () => {
      const renderedComponent = TestHelper.shallow(publicHeader);
      expect(renderedComponent.find(LocaleToggle)).toHaveLength(1);
    });
  });
  describe('when a user is logged in...', () => {
    const loggedInProps = {
      user: loggedUser,
      location: {
        hash: 'tEsT',
        pathname: '/app',
        search: '',
      },
      theme: DEFAULT_THEME,
      classes: {},
      locale: TestHelper.DEFAULT_LOCALE,
    };
    const privateHeader = <Header {...loggedInProps} />;
    const privateNavItems = getRoutesForRole(loggedUser);
    const privateLinks = privateNavItems.filter(el => el.to !== null);

    it('snapshot', () => {
      const wrapper = TestHelper.shallow(privateHeader);
      expect(wrapper).toMatchSnapshot();
    });
    it('should render title', () => {
      const renderedComponent = TestHelper.shallow(privateHeader);
      expect(renderedComponent.find('#header-title').length).toBe(1);
    });
    it(`should render nav bar with ${privateLinks.length} links and correct "to" props`, () => { // eslint-disable-line
      const renderedComponent = TestHelper.shallow(privateHeader);
      const headerLinks = renderedComponent
        .find('#header-drawer-links')
        .children('[activeClassName="active"]');
      expect(headerLinks).toHaveLength(privateLinks.length);
      headerLinks.forEach(node => {
        const linkRoute = node.props('key').to;
        expect(routeExists(privateNavItems, linkRoute)).toBeTruthy();
      });
    });
    it('should NOT render a LocaleToggle', () => {
      const renderedComponent = TestHelper.shallow(privateHeader);
      expect(renderedComponent.find(LocaleToggle)).toHaveLength(0);
    });
  });
});
