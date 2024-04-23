import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Flex, Breadcrumb, Table } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import useFetchApi from '../../hooks/useFetchApi.js';

const columns = [
  {
    title: 'Vai trò',
    dataIndex: 'role',
    ellipsis: true,
    width: 240,
    render: (text, record) => {
      return <Link to={`/role/${record.id}`}>{text}</Link>;
    },
  },
  {
    title: 'Quyền hạn',
    dataIndex: 'permissions',
  },
];

const Role = () => {
  const { data, setData, loading } = useFetchApi({
    url: '/settings?type=getRoles',
  });

  useEffect(() => {
    if (loading) return;
    if (!loading && data.roles) {
      setData(data);
    }
  }, [loading]);

  const dataSource = data?.roles?.map((role) => {
    return {
      id: role.id,
      role: role.name,
      permissions: role.Permissions.map((permission) => permission.name).join(
        ', '
      ),
    };
  });

  return (
    <Flex vertical gap={16}>
      <Breadcrumb
        items={[
          {
            href: '/',
            title: <HomeOutlined />,
          },
          {
            href: '/settings/permissions-settings',
            title: 'Cài đặt phân quyền',
          },
        ]}
      />
      <Card title="Phân quyền hệ thống">
        <Flex vertical gap={16}>
          <Table
            loading={loading}
            rowKey="key"
            columns={columns}
            dataSource={dataSource}
            bordered
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Role;
