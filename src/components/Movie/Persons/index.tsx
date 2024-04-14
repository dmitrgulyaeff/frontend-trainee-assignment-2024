import { findMoviePersons } from '@src/lib/api/client';
import { Prettify } from '@src/lib/utlis';
import { Avatar, Card, List } from 'antd';
import Title from 'antd/es/typography/Title';
import {
  type FetchArgType,
  type FetchReturnType,
} from 'openapi-typescript-fetch';
import React, { useEffect, useState } from 'react';

type TSelectFields = FetchArgType<typeof findMoviePersons>['selectFields'];
const selectFields = ['age', 'id', 'photo', 'name'] satisfies TSelectFields;

type TFindPersonsReturn = FetchReturnType<typeof findMoviePersons>;

type TPersonsData = Prettify<
  Omit<TFindPersonsReturn, 'docs'> & {
    docs: {
      id: number;
      name: string;
      photo: string;
      age: number;
    }[];
  }
>;

const getPersons = async (id: number, page: number) => {
  const response = await findMoviePersons({
    'movies.id': [`${id}`],
    selectFields,
    page,
    notNullFields: selectFields,
  });

  const postersData = response.data;

  return postersData as TPersonsData;
};

export function MoviePersons({ id }: { id: number }) {
  const [data, setData] = useState<TPersonsData>();
  const [page, setPage] = useState(1);
  useEffect(() => {
    getPersons(id, page).then(setData);
  }, [id, page]);

  return (
    (
      <Card title={
        <Title level={2}>Актёры</Title>
      }>
        {data ? <List
          dataSource={data.docs}
          renderItem={({ id, photo, name }) => (
            <List.Item key={id}>
              <List.Item.Meta
                title={name}
                avatar={<Avatar alt={name} src={photo} />}
              />
            </List.Item>
          )}
          pagination={{
            showSizeChanger: false,
            total: data.total,
            hideOnSinglePage: true,
            align: 'center',
            onChange: (page) => setPage(page),
          }}
        /> : "нет информации об актёрах"}
      </Card>
    )
  );
}
