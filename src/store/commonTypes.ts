export interface Pagination {
  currentPage: number;
  perPage: number;
  totalCount: number;
  pageCount?: number;
}

export interface FetchListPayload {
  page: number;
  perPage: number;
}

export interface FetchListSuccessPayload<T> {
  items: T[];
  pagination: Pagination;
}