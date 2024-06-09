import React from 'react';
import { Flex, Layout, Typography, Button } from 'antd';
import AppHeader from './Header';
import AppSider from './Sider';
const { Content, Footer } = Layout;

function AppLayout({ children }) {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <AppSider />
      <Layout>
        <AppHeader />
        <Flex vertical>
          <Content
            style={{
              justifyContent: 'center',
              padding: '24px',
              display: 'flex',
              width: '100%',
            }}
          >
            {children}
          </Content>

          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            ©{new Date().getFullYear()} Developed by{' '}
            <Button
              style={{ padding: '0px' }}
              type="link"
              href={'https://lab.ibme.edu.vn/'}
              target="_blank"
            >
              iBME lab
            </Button>{' '}
            - HUST
          </Footer>
        </Flex>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
