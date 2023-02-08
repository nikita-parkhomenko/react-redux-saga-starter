// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

// local dependencies
import { SIGN_IN } from './constants';
import { useIsAuthorized } from '../pages/hooks';

export const PrivateRoute = memo(function PrivateRoute ({ children }) {
  const location = useLocation();
  const isAuthorized = useIsAuthorized();

  // NOTE: user should be authorized to use platform
  // TODO: fix after sync with BE
  if (isAuthorized) return <Navigate to={SIGN_IN} state={{ from: location }} replace />;

  return children;
});

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
