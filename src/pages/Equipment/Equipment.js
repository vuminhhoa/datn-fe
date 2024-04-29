import React, { useState } from 'react';
import {
  Card,
  Flex,
  Tag,
  Space,
  Table,
  Breadcrumb,
  Modal,
  Button,
  Popover,
} from 'antd';
import { HomeOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/authProvider';
import axios from 'axios';
import useFetchApi from '../../hooks/useFetchApi';
import { Link, useNavigate } from 'react-router-dom';
import CreateForm from './CreateForm/CreateForm';

const Equipment = () => {
  const navigate = useNavigate();
  const { setToast } = useAuth();
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { data, fetchApi, setData, loading } = useFetchApi({
    url: '/equipments',
    defaultData: [],
  });

  const columns = [
    {
      title: 'Mã thiết bị',
      dataIndex: 'maThietBi',
      key: 'maThietBi',
      render: (text, record) => (
        <Link to={`/equipment/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'tenThietBi',
      key: 'tenThietBi',
    },
    {
      title: 'Khoa phòng',
      dataIndex: 'khoaPhong',
      key: 'khoaPhong',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Serial',
      dataIndex: 'serial',
      key: 'serial',
    },

    {
      title: 'Trạng thái',
      key: 'trangThai',
      dataIndex: 'trangThai',
      render: (_, record) => {
        let tagColor = '';
        if (record.trangThai === 'Mới nhập') tagColor = 'processing';
        if (record.trangThai === 'Đã thanh lý') tagColor = 'error';
        if (record.trangThai === 'Đang hỏng') tagColor = 'warning';

        return <Tag color={tagColor}>{record.trangThai}</Tag>;
      },
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
              onClick={() => navigate(`/equipment/${record.id}`)}
            />
          </Popover>

          <Popover content="Xóa thiết bị" trigger="hover">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteEquipment(record.id)}
            />
          </Popover>
        </Space>
      ),
    },
  ];

  const handleDeleteEquipment = async (id) => {
    try {
      setDeleting(true);
      const res = await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_BASE_API_URL}/equipment/${id}`,
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
              href: '/equipments',
              title: 'Quản lý thiết bị',
            },
          ]}
        />
        <Card
          title="Danh sách thiết bị"
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
            href: '/equipments',
            title: 'Quản lý thiết bị',
          },
        ]}
      />
      <Card
        title="Danh sách thiết bị"
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
            title="Tạo mới thiết bị"
            open={isShowCreateForm}
            onCancel={() => setIsShowCreateForm(false)}
            footer={null}
          >
            <CreateForm
              fetchApi={fetchApi}
              setIsShowCreateForm={setIsShowCreateForm}
            />
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

export default Equipment;
