// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const SignUp = memo(function SignUp ({ className }) {
  return <div id="SignUp" className={cn('sign-up', className)}>
    <h1> Sign Up </h1>
  </div>;
});

SignUp.propTypes = {
  className: PropTypes.string,
};
SignUp.defaultProps = {
  className: '',
};
