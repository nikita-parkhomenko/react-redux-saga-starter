// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const AccountSettings = memo(function AccountSettings ({ className }) {
  return <div id="AccountSettings" className={cn('account-settings', className)}>
    <h1> Account Settings </h1>
  </div>;
});

AccountSettings.propTypes = {
  className: PropTypes.string,
};
AccountSettings.defaultProps = {
  className: '',
};
