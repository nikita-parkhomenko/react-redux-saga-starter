
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

// local dependencies
import { Sidebar } from './sidebar';

export const Layout = memo(function Layout ({ className }) {
  return <Container fluid className={cn('layout px-0', className)}>
    <Row>
      <Col md={3} className="d-none d-md-block">
        <Sidebar />
      </Col>
      <Col xs={12} md={9}>
        <header className="shadow">
          <h1> Header </h1>
        </header>
        <main className="d-flex">
          <Outlet />
        </main>
      </Col>
    </Row>
  </Container>;
});

Layout.propTypes = {
  className: PropTypes.string
};
Layout.defaultProps = {
  className: ''
};
