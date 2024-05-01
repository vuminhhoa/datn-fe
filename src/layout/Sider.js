// @ts-nocheck
import React, { useState } from 'react';
import {
  AuditOutlined,
  DesktopOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import {
  ROLE_READ,
  BIDDING_READ,
  USER_READ,
  EQUIPMENT_READ,
} from '../const/permission';
import { useNavigate } from 'react-router-dom';
import hasPermission from '../helpers/hasPermission';

const { Sider } = Layout;

function AppSider() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  function getItem({ label, key, icon, children, permission }) {
    if (permission) {
      const canSeeItem = hasPermission(permission);
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
      permission: USER_READ,
    }),
    getItem({
      label: 'Quản lý thiết bị',
      key: '/equipments',
      icon: <DesktopOutlined />,
      permission: EQUIPMENT_READ,
    }),
    getItem({
      label: 'Hoạt động mua sắm',
      key: '/shopping/bidding',
      icon: <AuditOutlined />,
      permission: BIDDING_READ,
    }),
    // getItem({
    //   label: 'Hoạt động mua sắm',
    //   key: '/shopping',
    //   icon: <AuditOutlined />,
    //   children: [
    //     getItem({
    //       label: 'Mua sắm qua đấu thầu',
    //       key: '/bidding',
    //       permission: BIDDING_READ,
    //     }),
    //     getItem({
    //       label: 'Mua sắm không qua đấu thầu',
    //       key: '/non-bidding',
    //       permission: BIDDING_READ,
    //     }),
    //   ],
    // }),
    getItem({
      label: 'Cài đặt phân quyền',
      key: '/roles',
      icon: <SettingOutlined />,
      permission: ROLE_READ,
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
