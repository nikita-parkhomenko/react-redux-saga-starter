// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const Bookmarks = memo(function Bookmarks ({ className }) {
  return <div id="Bookmarks" className={cn('bookmarks', className)}>
    <h1> Bookmarks </h1>
  </div>;
});

Bookmarks.propTypes = {
  className: PropTypes.string,
};
Bookmarks.defaultProps = {
  className: '',
};
