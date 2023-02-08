
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const StudentProfile = memo(function StudentProfile ({ className }) {
  return <div id="StudentProfile" className={cn('student-profile', className)}>
    <h1> Student Profile </h1>
  </div>;
});

StudentProfile.propTypes = {
  className: PropTypes.string
};
StudentProfile.defaultProps = {
  className: ''
};
