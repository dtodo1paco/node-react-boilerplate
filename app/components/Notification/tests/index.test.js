import React from 'react';

import { IntlProvider, defineMessages } from 'react-intl';
import TestHelper from 'utils/testHelper';
import TestedComponent, { Notification } from '../index';
import { createRender, getClasses } from '@material-ui/core/test-utils';

// global vars

const variants = ['success', 'warning', 'error', 'info'];
const dataError = {id:'403',type:'error',text:'error.server.down'};
const dataSuccess = {id:'200',type:'success',text:'success.saved'};

const onClose = jest.fn();

const createComponent = (variant, data, open = true) => <Notification
    classes={{}}
    open={open}
    variant={variant}
    data={data}
    onClose={onClose}
/>

describe('<Notification />', () => {
  describe('snapshot', () => {
    it('should match the snapshot', () => {
      const wrappedComp = TestHelper.wrapComponent(createComponent('error', dataError));
      const tree = TestHelper.render(wrappedComp);
      expect(tree).toMatchSnapshot();
    });
  });
  describe('render', () => {
    it('should render nothing when closed', () => {
      const wrappedComp = TestHelper.wrapComponent(createComponent('error',dataError, false));
      const comp = TestHelper.render(wrappedComp);
      expect(comp.find('div').length).toBe(0);
    });
    it('should render a close button', () => {
      const wrappedComp = TestHelper.wrapComponent(createComponent('error',dataError));
      const comp = TestHelper.render(wrappedComp);
      expect(comp.find('div').length).not.toBe(0);
      expect(comp.find('button').length).toBe(1);
    });
  });
  describe('behavoir', () => {
    it('should call onClose when clicking on close button', () => {
      const wrappedComp = TestHelper.wrapComponent(createComponent('error',dataError));
      const comp = TestHelper.mount(wrappedComp);
      const closeButton = comp.find('button').first();
      closeButton.simulate('click', { preventDefault() {} });
      expect(onClose.mock.calls.length).toBe(1);
    });
    it('should autoClose when variant is not error', () => {
      const wrappedComp = TestHelper.wrapComponent(createComponent('success',dataSuccess));
      // const wrappedComp = createComponent('success',dataSuccess);
      const comp = TestHelper.mount(wrappedComp);
      expect(comp.find('button').length).toBe(1);
      const callback = () => {
        console.log("testing...");
        expect(comp.find('button').length).toBe(0);
      }
      TestHelper.timer(callback, 8000);


      /*
            setTimeout(() => {
              console.log("checking state now");
              expect(component.state().open).toEqual(false);
            }, 7000);
      */
    });
  });

});
