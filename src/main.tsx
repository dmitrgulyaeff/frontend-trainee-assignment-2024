import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { MoviePage } from './components/Movie';
import { movieLoader } from './components/Movie/loader';
import { Movies, moviesLoader } from './components/Movies';
import { RandomMovieSearch } from './components/Random';
import { RequireAuth } from './components/RequireAuth';
import { RequireNoAuth } from './components/RequireNoAuth';
import './styles.scss';
import { ErrorElement } from './components/ErrorElement';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Movies />,
        loader: moviesLoader,
      },
      {
        path: 'movies/:movieId',
        element: <MoviePage />,
        loader: movieLoader,
      },
      {
        path: '/random',
        element: (
          <RequireAuth>
            <RandomMovieSearch />
          </RequireAuth>
        ),
      },
      {
        path: '/login',
        element: (
          <RequireNoAuth>
            <Login />
          </RequireNoAuth>
        ),
      },
    ],
  },
]);

const app = <RouterProvider router={router} />;

const rootElement = document.getElementById('app');
if (rootElement) {
  createRoot(rootElement).render(app);
} else {
  throw 'rootElement undefined';
}
