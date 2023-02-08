// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const Messages = memo(function Messages ({ className }) {
  return <div id="Messages" className={cn('messages', className)}>
    <h1> Messages </h1>
  </div>;
});

Messages.propTypes = {
  className: PropTypes.string,
};
Messages.defaultProps = {
  className: '',
};
