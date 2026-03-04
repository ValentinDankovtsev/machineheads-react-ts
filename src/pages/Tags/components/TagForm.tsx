import React, { useEffect } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createTagRequest, updateTagRequest, fetchTagRequest } from '../../../store/tags/actions';
import type { TagsState, TagInput } from '../../../store/tags/types';

export const TagForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;

  const { loading, tagLoading, validationErrors, currentTag } = useSelector((state: { tags: TagsState }) => state.tags);

  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchTagRequest(Number(id)));
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
    if (isEdit && currentTag) {
        form.setFieldsValue({
            name: currentTag.name,
            code: currentTag.code,
            sort: currentTag.sort,
        });
    } else if (!isEdit) {
        form.resetFields();
    }
  }, [isEdit, currentTag, form]);

  const onFinish = (values: TagInput) => {
    if (isEdit && id) {
      dispatch(updateTagRequest({ id: Number(id), data: values }));
    } else {
      dispatch(createTagRequest(values));
    }
  };

  return (
    <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={tagLoading}
    >
        <Form.Item name="name" label="Название" rules={[{ required: true, message: 'Введите название' }]}>
            <Input />
        </Form.Item>
        <Form.Item name="code" label="Код">
            <Input />
        </Form.Item>
        <Form.Item name="sort" label="Сортировка">
            <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading || tagLoading}>
                {isEdit ? 'Сохранить' : 'Создать'}
            </Button>
        </Form.Item>
    </Form>
  );
};