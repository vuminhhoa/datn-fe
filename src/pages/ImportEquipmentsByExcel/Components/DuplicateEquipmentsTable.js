import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  Popconfirm,
  message,
  Typography,
  Alert,
  Form,
  Tooltip,
  Space,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  IssuesCloseOutlined,
} from '@ant-design/icons';
import { formatVNCurrency } from '../../../helpers/formatVNCurrency.js';
import { EditableCell } from './EditableCell.js';
import SearchInput from './SearchInput.js';
import { useImportEquipmentsExcelContext } from '../../../contexts/importEquipmentsExcelContext.js';
import fetchAuthApi from '../../../helpers/fetchAuthApi.js';
import '../ImportEquipmentsByExcel.css';
import CompareModal from './CompareModal/CompareModal.js';

const DuplicateEquipmentsTable = () => {
  const { data, setData, duplicateEquipmentsInDb, setDuplicateEquipmentsInDb } =
    useImportEquipmentsExcelContext();
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [showDuplicateEquipmentsBanner, setShowDuplicateEquipmentsBanner] =
    useState(false);
  const [equipmentInDb, setEquipmentInDb] = useState({});
  const isEditing = (record) => record.key === editingKey;
  const [fetchingEquipmentInDb, setFetchingEquipmentInDb] = useState(false);

  const [showCompareModal, setShowCompareModal] = useState(false);
  const [equipmentToCompare, setEquipmentToCompare] = useState({});

  const [initEquipmentInDb, setInitEquipmentInDb] = useState({});
  const [initEquipmentToCompare, setInitEquipmentToCompare] = useState({});

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      const kyMaHieuExists = newData.some(
        (item) => item.kyMaHieu === row.kyMaHieu && item.key !== key
      );

      if (kyMaHieuExists) {
        message.error(
          'Ký mã hiệu đã tồn tại. Vui lòng chọn một ký mã hiệu khác.'
        );
        return;
      }
      const resp = await fetchAuthApi({
        url: `/equipment/${row.kyMaHieu}?key=kyMaHieu`,
      });

      const kyMaHieuExistslInDb = resp.data.equipment;

      if (kyMaHieuExistslInDb) {
        message.error(
          'Ký mã hiệu đã tồn tại trong CSDL. Vui lòng chọn một ký mã hiệu khác.'
        );
        return;
      }

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
      } else {
        newData.push(row);
      }

      setDuplicateEquipmentsInDb(
        duplicateEquipmentsInDb.filter((item) => item.key !== key)
      );
      setData(newData);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    const newDuplicateEquipmentsInDb = duplicateEquipmentsInDb.filter(
      (item) => item.key !== key
    );
    setDuplicateEquipmentsInDb(newDuplicateEquipmentsInDb);
    setData(newData);
  };

  const handleResolveConflict = async (record) => {
    try {
      setEquipmentToCompare(record);
      setInitEquipmentToCompare(record);
      setShowCompareModal(true);
      setFetchingEquipmentInDb(true);
      const resp = await fetchAuthApi({
        url: `/equipment/${record.kyMaHieu}?key=kyMaHieu`,
        body: record,
      });

      console.log(resp.data.equipment);
      if (resp.data.success) {
        setInitEquipmentInDb({
          key: resp.data.equipment.id + 'eqInDb',
          ...resp.data.equipment,
        });
        setEquipmentInDb({
          key: resp.data.equipment.id + 'eqInDb',
          ...resp.data.equipment,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingEquipmentInDb(false);
    }
  };
  const columns = [
    {
      title: 'Tên thiết bị',
      dataIndex: 'tenThietBi',
      key: 'tenThietBi',
      sorter: (a, b) => a.tenThietBi.localeCompare(b.tenThietBi),
      editable: true,
      ...SearchInput(
        'tenThietBi',
        'Tìm kiếm tên thiết bị',
        setSearchText,
        setSearchedColumn
      ),
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
      width: '7%',
      editable: true,
    },
    {
      title: 'Ký mã hiệu',
      dataIndex: 'kyMaHieu',
      key: 'kyMaHieu',
      width: '13%',
      sorter: (a, b) => a.kyMaHieu.localeCompare(b.kyMaHieu),
      editable: true,
      ...SearchInput(
        'kyMaHieu',
        'Tìm kiếm ký mã hiệu',
        setSearchText,
        setSearchedColumn
      ),
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
      render: (_, record) => formatVNCurrency(record.donGia),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'thanhTien',
      key: 'thanhTien',
      width: '8%',
      align: 'right',
      sorter: (a, b) => a.soLuong * a.donGia - b.soLuong * b.donGia,
      render: (_, record) =>
        record.soLuong && record.donGia
          ? formatVNCurrency(record.soLuong * record.donGia)
          : '',
    },
    {
      title: 'Phân khoa',
      dataIndex: 'phanKhoa',
      key: 'phanKhoa',
      width: '10%',
      editable: true,
    },
    {
      title: 'Hành động',
      width: '8%',
      dataIndex: 'action',
      align: 'center',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size={'small'}>
            <Button
              style={{ padding: '0px' }}
              type="link"
              onClick={() => save(record.key)}
            >
              Lưu
            </Button>
            <Popconfirm
              title="Xác nhận hủy thay đổi?"
              onConfirm={cancel}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <Button style={{ padding: '0px' }} type="link">
                Hủy
              </Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space size={'small'}>
            <Tooltip title={'Xử lý trùng lặp'}>
              <Button
                style={{ padding: '0px' }}
                type="link"
                disabled={fetchingEquipmentInDb}
                onClick={() => handleResolveConflict(record)}
                icon={<IssuesCloseOutlined />}
              />
            </Tooltip>

            <Tooltip title={'Sửa TB nhập'}>
              <Button
                style={{ padding: '0px' }}
                type="link"
                disabled={editingKey !== ''}
                onClick={() => edit(record)}
                icon={<EditOutlined />}
              />
            </Tooltip>

            <Tooltip title={'Xóa TB nhập'}>
              <Popconfirm
                title="Xác nhận xóa thiết bị?"
                okText="Xác nhận"
                cancelText="Hủy"
                onConfirm={() => handleDelete(record.key)}
              >
                <Button
                  style={{ padding: '0px' }}
                  type="link"
                  icon={<DeleteOutlined />}
                  danger
                />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'soLuong' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={'large'}>
      {showDuplicateEquipmentsBanner && duplicateEquipmentsInDb.length > 0 && (
        <Alert
          message="Tìm thấy các thiết bị trùng ký mã hiệu với thiết bị trong cơ sở dữ liệu. Vui lòng xử lý các thiết bị này!"
          type="error"
          showIcon
          closable
        />
      )}

      <CompareModal
        showCompareModal={showCompareModal}
        setShowCompareModal={setShowCompareModal}
        equipmentToCompare={equipmentToCompare}
        fetchingEquipmentInDb={fetchingEquipmentInDb}
        equipmentInDb={equipmentInDb}
        setEquipmentInDb={setEquipmentInDb}
        setEquipmentToCompare={setEquipmentToCompare}
        initEquipmentInDb={initEquipmentInDb}
        initEquipmentToCompare={initEquipmentToCompare}
      />

      {duplicateEquipmentsInDb.length > 0 && (
        <div>
          <Typography.Title
            level={5}
            style={{ margin: '0px', paddingBottom: '8px' }}
          >
            Danh sách thiết bị trùng ký mã hiệu trong cơ sở dữ liệu:
          </Typography.Title>
          <Form form={form} component={false}>
            <Table
              dataSource={duplicateEquipmentsInDb}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
                total: duplicateEquipmentsInDb.length,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} trên tổng ${total} thiết bị`,
                locale: {
                  items_per_page: 'thiết bị / trang',
                },
              }}
            />
          </Form>
        </div>
      )}
    </Space>
  );
};

export default DuplicateEquipmentsTable;
