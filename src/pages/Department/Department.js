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
} from '@ant-design/icons';
import {
  DEPARTMENT_CREATE,
  DEPARTMENT_DELETE,
} from '../../const/permission.js';
import hasPermission from '../../helpers/hasPermission.js';
import { useBreadcrumb } from '../../hooks/useBreadcrumb.js';
import Page from '../../components/Page/Page.js';
import CreateModal from './CreateModal.js';
import useDeleteApi from '../../hooks/useDeleteApi.js';
import { useAppContext } from '../../contexts/appContext.js';

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
          {hasPermission(DEPARTMENT_DELETE) && (
            <Popover content="Xóa thiết bị" trigger="hover">
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

  return (
    <Page>
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
