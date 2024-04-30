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
import { useApp } from '../../contexts/appProvider';
import useFetchApi from '../../hooks/useFetchApi';
import { Link, useNavigate } from 'react-router-dom';
import CreateForm from './CreateForm/CreateForm';
import hasPermission from '../../helpers/hasPermission';
import {
  EQUIPMENT_CREATE,
  EQUIPMENT_DELETE,
  EQUIPMENT_READ,
} from '../../const/permission';
import useDeleteApi from '../../hooks/useDeleteApi';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';

const Equipment = () => {
  const navigate = useNavigate();
  const { setToast } = useApp();
  const { deleting, deleteApi } = useDeleteApi(`/equipment`);
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);

  const { data, fetchApi, setData, loading } = useFetchApi({
    url: '/equipments',
    defaultData: [],
  });
  const breadcrumbItems = useBreadcrumb([
    {
      path: '/',
      title: <HomeOutlined />,
    },
    {
      path: '/equipments',
      title: 'Quản lý thiết bị',
    },
  ]);
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
          {hasPermission(EQUIPMENT_READ) && (
            <Popover content="Xem chi tiết" trigger="hover">
              <Button
                type="text"
                icon={<EyeOutlined />}
                onClick={() => navigate(`/equipment/${record.id}`)}
              />
            </Popover>
          )}
          {hasPermission(EQUIPMENT_DELETE) && (
            <Popover content="Xóa thiết bị" trigger="hover">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteEquipment(record.id)}
              />
            </Popover>
          )}
        </Space>
      ),
    },
  ];

  const handleDeleteEquipment = async (id) => {
    try {
      const res = await deleteApi(id);
      if (res.data.success) {
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
      setToast('Xóa thất bại', 'error');
    } finally {
      setToast('Xóa thành công');
    }
  };

  if (loading)
    return (
      <Flex vertical gap={16}>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title="Danh sách thiết bị"
          extra={
            hasPermission(EQUIPMENT_CREATE) && (
              <Button type="primary" icon={<PlusOutlined />} disabled>
                Tạo mới
              </Button>
            )
          }
        >
          <Table loading columns={columns} bordered />
        </Card>
      </Flex>
    );

  return (
    <Flex vertical gap={16}>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title="Danh sách thiết bị"
        extra={
          hasPermission(EQUIPMENT_CREATE) && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsShowCreateForm(true)}
              disabled={deleting}
            >
              Tạo mới
            </Button>
          )
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
