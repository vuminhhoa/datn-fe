import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Flex, Breadcrumb, Button, Skeleton } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useBreadcrumb } from '../../../hooks/useBreadcrumb.js';
import useFetchApi from '../../../hooks/useFetchApi.js';
import hasPermission from '../../../helpers/hasPermission.js';
import { EQUIPMENT_UPDATE } from '../../../const/permission.js';

const DetailEquipment = () => {
  const { id } = useParams();
  const { data, loading } = useFetchApi({
    url: `/settings/role/${id}`,
  });
  const breadcrumbItems = useBreadcrumb([
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/roles',
      title: 'Cài đặt phân quyền',
    },
    {
      title: loading ? `------------` : data.roles?.name,
    },
  ]);
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
    return (
      <Flex vertical gap={16}>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title={`Thông tin vai trò: -------------`}
          extra={
            hasPermission(EQUIPMENT_UPDATE) && (
              <Button type="primary" disabled>
                Chỉnh sửa
              </Button>
            )
          }
        >
          <Skeleton />
        </Card>
      </Flex>
    );
  }

  return (
    <Flex vertical gap={16}>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title={`Thông tin vai trò: ${data.roles?.name}`}
        extra={
          hasPermission(EQUIPMENT_UPDATE) && (
            <Button type="primary" href={`/role/${data.roles.id}`}>
              Chỉnh sửa
            </Button>
          )
        }
      >
        <Flex vertical gap={16}>
          <Descriptions bordered items={borderedItems} column={1} />
        </Flex>
      </Card>
    </Flex>
  );
};

export default DetailEquipment;
