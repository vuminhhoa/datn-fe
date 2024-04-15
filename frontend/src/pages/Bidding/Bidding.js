import React, { useState } from 'react';
import {
  Card,
  Flex,
  Tag,
  Space,
  Table,
  Breadcrumb,
  Modal,
  Input,
  Button,
  Select,
  Form,
  Popover,
} from 'antd';
import { HomeOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/authProvider';
import axios from 'axios';
import useFetchApi from '../../hooks/useFetchApi';
import { Link, useNavigate } from 'react-router-dom';

const Bidding = () => {
  const navigate = useNavigate();
  const { setToast } = useAuth();
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form] = Form.useForm();

  const { data, fetchApi, setData, loading } = useFetchApi({
    url: '/biddings',
    defaultData: [],
  });
  const defaultCreateFormData = {
    trangThaiDeXuat: 'processing',
    khoaPhongDeXuat: '',
    noiDungDeXuat: '',
    tenDeXuat: '',
  };
  const [createFormData, setCreateFormData] = useState(defaultCreateFormData);
  const handleCreateFormChange = (e) => {
    setCreateFormData({
      ...createFormData,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    {
      title: 'Tên hoạt động',
      dataIndex: 'tenDeXuat',
      key: 'tenDeXuat',
      render: (text, record) => (
        <Link to={`/shopping/bidding/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Khoa phòng đề xuất',
      dataIndex: 'khoaPhongDeXuat',
      key: 'khoaPhongDeXuat',
    },

    {
      title: 'Trạng thái',
      key: 'trangThaiDeXuat',
      dataIndex: 'trangThaiDeXuat',
      render: (_, record) => {
        if (record.trangThaiDeXuat === 'approved')
          return <Tag color="success">Chấp thuận</Tag>;
        if (record.trangThaiDeXuat === 'reject')
          return <Tag color="error">Từ chối</Tag>;
        return <Tag color="processing">Chờ duyệt</Tag>;
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },

    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Popover content="Xem chi tiết" trigger="hover">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/shopping/bidding/${record.id}`)}
            />
          </Popover>

          {record.trangThaiDeXuat === 'processing' && (
            <Popover content="Xóa hoạt động" trigger="hover">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteBidding(record.id)}
              />
            </Popover>
          )}
        </Space>
      ),
    },
  ];

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

  const handleDeleteBidding = async (id) => {
    try {
      setDeleting(true);
      const res = await axios({
        method: 'DELETE',
        url: `http://localhost:5000/api/bidding/${id}`,
      });
      if (res.data.success) {
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
      setToast('Xóa thất bại', 'error');
    } finally {
      setToast('Xóa thành công');
      setDeleting(false);
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
            disabled={deleting}
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
                name="tenDeXuat"
                label="Tên hoạt động"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên hoạt động!' },
                ]}
              >
                <Input
                  allowClear
                  name="tenDeXuat"
                  placeholder="Nhập tên hoạt động"
                  onChange={handleCreateFormChange}
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item
                name="khoaPhongDeXuat"
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
                      khoaPhongDeXuat: value,
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
              <Form.Item name="noiDungDeXuat" label="Nội dung hoạt động">
                <Input.TextArea
                  name="noiDungDeXuat"
                  allowClear
                  placeholder="Nhập nội dung hoạt động hoạt động"
                  rows={4}
                  onChange={handleCreateFormChange}
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

          <Table
            columns={columns}
            dataSource={data}
            bordered
            disabled={deleting}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Bidding;
