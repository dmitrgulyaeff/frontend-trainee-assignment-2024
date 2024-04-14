import { countryNames, movieGenres } from '@src/constants';
import { findRandomMovie } from '@src/lib/api/client';
import { Button, Form, notification, Select, Slider, Switch } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type TFilterIValues = {
  year: [number, number];
  ageRating: [number, number];
  'rating.kp': [number, number];
  'countries.name': string[];
  isSeries: boolean;
  'genres.name': string[];
};

const initialValues: TFilterIValues = {
  'rating.kp': [0, 10],
  year: [1920, 2024],
  ageRating: [0, 18],
  'countries.name': [],
  isSeries: false,
  'genres.name': [],
};

export function RandomMovieSearch() {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: `Ничего не найдено`,
      description: 'Попробуйте изменить параметры поиска',
      placement: 'bottomRight',
    });
  };

  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: TFilterIValues) => {
    setLoading(true);
    const { year, ageRating, 'rating.kp': ratingKp, isSeries } = values;
    const searchFilter = {
      ...values,
      year: [`${year[0]}-${year[1]}`],
      ageRating: [`${ageRating[0]}-${ageRating[1]}`],
      'rating.kp': [`${ratingKp[0]}-${ratingKp[1]}`],
      isSeries: [String(isSeries)],
    };
    localStorage.setItem('randomFilterState', JSON.stringify(values));
    const response = await findRandomMovie({
      ...searchFilter,
    });
    if (response.data?.id)
      navigation(`/movies/${response.data.id}`, { preventScrollReset: true });
    else {
      openNotification();
      setLoading(false)
    }
  };

  return (
    <>
      {contextHolder}
      <Title level={2} style={{ paddingBlockEnd: 20, textAlign: 'center' }}>
        Свободный вечер? Подбери фильм!
      </Title>

      <Form
        method='get'
        initialValues={JSON.parse(
          localStorage.getItem('randomFilterState') ||
            JSON.stringify(initialValues),
        )}
        onFinish={onFinish}
        disabled={loading}
      >
        <Form.Item name='year' label={`Год выпуска:`}>
          <Slider
            range
            min={1920}
            max={2024}
            marks={{
              1920: '1920',
              1940: '1940',
              1960: '1960',
              1980: '1980',
              2000: '2000',
              2024: '2024',
            }}
            tooltip={{
              formatter: (value) => `${value} г.`,
              open: true,
              placement: 'top',
            }}
          />
        </Form.Item>
        <Form.Item name='ageRating' label='Возрастной рейтинг'>
          <Slider
            range
            min={0}
            max={18}
            marks={{
              '0': '0',
              '6': '6',
              '12': '12',
              '18': '18',
            }}
            tooltip={{ open: true, placement: 'top' }}
          />
        </Form.Item>
        <Form.Item name='rating.kp' label='Рейтинг в КиноПоиске'>
          <Slider
            id='rating.kp'
            range
            min={0}
            max={10}
            marks={{
              '0': '0',
              '1': '1',
              '2': '2',
              '3': '3',
              '4': '4',
              '5': '5',
              '6': '6',
              '7': '7',
              '8': '8',
              '9': '9',
              '10': '10',
            }}
            tooltip={{ open: true, placement: 'top' }}
          />
        </Form.Item>
        <Form.Item name='countries.name' label='Страны'>
          <Select mode='multiple' placeholder='Выберите страны'>
            {countryNames.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='networks.items.name' label='Cети производства'>
          <Select mode='multiple' placeholder='Выберите сети'>
            {['HBO', 'Netflix', 'Amazon'].map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='genres.name' label='Жанры'>
          <Select mode='multiple' placeholder='Выберите жанры'>
            {movieGenres.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='isSeries' label='Сериал?'>
          <Switch />
        </Form.Item>
        <Button type='primary' htmlType='submit' loading={loading}>
          Случайный фильм
        </Button>
      </Form>
    </>
  );
}
