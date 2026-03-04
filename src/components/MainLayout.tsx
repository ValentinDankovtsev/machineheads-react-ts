import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  FileTextOutlined,
  TagsOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth/actions';

import './MainLayout.css';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  const menuItems = [
    {
      key: '/posts',
      icon: <FileTextOutlined />,
      label: 'Посты',
      onClick: () => history.push('/posts'),
    },
    {
      key: '/tags',
      icon: <TagsOutlined />,
      label: 'Теги',
      onClick: () => history.push('/tags'),
    },
    {
      key: '/authors',
      icon: <UserOutlined />,
      label: 'Авторы',
      onClick: () => history.push('/authors'),
    },
  ];

  return (
    <Layout className="main-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-placeholder">
          <FireOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-header">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
            Выйти
          </Button>
        </Header>
        <Content className="site-layout-background-wrapper">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;