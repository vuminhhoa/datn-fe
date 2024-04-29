import React, { useState } from 'react';
import { Form, Input, Select, Flex, Button } from 'antd';
import axios from 'axios';
import { useAuth } from '../../../contexts/authProvider';

const CreateForm = ({ fetchApi, setIsShowCreateForm }) => {
  const [form] = Form.useForm();
  const { setToast } = useAuth();
  const [creating, setCreating] = useState(false);
  const defaultCreateFormData = {
    maThietBi: '',
    tenThietBi: '',
    serial: '',
    model: '',
    image: '',
    namSanXuat: '',
    khoaPhong: '',
    trangThai: 'Mới nhập',
  };
  const [createFormData, setCreateFormData] = useState(defaultCreateFormData);
  const handleCreateFormChange = (e) => {
    setCreateFormData({
      ...createFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateEquipment = async () => {
    try {
      setCreating(true);
      console.log(createFormData);
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_API_URL}/equipment`,
        data: createFormData,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      setToast('Tạo mới thất bại', 'error');
    } finally {
      setToast('Tạo mới thành công');
      setCreating(false);
      setIsShowCreateForm(false);
      fetchApi();
    }
  };

  return (
    <Form
      autoComplete="off"
      onFinish={handleCreateEquipment}
      form={form}
      layout="vertical"
    >
      <Form.Item
        name="maThietBi"
        label="Mã thiết bị"
        rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị!' }]}
      >
        <Input
          allowClear
          name="maThietBi"
          placeholder="Nhập mã thiết bị"
          onChange={handleCreateFormChange}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name="tenThietBi"
        label="Tên thiết bị"
        rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị!' }]}
      >
        <Input
          allowClear
          name="tenThietBi"
          placeholder="Nhập tên thiết bị"
          onChange={handleCreateFormChange}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name="serial"
        label="Serial thiết bị"
        rules={[{ required: true, message: 'Vui lòng nhập serial thiết bị!' }]}
      >
        <Input
          allowClear
          name="serial"
          placeholder="Nhập serial thiết bị"
          onChange={handleCreateFormChange}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name="model"
        label="Model thiết bị"
        rules={[{ required: true, message: 'Vui lòng nhập model thiết bị!' }]}
      >
        <Input
          allowClear
          name="model"
          placeholder="Nhập model thiết bị"
          onChange={handleCreateFormChange}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name="namSanXuat"
        label="Năm sản xuất"
        rules={[
          { required: true, message: 'Vui lòng nhập năm sản xuất thiết bị!' },
        ]}
      >
        <Input
          allowClear
          name="namSanXuat"
          placeholder="Nhập năm sản xuất thiết bị"
          onChange={handleCreateFormChange}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name="khoaPhong"
        label="Khoa phòng"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn khoa phòng!',
          },
        ]}
      >
        <Select
          allowClear
          placeholder="Chọn khoa phòng"
          onChange={(value) =>
            setCreateFormData({
              ...createFormData,
              khoaPhong: value,
            })
          }
          options={[
            {
              value: 'Khoa vi sinh',
              label: 'Khoa vi sinh',
            },
            {
              value: 'Khoa y te',
              label: 'Khoa y te',
            },
            {
              value: 'Khoa dep trai',
              label: 'Khoa dep trai',
            },
            {
              value: 'Khoa xinh gai',
              label: 'Khoa xinh gai',
            },
          ]}
        />
      </Form.Item>

      <Flex gap={8} justify="flex-end">
        <Button key="back" onClick={() => setIsShowCreateForm(false)}>
          Hủy
        </Button>
        <Button type="primary" htmlType="submit" loading={creating}>
          Lưu
        </Button>
      </Flex>
    </Form>
  );
};
export default CreateForm;
