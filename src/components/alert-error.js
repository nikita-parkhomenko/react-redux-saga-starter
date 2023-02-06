
// outsource dependencies
import cn from 'classnames';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';

// local dependencies

export const AlertError = memo(function AlertError ({ message, title, active, onClear, className, ...attr }) {
  const [text, setText] = useState('');
  useEffect(() => { typeof message === 'string' && setText(message); }, [message]);

  return <Alert
    color="danger"
    { ...attr }
    isOpen={Boolean(message)}
    toggle={!active ? null : onClear}
    className={cn('alert-error', className)}
  >
    <strong> { title } </strong>
    { text }
  </Alert>;
});
AlertError.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
  onClear: PropTypes.func,
  message: PropTypes.string,
  className: PropTypes.string,
};
AlertError.defaultProps = {
  message: null,
  active: false,
  onClear: null,
  className: '',
  title: 'Error: ',
};
