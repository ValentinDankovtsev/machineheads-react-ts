import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect, type RouteProps, type RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import MainLayout from './components/MainLayout';
import type { AuthState } from './store/auth/types';

const Login = lazy(() => import('./pages/Login/Login'));
const Posts = lazy(() => import('./pages/Posts/Posts'));
const Tags = lazy(() => import('./pages/Tags/Tags'));
const Authors = lazy(() => import('./pages/Authors/Authors'));

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state: { auth: AuthState }) => state.auth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <MainLayout>
            <Component {...props} />
          </MainLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    }>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/posts" component={Posts} />
        <PrivateRoute path="/tags" component={Tags} />
        <PrivateRoute path="/authors" component={Authors} />
        <Redirect from="/" to="/posts" />
      </Switch>
    </Suspense>
  );
}

export default App;