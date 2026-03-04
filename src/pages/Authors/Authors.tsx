import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { getAuthorsModule } from '../../store/authors/module';
import { Table, Alert, Typography, Button, Avatar, Space, Popconfirm } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import { PlusOutlined, UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { fetchAuthorsRequest, deleteAuthorRequest } from '../../store/authors/actions';
import type { AuthorsState, Author } from '../../store/authors/types';
import { usePaginationSync } from '../../hooks/usePaginationSync';
import { RouteModal } from '../../components/RouteModal/RouteModal';
import { AuthorForm } from './components/AuthorForm';
import './authors.css';

const { Title } = Typography;

const Authors: React.FC = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const authorsState = useSelector((state: { authors: AuthorsState }) => state.authors);
  const { authors, loading, error, validationErrors, pagination } = authorsState || {
    authors: [],
    loading: false,
    error: null,
    validationErrors: null,
    pagination: { currentPage: 1, pageCount: 1, perPage: 10, totalCount: 0 },
  };

  const { onPageChange } = usePaginationSync(fetchAuthorsRequest);

  const handleDelete = (id: number) => {
    dispatch(deleteAuthorRequest({ id }));
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current) {
      onPageChange(pagination.current, pagination.pageSize);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Аватар',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: Author['avatar']) => (
        <Avatar src={avatar?.url} icon={<UserOutlined />} />
      ),
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Создан',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: unknown, record: Author) => (
        <Space size="middle">
          <Link to={{ pathname: `${url}/${record.id}/edit`, search: location.search }}>
            <Button icon={<EditOutlined />} type="link">
              Редактировать
            </Button>
          </Link>
          <Popconfirm
            title="Вы уверены, что хотите удалить этого автора?"
            onConfirm={() => handleDelete(record.id)}
            okText="Да"
            cancelText="Нет"
          >
            <Button icon={<DeleteOutlined />} type="link" danger>
              Удалить
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <DynamicModuleLoader modules={[getAuthorsModule()]}>
      <div className="authors-header">
        <Title level={2}>Авторы</Title>
        <Link to={{ pathname: `${url}/create`, search: location.search }}>
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить автора
          </Button>
        </Link>
      </div>

      {error && (!validationErrors || validationErrors.length === 0) && (
        <Alert message="Ошибка" description={error} type="error" showIcon className="authors-error-alert" />
      )}

      <Table
        columns={columns}
        dataSource={authors}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.currentPage,
          pageSize: pagination.perPage,
          total: pagination.totalCount,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />

      <RouteModal
        path={`${path}/create`}
        parentPath={url}
        title="Создание автора"
      >
        <AuthorForm />
      </RouteModal>

      <RouteModal
        path={`${path}/:id/edit`}
        parentPath={url}
        title="Редактирование автора"
      >
        <AuthorForm />
      </RouteModal>
    </DynamicModuleLoader>
  );
};

export default Authors;