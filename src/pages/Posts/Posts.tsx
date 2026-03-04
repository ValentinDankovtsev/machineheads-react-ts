import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { getPostsModule } from '../../store/posts/module';
import { getAuthorsModule } from '../../store/authors/module';
import { getTagsModule } from '../../store/tags/module';
import { Table, Alert, Typography, Button, Space, Popconfirm, Tag } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { fetchPostsRequest, deletePostRequest } from '../../store/posts/actions';
import type { PostsState, Post } from '../../store/posts/types';
import { usePaginationSync } from '../../hooks/usePaginationSync';
import { RouteModal } from '../../components/RouteModal/RouteModal';
import { PostForm } from './components/PostForm';
import './posts.css';

const { Title } = Typography;

const Posts: React.FC = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const postsState = useSelector((state: { posts: PostsState }) => state.posts);
  const { posts, loading, error, validationErrors, pagination } = postsState || {
    posts: [],
    loading: false,
    error: null,
    validationErrors: null,
    pagination: { currentPage: 1, pageCount: 1, perPage: 10, totalCount: 0 },
  };

  const { onPageChange } = usePaginationSync(fetchPostsRequest);

  const handleDelete = (id: number) => {
    dispatch(deletePostRequest({ id }));
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
      title: 'Превью',
      dataIndex: 'previewPicture',
      key: 'previewPicture',
      render: (previewPicture: { url: string } | undefined) => (
        previewPicture?.url ? <img src={previewPicture.url} alt="Preview" style={{ width: 50, height: 50, objectFit: 'cover' }} /> : null
      ),
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Автор',
      dataIndex: 'authorName',
      key: 'authorName',
      render: (text: string) => text || '',
    },
    {
      title: 'Теги',
      dataIndex: 'tagNames',
      key: 'tagNames',
      render: (tagNames: string[] | undefined, record: Post) => {
        const tagsToRender = tagNames && tagNames.length > 0 
          ? tagNames 
          : record.tags?.map((t) => t.name) || [];

        return (
          <>
            {tagsToRender.map((tag) => (
              <Tag style={{ marginBottom: '8px' }} color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </>
        );
      },
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
      render: (_: unknown, record: Post) => (
        <Space size="middle">
          <Link to={{ pathname: `${url}/${record.id}/edit`, search: location.search }}>
            <Button icon={<EditOutlined />} type="link">
              Редактировать
            </Button>
          </Link>
          <Popconfirm
            title="Вы уверены, что хотите удалить этот пост?"
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
    <DynamicModuleLoader modules={[getPostsModule(), getAuthorsModule(), getTagsModule()]}>
      <div className="posts-header">
        <Title level={2}>Посты</Title>
        <Link to={{ pathname: `${url}/create`, search: location.search }}>
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить пост
          </Button>
        </Link>
      </div>

      {error && (!validationErrors || validationErrors.length === 0) && (
        <Alert message="Ошибка" description={error} type="error" showIcon className="authors-error-alert" />
      )}

      <Table
        columns={columns}
        dataSource={posts}
        rowKey="id"
        pagination={{
          current: pagination.currentPage,
          pageSize: pagination.perPage,
          total: pagination.totalCount,
          showSizeChanger: true,
        }}
        loading={loading}
        onChange={handleTableChange}
      />

      <RouteModal
        path={`${path}/create`}
        parentPath={url}
        title="Создание поста"
        width={1000}
      >
        <PostForm />
      </RouteModal>

      <RouteModal
        path={`${path}/:id/edit`}
        parentPath={url}
        title="Редактирование поста"
        width={1000}
      >
        <PostForm />
      </RouteModal>
    </DynamicModuleLoader>
  );
};

export default Posts;