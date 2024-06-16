import React, { useEffect, useState } from 'react';
import {
  Button,
  Alert,
  Table,
  Popconfirm,
  message,
  Typography,
  Form,
  Tooltip,
  Flex,
  Space,
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

const DatabaseItem = ({
  fetchingEquipmentInDb,
  equipmentInDb,
  setEquipmentInDb,
  initEquipmentInDb,
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

  const cancel = () => {
    setEditingKey('');
  };

  useEffect(() => {
    if (JSON.stringify(equipmentInDb) === '{}') return;
    setShowDeleteWarningBanner(false);
  }, [equipmentInDb]);

  const save = async (record) => {
    try {
      const row = await form.validateFields();
      const kyMaHieuExists = data.find(
        (item) => item.kyMaHieu === row.kyMaHieu && item.key !== record.key
      );
      if (initEquipmentInDb.kyMaHieu !== equipmentInDb.kyMaHieu) {
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
      }

      if (
        kyMaHieuExists &&
        initEquipmentInDb.kyMaHieu !== equipmentInDb.kyMaHieu
      ) {
        message.error(
          'Ký mã hiệu đã tồn tại. Vui lòng chọn một ký mã hiệu khác.'
        );
        return;
      }

      setEquipmentInDb({ ...equipmentInDb, ...row });
      setEditingKey('');
      return;
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
      editable: true,
    },
    {
      title: 'Số lượng',
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
      render: (_, record) =>
        record.donGia ? formatVNCurrency(record.donGia) : '',
    },
    {
      title: 'Thành tiền',
      dataIndex: 'thanhTien',
      key: 'thanhTien',
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
      render: (_, record) => record.Department?.tenKhoaPhong,
    },
    {
      title: 'Dự án',
      dataIndex: 'duAn',
      key: 'duAn',
      render: (_, record) => record.Bidding?.tenDeXuat,
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
            <Tooltip title={'Reset về ban đầu'}>
              <Button
                style={{ padding: '0px' }}
                type="link"
                disabled={
                  editingKey !== '' ||
                  JSON.stringify(equipmentInDb) ===
                    JSON.stringify(initEquipmentInDb)
                }
                onClick={() => {
                  setShowDeleteWarningBanner(false);
                  setEquipmentInDb(initEquipmentInDb);
                }}
                icon={<RollbackOutlined />}
              />
            </Tooltip>

            <Tooltip title={'Sửa TB trong CSDL'}>
              <Button
                style={{ padding: '0px' }}
                type="link"
                disabled={
                  editingKey !== '' || JSON.stringify(equipmentInDb) === '{}'
                }
                onClick={() => edit(record)}
                icon={<EditOutlined />}
              />
            </Tooltip>

            <Tooltip title={'Xóa TB trong CSDL'}>
              <Button
                style={{ padding: '0px' }}
                type="link"
                disabled={JSON.stringify(equipmentInDb) === '{}'}
                onClick={() => {
                  setEquipmentInDb({});
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
          message="Dữ liệu thiết bị trong CSDL sẽ bị xóa"
          type="warning"
          showIcon
          closable
        />
      )}

      <Typography.Title level={5} style={{ margin: '0px' }}>
        Thiết bị trong CSDL:
      </Typography.Title>
      <Form form={form} component={false}>
        <Table
          dataSource={[equipmentInDb]}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          loading={fetchingEquipmentInDb}
          bordered
          columns={mergedColumns}
          pagination={false}
        />
      </Form>
    </Flex>
  );
};

export default DatabaseItem;
