import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Flex, Breadcrumb, Button, Spin } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import useFetchApi from '../../../hooks/useFetchApi.js';

const DetailRole = () => {
  const { id } = useParams();
  const { data, loading } = useFetchApi({
    url: `/settings/role/${id}`,
  });
  const borderedItems = [
    {
      key: '1',
      label: 'Quyền hạn',
      children: data.roles?.Permissions.map(
        (permission) => permission?.name
      ).join(', '),
    },
    {
      key: '2',
      labelStyle: { width: '300px' },
      label: `Users có vai trò ${data.roles?.name}`,
      children: data.roles?.Users.map((user) => {
        return (
          <Button type="link" href={`/user/${user.id}`} size="small">
            {user.name || user.email}
          </Button>
        );
      }),
    },
    {
      key: '2',
      label: `Ngày tạo`,
      children: new Date(data.roles?.createdAt).toLocaleString(),
    },
    {
      key: '2',
      label: `Ngày sửa đổi gần nhất`,
      children: new Date(data.roles?.updatedAt).toLocaleString(),
    },
  ];

  if (loading) {
    return <Spin />;
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
            href: '/settings/roles-settings',
            title: 'Cài đặt phân quyền',
          },
          {
            title: `Role: ${data.roles?.name}`,
          },
        ]}
      />
      <Card
        title={`Thông tin vai trò: ${data.roles?.name}`}
        extra={
          <Button type="primary" href={`/role/edit/${data.roles.id}`}>
            Chỉnh sửa
          </Button>
        }
      >
        <Flex vertical gap={16}>
          <Descriptions bordered items={borderedItems} column={1} />
        </Flex>
      </Card>
    </Flex>
  );
};

export default DetailRole;
