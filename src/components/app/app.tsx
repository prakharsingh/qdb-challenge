import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import SideNav from '../side-nav';
import Router from '../router';

export default () => (
  <Container data-testid="container">
    <SideNav />
    <Layout.Content>
      <Router />
    </Layout.Content>
  </Container>
);

const Container = styled(Layout)`
  min-height: 100vh;
`;
