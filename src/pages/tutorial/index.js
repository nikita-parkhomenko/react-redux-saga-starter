// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const Tutorial = memo(function Tutorial ({ className }) {
  return <div id="Tutorial" className={cn('tutorial', className)}>
    <h1> Tutorial </h1>
  </div>;
});

Tutorial.propTypes = {
  className: PropTypes.string,
};
Tutorial.defaultProps = {
  className: '',
};
