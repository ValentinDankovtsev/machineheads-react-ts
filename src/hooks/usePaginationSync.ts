import { useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AnyAction } from 'redux';

interface PaginationParams {
  page: number;
  perPage: number;
}

export const usePaginationSync = (
  fetchAction: (params: PaginationParams) => AnyAction,
  defaultPerPage: number = 10
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const prevParamsRef = useRef<{ page: number; perPage: number } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let page = parseInt(params.get('page') || '0', 10);
    let perPage = parseInt(params.get('perPage') || '0', 10);

    let shouldUpdateUrl = false;

    if (!page) {
      page = 1;
      params.set('page', String(page));
      shouldUpdateUrl = true;
    }

    if (!perPage) {
      perPage = defaultPerPage;
      params.set('perPage', String(perPage));
      shouldUpdateUrl = true;
    }

    if (shouldUpdateUrl) {
      history.replace({ search: params.toString() });
      return;
    }

    // Skip if pagination params haven't changed
    if (
      prevParamsRef.current &&
      prevParamsRef.current.page === page &&
      prevParamsRef.current.perPage === perPage
    ) {
      return;
    }

    prevParamsRef.current = { page, perPage };
    dispatch(fetchAction({ page, perPage }));
  }, [dispatch, location.search, fetchAction, defaultPerPage, history]);

  const onPageChange = (page: number, pageSize?: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', String(page));
    if (pageSize) {
      params.set('perPage', String(pageSize));
    }
    history.push({ search: params.toString() });
  };

  return { onPageChange };
};