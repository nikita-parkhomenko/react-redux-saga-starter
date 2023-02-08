// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const Calendar = memo(function Calendar ({ className }) {
  return <div id="Calendar" className={cn('calendar', className)}>
    <h1> Calendar </h1>
  </div>;
});

Calendar.propTypes = {
  className: PropTypes.string,
};
Calendar.defaultProps = {
  className: '',
};
