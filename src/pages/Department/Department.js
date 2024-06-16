import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  Flex,
  Breadcrumb,
  Table,
  Button,
  Space,
  Popover,
  Avatar,
} from 'antd';
import {
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
  ApartmentOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  DEPARTMENT_CREATE,
  DEPARTMENT_DELETE,
  DEPARTMENT_UPDATE,
} from '../../const/permission.js';
import hasPermission from '../../helpers/hasPermission.js';
import { useBreadcrumb } from '../../hooks/useBreadcrumb.js';
import Page from '../../components/Page/Page.js';
import CreateModal from './CreateModal.js';
import useDeleteApi from '../../hooks/useDeleteApi.js';
import { useAppContext } from '../../contexts/appContext.js';
import EditModal from './EditModal.js';

const Department = () => {
  const navigate = useNavigate();
  const {
    departments: data,
    loadingDepartments: loading,
    fetchDepartments: fetchApi,
  } = useAppContext();

  const { deleting, deleteApi } = useDeleteApi({
    url: `/department`,
    successCallback: () => fetchApi(),
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null); // Added state for the record being edited

  const [deleteId, setDeleteId] = useState(null);
  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'hinhAnh',
      width: '10%',
      align: 'center',
      render: (_, record) => {
        return (
          <Avatar
            src={record.hinhAnh}
            icon={<ApartmentOutlined />}
            shape="square"
            size={'large'}
          />
        );
      },
    },
    {
      title: 'Tên khoa phòng',
      dataIndex: 'tenKhoaPhong',
      render: (text, record) => {
        return <Link to={`/department/${record.id}`}>{text}</Link>;
      },
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diaChi',
    },
    {
      title: 'Số điện thoại',
      width: '16%',
      dataIndex: 'soDienThoai',
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '15%',
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Popover content="Xem chi tiết" trigger="hover">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/department/${record.id}`)}
            />
          </Popover>
          {hasPermission(DEPARTMENT_UPDATE) && (
            <Popover content="Cập nhật khoa phòng" trigger="hover">
              <Button
                type="link"
                disabled={deleting && deleteId === record.id}
                icon={<EditOutlined />}
                onClick={() => {
                  setEditingRecord(record); // Set the record being edited
                  setShowEditModal(true);
                }}
              />
            </Popover>
          )}
          {hasPermission(DEPARTMENT_DELETE) && (
            <Popover content="Xóa khoa phòng" trigger="hover">
              <Button
                type="link"
                danger
                loading={deleting && deleteId === record.id}
                icon={<DeleteOutlined />}
                onClick={() => {
                  setDeleteId(record.id);
                  deleteApi(record.id);
                }}
              />
            </Popover>
          )}
        </Space>
      ),
    },
  ];

  const breadcrumbItems = useBreadcrumb([
    {
      href: '/departments',
      title: 'Danh sách khoa phòng',
    },
  ]);
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);

  const renderEditModal = (record) => {
    return (
      <EditModal
        open={showEditModal}
        setOpen={setShowEditModal}
        input={record}
        fetchApi={fetchApi}
      />
    );
  };

  return (
    <Page>
      {showEditModal && renderEditModal(editingRecord)}{' '}
      {/* Call the renderEditModal function */}
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title="Danh sách khoa phòng trong hệ thống"
        extra={
          hasPermission(DEPARTMENT_CREATE) && (
            <Button
              type="primary"
              disabled={loading || deleting}
              icon={<PlusOutlined />}
              onClick={() => setIsShowCreateForm(true)}
            >
              Tạo mới
            </Button>
          )
        }
      >
        <Flex vertical gap={16}>
          <CreateModal
            fetchApi={fetchApi}
            setIsShowCreateForm={setIsShowCreateForm}
            isShowCreateForm={isShowCreateForm}
          />

          <Table
            loading={loading}
            columns={columns}
            dataSource={data}
            bordered
          />
        </Flex>
      </Card>
    </Page>
  );
};

export default Department;
