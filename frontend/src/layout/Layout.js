import React from 'react';
import { Layout, Typography } from 'antd';
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

        <Content
          style={{
            margin: '16px',
          }}
        >
          {children}
        </Content>

        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          ĐATN HUST ©{new Date().getFullYear()} SVTH:
          <Typography.Text strong> Vũ Minh Hòa</Typography.Text> - GVHD:
          <Typography.Text strong> ThS. Hoàng Quang Huy</Typography.Text>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
