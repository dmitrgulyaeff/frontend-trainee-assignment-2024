import { Card, Image } from 'antd';
import { TMovie } from '../Movies';
import React from 'react';
import { Link } from 'react-router-dom';

type TMovieCard = Pick<
  TMovie,
  | 'name'
  | 'poster'
  | 'id'
  | 'shortDescription'
  | 'year'
  | 'ageRating'
  | 'countries'
>;

export function MovieCard({ movie }: { movie: TMovieCard }) {
  const { name, poster, id, shortDescription, year, ageRating, countries } =
    movie;

  const imageSrc =
    poster?.previewUrl ||
    poster?.url ||
    `https://st.kp.yandex.net/images/film_iphone/iphone360_${id}.jpg`;

  return (
    <Link to={`/movies/${id}`}>
      <Card
        key={id}
        hoverable
        cover={
          <Image
            preview={false}
            alt={`poster ${name}`}
            src={imageSrc}
            fallback={`https://st.kp.yandex.net/images/film_iphone/iphone360_${id}.jpg`}
          />
        }
      >
        {name && <Card.Meta title={name} />}
        {shortDescription && <Card.Meta description={shortDescription} />}
        {year && <div>Год: {year}</div>}
        {(ageRating || ageRating === 0) && (
          <div>Возрастной рейтинг: {ageRating}+</div>
        )}
        {countries && (
          <div>
            Страна: {countries.map((country) => country.name).join(', ')}
          </div>
        )}
      </Card>
    </Link>
  );
}
