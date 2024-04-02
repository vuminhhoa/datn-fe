import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Flex,
  Row,
  Col,
  Tag,
  Space,
  Table,
  Avatar,
  Typography,
  Breadcrumb,
  Button,
} from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/authProvider';

const columns = [
  {
    title: 'Tên hoạt động',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Khoa phòng đề xuất',
    dataIndex: 'departmentalProposal',
    key: 'departmentalProposal',
  },

  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    render: (_, record) => {
      if (record.status === 'approved')
        return <Tag color="success">Chấp thuận</Tag>;
      if (record.status === 'reject') return <Tag color="error">Từ chối</Tag>;
      return <Tag color="processing">Chờ duyệt</Tag>;
    },
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (_, record) => (
      <Space size="small">
        <Button type="link" icon={<EyeOutlined />}>
          Xem chi tiết
        </Button>
        {record.status === 'processing' && (
          <Button type="text" danger icon={<DeleteOutlined />}>
            {' '}
            Xóa
          </Button>
        )}
      </Space>
    ),
  },
];
const data = [
  {
    id: 1,
    name: 'Mua may sieu am',
    departmentalProposal: 'Khoa vi sinh',
    status: 'approved',
  },
  {
    id: 2,
    name: 'Mua may tinh luong tu',
    departmentalProposal: 'Khoa deptrai',
    status: 'reject',
  },
  {
    id: 3,
    name: 'Mua may tinh deptrai',
    departmentalProposal: 'Khoa ádasdas',
    status: 'processing',
  },
];
const Bidding = () => {
  return (
    <Flex vertical gap={16}>
      <Breadcrumb
        items={[
          {
            href: '/',
            title: <HomeOutlined />,
          },
          {
            href: '/shopping/bidding',
            title: 'Hoạt động mua sắm qua đấu thầu',
          },
        ]}
      />
      <Card title="Danh sách hoạt động mua sắm qua đấu thầu">
        <Table columns={columns} dataSource={data} bordered />
      </Card>
    </Flex>
  );
};

export default Bidding;
