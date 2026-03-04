import React from 'react';
import { Modal } from 'antd';
import { useHistory, useRouteMatch, useLocation, Route } from 'react-router-dom';

interface RouteModalProps {
  path: string;
  title?: string;
  width?: string | number;
  children: React.ReactNode;
  parentPath: string;
}

export const RouteModal: React.FC<RouteModalProps> = ({ path, title, width, children, parentPath }) => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch(path);
  const visible = !!match;

  const handleCancel = () => {
    history.push({
      pathname: parentPath,
      search: location.search,
    });
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={width}
      destroyOnClose
    >
      {visible && (
        <Route path={path}>
          {children}
        </Route>
      )}
    </Modal>
  );
};