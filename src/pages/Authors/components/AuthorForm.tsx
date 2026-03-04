import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import { createAuthorRequest, updateAuthorRequest, fetchAuthorRequest } from '../../../store/authors/actions';
import type { AuthorsState, AuthorInput } from '../../../store/authors/types';

export const AuthorForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;

  const { loading, authorLoading, validationErrors, currentAuthor } = useSelector((state: { authors: AuthorsState }) => state.authors);
  

  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchAuthorRequest(Number(id)));
    }
  }, [isEdit, id, dispatch]);

  const initialValues = isEdit ? currentAuthor : undefined;

  const [internalFileList, setInternalFileList] = useState<UploadFile[] | null>(null);

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
    if (isEdit && initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        lastName: initialValues.lastName,
        secondName: initialValues.secondName,
        shortDescription: initialValues.shortDescription,
        description: initialValues.description,
        removeAvatar: false,
      });
    } else {
      form.resetFields();
    }
  }, [isEdit, initialValues, form]);

  const fileList = internalFileList ?? (isEdit && currentAuthor?.avatar ? [{
    uid: String(currentAuthor.avatar.id),
    name: currentAuthor.avatar.name,
    status: 'done',
    url: currentAuthor.avatar.url,
  }] : []);

  const onFinish = (values: Omit<AuthorInput, 'avatar'>) => {
    const file = fileList[0];
    const avatarPayload = file?.originFileObj;

    const payload: AuthorInput = {
      name: values.name,
      lastName: values.lastName,
      secondName: values.secondName,
      shortDescription: values.shortDescription,
      description: values.description,
      removeAvatar: values.removeAvatar,
      avatar: avatarPayload,
    };

    if (isEdit && id) {
      dispatch(updateAuthorRequest({
        id: Number(id),
        data: payload,
      }));
    } else {
      dispatch(createAuthorRequest(payload));
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

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      disabled={authorLoading}
    >
      <Form.Item
        name="name"
        label="Имя"
        rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
      >
        <Input placeholder="Введите имя" />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Фамилия"
        rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
      >
        <Input placeholder="Введите фамилию" />
      </Form.Item>

      <Form.Item
        name="secondName"
        label="Отчество"
      >
        <Input placeholder="Введите отчество" />
      </Form.Item>

      <Form.Item
        name="shortDescription"
        label="Краткое описание"
      >
        <Input.TextArea rows={2} placeholder="Краткое описание" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Полное описание"
      >
        <Input.TextArea rows={4} placeholder="Полное описание" />
      </Form.Item>

      <Form.Item name="avatar"  label="Аватар">
        <Upload {...uploadProps} listType="picture">
          <Button icon={<UploadOutlined />}>Выбрать файл</Button>
        </Upload>
      </Form.Item>

        <Form.Item name="removeAvatar" valuePropName="checked">
          <Checkbox>Удалить текущий аватар</Checkbox>
        </Form.Item>
    
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading || authorLoading} block>
          {isEdit ? 'Сохранить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  );
};