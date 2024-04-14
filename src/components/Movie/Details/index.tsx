import { Card, Col, Descriptions, Divider, Image, Rate, Row } from 'antd';
import React from 'react';
import { TMovieLoaderData } from '../loader';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';


const movieType: Record<string, string> = {
  movie: 'фильм',
  'tv-series': 'сериал',
  'cartoon ': 'мультик',
  anime: 'аниме',
  'animated-series ': 'мультсериал',
  'tv-show': 'ТВ-шоу',
};

export const MovieDetails = ({
  movie,
}: {
  movie: TMovieLoaderData['movie'];
}) => {
  const imageSrc =
    movie.poster?.previewUrl ||
    movie.poster?.url ||
    `https://st.kp.yandex.net/images/film_iphone/iphone360_${movie.id}.jpg`;
  const {
    name,
    description,
    type,
    rating,
    slogan,
    premiere,
    countries,
    genres,
  } = movie;

  return (
    <Card title={<Title level={2}>О фильме</Title>}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={8}>
          <Image
            src={imageSrc}
            alt={`${name}-poster`}
            style={{ borderRadius: '8px' }}
          />
        </Col>
        <Col xs={24} sm={24} md={16}>
          {name && <Title style={{ paddingInlineStart: 20 }}>{name}</Title>}
          <Descriptions layout='horizontal' bordered column={1}>
            {type && (
              <Descriptions.Item label='Тип'>{`${
                movieType[type] || type
              }`}</Descriptions.Item>
            )}
            {slogan && (
              <Descriptions.Item label='Слоган'>{slogan}</Descriptions.Item>
            )}
            {premiere?.world && (
              <Descriptions.Item label='Премьера в мире'>
                {new Date(premiere.world).getFullYear()} г.
              </Descriptions.Item>
            )}
            {premiere?.russia && (
              <Descriptions.Item label='Премьера в России'>
                {new Date(premiere.russia).getFullYear()} г.
              </Descriptions.Item>
            )}
            {countries && (
              <Descriptions.Item label='Страны'>
                {countries.map((c) => c.name).join(', ')}
              </Descriptions.Item>
            )}
            {genres && (
              <Descriptions.Item label='Жанры'>
                {genres.map((g) => g.name).join(', ')}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>
        <Divider />
      </Row>
      <Text>{description}</Text>
      <Title level={2}>Рейтинг</Title>
      {rating && (
        <div style={{ display: 'grid' }}>
          {(rating.kp || rating.kp === 0) && (
            <>
              <Title level={3}>КиноПоиск: {rating.kp.toFixed(1)}</Title>
              <Rate allowHalf disabled defaultValue={rating.kp} count={10} />
            </>
          )}
          {(rating.imdb || rating.imdb === 0) && (
            <>
              <Title level={3}>IMDB: {rating.imdb.toFixed(1)}</Title>
              <Rate allowHalf disabled defaultValue={rating.imdb} count={10} />
            </>
          )}
        </div>
      )}
    </Card>
  );
};
