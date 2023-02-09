// outsource dependencies
import cn from 'classnames';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { Input as InputBootstrap, Label, FormGroup, FormFeedback } from 'reactstrap';

// local dependencies

export const Input = memo(function Input ({ label, id, isFloating, className, classNameFormGroup, skipTouch, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setTouched } = helpers;
  const { name } = field;

  useEffect(() => {
    if (!touched && skipTouch) setTouched(true, true);
  }, [setTouched, skipTouch, touched]);

  // NOTE handle valid/invalid state and error message for input
  let statusClass = '';
  if (touched) statusClass += error ? ' is-invalid' : ' is-valid';

  return <FormGroup floating={isFloating} className={classNameFormGroup}>
    <InputBootstrap
      autoComplete="off"
      {...props}
      {...field}
      id={id || name}
      className={cn(className, statusClass)}
    />
    {label && <Label for={id || name}> {label} </Label>}
    {touched && error && <FormFeedback className="error">
      {error}
    </FormFeedback> }
  </FormGroup>;
});

Input.propTypes = {
  classNameFormGroup: PropTypes.string,
  className: PropTypes.string,
  isFloating: PropTypes.bool,
  label: PropTypes.string,
};
Input.defaultProps = {
  label: '',
  className: '',
  isFloating: true,
  classNameFormGroup: '',
};
