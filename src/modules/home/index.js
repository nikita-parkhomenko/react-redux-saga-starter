
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const Home = memo(function Home ({ className }) {
  return <div id="Home" className={cn('', className)}>
    <h1> Home page </h1>
  </div>;
});

Home.propTypes = {
  className: PropTypes.string
};
Home.defaultProps = {
  className: ''
};
