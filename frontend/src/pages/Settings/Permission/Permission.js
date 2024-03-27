import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Flex,
  Row,
  Col,
  Avatar,
  Typography,
  Breadcrumb,
  Button,
  Table,
  Checkbox,
  Select,
  Divider,
  Empty,
  Alert,
  Skeleton,
  Spin,
} from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { useAuth } from '../../../contexts/authProvider.js';
import useFetchApi from '../../../hooks/useFetchApi.js';
import {
  permissionsConsts,
  defaultPermissions,
} from '../../../const/permissionConsts.js';
import chunk from '../../../helpers/chunk.js';

const columns = [
  {
    title: 'Vai trò',
    dataIndex: 'role',
    ellipsis: true,
    width: 240,
    render: (text, record, index) => {
      return <Link to={`/settings/roles/${record.id}`}>{text}</Link>;
    },
  },
  {
    title: 'Quyền hạn',
    dataIndex: 'permissions',
  },
];

const PermissionSetting = () => {
  // const [dataSource, setDataSource] = useState([]);

  const { data, fetchApi, setData, loading, handleChangeInput } = useFetchApi({
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
            href: '/settings/roles-settings',
            title: 'Cài đặt phân quyền',
          },
        ]}
      />
      <Card
        title="Phân quyền hệ thống"
        extra={<Button type="primary">Tạo vai trò mới</Button>}
      >
        <Flex vertical gap={16}>
          <Table
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

export default PermissionSetting;
