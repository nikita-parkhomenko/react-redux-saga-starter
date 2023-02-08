// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const LearningMaterial = memo(function LearningMaterial ({ className }) {
  return <div id="LearningMaterial" className={cn('learning-material', className)}>
    <h1> Learning Material </h1>
  </div>;
});

LearningMaterial.propTypes = {
  className: PropTypes.string,
};
LearningMaterial.defaultProps = {
  className: '',
};
