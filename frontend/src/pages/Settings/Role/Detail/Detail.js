import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import { HomeOutlined } from '@ant-design/icons';

import useFetchApi from '../../../../hooks/useFetchApi.js';

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

const DetailRole = () => {
  const { id } = useParams();
  console.log(id);
  // const [dataSource, setDataSource] = useState([]);

  const { data, fetchApi, setData, loading, handleChangeInput } = useFetchApi({
    url: `settings/role/${id}`,
  });

  useEffect(() => {
    if (loading) return;
    if (!loading && data.roles) {
      setData(data);
    }
  }, [loading]);

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
        <Flex vertical gap={16}></Flex>
      </Card>
    </Flex>
  );
};

export default DetailRole;
