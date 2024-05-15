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
        <Flex vertical style={{ width: '100%' }}>
          <Flex justify="center">
            <Content
              style={{
                paddingTop: '24px',
                maxWidth: '800px',
              }}
            >
              {children}
            </Content>
          </Flex>

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
