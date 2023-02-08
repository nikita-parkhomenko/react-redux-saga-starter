// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const FindMentor = memo(function FindMentor ({ className }) {
  return <div id="FindMentor" className={cn('find-mentor', className)}>
    <h1> Find Mentor </h1>
  </div>;
});

FindMentor.propTypes = {
  className: PropTypes.string,
};
FindMentor.defaultProps = {
  className: '',
};
