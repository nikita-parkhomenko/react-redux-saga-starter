
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

// local dependencies
import { Sidebar } from './sidebar';

export const Layout = memo(function Layout ({ className }) {
  return <div className={cn('layout', className)}>
    <Sidebar />
    <main className="mx-3">
      <header className="app-header">
        <h1> Header </h1>
      </header>
      <Outlet />
    </main>
  </div>;
});

Layout.propTypes = {
  className: PropTypes.string
};
Layout.defaultProps = {
  className: ''
};
