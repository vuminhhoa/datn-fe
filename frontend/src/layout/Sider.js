import React, { useContext, useState } from 'react';
import {
  ApartmentOutlined,
  AuditOutlined,
  DesktopOutlined,
  PieChartOutlined,
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
      label: 'Trang chủ',
      key: '/',
      icon: <PieChartOutlined />,
      permission: permissionsConsts.DASHBOARD_READ,
    }),
    getItem({
      label: 'Quản lý thiết bị',
      key: '/equipments',
      icon: <DesktopOutlined />,
      children: [
        getItem({
          label: 'Danh sách thiết bị',
          key: '/list-equipments',
          permission: permissionsConsts.EQUIPMENT_READ,
        }),
        getItem({
          label: 'Nhập thiết bị đơn lẻ',
          key: '/create-equipment',
          permission: permissionsConsts.EQUIPMENT_CREATE,
        }),
        getItem({
          label: 'Nhập thiết bị excel',
          key: '/import-equipments',
          permission: permissionsConsts.EQUIPMENT_CREATE,
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
          permission: permissionsConsts.TENDER_READ,
        }),
        getItem({
          label: 'Tạo đấu thầu',
          key: '/create-tender',
          permission: permissionsConsts.TENDER_CREATE,
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
          permission: permissionsConsts.DEPARTMENT_READ,
        }),
        getItem({
          label: 'Tạo khoa phòng',
          key: '/create-department',
          permission: permissionsConsts.DEPARTMENT_CREATE,
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
          permission: permissionsConsts.USER_READ,
        }),
        getItem({
          label: 'Tạo thành viên',
          key: '/create-member',
          permission: permissionsConsts.USER_CREATE,
        }),
      ],
    }),
    getItem({
      label: 'Cài đặt',
      key: '/settings',
      icon: <SettingOutlined />,
      permission: permissionsConsts.SYSTEM_SETTING,
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
    return navigate(
      `${value.keyPath[1] ? value.keyPath[1] : ''}${value.keyPath[0]}`
    );
  };

  return (
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
  );
}

export default AppSider;
