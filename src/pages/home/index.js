
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies
import { useIsAuthorized } from '../hooks';
import { Navigate } from 'react-router-dom';
import { DASHBOARD } from '../../navigation';

export const LandingPage = memo(function LandingPage ({ className }) {
  const isAuth = useIsAuthorized();

  // NOTE: Show landing page only for unauthorized users
  // TODO: fix after sync with BE
  if (!isAuth) return <Navigate to={DASHBOARD} replace />;

  return <div id="LandingPage" className={cn('landing-page', className)}>
    <h1> Home Landing page </h1>
  </div>;
});

LandingPage.propTypes = {
  className: PropTypes.string
};
LandingPage.defaultProps = {
  className: ''
};
