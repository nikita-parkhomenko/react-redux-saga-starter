
// outsource dependencies
import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

// local dependencies
import { Home } from './home';
import { Layout } from './layout';
import { NotFound } from '../components';
import { StudentProfile } from './profile';

export const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="student-profile/:id" element={<StudentProfile />} />
    {/* direct 404 */}
    <Route path="/not-found" element={<NotFound />} />
    {/* as 404 */}
    <Route path="*" element={<NotFound />} />
  </Route>
));
