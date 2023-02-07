
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Outlet, Link } from 'react-router-dom';

// local dependencies

export const Layout = memo(function Layout ({ className }) {
  return <div className={cn('layout', className)}>
    <header className="bg-primary"> Header </header>
    <main className="d-flex min-vh-100">
      <aside className="bg-warning">
        <nav className="btn-group-vertical">
          <Link to="student-profile/:Nikita"> My profile </Link>
          <Link to="/"> Home </Link>
        </nav>
      </aside>
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
