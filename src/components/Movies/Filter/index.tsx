import { InfoCircleOutlined } from '@ant-design/icons';
import { countryNames } from '@src/constants';
import { Button, Form, Popover, Select, Slider, Switch } from 'antd';
import Title from 'antd/es/typography/Title';
import equal from 'deep-equal';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';


export type TFilterIValues = {
  year: [number, number];
  ageRating: [number, number];
  includeCountries: string[];
  excludeCountries: string[];
  isStrictCountrySearch: boolean;
};

const createQueryFilter = ({
  searchParams,
  values: {
    year,
    includeCountries,
    excludeCountries,
    ageRating,
    isStrictCountrySearch,
  },
}: {
  searchParams: URLSearchParams;
  values: TFilterIValues;
}) => {
  // Создаём копию текущих searchParams, чтобы сохранить параметры, которые не меняются (page и limit)
  const params = new URLSearchParams(searchParams);

  params.delete('page');

  params.set('year', `${year[0]}-${year[1]}`);

  params.set('ageRating', `${ageRating[0]}-${ageRating[1]}`);

  // Удаляем предыдущие значения для includeCountries и excludeCountries, перед добавлением новых
  params.delete('includeCountries');
  includeCountries.forEach((country) => {
    params.append('includeCountries', country);
  });

  params.delete('excludeCountries');
  excludeCountries.forEach((country) => {
    params.append('excludeCountries', country);
  });

  params.set('isStrictCountrySearch', String(isStrictCountrySearch));

  // Возвращаем обновлённые параметры, уже с сохранёнными page и limit
  return params;
};

const PopoverContent = (
  <div>
    <p>
      Включите этот параметр для строгого поиска, когда необходимо, чтобы все
      выбранные страны были включены в результаты.
    </p>
    <p>
      Выключите для обычного поиска, когда достаточно, чтобы результаты
      соответствовали любой из выбранных стран.
    </p>
  </div>
);

const InfoIcon = (
  <Popover content={PopoverContent} title='Что делает этот переключатель?'>
    <InfoCircleOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
  </Popover>
);

export function MoviesFilter({
  initialValues,
}: {
  initialValues: TFilterIValues;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [includedOptions, setIncludedOptions] = useState<string[]>(
    initialValues.includeCountries,
  );
  const [excludedOptions, setExcludedOptions] = useState<string[]>(
    initialValues.excludeCountries,
  );

  const onFinish = (values: TFilterIValues) => {
    if (equal(initialValues, values)) return
    setSearchParams(createQueryFilter({ searchParams, values }));
  };

  return (
    <>
    <Title level={2} style={{paddingBlockEnd: 20, textAlign: 'center'}}>Навигатор по лучшим фильмам</Title>
    
    <Form method='get' initialValues={initialValues} onFinish={onFinish} 
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
          tooltip={{ formatter: (value) => `${value} г.`, open: true, placement: "top"  }}
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
          tooltip={{ open: true, placement: "top" }}
        />
      </Form.Item>
      <Form.Item name='includeCountries' label='Включить страны'>
        <Select
          mode='multiple'
          placeholder='Выберите страны'
          value={includedOptions}
          onChange={setIncludedOptions}
        >
          {countryNames.map((option) => (
            <Select.Option
              key={option}
              value={option}
              disabled={excludedOptions.includes(option)}
            >
              {option}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name='excludeCountries' label='Исключить страны'>
        <Select
          mode='multiple'
          placeholder='Выберите страны'
          value={excludedOptions}
          onChange={setExcludedOptions}
        >
          {countryNames.map((option) => (
            <Select.Option
              key={option}
              value={option}
              disabled={includedOptions.includes(option)}
            >
              {option}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='isStrictCountrySearch'
        label={<span>Строгий поиск стран {InfoIcon}</span>}
      >
        <Switch />
      </Form.Item>
        <Button type='primary' htmlType='submit'>
          Искать
        </Button>
    </Form>
    </>
  );
}
