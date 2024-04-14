import { Fetcher } from 'openapi-typescript-fetch';

import { paths } from './schemaApi';

if (!process.env['TOKEN']) throw 'TOKEN undefined';

// declare fetcher for paths
const fetcher = Fetcher.for<paths>();

// global configuration
fetcher.configure({
  baseUrl: 'https://api.kinopoisk.dev',
  init: {
    headers: {
      'X-API-KEY': process.env['TOKEN'],
    },
  },
});

// create fetch operations
export const findMovie = fetcher.path('/v1.4/movie').method('get').create();

// random
export const findRandomMovie = fetcher
  .path('/v1.4/movie/random')
  .method('get')
  .create();

// movie/{id}
export const findMovieById = fetcher
  .path('/v1.4/movie/{id}')
  .method('get')
  .create();

export const findMovieSeasons = fetcher
  .path('/v1.4/season')
  .method('get')
  .create();

export const findMovieReviews = fetcher
  .path('/v1.4/review')
  .method('get')
  .create();

export const findMoviePosters = fetcher
  .path('/v1.4/image')
  .method('get')
  .create();
export const findMoviePersons = fetcher
  .path('/v1.4/person')
  .method('get')
  .create();

export const getPossibleField = fetcher
  .path('/v1/movie/possible-values-by-field')
  .method('get')
  .create();

export const searchMovies = fetcher
  .path('/v1.4/movie/search')
  .method('get')
  .create();
