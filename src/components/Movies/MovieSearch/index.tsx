import React, { useState } from 'react';
import { AutoComplete, Image, Input, List } from 'antd';
import { searchMovies } from '@src/lib/api/client';
import type { FetchReturnType } from 'openapi-typescript-fetch';
import { CloseSquareFilled, SearchOutlined } from '@ant-design/icons';
import debounce from 'debounce';
import { Link } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { getRatingColor } from '@src/lib/utlis';

type Movies = FetchReturnType<typeof searchMovies>['docs'];

const MovieSearch = () => {
  const [options, setOptions] = useState<Movies>([]);

  const handleSearch = async (value: string) => {
    if (value) {
      const response = await searchMovies({
        query: value,
      });
      setOptions(response.data.docs);
    } else {
      setOptions([]);
    }
  };

  const renderOptions = () => {
    return options.map((movie) => {
      const imageSrc =
        movie.poster?.previewUrl ||
        movie.poster?.url ||
        `https://st.kp.yandex.net/images/film_iphone/iphone360_${movie.id}.jpg`;
      const description = [movie.alternativeName, movie.year].filter(Boolean);

      return {
        label: (
          <List.Item key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <List.Item.Meta
                style={{ display: 'flex', gap: 20 }}
                avatar={
                  <Image
                    preview={false}
                    style={{ width: 70 }}
                    src={imageSrc}
                    fallback={`https://st.kp.yandex.net/images/film_iphone/iphone360_${movie.id}.jpg`}
                  />
                }
                title={movie.name}
                description={
                  <div>
                    {!!movie.rating?.kp && (
                      <span
                        style={{
                          marginInlineEnd: 4,
                          color: getRatingColor(movie.rating.kp),
                          fontWeight: 'bold',
                        }}
                      >
                        {movie.rating.kp.toFixed(1)}
                      </span>
                    )}
                    {description.length && (
                      <span>{`${description.join(', ')}`}</span>
                    )}
                  </div>
                }
              />
            </Link>
          </List.Item>
        ),
      };
    });
  };

  return (
    <div
      style={{
        boxSizing: "border-box",
        width: '100%',
        height: 'auto',
        display: 'grid',
        placeItems: 'center',
        paddingBlockEnd: 150
      }}
    >
      <Title level={2}>Поиск по названию</Title>
      <AutoComplete
        options={renderOptions()}
        onSearch={debounce(handleSearch, 1000)}
        style={{
          minWidth: 320,
          maxWidth: 400,
          width: "100%"
        }}
      >
        <Input
          suffix={<SearchOutlined />}
          placeholder='Фильмы, сериалы...'
          allowClear={{ clearIcon: <CloseSquareFilled /> }}
        />
      </AutoComplete>
    </div>
  );
};

export default MovieSearch;
