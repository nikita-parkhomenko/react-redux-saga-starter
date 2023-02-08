// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const Dashboard = memo(function Dashboard ({ className }) {
  return <div id="Dashboard" className={cn('dashboard', className)}>
    <h1> Dashboard </h1>
  </div>;
});

Dashboard.propTypes = {
  className: PropTypes.string,
};
Dashboard.defaultProps = {
  className: '',
};
