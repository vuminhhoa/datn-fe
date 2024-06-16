import React, { useState, useEffect } from 'react';
import {
  Card,
  Flex,
  Space,
  Table,
  Breadcrumb,
  Button,
  Avatar,
  Popover,
} from 'antd';
import {
  HomeOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  FileImageOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {} from '@ant-design/icons';
import useFetchApi from '../../hooks/useFetchApi';
import { Link, useNavigate } from 'react-router-dom';
import hasPermission from '../../helpers/hasPermission';
import {
  EQUIPMENT_CREATE,
  EQUIPMENT_DELETE,
  EQUIPMENT_UPDATE,
} from '../../const/permission';
import useDeleteApi from '../../hooks/useDeleteApi';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import Page from '../../components/Page';
import { formatVNCurrency } from '../../helpers/formatVNCurrency';
import queryString from 'query-string';
import CreateModal from './CreateModal';
import Filter from './Filter';
import UpdateEquipmentForm from './UpdateModal';

const Equipment = () => {
  const navigate = useNavigate();
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: '',
    sortKey: 'updatedAt',
    direction: 'DESC',
    phanKhoa: [],
    phanLoaiNhap: [],
    xuatXu: [],
    donVi: [],
    departmentIds: [],
    biddingIds: [],
  });

  const [selectedColumns, setSelectedColumns] = useState([
    'hinhAnh',
    'tenThietBi',
    'donVi',
    'soLuong',
    'kyMaHieu',
    'hangSanXuat',
    'xuatXu',
    'donGia',
    'thanhTien',
    'phanKhoa',
    'duAn',
    'action',
  ]);

  const {
    page,
    limit,
    search,
    sortKey,
    direction,
    donVi,
    xuatXu,
    phanLoaiNhap,
    departmentIds,
    biddingIds,
  } = query;

  const searchParams = {
    page,
    limit,
    search,
    sortKey,
    direction,
    donVi: donVi.join(','),
    xuatXu: xuatXu.join(','),
    phanLoaiNhap: phanLoaiNhap.join(','),
    departmentIds: departmentIds.join(','),
    biddingIds: biddingIds.join(','),
  };

  const reFetchUrl = '/equipments?' + queryString.stringify(searchParams);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null); // Added state for the record being edited

  const { data, fetchApi, loading, pageInfo } = useFetchApi({
    url: reFetchUrl,
    defaultData: [],
    withPagination: true,
  });

  const { deleting, deleteApi } = useDeleteApi({
    url: `/equipment`,
    successCallback: () => fetchApi(),
  });

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!isFirstLoad || loading) return;
    setIsFirstLoad(false);
  }, [data, isFirstLoad, loading]);

  const breadcrumbItems = useBreadcrumb([
    {
      path: '/',
      title: <HomeOutlined />,
    },
    {
      path: '/equipments/list_equipments',
      title: 'Danh sách thiết bị',
    },
  ]);

  const allColumns = [
    {
      title: 'Ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      width: '4%',
      render: (_, record) => {
        return (
          <Avatar
            src={record.hinhAnh}
            icon={<FileImageOutlined />}
            shape="square"
            size={'large'}
          />
        );
      },
      editable: true,
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'tenThietBi',
      key: 'tenThietBi',
      render: (text, record) => (
        <Link to={`/equipment/${record.id}`}>{text}</Link>
      ),
      editable: true,
    },
    {
      title: 'Đơn vị',
      dataIndex: 'donVi',
      key: 'donVi',
      editable: true,
    },
    {
      title: 'SL',
      dataIndex: 'soLuong',
      key: 'soLuong',
      align: 'right',
      editable: true,
    },
    {
      title: 'Ký mã hiệu',
      dataIndex: 'kyMaHieu',
      key: 'kyMaHieu',
      editable: true,
    },
    {
      title: 'Hãng sản xuất',
      dataIndex: 'hangSanXuat',
      key: 'hangSanXuat',
      editable: true,
    },
    {
      title: 'Xuất xứ',
      dataIndex: 'xuatXu',
      key: 'xuatXu',
      editable: true,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'donGia',
      key: 'donGia',
      align: 'right',
      editable: true,
      render: (_, record) => {
        return formatVNCurrency(record.donGia);
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'thanhTien',
      key: 'thanhTien',
      align: 'right',
      sorter: (a, b) => a.soLuong * a.donGia - b.soLuong * b.donGia,
      render: (_, record) => {
        if (record.soLuong && record.donGia) {
          return formatVNCurrency(record.soLuong * record.donGia);
        }
      },
    },
    {
      title: 'Phân khoa',
      dataIndex: 'phanKhoa',
      key: 'phanKhoa',
      editable: true,
      render: (_, record) => record?.Department?.tenKhoaPhong,
    },
    {
      title: 'Dự án',
      dataIndex: 'duAn',
      key: 'duAn',
      editable: true,
      render: (_, record) => record?.Bidding?.tenDeXuat,
    },

    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Popover content="Xem chi tiết" trigger="hover">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/equipment/${record.id}`)}
            />
          </Popover>
          {hasPermission(EQUIPMENT_UPDATE) && (
            <Popover content="Cập nhật thiết bị" trigger="hover">
              <Button
                type="link"
                disabled={deleting && deletingId === record.id}
                icon={<EditOutlined />}
                onClick={() => {
                  setEditingRecord(record); // Set the record being edited
                  setShowEditModal(true);
                }}
              />
            </Popover>
          )}
          {hasPermission(EQUIPMENT_DELETE) && (
            <Popover content="Xóa thiết bị" trigger="hover">
              <Button
                type="link"
                danger
                loading={deleting && deletingId === record.id}
                icon={<DeleteOutlined />}
                onClick={() => {
                  setDeletingId(record.id);
                  deleteApi(record.id);
                }}
              />
            </Popover>
          )}
        </Space>
      ),
    },
  ];

  const handlePaginationChange = (page, pageSize) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      page,
      limit: pageSize,
    }));
  };

  const renderEditModal = (record) => {
    return (
      <UpdateEquipmentForm
        open={showEditModal}
        setOpen={setShowEditModal}
        equipment={record}
        fetchApi={fetchApi}
      />
    );
  };

  return (
    <Page fullWidth={true}>
      {showEditModal && renderEditModal(editingRecord)}{' '}
      {/* Call the renderEditModal function */}
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title="Danh sách thiết bị"
        extra={
          hasPermission(EQUIPMENT_CREATE) && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setIsShowCreateForm(true);
              }}
              disabled={deleting}
            >
              Tạo mới
            </Button>
          )
        }
      >
        <Flex gap={16} vertical>
          <CreateModal
            fetchApi={fetchApi}
            setIsShowCreateForm={setIsShowCreateForm}
            isShowCreateForm={isShowCreateForm}
          />

          <Filter
            allColumns={allColumns}
            data={data}
            fetchApi={fetchApi}
            loading={loading}
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
            query={query}
            setQuery={setQuery}
          />

          <Table
            columns={allColumns.filter((col) =>
              selectedColumns.includes(col.key)
            )}
            dataSource={data}
            bordered
            loading={loading}
            pagination={{
              current: page,
              pageSize: limit,
              total: pageInfo.total,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} trên tổng ${total} thiết bị`,
              onChange: handlePaginationChange,
              locale: {
                items_per_page: 'thiết bị / trang',
              },
            }}
            disabled={deleting}
          />
        </Flex>
      </Card>
    </Page>
  );
};

export default Equipment;
