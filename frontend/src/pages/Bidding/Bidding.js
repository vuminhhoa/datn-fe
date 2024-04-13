import React, { useEffect, useState } from 'react';
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
  Modal,
  Input,
  Button,
  Select,
  Form,
} from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import {
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../contexts/authProvider';
import axios from 'axios';
import useFetchApi from '../../hooks/useFetchApi';

const columns = [
  {
    title: 'Tên hoạt động',
    dataIndex: 'biddingName',
    key: 'biddingName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Khoa phòng đề xuất',
    dataIndex: 'proposedDepartmentName',
    key: 'proposedDepartmentName',
  },

  {
    title: 'Trạng thái',
    key: 'proposedStatus',
    dataIndex: 'proposedStatus',
    render: (_, record) => {
      if (record.proposedStatus === 'approved')
        return <Tag color="success">Chấp thuận</Tag>;
      if (record.proposedStatus === 'reject')
        return <Tag color="error">Từ chối</Tag>;
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
        {record.proposedStatus === 'processing' && (
          <Button type="text" danger icon={<DeleteOutlined />}>
            {' '}
            Xóa
          </Button>
        )}
      </Space>
    ),
  },
];
const dataDefault = [
  {
    id: 1,
    biddingName: 'Mua may sieu am',
    proposedDepartmentName: 'Khoa vi sinh',
    proposedStatus: 'approved',
  },
  {
    id: 2,
    biddingName: 'Mua may tinh luong tu',
    proposedDepartmentName: 'Khoa deptrai',
    proposedStatus: 'reject',
  },
  {
    id: 3,
    biddingName: 'Mua may tinh deptrai',
    proposedDepartmentName: 'Khoa ádasdas',
    proposedStatus: 'processing',
  },
];
const Bidding = () => {
  const { setToast } = useAuth();
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();

  const { data, fetchApi, setData, loading, handleChangeInput } = useFetchApi({
    url: '/biddings',
    defaultData: dataDefault,
  });
  const defaultCreateFormData = {
    proposedStatus: 'processing',
    proposedDepartmentName: '',
    biddingName: '',
  };
  const [createFormData, setCreateFormData] = useState(defaultCreateFormData);
  const handleCreateFormChange = (e) => {
    setCreateFormData({
      ...createFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateBidding = async () => {
    try {
      setCreating(true);
      console.log(createFormData);
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:5000/api/bidding',
        data: createFormData,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      setToast('Tạo mới thất bại', 'error');
    } finally {
      setToast('Tạo mới thành công');
      setCreating(false);
      setIsShowCreateForm(false);
      fetchApi();
    }
  };

  if (loading)
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
        <Card
          title="Danh sách hoạt động mua sắm qua đấu thầu"
          extra={
            <Button type="primary" icon={<PlusOutlined />} disabled>
              Tạo mới
            </Button>
          }
        >
          <Table loading columns={columns} bordered />
        </Card>
      </Flex>
    );

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
      <Card
        title="Danh sách hoạt động mua sắm qua đấu thầu"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsShowCreateForm(true)}
          >
            Tạo mới
          </Button>
        }
      >
        <Flex gap={16} vertical>
          <Modal
            title="Tạo mới hoạt động"
            open={isShowCreateForm}
            onCancel={() => setIsShowCreateForm(false)}
            footer={null}
          >
            <Form
              autoComplete="off"
              onFinish={handleCreateBidding}
              form={form}
              layout="vertical"
            >
              <Form.Item
                name="biddingName"
                label="Tên hoạt động"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên hoạt động!' },
                ]}
              >
                <Input
                  allowClear
                  name="biddingName"
                  placeholder="Nhập tên hoạt động"
                  onChange={handleCreateFormChange}
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item
                name="proposedDepartmentName"
                label="Khoa phòng đề xuất"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn khoa phòng đề xuất!',
                  },
                ]}
              >
                <Select
                  allowClear
                  placeholder="Chọn khoa phòng đề xuất"
                  onChange={(value) =>
                    setCreateFormData({
                      ...createFormData,
                      proposedDepartmentName: value,
                    })
                  }
                  options={[
                    {
                      value: 'Khoa vi sinh',
                      label: 'Khoa vi sinh',
                    },
                    {
                      value: 'Khoa y te',
                      label: 'Khoa y te',
                    },
                    {
                      value: 'Khoa dep trai',
                      label: 'Khoa dep trai',
                    },
                    {
                      value: 'Khoa xinh gai',
                      label: 'Khoa xinh gai',
                    },
                  ]}
                />
              </Form.Item>

              <Flex gap={8} justify="flex-end">
                <Button key="back" onClick={() => setIsShowCreateForm(false)}>
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit" loading={creating}>
                  Lưu
                </Button>
              </Flex>
            </Form>
          </Modal>

          <Table columns={columns} dataSource={data} bordered />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Bidding;
