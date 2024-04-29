// @ts-nocheck
import React, { useState } from 'react';
import {
  AuditOutlined,
  DesktopOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { permissionsConsts } from '../const/permissionConsts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authProvider';

const { Sider } = Layout;

function AppSider() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  function getItem({ label, key, icon, children, permission }) {
    if (permission) {
      const canSeeItem = user?.Role?.Permissions.find(
        (userPermission) => userPermission.alias === permission
      );
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
      label: 'Quản lý thành viên',
      key: '/users',
      icon: <TeamOutlined />,
    }),
    getItem({
      label: 'Quản lý thiết bị',
      key: '/equipments',
      icon: <DesktopOutlined />,
    }),
    getItem({
      label: 'Hoạt động mua sắm',
      key: '/shopping',
      icon: <AuditOutlined />,
      children: [
        getItem({
          label: 'Mua sắm qua đấu thầu',
          key: '/bidding',
          permission: permissionsConsts.TENDER_READ,
        }),
        getItem({
          label: 'Mua sắm không qua đấu thầu',
          key: '/non-bidding',
          permission: permissionsConsts.TENDER_CREATE,
        }),
      ],
    }),
    getItem({
      label: 'Cài đặt phân quyền',
      key: '/roles',
      icon: <SettingOutlined />,
      permission: permissionsConsts.SYSTEM_SETTING,
    }),
  ].filter(Boolean);

  const handleClickMenu = (value) => {
    return navigate(
      `${value.keyPath[1] ? value.keyPath[1] : ''}${value.keyPath[0]}`
    );
  };

  return (
    <Sider
      width={260}
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
          '/shopping',
        ]}
        mode="inline"
        items={items}
        onClick={handleClickMenu}
      />
    </Sider>
  );
}

export default AppSider;
