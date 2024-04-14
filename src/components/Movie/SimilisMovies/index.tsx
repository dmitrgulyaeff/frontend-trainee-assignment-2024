import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import { Card, Carousel } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { TMovieLoaderData } from '../loader';
import { MovieCard } from '@src/components/MovieCard';

type SimilarMovies = TMovieLoaderData['movie']['similarMovies'];
export function SimilarMovies({
  similarMovies,
}: {
  similarMovies: SimilarMovies;
}) {
  return (
     (
      <Card title={<Title level={2}>Похожие фильмы</Title>}>
        {(similarMovies?.length) ?  <Carousel
          slidesToShow={4}
          autoplay
          infinite
          arrows
          nextArrow={<RightCircleFilled />}
          prevArrow={<LeftCircleFilled />}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 400,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {similarMovies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={{
                  ...movie,
                  poster: {
                    url: movie.poster?.url || '',
                    previewUrl: movie.poster?.previewUrl || '',
                  },
                }}
              />
            );
          })}
        </Carousel> : "нет информации о похожих фильмах"}
      </Card>
    )
  );
}
