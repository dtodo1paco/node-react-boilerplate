/* eslint react/prop-types: 0 */
/**
 * Form
 */

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import FormGroup from '@material-ui/core/FormGroup';

import TextField from '@material-ui/core/TextField';
// import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import formMessages from './messages';

/*
 * AUX
 */
export function renderField(inputField, messages, classes) {
  if (inputField.type === 'text' || inputField.type === 'password') {
    return renderTextField(inputField, messages, classes);
  }
  return (
    <div key={inputField.id}>Unknown input [{JSON.stringify(inputField)}]</div>
  );
}

export function renderTextField(props, messages, classes) {
  // console.log("Rendering field: " + JSON.stringify(props));
  let helpText = null;
  if (props.error.isErrored) {
    helpText = <FormattedMessage {...messages[props.error.message]} />;
  } else if (props.help) {
    helpText = <FormattedMessage {...messages[props.help.message]} />;
  }

  return (
    <TextField
      autoFocus={props.focus}
      id={props.name}
      key={props.name}
      name={props.name}
      className={classNames(classes.textfield, classes[props.name])}
      margin="normal"
      type={props.type}
      label={<FormattedMessage {...messages[props.name]} />}
      error={props.error.isErrored}
      helperText={helpText}
      value={props.value}
      onChange={props.onChange}
      autoComplete={props.name}
    />
  );
}

/*
const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value}
    onCheck={input.onChange}
  />
)
*/
/*
 * AUX
 */

const handleKeyDown = (e, onSubmit) => {
  if (onSubmit) {
    const key = e.which || e.keyCode;
    if (key === 13) {
      onSubmit();
    }
  }
};

function Form(props) {
  const { inputs = {}, messages, classes = {}, id, onSubmit, onChange } = props;
  const allMessages = {
    ...messages,
    ...formMessages,
  };
  let anyError = false;
  let validValues = true;
  const fields = Object.keys(inputs).map((key, i) => {
    const input = inputs[key];
    anyError = anyError || input.error.isErrored;
    if (!input.error.isErrored) {
      validValues = validValues && input.error.validator(input.value);
    }
    input.onChange = onChange;
    input.focus = i === 0;
    return renderField(input, allMessages, classes);
  });
  const disabled = anyError || !validValues;
  return (
    <form>
      <FormGroup
        className={classes.form}
        onKeyDown={e => handleKeyDown(e, disabled ? null : onSubmit)}
      >
        <Typography variant="display2" color="secondary">
          <FormattedMessage {...messages[id]} />
        </Typography>
        <Divider />
        {fields}
        <br />
        <Button
          id={`${id}-submit`}
          onClick={onSubmit}
          color="primary"
          variant="flat"
          disabled={disabled}
        >
          <FormattedMessage {...messages.submit} />
        </Button>
      </FormGroup>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  inputs: PropTypes.object,
  classes: PropTypes.object,
  messages: PropTypes.object,
};

export default Form;

/*
 const renderRadioGroup = ({ input, ...rest }) => (
 <RadioButtonGroup
 {...input}
 {...rest}
 valueSelected={input.value}
 onChange={(event, value) => input.onChange(value)}
 />
 )

 const renderSelectField = ({
 input,
 label,
 meta: { touched, error },
 children,
 ...custom
 }) => (
 <SelectField
 floatingLabelText={label}
 errorText={touched && error}
 {...input}
 onChange={(event, index, value) => input.onChange(value)}
 children={children}
 {...custom}
 />
 )
 */
