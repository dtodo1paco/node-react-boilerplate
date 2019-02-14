import React from 'react';
import { FormattedMessage } from 'react-intl';
import TestHelper from 'utils/testHelper';
import Form from '../index';
import sampleForms from './sampleForms';
import sampleMessages from './sampleMessages';
import formMessages from '../messages';

const messages = {
  ...formMessages, // errors, submit, and so on...
  ...sampleMessages, // specific for the form (one per field)
};
const TOTAL_INPUTS = Object.keys(sampleForms.signup).length;

const defaultProps = {
  id: 'testFormId',
  inputs: sampleForms.signup,
  messages,
  onChange: jest.fn(),
  onSubmit: jest.fn(),
};
const TestElement = <Form {...defaultProps} />;

describe('<Form />', () => {
  it('should render a <form> tag', () => {
    const renderedComponent = TestHelper.shallowIntlComponent(TestElement);
    expect(renderedComponent.type()).toEqual('form');
  });

  it('should render a <button> element', () => {
    const renderedComponent = TestHelper.renderWithIntl(TestElement);
    expect(renderedComponent.find('button').length).toBe(1);
  });

  it('should render a disabled <button> element', () => {
    const renderedComponent = TestHelper.renderWithIntl(TestElement);
    expect(renderedComponent.find('button:disabled').length).toBe(1);
  });

  it(`should render as much inputs as fields in the form (${TOTAL_INPUTS})`, () => {
    const renderedComponent = TestHelper.renderWithIntl(TestElement);
    expect(renderedComponent.find('input').length).toBe(TOTAL_INPUTS);
  });

  it('should render a title message with the form id', () => {
    const renderedComponent = TestHelper.shallowIntlComponent(TestElement);
    const testMark = <FormattedMessage {...messages.testFormId} />;
    expect(renderedComponent.contains(testMark)).toBeTruthy();
  });
});
