import type { AxiosResponse } from 'axios';
import type { Pagination } from '../store/commonTypes';

export const extractPaginationFromHeaders = (headers: AxiosResponse['headers']): Pagination => {
  return {
    currentPage: parseInt(headers['x-pagination-current-page'] || '1', 10),
    pageCount: parseInt(headers['x-pagination-page-count'] || '1', 10),
    perPage: parseInt(headers['x-pagination-per-page'] || '10', 10),
    totalCount: parseInt(headers['x-pagination-total-count'] || '0', 10),
  };
};