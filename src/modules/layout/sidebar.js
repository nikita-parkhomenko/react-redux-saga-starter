// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const Sidebar = memo(function Sidebar ({ className }) {
  return <aside className={cn('sidebar', className)}>
    <h1> Sidebar </h1>
  </aside>;
});

Sidebar.propTypes = {
  className: PropTypes.string,
};
Sidebar.defaultProps = {
  className: '',
};
