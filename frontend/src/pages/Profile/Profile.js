import React, { useState } from 'react';
import {
  Card,
  Descriptions,
  Flex,
  Avatar,
  Typography,
  Breadcrumb,
  Button,
  Skeleton,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import useFetchApi from '../../hooks/useFetchApi';
import isHasPermission from '../../helpers/isHasPermission';
import { permissionsConsts } from '../../const/permissionConsts';
import { useAuth } from '../../contexts/authProvider';
import EditModal from './Edit';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isShowEditForm, setIsShowEditForm] = useState(false);

  const { data: rolesData, loading: loadingRoles } = useFetchApi({
    url: '/settings/roles',
    defaultData: [],
  });
  const roles = rolesData.roles;

  const [editFormData, setEditFormData] = useState(user);

  const items = [
    {
      key: '1',
      label: 'Tên',
      children: user?.name,
    },
    {
      key: '2',
      label: 'Số điện thoại',
      children: user?.phone,
    },
    {
      key: '3',
      label: 'Địa chỉ',
      children: user?.address,
    },
    {
      key: '4',
      label: 'Khoa phòng',
      children: user?.department,
    },
    {
      key: '5',
      label: 'Vai trò',
      children: user?.Role.name,
    },
    {
      key: '6',
      label: 'Email',
      children: user?.email,
    },
    {
      key: '6',
      label: 'Quyền hạn',
      children: user?.Role.Permissions.map(
        (permission) => permission.name
      ).join(', '),
    },
  ];

  if (loadingRoles) {
    return (
      <Flex vertical gap={16}>
        <Breadcrumb
          items={[
            {
              href: '/',
              title: <HomeOutlined />,
            },
            {
              href: '/users',
              title: 'Thông tin cá nhân',
            },
          ]}
        />
        <Card
          title="Thông tin cá nhân"
          extra={
            isHasPermission(permissionsConsts.USER_UPDATE) && (
              <Button type="primary" icon={<EditOutlined />} disabled>
                Cập nhật
              </Button>
            )
          }
        >
          <Flex vertical align="center" gap={24}>
            <Flex vertical align="center" gap={8}>
              <Avatar size={128} shape="circle" />
              <Flex vertical align="center" gap={4}>
                <Skeleton.Input />
              </Flex>
            </Flex>
            <Skeleton
              paragraph={{
                rows: 4,
              }}
            />
          </Flex>
        </Card>
      </Flex>
    );
  }
  return (
    <Flex vertical gap={16}>
      <Breadcrumb
        items={[
          {
            href: '/',
            title: <HomeOutlined />,
          },
          {
            href: '/profile',
            title: 'Thông tin cá nhân',
          },
        ]}
      />
      <EditModal
        open={isShowEditForm}
        setOpen={() => setIsShowEditForm()}
        formValue={editFormData}
        setFormValue={setEditFormData}
        input={user}
        setInput={setUser}
        roles={roles}
      />

      <Card
        title="Thông tin cá nhân"
        extra={
          isHasPermission(permissionsConsts.USER_UPDATE) && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsShowEditForm(true)}
            >
              Cập nhật
            </Button>
          )
        }
      >
        <Flex vertical align="center" gap={24}>
          <Flex vertical align="center" gap={8}>
            <Avatar
              size={128}
              src={
                user.image ||
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              }
              shape="circle"
            />
            <Flex vertical align="center" gap={4}>
              <Typography.Title level={3} style={{ margin: '0px' }}>
                {user?.name || user?.email}
              </Typography.Title>
              <Typography.Paragraph style={{ margin: '0px' }}>
                {user?.Role.name}
              </Typography.Paragraph>
            </Flex>
          </Flex>
          <Descriptions items={items} column={3} />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Profile;
