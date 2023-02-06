
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const StudentProfile = memo(function StudentProfile ({ className }) {
  return <div className={cn('', className)}>
    <h1> StudentProfile </h1>
  </div>;
});

StudentProfile.propTypes = {
  className: PropTypes.string
};
StudentProfile.defaultProps = {
  className: ''
};
