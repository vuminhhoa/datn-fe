// @ts-nocheck
import React, { useState } from 'react';
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
import useFetchApi from '../../hooks/useFetchApi';
import hasPermission from '../../helpers/hasPermission';
import { USER_UPDATE } from '../../const/permission';
import EditModal from './EditModal';
import { ADMIN } from '../../const/role';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import NotFound from '../NotFound';
import Page from '../../components/Page';

const Detail = () => {
  const { id } = useParams();
  const {
    data: user,
    loading,
    fetchApi,
    setData,
  } = useFetchApi({
    url: `/user/${id}`,
    defaultData: {},
  });
  const [isShowEditForm, setIsShowEditForm] = useState(false);

  const breadcrumbItems = useBreadcrumb([
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/users/list_users',
      title: 'Quản lý thành viên',
    },
    {
      href: `/user/${id}`,
      title: loading ? (
        <Skeleton.Input size="small" />
      ) : user?.name ? (
        user.name
      ) : (
        user?.email
      ),
    },
  ]);
  if (!user) return <NotFound />;

  const items = [
    {
      key: '1',
      label: 'Tên',
      children: user.name,
    },
    {
      key: '2',
      label: 'Số điện thoại',
      children: user.phone,
    },
    {
      key: '3',
      label: 'Địa chỉ',
      children: user.address,
    },
    {
      key: '4',
      label: 'Khoa phòng',
      children: user.Department?.tenKhoaPhong,
    },
    {
      key: '5',
      label: 'Vai trò',
      children: user.Role?.name,
    },
    {
      key: '6',
      label: 'Email',
      children: user?.email,
    },
    {
      key: '6',
      label: 'Quyền hạn',
      children: user.Role?.Permissions.map(
        (permission) => permission.name
      ).join(', '),
    },
  ];

  if (loading) {
    return (
      <Page>
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
                <Skeleton.Input size="small" />
              </Flex>
            </Flex>
            <Skeleton
              paragraph={{
                rows: 4,
              }}
            />
          </Flex>
        </Card>
      </Page>
    );
  }
  if (!user) return <NotFound />;
  return (
    <Page>
      <Breadcrumb items={breadcrumbItems} />
      <EditModal
        open={isShowEditForm}
        input={user}
        setInput={setData}
        fetchApi={() => fetchApi()}
        setOpen={() => setIsShowEditForm()}
      />

      <Card
        title="Thông tin người dùng"
        extra={
          hasPermission(USER_UPDATE) &&
          user.Role.name !== ADMIN && (
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
              src={user.image}
              icon={<UserOutlined />}
              shape="circle"
            />

            <Flex vertical align="center" gap={4}>
              <Typography.Title level={3} style={{ margin: '0px' }}>
                {user.name || user.email}
              </Typography.Title>
              <Typography.Paragraph style={{ margin: '0px' }}>
                {user.Role.name}
              </Typography.Paragraph>
            </Flex>
          </Flex>
          <Descriptions items={items} column={3} />
        </Flex>
      </Card>
    </Page>
  );
};

export default Detail;
