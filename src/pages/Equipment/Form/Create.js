import React, { useState } from 'react';
import { Form, Input, Flex, Button } from 'antd';
import { useAppContext } from '../../../contexts/appContext';
import useCreateApi from '../../../hooks/useCreateApi';

const CreateEquipmentForm = ({ fetchApi, setIsShowCreateForm }) => {
  const [form] = Form.useForm();
  const { setToast } = useAppContext();
  const { creating, createApi } = useCreateApi({ url: '/equipment' });
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
      const res = await createApi(createFormData);
      if (res.data.success) {
        return setToast('Tạo mới thành công!');
      }
    } catch (error) {
      console.log(error);
      setToast('Tạo mới thất bại', 'error');
    } finally {
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
export default CreateEquipmentForm;
