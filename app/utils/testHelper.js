/* eslint-disable */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
// renderer
import renderer from 'react-test-renderer';
// Material-UI
import { MuiThemeProvider } from '@material-ui/core/styles';
import { DEFAULT_THEME } from 'theme/themes';
// router stuff
import { MemoryRouter } from 'react-router';
// redux stuff
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import configureStore from 'configureStore';
// react-intl stuff
import { LanguageProvider } from 'wrappers/LanguageProvider';
import { translationMessages } from 'i18n';



const DEFAULT_LOCALE = 'en';
const createStore = () => configureStore({}, browserHistory);

/* Wrappers */
const wrapComponentWithStore = component => (
  <Provider store={createStore()}>{component}</Provider>
);
const wrapComponentWithRouter = component => (
  <MemoryRouter initialIndex={1} initialEntries={['/app','/logout']}> {component}</MemoryRouter>
);

const wrapComponentWithRouter2 = (component, props) => {
  let compWithProps = component;
  if (props) {
    // console.log("adding props: " + props.location);
    compWithProps = React.cloneElement(component, {...props}, component.children);
    // console.log("compWithProps: " + JSON.stringify(compWithProps.children));
  }
  return
    <MemoryRouter>
      {compWithProps}
    </MemoryRouter>;
}
const w2rapComponentWithIntl = component =>
  <LanguageProvider messages={translationMessages} locale={DEFAULT_LOCALE}>
    {component}
  </LanguageProvider>;

const wrapComponentWithIntl = component => {
  // console.log("Wrapping intl: " + JSON.stringify(component));
  return <LanguageProvider messages={translationMessages} locale={DEFAULT_LOCALE}>
    {component}
  </LanguageProvider>;
}

/** Shortcuts **/
const renderWithStore = (component) =>
  render(wrapComponentWithStore(component));
const shallowWithStore = (component, props) =>
  shallow(wrapComponentWithStore(component, props));
/**
 * Use this if you need to .find() some elements in your tested component
 * @param component
 */
const renderWithIntl = (component) =>
  render(wrapComponentWithIntl(component));
const shallowWithIntl = (component) =>
  shallow(wrapComponentWithIntl(component));

const shallowWithRouter = (component, props) =>
  shallow(wrapComponentWithRouter(component, props));
const renderWithRouter = (component, props) =>
  render(wrapComponentWithRouter(component, props));

/**
 * dives into the instanced component to avoid the HOCs to find elements
 * @param component
 * @returns {*}
 */
const diveWithStore = component => {
  let ret = shallowWithStore(component);
  while (ret) {
    try {
      ret = ret.dive();
    } catch (e) {
      return ret;
    }
  }
};
const diveWithIntl = component => {
  let ret = shallowWithIntl(component);
  while (ret) {
    try {
      // Note the use of dive() because Component is wrapped by a higher order component.
      ret = ret.dive();
    } catch (e) {
      return ret;
    }
  }
};

const dive = component => {
  let ret = component;
  while (ret) {
    try {
      ret = ret.dive();
      console.log("diving... " + JSON.stringify(ret.debug()));
    } catch (e) {
      return ret;
    }
  }
};


const wrapWithTheme = component =>
  (
    <MuiThemeProvider theme={DEFAULT_THEME}>
      {component}
    </MuiThemeProvider>
  )

/**
 * This is the main function to get your component as in real world
 * @param component
 */
const wrapComponent = component =>
  wrapWithTheme(
    wrapComponentWithStore(
      wrapComponentWithIntl(
        component
      ),
    )
  );

/**
 * a timer to sleep some time until callback is called
 * @param callback
 * @param time
 */
const timer = (callback, time) => {
  console.log('Ready....go!' + new Date());
  setTimeout(() => {
    console.log('Times up -- stop!' + new Date());
    callback && callback();
  }, time);
}


module.exports = {
  DEFAULT_LOCALE,
  wrapComponentWithRouter,
  wrapComponentWithStore,
  wrapComponentWithIntl,
  wrapComponent,
  wrapWithTheme,
  render,
  renderWithIntl,
  renderWithStore,
  renderWithRouter,
  shallow,
  shallowWithStore,
  shallowWithIntl,
  shallowWithRouter,
  diveWithIntl,
  diveWithStore,
  dive,
  mount,
  renderer,
  timer,
};
