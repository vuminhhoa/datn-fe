import React from 'react';
import { Flex, Layout, Typography } from 'antd';
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
            ĐATN HUST ©{new Date().getFullYear()} SVTH:
            <Typography.Text strong> Vũ Minh Hòa</Typography.Text> - GVHD:
            <Typography.Text strong> ThS. Hoàng Quang Huy</Typography.Text>
          </Footer>
        </Flex>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
