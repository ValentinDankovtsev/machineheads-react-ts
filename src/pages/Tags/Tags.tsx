import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { getTagsModule } from '../../store/tags/module';
import { Table, Alert, Typography, Button, Space, Popconfirm } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { fetchTagsRequest, deleteTagRequest } from '../../store/tags/actions';
import type { TagsState, Tag } from '../../store/tags/types';
import { usePaginationSync } from '../../hooks/usePaginationSync';
import { RouteModal } from '../../components/RouteModal/RouteModal';
import { TagForm } from './components/TagForm.tsx';
import './tags.css';

const { Title } = Typography;

const Tags: React.FC = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const tagsState = useSelector((state: { tags: TagsState }) => state.tags);
  const { tags, loading, error, pagination, validationErrors } = tagsState || {
    tags: [],
    loading: false,
    error: null,
    pagination: { currentPage: 1, pageCount: 1, perPage: 10, totalCount: 0 },
    validationErrors: null,
  };

  const { onPageChange } = usePaginationSync(fetchTagsRequest);

  const handleDelete = (id: number) => {
    dispatch(deleteTagRequest({ id }));
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
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Сортировка',
      dataIndex: 'sort',
      key: 'sort',
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
      render: (_: unknown, record: Tag) => (
        <Space size="middle">
          <Link to={{ pathname: `${url}/${record.id}/edit`, search: location.search }}>
            <Button icon={<EditOutlined />} type="link">
              Редактировать
            </Button>
          </Link>
          <Popconfirm
            title="Вы уверены, что хотите удалить этот тег?"
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
    <DynamicModuleLoader modules={[getTagsModule()]}>
      <div className="tags-header">
        <Title level={2}>Теги</Title>
        <Link to={{ pathname: `${url}/create`, search: location.search }}>
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить тег
          </Button>
        </Link>
      </div>

      {error && (!validationErrors || validationErrors.length === 0) && (
              <Alert message="Ошибка" description={error} type="error" showIcon className="authors-error-alert" />
            )}

      <Table
        columns={columns}
        dataSource={tags}
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
        title="Создание тега"
      >
        <TagForm />
      </RouteModal>

      <RouteModal
        path={`${path}/:id/edit`}
        parentPath={url}
        title="Редактирование тега"
      >
        <TagForm />
      </RouteModal>
    </DynamicModuleLoader>
  );
};

export default Tags;