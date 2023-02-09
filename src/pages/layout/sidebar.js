// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Sidebar as SidebarPro, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

// local dependencies
import { AppLogo } from '../../assets';
import { EyeIcon } from '../../components';
import * as ROUTE from '../../navigation/constants';

export const Sidebar = memo(function Sidebar ({ className }) {
  const { collapseSidebar, collapsed } = useProSidebar();

  return <SidebarPro className={cn('sidebar', className)} >
    <div className={cn('d-flex align-items-center mx-3 pt-3 mb-3', {
      'justify-content-between': !collapsed,
      'justify-content-center': collapsed,
    })}>
      <div className={cn('d-flex align-items-center', { 'd-none': collapsed })}>
        <AppLogo className="me-2" />
        <h2 className="mb-0 fw-bold"> Djema </h2>
      </div>
      <Button color="transparent" className="border-0 text-center" onClick={() => collapseSidebar()}>
        <EyeIcon size="2x"/>
      </Button>
    </div>
    <Menu>
      <MenuItem icon={<EyeIcon size="2x" />} component={<Link to={ROUTE.DASHBOARD} />}>
        Dashboard
      </MenuItem >
      <MenuItem icon={<EyeIcon size="2x" />} component={<Link to={ROUTE.STUDENT_PROFILE} />}>
        My profile
      </MenuItem>
    </Menu>
  </SidebarPro>;
});

Sidebar.propTypes = {
  className: PropTypes.string,
};
Sidebar.defaultProps = {
  className: '',
};
