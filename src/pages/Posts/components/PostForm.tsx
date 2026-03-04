import React, { useEffect, useState, useMemo } from 'react';
import { Form, Input, Button, Select, Upload, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPostRequest, updatePostRequest, fetchPostRequest, clearPostDetails } from '../../../store/posts/actions';
import { fetchAuthorsRequest } from '../../../store/authors/actions';
import { fetchTagsRequest } from '../../../store/tags/actions';
import type { PostsState, PostInput } from '../../../store/posts/types';
import type { AuthorsState } from '../../../store/authors/types';
import type { TagsState } from '../../../store/tags/types';


export const PostForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;
  const [internalFileList, setInternalFileList] = useState<UploadFile[] | null>(null);

  const { postLoading, validationErrors, currentPost } = useSelector((state: { posts: PostsState }) => state.posts) || {
    postLoading: false,
    validationErrors: null,
    currentPost: null,
  };
  const authors = useSelector((state: { authors: AuthorsState }) => state.authors?.authors);
  const tags = useSelector((state: { tags: TagsState }) => state.tags?.tags);

  useEffect(() => {
    dispatch(fetchAuthorsRequest({ page: 1, perPage: 100 }));
    dispatch(fetchTagsRequest({ page: 1, perPage: 100 }));

    return () => {
      dispatch(clearPostDetails());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchPostRequest(Number(id)));
    }
  }, [isEdit, id, dispatch]);

  useEffect(() => {
    if (validationErrors) {
      const errors = validationErrors.map((err) => ({
        name: err.field,
        errors: [err.message],
      }));
      form.setFields(errors);
    }
  }, [validationErrors, form]);

  useEffect(() => {
    if (isEdit && currentPost) {
      const tagIds = currentPost.tagIds || currentPost.tags?.map((tag) => tag.id) || [];
      const authorId = currentPost.authorId || currentPost.author?.id;

      form.setFieldsValue({
        title: currentPost.title,
        code: currentPost.code,
        authorId: authorId,
        text: currentPost.text,
        tagIds: tagIds,
      });
    } else if (!isEdit) {
      form.resetFields();
    }
  }, [isEdit, currentPost, form]);

  const fileList = internalFileList ?? (isEdit && currentPost?.previewPicture ? [{
    uid: String(currentPost.previewPicture.id),
    name: currentPost.previewPicture.name,
    status: 'done',
    url: currentPost.previewPicture.url,
  }] : []);

  const onFinish = (values: PostInput) => {
    const payload = {
      ...values,
      previewPicture: fileList[0]?.originFileObj,
    };

    if (isEdit && id) {
      dispatch(updatePostRequest({ id: Number(id), data: payload }));
    } else {
      dispatch(createPostRequest(payload));
    }
  };

  const uploadProps = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRemove: (_file: UploadFile) => {
      setInternalFileList([]);
    },
    beforeUpload: (file: RcFile) => {
      setInternalFileList([{
        uid: file.uid || String(Date.now()),
        name: file.name,
        status: 'done',
        originFileObj: file,
      }]);
      return false;
    },
    fileList,
  };

  const authorOptions = useMemo(() => authors.map((author) => ({
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar 
          src={author.avatar?.url} 
          icon={<UserOutlined />} 
          size="small" 
          style={{ marginRight: 8 }} 
        />
        {`${author.name} ${author.lastName}`}
      </div>
    ),
    value: author.id,
    name: `${author.name} ${author.lastName}`, // For search filtering
  })), [authors]);


//https://github.com/ant-design/ant-design/issues/53064
  const tagOptions = useMemo(() => tags.map((tag) => ({
    label: tag.name,
    value: tag.id,
  })), [tags]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ tagIds: [] }}
      disabled={postLoading}
    >
      <Form.Item
        name="title"
        label="Заголовок"
        rules={[{ required: true, message: 'Пожалуйста, введите заголовок' }]}
      >
        <Input placeholder="Заголовок поста" />
      </Form.Item>

      <Form.Item
        name="code"
        label="Код"
      >
        <Input placeholder="Символьный код" />
      </Form.Item>

      <Form.Item
        name="authorId"
        label="Автор"
        rules={[{ required: true, message: 'Пожалуйста, выберите автора' }]}
      >
        <Select
          placeholder="Выберите автора"
          showSearch
          optionFilterProp="name"
          options={authorOptions}
        />
      </Form.Item>

      <Form.Item
        name="tagIds"
        label="Теги"
      >
        <Select
          mode="multiple"
          placeholder="Выберите теги"
          optionFilterProp="label"
          options={tagOptions}
        />
      </Form.Item>

      <Form.Item
        name="text"
        label="Текст"
        rules={[{ required: true, message: 'Пожалуйста, введите текст' }]}
      >
        <ReactQuill theme="snow" placeholder="Текст поста" />
      </Form.Item>

      <Form.Item
        name="previewPicture"
        label="Изображение превью"
      >
        <Upload
          {...uploadProps}
          listType="picture"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Выберите файл</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={postLoading} block>
          {isEdit ? 'Сохранить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  );
}