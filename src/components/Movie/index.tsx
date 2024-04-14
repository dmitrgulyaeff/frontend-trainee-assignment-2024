import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, Layout } from 'antd';
import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { MovieDetails } from './Details';
import { MoviePersons } from './Persons';
import { MoviePosters } from './Posters';
import { MovieReviews } from './Reviews';
import { MovieSeasons } from './Seasons';
import { SimilarMovies } from './SimilisMovies';
import { TMovieLoaderData } from './loader';
import './styles.scss';

export const MoviePage = () => {
  const { id, movie } = useLoaderData() as TMovieLoaderData;
  const navigate = useNavigate();

  return (
    <Layout style={{borderRadius: 10}}>
      <Layout.Content style={{ padding: '20px' }}>
        <Button
          type='link'
          icon={<LeftOutlined />}
          onClick={() => {navigate(-1);}}
        >
          Назад
        </Button>
        <Divider />
        <MovieDetails movie={movie} />
        <Divider />
        <MoviePosters id={id} />
        <Divider />
        <MoviePersons id={id} />
        {movie.isSeries && (
          <>
            <Divider />
            <MovieSeasons id={id} />
          </>
        )}
        <Divider />
        <MovieReviews id={id} />
        <Divider />
        <SimilarMovies similarMovies={movie.similarMovies} />
      </Layout.Content>
    </Layout>
  );
};
