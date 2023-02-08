
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo, useState, useCallback, useMemo } from 'react';

// local dependencies
import appLogo from './app-logo.svg';
import defImg from './def-image.svg';
import defAvatar from './def-avatar.svg';

import { config } from '../../constants';
import { isS3RelativePath } from '../../services';

// eslint-disable-next-line max-len
export const DefImage = memo(function DefImage ({ src, defaultSrc, alt, defaultAlt, title, defaultTitle, defaultStyle, style, className, defaultClassName, ...attr }) {
  const validSrc = useMemo(() => {
    if (isS3RelativePath(src)) return `${config('CLOUD_AWS_BUCKET', '')}${src}`;
    return src;
  }, [src]);

  const [isError, setIsError] = useState(false);
  const handleOnError = useCallback(() => setIsError(true), []);

  return <img
    onError={handleOnError}
    alt={alt || defaultAlt}
    title={title || defaultTitle}
    className={cn(defaultClassName, className)}
    style={Object.assign({}, defaultStyle, style)}
    src={isError ? defaultSrc : (validSrc || defaultSrc)}
    {...attr}
  />;
});

DefImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  defaultSrc: PropTypes.string,
  defaultAlt: PropTypes.string,
  defaultTitle: PropTypes.string,
  defaultStyle: PropTypes.object,
  defaultClassName: PropTypes.string,
};
DefImage.defaultProps = {
  src: null,
  alt: null,
  title: null,
  style: {},
  className: null,
  defaultTitle: '',
  defaultStyle: {},
  defaultSrc: defImg,
  defaultAlt: 'image',
  defaultClassName: 'img-fluid',
};

export const Avatar = memo(function Avatar (props) {
  return <DefImage
    defaultAlt="User"
    defaultTitle="User"
    defaultSrc={defAvatar}
    defaultClassName="avatar img-fluid rounded-circle"
    {...props}
  />;
});

export const AppLogo = memo(function AppLogo (props) {
  return <DefImage
    defaultSrc={appLogo}
    defaultAlt="App Logo"
    defaultTitle="App Logo"
    defaultClassName="logo"
    { ...props }
  />;
});
