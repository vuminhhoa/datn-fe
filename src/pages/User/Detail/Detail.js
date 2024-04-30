// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import useFetchApi from '../../../hooks/useFetchApi';
import hasPermission from '../../../helpers/hasPermission';
import { USER_UPDATE } from '../../../const/permission';
import EditModal from '../EditModal';
import { useApp } from '../../../contexts/appProvider';
import { ADMIN } from '../../../const/role';
import { useBreadcrumb } from '../../../hooks/useBreadcrumb';

const Detail = () => {
  const { id } = useParams();
  const { user, setUser } = useApp();
  const { data, loading, fetchApi, setData } = useFetchApi({
    url: `/user/${id}`,
  });
  const [isShowEditForm, setIsShowEditForm] = useState(false);

  const { data: rolesData, loading: loadingRoles } = useFetchApi({
    url: '/settings/roles',
  });
  const breadcrumbItems = useBreadcrumb([
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/users',
      title: 'Quản lý thành viên',
    },
    {
      href: `/user/${id}`,
      title: loading
        ? '----------'
        : data.user?.name
        ? data.user?.name
        : data.user?.email,
    },
  ]);
  const roles = rolesData.roles;

  const [editFormData, setEditFormData] = useState();

  useEffect(() => {
    if (loading || !!editFormData) return;

    if (
      user.id === data.user.id &&
      JSON.stringify(user.image) !== JSON.stringify(data.user.image)
    ) {
      setUser({ ...user, image: data.user.image });
    }
    setEditFormData({ ...data.user });
  }, [loading, data]);

  const items = [
    {
      key: '1',
      label: 'Tên',
      children: data.user?.name,
    },
    {
      key: '2',
      label: 'Số điện thoại',
      children: data.user?.phone,
    },
    {
      key: '3',
      label: 'Địa chỉ',
      children: data.user?.address,
    },
    {
      key: '4',
      label: 'Khoa phòng',
      children: data.user?.department,
    },
    {
      key: '5',
      label: 'Vai trò',
      children: data.user?.Role.name,
    },
    {
      key: '6',
      label: 'Email',
      children: data.user?.email,
    },
    {
      key: '6',
      label: 'Quyền hạn',
      children: data.user?.Role.Permissions.map(
        (permission) => permission.name
      ).join(', '),
    },
  ];

  if (loading || loadingRoles) {
    return (
      <Flex vertical gap={16}>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title="Thông tin người dùng"
          extra={
            hasPermission(USER_UPDATE) && (
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
      <Breadcrumb items={breadcrumbItems} />
      <EditModal
        open={isShowEditForm}
        value={editFormData}
        setValue={setEditFormData}
        input={data}
        setInput={setData}
        roles={roles}
        fetchApi={() => fetchApi()}
        setOpen={() => setIsShowEditForm()}
      />

      <Card
        title="Thông tin người dùng"
        extra={
          hasPermission(USER_UPDATE) &&
          data.user?.Role.name !== ADMIN && (
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
              src={data.user.image}
              icon={<UserOutlined />}
              shape="circle"
            />

            <Flex vertical align="center" gap={4}>
              <Typography.Title level={3} style={{ margin: '0px' }}>
                {data.user?.name || data.user?.email}
              </Typography.Title>
              <Typography.Paragraph style={{ margin: '0px' }}>
                {data.user?.Role.name}
              </Typography.Paragraph>
            </Flex>
          </Flex>
          <Descriptions items={items} column={3} />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Detail;
