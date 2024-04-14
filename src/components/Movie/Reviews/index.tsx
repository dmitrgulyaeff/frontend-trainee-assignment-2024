import { findMovieReviews } from '@src/lib/api/client';
import { Prettify } from '@src/lib/utlis';
import { Card, List } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import {
  type FetchArgType,
  type FetchReturnType,
} from 'openapi-typescript-fetch';
import React, { useEffect, useState } from 'react';

type TSelectFields = FetchArgType<typeof findMovieReviews>['selectFields'];
const selectFields = [
  'author',
  'date',
  'review',
  'title',
] satisfies TSelectFields;

type TFindReviewsReturn = FetchReturnType<typeof findMovieReviews>;

type TReview = TFindReviewsReturn['docs'][number];
type TPickedReview = Prettify<Pick<TReview, (typeof selectFields)[number]>>;

type TReviewsData = Prettify<
  Omit<TFindReviewsReturn, 'docs'> & { docs: TPickedReview[] }
>;
const getReviews = async (id: number, page: number) => {
  const response = await findMovieReviews({
    movieId: [`${id}`],
    page,
    limit: 3,
    selectFields,
  });

  const reviewsData = response.data;

  return reviewsData as TReviewsData;
};
export function MovieReviews({ id }: { id: number }) {
  const [data, setData] = useState<TReviewsData>();
  const [page, setPage] = useState(1);
  useEffect(() => {
    getReviews(id, page).then(setData);
  }, [id, page]);

  return (
    <Card title={<Title level={2}>Отзывы</Title>}>
      {(data && data.docs.length)? (
        <List
          itemLayout='vertical'
          size='large'
          pagination={{
            showSizeChanger: false,
            onChange: (page) => {
              setPage(page);
            },
            pageSize: 3, // Примерная страница размером 5 элементов
            total: data.total,
            align: 'center'
          }}
          dataSource={data.docs}
          renderItem={({ title, author, date, review }) => (
            <Card key={title} title={title}>
              <p>
                <b>Автор:</b> {author}
              </p>
              {date && (
                <p>
                  <b>Дата публикации:</b> {new Date(date).toLocaleString()}
                </p>
              )}
              <Paragraph ellipsis={{ expandable: true, rows: 1 }}>
                {review}
              </Paragraph>
            </Card>
          )}
        />
      ) : (
        'нет информации об отзывах'
      )}
    </Card>
  );
}
