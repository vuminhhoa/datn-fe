import React, { useState, useEffect } from 'react';
import {
  Card,
  Flex,
  Tag,
  Space,
  Table,
  Select,
  Breadcrumb,
  Modal,
  Input,
  Spin,
  Button,
  Radio,
  Popover,
  Divider,
} from 'antd';
import {
  HomeOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import {} from '@ant-design/icons';
import { useApp } from '../../contexts/appProvider';
import useFetchApi from '../../hooks/useFetchApi';
import { Link, useNavigate } from 'react-router-dom';
import CreateEquipmentForm from '../Equipment/Form/Create';
import hasPermission from '../../helpers/hasPermission';
import { EQUIPMENT_CREATE, EQUIPMENT_DELETE } from '../../const/permission';
import useDeleteApi from '../../hooks/useDeleteApi';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import Page from '../../components/Page';
import { formatVNCurrency } from '../../helpers/formatVNCurrency';
import queryString from 'query-string';
import {
  defaultDonViTinh,
  defaultKhoaPhong,
  defaultPhanLoaiNhap,
  defaultXuatXu,
} from '../../const/default';

const Equipment = () => {
  const navigate = useNavigate();
  const { setToast } = useApp();
  const { deleting, deleteApi } = useDeleteApi(`/equipment`);
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const [showFilter, setShowFilter] = useState('');
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
  });

  const {
    page,
    limit,
    search,
    sortKey,
    direction,
    phanKhoa,
    donVi,
    xuatXu,
    phanLoaiNhap,
  } = query;
  const searchParams = {
    page,
    limit,
    search,
    sortKey,
    direction,
    phanKhoa: phanKhoa.join(','),
    donVi: donVi.join(','),
    xuatXu: xuatXu.join(','),
    phanLoaiNhap: phanLoaiNhap.join(','),
  };

  const reFetchUrl = '/equipments?' + queryString.stringify(searchParams);
  const [inputTimeout, setInputTimeout] = useState();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const { data, fetchApi, setData, loading, pageInfo } = useFetchApi({
    url: reFetchUrl,
    defaultData: [],
    withPagination: true,
  });
  useEffect(() => {
    if (!isFirstLoad || loading) return;
    setIsFirstLoad(false);
  }, [data, isFirstLoad, loading]);

  useEffect(() => {
    if (loading) return;
    clearTimeout(inputTimeout);
    const newTimeout = setTimeout(() => {
      fetchApi();
    }, 700);
    setInputTimeout(newTimeout);
    return () => clearTimeout(newTimeout);
  }, [phanKhoa, donVi, xuatXu, phanLoaiNhap, search]);

  useEffect(() => {
    if (loading) return;
    fetchApi();
  }, [page, limit, sortKey, direction]);

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

  const columns = [
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
      width: '5%',
      editable: true,
    },
    {
      title: 'Số lượng',
      dataIndex: 'soLuong',
      key: 'soLuong',
      align: 'right',
      width: '6%',
      editable: true,
    },
    {
      title: 'Ký mã hiệu',
      dataIndex: 'kyMaHieu',
      key: 'kyMaHieu',
      width: '10%',
      editable: true,
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
      width: '8%',
      editable: true,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'donGia',
      key: 'donGia',
      width: '8%',
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

  const handlePaginationChange = (page, pageSize) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      page,
      limit: pageSize,
    }));
  };

  if (loading && isFirstLoad)
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
          <Flex gap={16} align="center">
            <Input
              placeholder="Nhập từ khóa để tìm kiếm"
              value={search}
              onChange={(e) => setQuery({ ...query, search: e.target.value })}
              allowClear
            />
            {loading && <Spin />}
            {!showFilter ? (
              <Button
                icon={<FilterOutlined />}
                onClick={() => setShowFilter(!showFilter)}
              >
                Lọc
              </Button>
            ) : (
              <Button onClick={() => setShowFilter(!showFilter)} type="text">
                Hủy
              </Button>
            )}
            <Popover
              content={
                <>
                  <Radio.Group
                    onChange={(e) => {
                      const val = e.target.value;
                      setQuery({ ...query, sortKey: val });
                    }}
                    value={sortKey}
                  >
                    <Space direction="vertical">
                      <Radio value={'updatedAt'}>Ngày cập nhật</Radio>
                      <Radio value={'createdAt'}>Ngày tạo</Radio>
                      <Radio value={'tenThietBi'}>Tên thiết bị</Radio>
                      <Radio value={'soLuong'}>Số lượng</Radio>
                      <Radio value={'donGia'}>Đơn giá</Radio>
                      <Radio value={'kyMaHieu'}>Ký mã hiệu</Radio>
                    </Space>
                  </Radio.Group>
                  <Divider style={{ margin: '8px 0px 8px 0px' }} />
                  <Radio.Group
                    onChange={(e) => {
                      const val = e.target.value;
                      setQuery({ ...query, direction: val });
                    }}
                    value={direction}
                  >
                    <Space direction="vertical">
                      <Radio value={'ASC'}>
                        <Flex gap={'8px'}>
                          Tăng dần
                          <SortDescendingOutlined />
                        </Flex>
                      </Radio>
                      <Radio value={'DESC'}>
                        <Flex gap={'8px'}>
                          Giảm dầm
                          <SortAscendingOutlined />
                        </Flex>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </>
              }
              title="Sắp xếp theo"
              trigger="click"
              placement="bottom"
            >
              <Button icon={<SortAscendingOutlined />}>Sắp xếp</Button>
            </Popover>
          </Flex>
          {showFilter && (
            <Flex gap={16}>
              <Select
                mode="multiple"
                placeholder="Lọc theo phân khoa"
                defaultValue={phanKhoa}
                allowClear
                onChange={(val) => setQuery({ ...query, phanKhoa: val })}
                style={{
                  width: '100%',
                }}
                options={defaultKhoaPhong}
              />
              <Select
                mode="multiple"
                placeholder="Lọc theo xuất xứ"
                defaultValue={xuatXu}
                onChange={(val) => setQuery({ ...query, xuatXu: val })}
                style={{
                  width: '100%',
                }}
                allowClear
                options={defaultXuatXu}
              />
              <Select
                mode="multiple"
                placeholder="Lọc theo phân loại nhập"
                defaultValue={phanLoaiNhap}
                onChange={(val) => setQuery({ ...query, phanLoaiNhap: val })}
                style={{
                  width: '100%',
                }}
                allowClear
                options={defaultPhanLoaiNhap}
              />
              <Select
                mode="multiple"
                placeholder="Lọc theo đơn vị tính"
                defaultValue={donVi}
                onChange={(val) => setQuery({ ...query, donVi: val })}
                style={{
                  width: '100%',
                }}
                allowClear
                options={defaultDonViTinh}
              />
            </Flex>
          )}
          <Table
            columns={columns}
            dataSource={data}
            bordered
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
