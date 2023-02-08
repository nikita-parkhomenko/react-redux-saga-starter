// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const SignIn = memo(function SignIn ({ className }) {
  return <div id="SignIn" className={cn('sign-in', className)}>
    <h1> Sign In </h1>
  </div>;
});

SignIn.propTypes = {
  className: PropTypes.string,
};
SignIn.defaultProps = {
  className: '',
};
