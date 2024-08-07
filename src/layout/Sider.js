// @ts-nocheck
import React, { useState } from 'react';
import {
  ApartmentOutlined,
  AuditOutlined,
  DesktopOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import {
  ROLE_READ,
  BIDDING_READ,
  USER_READ,
  EQUIPMENT_READ,
  DASHBOARD_READ,
  EQUIPMENT_CREATE,
  USER_CREATE,
  DEPARTMENT_READ,
  DEPARTMENT_CREATE,
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
      label: 'Trang chủ',
      key: '/',
      icon: <HomeOutlined />,
      permission: DASHBOARD_READ,
    }),
    getItem({
      label: 'Quản lý thành viên',
      key: '/users',
      icon: <TeamOutlined />,
      permission: USER_READ,
      children: [
        getItem({
          label: 'Danh sách thành viên',
          key: '/list_users',
          permission: USER_READ,
        }),
        getItem({
          label: 'Tạo mới thành viên',
          key: '/create_user',
          permission: USER_CREATE,
        }),
      ],
    }),
    getItem({
      label: 'Quản lý khoa phòng',
      key: '/departments',
      icon: <ApartmentOutlined />,
      permission: DEPARTMENT_READ,
      children: [
        getItem({
          label: 'Danh sách khoa phòng',
          key: '/list_departments',
          permission: DEPARTMENT_READ,
        }),
        getItem({
          label: 'Tạo mới khoa phòng',
          key: '/create_department',
          permission: DEPARTMENT_CREATE,
        }),
      ],
    }),
    getItem({
      label: 'Quản lý thiết bị',
      key: '/equipments',
      icon: <DesktopOutlined />,
      permission: EQUIPMENT_READ,
      children: [
        getItem({
          label: 'Danh sách thiết bị',
          key: '/list_equipments',
          permission: EQUIPMENT_READ,
        }),
        getItem({
          label: 'Nhập thiết bị đơn lẻ',
          key: '/create_equipment',
          permission: EQUIPMENT_CREATE,
        }),
        getItem({
          label: 'Nhập thiết bị bằng file excel',
          key: '/import_equipments_by_excel',
          permission: EQUIPMENT_CREATE,
        }),
      ],
    }),
    getItem({
      label: 'Hoạt động mua sắm',
      key: '/shopping',
      icon: <AuditOutlined />,
      permission: BIDDING_READ,
      children: [
        getItem({
          label: 'Danh sách hoạt động',
          key: '/bidding',
          permission: EQUIPMENT_READ,
        }),
        getItem({
          label: 'Danh sách đề xuất',
          key: '/proposal',
          permission: EQUIPMENT_CREATE,
        }),
      ],
    }),

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
          '/users',
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
