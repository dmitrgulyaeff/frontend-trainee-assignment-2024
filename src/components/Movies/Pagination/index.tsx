import { Pagination } from 'antd';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

type TMoviesPagination = {
  page: number;
  limit: number;
  total: number;
};

export function MoviesPagination({ page, limit, total }: TMoviesPagination) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage: number, newPageSize: number) => {
    if (newPageSize !== limit) return;
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  const handleSizeChange = (_: number, size: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('limit', size.toString());
    setSearchParams(params);
  };

  return (
    <Pagination
      current={page}
      pageSize={limit}
      total={total}
      onChange={handlePageChange}
      onShowSizeChange={handleSizeChange}
      showSizeChanger
    />
  );
}
