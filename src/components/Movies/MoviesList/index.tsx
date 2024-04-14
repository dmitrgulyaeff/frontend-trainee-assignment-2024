import { MovieCard } from '@src/components/MovieCard';
import { List } from 'antd';
import React from 'react';
import { TMovie } from '..';

export function MoviesList({ docs }: { docs: TMovie[] }) {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 5,
      }}
      dataSource={docs}
      renderItem={(movie) => {
        return (
          <List.Item key={movie.id}>
            <MovieCard movie={movie} />
          </List.Item>
        );
      }}
    />
  );
}
