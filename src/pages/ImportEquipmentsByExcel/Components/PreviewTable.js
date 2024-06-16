import React, { useState } from 'react';
import {
  Button,
  Table,
  Popconfirm,
  message,
  Typography,
  Tooltip,
  Form,
  Space,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatVNCurrency } from '../../../helpers/formatVNCurrency.js';
import { EditableCell } from './EditableCell.js';
import SearchInput from './SearchInput.js';
import { useImportEquipmentsExcelContext } from '../../../contexts/importEquipmentsExcelContext.js';
import { useAppContext } from '../../../contexts/appContext.js';

const PreviewTable = () => {
  const {
    data,
    setData,
    duplicateRows,
    duplicateEquipmentsInDb,
    selectedBidding,
    selectedDepartment,
  } = useImportEquipmentsExcelContext();
  const { departments, biddings } = useAppContext();
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const isEditing = (record) => record.key === editingKey;

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
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
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
      editable: true,
    },
    {
      title: 'Số lượng',
      dataIndex: 'soLuong',
      key: 'soLuong',
      align: 'right',
      sorter: (a, b) => a.soLuong - b.soLuong,
      editable: true,
    },
    {
      title: 'Ký mã hiệu',
      dataIndex: 'kyMaHieu',
      key: 'kyMaHieu',
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
      sorter: (a, b) => a.donGia - b.donGia,
      render: (_, record) => formatVNCurrency(record.donGia),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'thanhTien',
      key: 'thanhTien',
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
      render: () =>
        departments.find((dep) => dep.id === selectedDepartment)?.tenKhoaPhong,
    },
    {
      title: 'Dự án',
      dataIndex: 'duAn',
      key: 'duAn',
      render: () =>
        biddings.find((bidding) => bidding.id === selectedBidding)?.tenDeXuat,
    },

    {
      title: 'Hành động',
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
    <>
      <Typography.Title
        level={5}
        style={{ margin: '0px', paddingBottom: '8px' }}
      >
        Danh sách xem trước:
      </Typography.Title>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={
            duplicateRows.length === 0 && duplicateEquipmentsInDb.length === 0
              ? mergedColumns
              : mergedColumns.filter((col) => col.dataIndex !== 'action')
          }
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            total: data.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} trên tổng ${total} thiết bị`,
            locale: {
              items_per_page: 'thiết bị / trang',
            },
          }}
        />
      </Form>
    </>
  );
};

export default PreviewTable;
