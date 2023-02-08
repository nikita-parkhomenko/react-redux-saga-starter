
// outsource dependencies
import React, { memo } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// local dependencies
import * as app from './app-svg-icons';

/**
 * Preparing icons
 * @param src
 * @param name
 * @returns {React.NamedExoticComponent<object>}
 */
function create (src, name) {
  const icon = src[name];
  if (!icon || !icon.iconName || !icon.prefix) { throw new Error(`Invalid Icon ${name}`); }

  // NOTE: add to fontawesome library
  library.add(icon);
  // NOTE: create component to use in React
  const Icon = memo((props) => <FontAwesomeIcon icon={[icon.prefix, icon.iconName]} { ...props } />);
  // NOTE: Name for profiler and test for component
  Icon.displayName = `${icon.prefix}-${icon.iconName}-icon`;
  return Icon;
}

export const HamburgerIcon = create(app, 'hamburger');
