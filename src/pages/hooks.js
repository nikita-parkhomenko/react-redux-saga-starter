
// outsource dependencies
import _ from 'lodash';
import { useMemo } from 'react';
import { useControllerData } from 'redux-saga-controller';

// local dependencies
import { appRootCtrl } from './controller';

/**
 * logged user or null is user is unauthorized
 */
export const useSelf = () => {
  const { user } = useControllerData(appRootCtrl);
  return user;
};
export const useSelfId = () => _.get(useControllerData(appRootCtrl), 'user.userId');

/**
 * common detection of authorization
 */
export const useIsAuthorized = () => {
  const selfId = useSelfId();
  return useMemo(() => Boolean(selfId), [selfId]);
};
