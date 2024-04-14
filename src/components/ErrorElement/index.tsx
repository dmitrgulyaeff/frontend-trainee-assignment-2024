import { Button } from 'antd';
import Result from 'antd/es/result';
import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

export function ErrorElement() {
  const error = useRouteError();
  if (error instanceof Error) {
    return (
      <Result
        status={500}
        subTitle={'Непредвиденная ошибка'}
        extra={
          <Button type='primary'>
            <Link to='/'>На главную</Link>
          </Button>
        }
      />
    );
  }

  return (
    <Result
      status={404}
      title={404}
      subTitle={'Страница не найдена'}
      extra={
        <Button type='primary'>
          <Link to='/'>На главную</Link>
        </Button>
      }
    />
  );
}
