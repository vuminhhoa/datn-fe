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
  Popover,
} from 'antd';
import {
  HomeOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {} from '@ant-design/icons';
import { useApp } from '../../contexts/appProvider';
import useFetchApi from '../../hooks/useFetchApi';
import { Link, useNavigate } from 'react-router-dom';
import CreateEquipmentForm from './Form/Create';
import hasPermission from '../../helpers/hasPermission';
import {
  EQUIPMENT_CREATE,
  EQUIPMENT_DELETE,
  EQUIPMENT_READ,
} from '../../const/permission';
import useDeleteApi from '../../hooks/useDeleteApi';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import Page from '../../components/Page';
import { formatVNCurrency } from '../../helpers/formatVNCurrency';

const Equipment = () => {
  const navigate = useNavigate();
  const { setToast } = useApp();
  const { deleting, deleteApi } = useDeleteApi(`/equipment`);
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
const [query, setQuery] = useState({
  page: 1,
  limit: 10,
  search:'',
  order: 'updatedAt:desc'
  
});


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
      title: 'Danh sách thiết bị',
    },
  ]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText('');
    confirm();
  };

  const getTagColor = (phanLoaiNhap) => {
    let color = '';
    switch (phanLoaiNhap) {
      case 'Nhập đơn lẻ':
        color = 'processing';
        break;
      case 'Từ hoạt động mua sắm':
        color = 'success';
        break;
      case 'Nhập Excel':
        color = 'warning';
        break;
      default:
        color = 'default';
    }
    return {
      color: color,
      title: phanLoaiNhap,
    };
  };

  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, confirm)}
            size="small"
          >
            Đặt lại
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
  });

  const columns = [
    {
      title: 'Tên thiết bị',
      dataIndex: 'tenThietBi',
      key: 'tenThietBi',
      render: (text, record) => (
        <Link to={`/equipment/${record.id}`}>{text}</Link>
      ),
      sorter: (a, b) => a.tenThietBi.localeCompare(b.tenThietBi),
      editable: true,
      ...getColumnSearchProps('tenThietBi', 'Tìm kiếm tên thiết bị'),
    },
    {
      title: 'Đơn vị',
      dataIndex: 'donVi',
      key: 'donVi',
      width: '5%',
      editable: true,
    },
    {
      title: 'Số lượng',
      dataIndex: 'soLuong',
      key: 'soLuong',
      align: 'right',
      sorter: (a, b) => a.soLuong - b.soLuong,
      width: '4%',
      editable: true,
    },
    {
      title: 'Ký mã hiệu',
      dataIndex: 'kyMaHieu',
      key: 'kyMaHieu',
      width: '10%',
      sorter: (a, b) => a.kyMaHieu.localeCompare(b.kyMaHieu),
      editable: true,
      ...getColumnSearchProps('kyMaHieu', 'Tìm kiếm ký mã hiệu'),
    },
    {
      title: 'Hãng sản xuất',
      dataIndex: 'hangSanXuat',
      key: 'hangSanXuat',
      width: '10%',
      editable: true,
    },
    {
      title: 'Xuất xứ',
      dataIndex: 'xuatXu',
      key: 'xuatXu',
      width: '10%',
      editable: true,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'donGia',
      key: 'donGia',
      width: '8%',
      align: 'right',
      editable: true,
      sorter: (a, b) => a.donGia - b.donGia,
      render: (_, record) => {
        return formatVNCurrency(record.donGia);
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'thanhTien',
      key: 'thanhTien',
      width: '8%',
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
      width: '10%',
      editable: true,
    },
    {
      title: 'Phân loại nhập',
      key: 'phanLoaiNhap',
      width: '9%',
      dataIndex: 'phanLoaiNhap',
      render: (_, record) => {
        const equipmentTag = getTagColor(record.phanLoaiNhap);
        return <Tag color={equipmentTag.color}>{equipmentTag.title}</Tag>;
      },
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
          {hasPermission(EQUIPMENT_DELETE) && (
            <Popover content="Xóa thiết bị" trigger="hover">
              <Button
                type="link"
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
      <Page fullWidth={true}>
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
      </Page>
    );

  return (
    <Page fullWidth={true}>
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
            <CreateEquipmentForm
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
    </Page>
  );
};

export default Equipment;
