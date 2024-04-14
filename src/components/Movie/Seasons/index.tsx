import { findMovieSeasons } from '@src/lib/api/client';
import { Card, List } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';


const getSeasons = async (id: number) => {
  const response = await findMovieSeasons({
    movieId: [`${id}`],
  });

  const postersData = response.data;

  return postersData;
};
export function MovieSeasons({ id }: { id: number }) {
  const [data, setData] = useState<Awaited<ReturnType<typeof getSeasons>>>();
  useEffect(() => {
    getSeasons(id).then(setData);
  }, [id]);

  return (
    data && (
      <Card title={
        <Title level={2} >Сезоны</Title>
      }>
      <List
      itemLayout="vertical" 
      dataSource={data.docs.slice().reverse()}
      renderItem={({name, episodes}) => (
        <>
          {name && <List.Item>
            <Title level={3}>{name}</Title>
          </List.Item>}
          {episodes ? episodes.map(({number, name, enName, description}) => (
            <List.Item key={number} >
              <List.Item.Meta title={`Серия ${number}: ${name || enName || "Название не найдено"}`}
              description={description}/>
              
            </List.Item>
          )): "Эпизоды не найдены"}
        </>
      )}
      pagination={{
        pageSize: 1,
        hideOnSinglePage: true,
        align: "center"
      }}
    />
    </Card>
    )
  );
}
