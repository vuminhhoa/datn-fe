import React, { useEffect, useState } from 'react';
import {
  Upload,
  Button,
  Table,
  Popconfirm,
  message,
  Modal,
  Typography,
  Input,
  Form,
  Space,
  Card,
} from 'antd';
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FileExcelOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Page from '../../components/Page/Page.js';
import { formatVNCurrency } from '../../helpers/formatVNCurrency.js';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import useCreateApi from '../../hooks/useCreateApi.js';

const ImportEquipmentsByExcel = () => {
  const breadcrumb = useBreadcrumb(
    [
      {
        path: '/equipments/import_by_excel',
        title: 'Nhập thiết bị bằng file Excel',
      },
    ],
    true
  );
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [duplicateRows, setDuplicateRows] = useState([]);

  const { creating, createApi } = useCreateApi(`/equipments/importByExcel`);

  const checkDuplicateData = (data) => {
    const duplicateEquipmentsMap = new Map();
    data.forEach((row) => {
      if (!duplicateEquipmentsMap.has(row.kyMaHieu)) {
        duplicateEquipmentsMap.set(row.kyMaHieu, [row]);
      } else {
        duplicateEquipmentsMap.get(row.kyMaHieu).push(row);
      }
    });
    const duplicateEquipments = [];
    duplicateEquipmentsMap.forEach((value) => {
      if (value.length > 1) {
        duplicateEquipments.push(...value);
      }
    });
    setDuplicateRows(duplicateEquipments);
  };

  useEffect(() => {
    checkDuplicateData(data);
  }, [data]);

  const handleImportData = () => {
    if (duplicateRows.length > 0) {
      message.error(
        'Dữ liệu chứa thiết bị trùng ký mã hiệu. Vui lòng xử lý các thiết bị bị trùng lặp.'
      );
      return;
    }
    createApi(data);
  };
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const formattedData = jsonData.map((item, index) => ({
          key: index,
          tenThietBi: item['Tên thiết bị'],
          donVi: item['Đơn vị'],
          soLuong: item['Số lượng'],
          kyMaHieu: item['Ký mã hiệu'],
          hangSanXuat: item['Hãng sản xuất'],
          xuatXu: item['Xuất xứ'],
          donGia: item['Đơn giá'],
          phanKhoa: item['Phân khoa'],
        }));
        setData(formattedData);
        setError(null);
        message.success('Tải file thành công!');
      } catch (err) {
        setError('Đã có lỗi xảy ra khi đọc file.');
        message.error('Đã có lỗi xảy ra khi đọc file.');
      }
    };
    reader.onerror = () => {
      setError('Đã có lỗi xảy ra khi đọc file.');
      message.error('Đã có lỗi xảy ra khi đọc file.');
    };
    reader.readAsBinaryString(file);
    return false;
  };

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

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ${title.toLowerCase()}!`,
              },
            ]}
            initialValue={record[dataIndex]} // Ensure initialValue is used here
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

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

  const downloadExcelTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      [
        'Tên thiết bị',
        'Đơn vị',
        'Số lượng',
        'Ký mã hiệu',
        'Hãng sản xuất',
        'Xuất xứ',
        'Đơn giá',
        'Phân khoa',
      ],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, '[iBME Lab] Mẫu file excel nhập thiết bị.xlsx');
  };

  const columns = [
    {
      title: 'Tên thiết bị',
      dataIndex: 'tenThietBi',
      key: 'tenThietBi',
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
            <Button
              style={{ padding: '0px' }}
              type="link"
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              icon={<EditOutlined />}
            />
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
              />
            </Popconfirm>
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
    <Page fullWidth={true}>
      {breadcrumb}
      <Modal
        title="Xác nhận xóa"
        open={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        footer={null}
      >
        <Space direction="vertical" align="end">
          <Typography.Text>
            Hành động này sẽ xóa toàn bộ dữ liệu đã tải lên và những thay đổi đã
            thực hiện. Dữ liệu đã xóa không thể khôi phục, bạn có chắc chắn muốn
            xóa?
          </Typography.Text>
          <Space justify="end">
            <Button key="back" onClick={() => setShowDeleteConfirm(false)}>
              Hủy
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                setData([]);
                setShowDeleteConfirm(false);
              }}
            >
              Xóa
            </Button>
          </Space>
        </Space>
      </Modal>
      <Card
        title="Nhập thiết bị bằng file Excel"
        extra={
          <Space>
            {data.length !== 0 && (
              <Button danger onClick={() => setShowDeleteConfirm(true)}>
                Xóa dữ liệu
              </Button>
            )}
            {data.length > 0 ? (
              <Button
                type="primary"
                onClick={() => handleImportData()}
                loading={creating}
              >
                Nhập
              </Button>
            ) : (
              <>
                <Button
                  onClick={downloadExcelTemplate}
                  icon={<FileExcelOutlined />}
                >
                  Mẫu file Excel
                </Button>
                <Upload
                  beforeUpload={handleFileUpload}
                  accept=".xlsx, .xls"
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />} type="primary">
                    Tải lên
                  </Button>
                </Upload>
              </>
            )}
          </Space>
        }
      >
        {duplicateRows.length > 0 && (
          <>
            <Typography.Title
              level={5}
              style={{ margin: '0px', paddingBottom: '8px' }}
            >
              Danh sách thiết bị trùng ký mã hiệu:
            </Typography.Title>
            <Form form={form} component={false}>
              <Table
                dataSource={duplicateRows}
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
                }}
              />
            </Form>
          </>
        )}
        {error && <div style={{ color: 'red' }}>{error}</div>}
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
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </Card>
    </Page>
  );
};

export default ImportEquipmentsByExcel;
