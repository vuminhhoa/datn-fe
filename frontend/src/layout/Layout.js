import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ApartmentOutlined,
  AuditOutlined,
  DesktopOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Spin } from 'antd';
import UserContext from '../contexts/userContext';
import AppHeader from './Header';
import axios from 'axios';
import NotFound from '../pages/NotFound';
import { permissions } from '../const/permissionConsts';

const { Content, Footer, Sider } = Layout;

function checkPermission(currentUser, reqPermission) {
  if (currentUser?.Role && currentUser?.Role.Permissions) {
    for (const permission of currentUser.Role.Permissions) {
      if (permission.alias === reqPermission) {
        return true;
      }
    }
  }
  return false;
}

function AppLayout({ children, permission }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPermission, setHasPermission] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setHasPermission(true);
    const verifyUser = async () => {
      try {
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        if (!accessToken) return;

        if (accessToken && !!!user) {
          const res = await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_API_URL}/auth/verify`,
            data: { accessToken: accessToken },
          });
          if (!res.data.success || res.data.error) {
            return navigate('/login');
          }
          setUser(res.data.user);
        }
        setIsLoggedIn(true);
        if (permission) {
          setHasPermission(checkPermission(user, permission));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [navigate, user, permission]);

  if (!hasPermission) {
    return <NotFound />;
  }

  function getItem({ label, key, icon, children, permission }) {
    if (permission) {
      const canSeeItem = checkPermission(user, permission);
      if (!canSeeItem) return false;
    }
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem({
      label: 'Trang chủ',
      key: '/',
      icon: <PieChartOutlined />,
      permission: permissions.DASHBOARD_READ,
    }),
    getItem({
      label: 'Quản lý thiết bị',
      key: '/equipments',
      icon: <DesktopOutlined />,
      children: [
        getItem({
          label: 'Danh sách thiết bị',
          key: '/list-equipments',
          permission: permissions.EQUIPMENT_READ,
        }),
        getItem({
          label: 'Nhập thiết bị đơn lẻ',
          key: '/create-equipment',
          permission: permissions.EQUIPMENT_CREATE,
        }),
        getItem({
          label: 'Nhập thiết bị excel',
          key: '/import-equipments',
          permission: permissions.EQUIPMENT_CREATE,
        }),
      ],
    }),
    getItem({
      label: 'Quản lý đấu thầu',
      key: '/tenders',
      icon: <AuditOutlined />,
      children: [
        getItem({
          label: 'Danh sách đấu thầu',
          key: '/list-tenders',
          permission: permissions.TENDER_READ,
        }),
        getItem({
          label: 'Tạo đấu thầu',
          key: '/create-tender',
          permission: permissions.TENDER_CREATE,
        }),
      ],
    }),
    getItem({
      label: 'Quản lý khoa phòng',
      key: '/departments',
      icon: <ApartmentOutlined />,
      children: [
        getItem({
          label: 'Danh sách khoa phòng',
          key: '/list-departments',
          permission: permissions.DEPARTMENT_READ,
        }),
        getItem({
          label: 'Tạo khoa phòng',
          key: '/create-department',
          permission: permissions.DEPARTMENT_CREATE,
        }),
      ],
    }),
    getItem({
      label: 'Quản lý thành viên',
      key: '/members',
      icon: <TeamOutlined />,
      children: [
        getItem({
          label: 'Danh sách thành viên',
          key: '/list-members',
          permission: permissions.USER_READ,
        }),
        getItem({
          label: 'Tạo thành viên',
          key: '/create-member',
          permission: permissions.USER_CREATE,
        }),
      ],
    }),
    getItem({
      label: 'Cài đặt',
      key: '/settings',
      icon: <SettingOutlined />,
      permission: permissions.SYSTEM_SETTING,
      children: [
        getItem({
          label: 'Cài đặt phân quyền',
          key: '/permissions-settings',
        }),
        getItem({
          label: 'Cài đặt vai trò',
          key: '/roles-settings',
        }),
      ],
    }),
  ].filter(Boolean);

  const handleClickMenu = (value) => {
    console.log(value);
    return navigate(
      `${value.keyPath[1] ? value.keyPath[1] : ''}${value.keyPath[0]}`
    );
  };

  if (loading) {
    return <Spin spinning={loading} fullscreen />;
  }

  if (!isLoggedIn) {
    return navigate('/login');
  }
  return (
    <UserContext.Provider value={user}>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider
          width={240}
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            defaultSelectedKeys={['/']}
            defaultOpenKeys={[
              '/equipments',
              '/members',
              '/departments',
              '/tenders',
              '/settings',
            ]}
            mode="inline"
            items={items}
            onClick={handleClickMenu}
          />
        </Sider>
        <Layout>
          <AppHeader user={user} />
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
            ĐATN HUST ©{new Date().getFullYear()} SVTH: Vũ Minh Hòa - GVHD:
            ThS. Hoàng Quang Huy
          </Footer>
        </Layout>
      </Layout>
    </UserContext.Provider>
  );
}

export default AppLayout;
