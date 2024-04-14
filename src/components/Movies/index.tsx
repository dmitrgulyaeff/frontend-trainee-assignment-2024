import { isAgeRating, isCountry, isYear } from '@src/constants';
import { findMovie } from '@src/lib/api/client';
import type { Prettify } from '@src/lib/utlis';
import type { FetchArgType } from 'openapi-typescript-fetch';
import React from 'react';
import {
  type LoaderFunctionArgs,
  useLoaderData
} from 'react-router-dom';
import { MoviesFilter, type TFilterIValues } from './Filter';
import MovieSearch from './MovieSearch';
import { MoviesList } from './MoviesList';
import { MoviesPagination } from './Pagination';

type TSelectFields = FetchArgType<typeof findMovie>['selectFields'];

type TFilter = {
  year?: string[];
  'countries.name'?: string[];
  ageRating?: string[];
};

export const moviesLoader = async ({ request }: LoaderFunctionArgs) => {
  const params = new URL(request.url).searchParams;

  const filterState: TFilter = {};

  const year =
    params.getAll('year').find(isYear) || `1920-${new Date().getFullYear()}`;
  if (year) filterState['year'] = [year];

  const ageRating = params.getAll('ageRating').find(isAgeRating) || '0-18';

  if (ageRating) {
    // баг в API
    if (ageRating === '0-0') {
      filterState['ageRating'] = ['0'];
    } else {
      filterState['ageRating'] = [ageRating];
    }
  }

  const isStrictCountrySearch =
    params.get('isStrictCountrySearch') === 'true' ?? false;

  const includeCountries = params.getAll('includeCountries').filter(isCountry);
  const excludeCountries = params.getAll('excludeCountries').filter(isCountry);

  const countries = (
    isStrictCountrySearch || includeCountries.length === 1
      ? includeCountries.map((country) => `+${country}`)
      : includeCountries
  ).concat(excludeCountries.map((country) => `!${country}`));

  if (countries.length) filterState['countries.name'] = countries;

  const selectFields = [
    'year',
    'id',
    'name',
    'poster',
    'ageRating',
    'shortDescription',
    'countries',
  ] satisfies TSelectFields;

  const stringIsNumber = (str: string | null) => str && /\d+/.test(str);
  const page = stringIsNumber(params.get('page'))
    ? Number(params.get('page'))
    : 1;
  const limit = stringIsNumber(params.get('limit'))
    ? Number(params.get('limit'))
    : 10;

  const response = await findMovie({
    selectFields,
    page,
    limit,
    ...filterState,
  });

  const moviesData = response.data;

  type Movie = (typeof moviesData.docs)[number];
  type PickedMovie = Prettify<Pick<Movie, (typeof selectFields)[number]>>;
  type MoviesData = Prettify<
    Omit<typeof moviesData, 'docs'> & { docs: PickedMovie[] }
  >;

  const initialValues: TFilterIValues = {
    isStrictCountrySearch,
    includeCountries,
    excludeCountries,
    ageRating: ageRating.split('-').map(Number) as [number, number],
    year: year.split('-').map(Number) as [number, number],
  };

  return { moviesData, initialValues } as {
    moviesData: MoviesData;
    initialValues: typeof initialValues;
  };
};

export type TMovie = Awaited<ReturnType<typeof moviesLoader>>["moviesData"]["docs"][number]
export function Movies() {
  const {
    moviesData: { docs, page, limit,  total },
    initialValues,
  } = useLoaderData() as Awaited<ReturnType<typeof moviesLoader>>;

  return (
    <>
      <MoviesFilter initialValues={initialValues} />
      <MovieSearch />
      <MoviesList docs={docs}/>
      <MoviesPagination limit={limit} page={page} total={total} />
    </>
  );
}
