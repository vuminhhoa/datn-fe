import React, { useState } from 'react';
import { Upload, Button, Table, Popconfirm, message, Input, Form } from 'antd';
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import Page from '../../components/Page/Page.js';

const DevZone = () => {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });

        // Giả sử dữ liệu nằm trong sheet đầu tiên
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Chuyển đổi sheet thành JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Map dữ liệu sang format cần thiết
        const formattedData = jsonData.map((item, index) => ({
          key: index, // thêm key cho mỗi hàng
          ten: item['Tên'], // hoặc tên cột trong file Excel của bạn
          maSo: item['Mã số'],
          soLuong: item['Số lượng'],
          moTa: item['Mô tả'],
        }));

        // Cập nhật state với dữ liệu mới
        setData(formattedData);
        setError(null); // Reset lỗi nếu có
        message.success('File uploaded successfully');
      } catch (err) {
        setError('Đã có lỗi xảy ra khi đọc file.');
        message.error('Error reading file');
      }
    };

    reader.onerror = () => {
      setError('Đã có lỗi xảy ra khi đọc file.');
      message.error('Error reading file');
    };

    reader.readAsBinaryString(file);

    // Prevent default upload behavior
    return false;
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
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
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'ten',
      key: 'ten',
      editable: true,
    },
    {
      title: 'Mã số',
      dataIndex: 'maSo',
      key: 'maSo',
      editable: true,
    },
    {
      title: 'Số lượng',
      dataIndex: 'soLuong',
      key: 'soLuong',
      editable: true,
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <a
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{
                marginRight: 8,
              }}
            >
              <EditOutlined />
            </a>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>
                <DeleteOutlined />
              </a>
            </Popconfirm>
          </span>
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
      <Upload
        beforeUpload={handleFileUpload}
        accept=".xlsx, .xls"
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Upload Excel</Button>
      </Upload>
      {error && <div style={{ color: 'red' }}>{error}</div>}
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
    </Page>
  );
};

export default DevZone;
