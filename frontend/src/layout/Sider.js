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
    // getItem({
    //   label: 'Trang chủ',
    //   key: '/',
    //   icon: <PieChartOutlined />,
    //   permission: permissionsConsts.DASHBOARD_READ,
    // }),
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
      label: 'Cài đặt',
      key: '/settings',
      icon: <SettingOutlined />,
      permission: permissionsConsts.SYSTEM_SETTING,
      children: [
        getItem({
          label: 'Cài đặt phân quyền',
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
