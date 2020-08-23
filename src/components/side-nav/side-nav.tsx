import { UserOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { Avatar, Divider, Layout, Menu, PageHeader, Space, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { Pages } from '../../types/pages';
import { UserContext, UserProvider } from '../../providers';
import styled from 'styled-components';

const UserDetails = (): JSX.Element => {
  const { isLoading, currentUser } = useContext(UserContext);

  if (isLoading) {
    return (
      <CenteredContainer data-testid="loading-container">
        <Spin tip="Loading..." />
      </CenteredContainer>
    );
  }

  return (
    <SpaceContainer direction="vertical">
      <CenteredContainer>
        <Avatar size={128} icon={<UserOutlined />} />
      </CenteredContainer>
      <CenteredContainer>
        <div data-testid="user-name">{currentUser?.name}</div>
        <div data-testid="user-email">{currentUser?.email}</div>
      </CenteredContainer>
    </SpaceContainer>
  );
};

const { Sider } = Layout;

const SideNav = (): JSX.Element => (
  <Sider>
    <PageHeader title="QDB Challenge" />
    <SpaceContainer direction="vertical">
      <UserDetails />
      <Divider type="horizontal" />
      <NavigationContainer>
        <Menu mode="vertical">
          <Menu.Item key="dashboard">
            <Link to={`/${Pages.Dashboard}`}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="report">
            <Link to={`/${Pages.Report}`}>Report</Link>
          </Menu.Item>
        </Menu>
      </NavigationContainer>
    </SpaceContainer>
  </Sider>
);

export default () => (
  <UserProvider>
    <SideNav />
  </UserProvider>
);

const CenteredContainer = styled('div')`
  text-align: center;
`;

const NavigationContainer = styled('div')`
  width: 100%;
`;

const SpaceContainer = styled(Space)`
  width: 100%;
`;
