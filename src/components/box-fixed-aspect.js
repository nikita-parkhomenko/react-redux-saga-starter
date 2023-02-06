
// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';

// local dependencies

// configure
// NOTE: entry to track parent state
const box = { position: 'relative' };
// NOTE: fill reserved space in layout
const holder = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, };
export const BoxFixedAspect = memo(function BoxFixedAspect ({ aspect, direction, children, ...attr }) {
  const placeholder = useMemo(() => {
    let res = 100; // same as aspect 1;
    if (aspect > 0 && aspect < 100) {
      // NOTE: aspect={width/height} same rule as for crop component and BE
      res = ((1/aspect) * 100).toFixed(4);
    }
    // NOTE: reserve space in layout using padding
    return { [direction === 'vertical' ? 'paddingLeft' : 'paddingTop']: `${res}%` };
  }, [aspect, direction]);
  return <div { ...attr } style={box}>
    <div style={placeholder} />
    <div style={holder}> { children } </div>
  </div>;
});
BoxFixedAspect.propTypes = {
  direction: PropTypes.string,
  aspect: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
BoxFixedAspect.defaultProps = {
  direction: 'horizontal',
  aspect: 1,
};
