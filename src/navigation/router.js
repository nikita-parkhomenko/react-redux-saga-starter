
// outsource dependencies
import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

// local dependencies
import * as ROUTE from './constants';
import { Layout } from '../pages/layout';
import { NotFound } from '../components';
import { SignIn } from '../pages/sign-in';
import { SignUp } from '../pages/sign-up';
import { LandingPage } from '../pages/home';
import { Messages } from '../pages/messages';
import { Calendar } from '../pages/calendar';
import { Tutorial } from '../pages/tutorial';
import { PrivateRoute } from './private-route';
import { Bookmarks } from '../pages/bookmarks';
import { Dashboard } from '../pages/dashboard';
import { FindMentor } from '../pages/find-mentor';
import { StudentProfile } from '../pages/student-profile';
import { AccountSettings } from '../pages/account-settings';
import { LearningMaterial } from '../pages/learning-material';

export const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route element={<Layout />}>
      <Route path={ROUTE.MESSAGES} element={<PrivateRoute><Messages /></PrivateRoute>} />
      <Route path={ROUTE.CALENDAR} element={<PrivateRoute><Calendar /></PrivateRoute>} />
      <Route path={ROUTE.TUTORIAL} element={<PrivateRoute><Tutorial /></PrivateRoute>} />
      <Route path={ROUTE.BOOKMARKS} element={<PrivateRoute><Bookmarks /></PrivateRoute>} />
      <Route path={ROUTE.DASHBOARD} element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path={ROUTE.FIND_MENTOR} element={<PrivateRoute><FindMentor /></PrivateRoute>} />
      <Route path={ROUTE.STUDENT_PROFILE} element={<PrivateRoute><StudentProfile /></PrivateRoute>} />
      <Route path={ROUTE.ACCOUNT_SETTINGS} element={<PrivateRoute><AccountSettings /></PrivateRoute>} />
      <Route path={ROUTE.LEARNING_MATERIAL} element={<PrivateRoute><LearningMaterial /></PrivateRoute>} />
    </Route>
    <Route path={ROUTE.SIGN_IN} element={<SignIn />} />
    <Route path={ROUTE.SIGN_UP} element={<SignUp />} />
    <Route path={ROUTE.HOME} element={<LandingPage />} />
    {/* direct 404 */}
    <Route path={ROUTE.NOT_FOUND} element={<NotFound />} />
    {/* as 404 */}
    <Route path="/*" element={<NotFound />} />
  </>
));
