import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Card, Typography, Alert, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginRequest } from '../../store/auth/actions';
import './login.css';
import type { AuthState, LoginPayload } from '../../store/auth/types';

const { Title } = Typography;
const { Content } = Layout;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { loading, error, validationErrors } = useSelector((state: { auth: AuthState }) => state.auth);

  useEffect(() => {
    if (validationErrors) {
      const fields = validationErrors.map((err) => ({
        name: err.field,
        errors: [err.message],
      }));
      form.setFields(fields);
    }
  }, [validationErrors, form]);

  const onFinish = (values: LoginPayload) => {
    dispatch(loginRequest(values));
  };

  return (
    <Layout className="login-layout">
      <Content className="login-content">
        <Card className="login-card">
          <div className="login-header">
            <Title level={3}>Вход </Title>
          </div>
          
          {error && (
            <Alert 
              message={error} 
              type="error" 
              showIcon 
              className="login-alert"
            />
          )}

          <Form
            form={form}
            name="login"
            initialValues={{ 
              email: 'test@test.ru', 
              password: 'khro2ij3n2730' 
            }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Пожалуйста, введите Email!' }, 
                { type: 'email', message: 'Некорректный Email!' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;