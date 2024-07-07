import React, { useState } from 'react';
import { Table, Modal } from 'antd';
import { formatVNCurrency } from '../../../helpers/formatVNCurrency.js';
import { useAppContext } from '../../../contexts/appContext.js';
import SearchInput from '../../ImportEquipmentsByExcel/Components/SearchInput.js';

const PreviewModal = ({ data, active, setActive }) => {
  const { departments } = useAppContext();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

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
      render: (_, record) =>
        departments.find((dep) => dep.id === record.DepartmentId)?.tenKhoaPhong,
    },
  ];

  return (
    <Modal
      title="Xem trước danh sách thiết bị nhập"
      open={active}
      onCancel={() => setActive(false)}
      footer={null}
      width={1200}
    >
      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          total: data.length,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên tổng ${total} thiết bị`,
          locale: {
            items_per_page: 'thiết bị / trang',
          },
        }}
      />
    </Modal>
  );
};

export default PreviewModal;
