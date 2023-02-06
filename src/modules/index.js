
// outsource dependencies
import ReduxToastr from 'react-redux-toastr';
import React, { memo, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useController } from 'redux-saga-controller';

// local dependencies
import { router } from './router';
import { appRootCtrl } from './controller';
import { Preloader, Maintenance } from '../components';

export const AppRoot = memo(function AppRoot () {
  // NOTE: subscribe app controller
  const [{ initialized, health }, { initialize }] = useController(appRootCtrl);

  // NOTE: subscribe globally

  // NOTE: initialize business logic
  useEffect(() => { initialize({}); }, [initialize]);

  // NOTE select view based on application state
  if (!health) { return <Maintenance />; }
  if (!initialized) { return <Preloader active />; }

  return <>
    <RouterProvider router={router} />
    <ReduxToastr
      progressBar
      timeOut={2000}
      preventDuplicates
      newestOnTop={false}
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
  </>;
});
