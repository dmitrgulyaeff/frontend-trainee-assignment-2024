import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import { findMoviePosters } from '@src/lib/api/client';
import { Prettify } from '@src/lib/utlis';
import { Card, Carousel, Image } from 'antd';
import Title from 'antd/es/typography/Title';
import {
  type FetchArgType,
  type FetchReturnType,
} from 'openapi-typescript-fetch';
import React, { useEffect, useState } from 'react';

type TSelectFields = FetchArgType<typeof findMoviePosters>['selectFields'];
const selectFields = ['previewUrl', 'height', 'width'] satisfies TSelectFields;

type TFindPostersReturn = FetchReturnType<typeof findMoviePosters>;

type TPoster = TFindPostersReturn['docs'][number];
type TPickedPoster = Prettify<Pick<TPoster, (typeof selectFields)[number]>>;

type TPostersData = Prettify<
  Omit<TFindPostersReturn, 'docs'> & { docs: TPickedPoster[] }
>;

const getPosters = async (id: number) => {
  const response = await findMoviePosters({
    movieId: [`${id}`],
    type: ['cover'],
    selectFields,
  });

  const postersData = response.data;

  return postersData as TPostersData;
};
export function MoviePosters({ id }: { id: number }) {
  const [data, setData] = useState<TPostersData>();
  useEffect(() => {
    getPosters(id).then(setData);
  }, [id]);

  return (
    (
      <Card title={<Title level={2}>Постеры</Title>}>
        {(data && data.docs.length) ? <Carousel
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
          {data.docs.map(({ previewUrl }) => (
            <div key={previewUrl} style={{ textAlign: 'center' }}>
              <Image
                src={previewUrl}
                alt={`Постер ${id + 1}`}
                style={{
                  maxBlockSize: '400px',
                  objectFit: 'contain',
                  margin: '0 auto',
                }}
              />
            </div>
          ))}
        </Carousel> : "нет информации о постерах"}
      </Card>
    )
  );
}
