import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  Popconfirm,
  message,
  Typography,
  Form,
  Alert,
  Tooltip,
  Space,
  Flex,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { formatVNCurrency } from '../../../../helpers/formatVNCurrency.js';
import { EditableCell } from '../EditableCell.js';
import { useImportEquipmentsExcelContext } from '../../../../contexts/importEquipmentsExcelContext.js';
import '../../ImportEquipmentsByExcel.css';
import fetchAuthApi from '../../../../helpers/fetchAuthApi.js';

const ExcelItem = ({
  equipmentToCompare,
  setEquipmentToCompare,
  initEquipmentToCompare,
}) => {
  const { data } = useImportEquipmentsExcelContext();
  const [editingKey, setEditingKey] = useState('');
  const [showDeleteWarningBanner, setShowDeleteWarningBanner] = useState(false);
  const [form] = Form.useForm();
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  useEffect(() => {
    if (JSON.stringify(equipmentToCompare) === '{}') return;
    setShowDeleteWarningBanner(false);
  }, [equipmentToCompare]);

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (record) => {
    try {
      const row = await form.validateFields();
      const kyMaHieuExists = data.find(
        (item) => item.kyMaHieu === row.kyMaHieu && item.key !== record.key
      );
      const resp = await fetchAuthApi({
        url: `/equipment/${row.kyMaHieu}?key=kyMaHieu`,
      });

      const kyMaHieuExistslInDb = resp.data.equipment;

      if (kyMaHieuExists) {
        message.error(
          'Ký mã hiệu đã tồn tại. Vui lòng chọn một ký mã hiệu khác.'
        );
        return;
      }

      if (kyMaHieuExistslInDb) {
        message.error(
          'Ký mã hiệu đã tồn tại trong CSDL. Vui lòng chọn một ký mã hiệu khác.'
        );
        return;
      }
      setEquipmentToCompare({ ...equipmentToCompare, ...row });
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Tên thiết bị',
      dataIndex: 'tenThietBi',
      key: 'tenThietBi',
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
      width: '7%',
      editable: true,
    },
    {
      title: 'Ký mã hiệu',
      dataIndex: 'kyMaHieu',
      key: 'kyMaHieu',
      width: '13%',
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
      render: (_, record) =>
        record.donGia ? formatVNCurrency(record.donGia) : '',
    },
    {
      title: 'Thành tiền',
      dataIndex: 'thanhTien',
      key: 'thanhTien',
      width: '8%',
      align: 'right',
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
            <Tooltip title={'Reset về ban đầu'}>
              <Button
                style={{ padding: '0px' }}
                type="link"
                disabled={
                  editingKey !== '' ||
                  JSON.stringify(equipmentToCompare) ===
                    JSON.stringify(initEquipmentToCompare)
                }
                onClick={() => {
                  setShowDeleteWarningBanner(false);
                  setEquipmentToCompare(initEquipmentToCompare);
                }}
                icon={<RollbackOutlined />}
              />
            </Tooltip>

            <Tooltip title={'Sửa TB nhập'}>
              <Button
                style={{ padding: '0px' }}
                type="link"
                disabled={
                  editingKey !== '' ||
                  JSON.stringify(equipmentToCompare) === '{}'
                }
                onClick={() => edit(record)}
                icon={<EditOutlined />}
              />
            </Tooltip>

            <Tooltip title={'Xóa TB nhập'}>
              <Button
                style={{ padding: '0px' }}
                disabled={JSON.stringify(equipmentToCompare) === '{}'}
                type="link"
                onClick={() => {
                  setEquipmentToCompare({});
                  setShowDeleteWarningBanner(true);
                }}
                icon={<DeleteOutlined />}
                danger
              />
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
    <Flex vertical gap={8}>
      {showDeleteWarningBanner && (
        <Alert
          message="Dữ liệu thiết bị trong danh sách thiết bị nhập sẽ bị xóa"
          type="warning"
          showIcon
          closable
        />
      )}
      <Typography.Title
        level={5}
        style={{ margin: '0px', paddingBottom: '8px' }}
      >
        Thiết bị nhập excel:
      </Typography.Title>
      <Form form={form} component={false}>
        <Table
          dataSource={[equipmentToCompare]}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          columns={mergedColumns}
          pagination={false}
        />
      </Form>
    </Flex>
  );
};

export default ExcelItem;
