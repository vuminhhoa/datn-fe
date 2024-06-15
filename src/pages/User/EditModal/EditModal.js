// @ts-nocheck
import React, { useState } from 'react';
import { Flex, Avatar, Button, Modal, Form, Input, Select, Upload } from 'antd';
import { useApp } from '../../../contexts/appProvider';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { convertBase64 } from '../../../helpers/uploadFile';
import useEditApi from '../../../hooks/useEditApi';

const EditModal = ({
  open,
  input,
  setInput,
  roles,
  fetchApi,
  setOpen,
  value,
  setValue,
}) => {
  const { setToast, user, setUser } = useApp();
  const { editing, editApi } = useEditApi({ url: `/user` });
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const handleEditFormChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const res = await editApi(value);
      if (!res.data.success) {
        return setToast(res.data.message, 'error');
      }

      if (user.id === value.id) {
        setUser(value);
        localStorage.setItem('CURRENT_USER', JSON.stringify(value));
      }
      return setToast('Cập nhật thành công!');
    } catch (error) {
      console.log(error);
      setToast('Cập nhật thất bại', 'error');
    } finally {
      setOpen(false);
      fetchApi();
    }
  };

  const handleChangeFile = async (e) => {
    try {
      setUploading(true);
      const file = e.file.originFileObj;
      const imgUrl = URL.createObjectURL(file);
      console.log(imgUrl);
      form.setFields([
        {
          name: 'image',
          errors: [],
        },
      ]);
      if (file.size > 2000000) {
        form.resetFields(['image']);
        return form.setFields([
          {
            name: 'image',
            errors: ['Vui lòng chọn file có dung lượng nhỏ hơn 2MB!'],
          },
        ]);
      }
      const fileBase64 = await convertBase64(file);
      setValue({
        ...value,
        image: fileBase64,
      });
      setInput({
        ...input,
        user: { ...input.user, image: imgUrl },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <Modal
      title="Cập nhật thông tin người dùng"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form
        autoComplete="off"
        onFinish={handleUpdateUser}
        form={form}
        layout="vertical"
      >
        <Form.Item name="image" label="Ảnh đại diện">
          <Flex align="center" gap={'16px'} vertical>
            <Avatar size={128} src={input.user.image} icon={<UserOutlined />} />
            <Upload
              name="avatar"
              showUploadList={false}
              onChange={handleChangeFile}
            >
              <Flex vertical align="center">
                <Button icon={<UploadOutlined />} loading={uploading}>
                  Thay đổi
                </Button>
              </Flex>
            </Upload>
          </Flex>
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên người dùng"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
          initialValue={input.user.name}
        >
          <Input
            name="name"
            onChange={handleEditFormChange}
            placeholder="Tên người dùng"
          />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          initialValue={input.user.address}
        >
          <Input
            name="address"
            onChange={handleEditFormChange}
            placeholder="Địa chỉ"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          initialValue={input.user.phone}
        >
          <Input
            name="phone"
            onChange={handleEditFormChange}
            placeholder="Số điện thoại"
          />
        </Form.Item>

        <Form.Item
          name="role"
          label="Vai trò"
          rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
          initialValue={input.user.Role.name}
        >
          <Select
            allowClear
            placeholder="Chọn vai trò"
            onChange={(val) =>
              setValue({
                ...value,
                RoleId: val,
              })
            }
            options={roles
              .filter((role) => role.name !== 'Quản trị viên')
              .map((role) => {
                return {
                  value: role.id,
                  label: role.name,
                };
              })}
          />
        </Form.Item>

        <Flex gap={8} justify="flex-end">
          <Button key="back" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={editing}>
            Lưu
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default EditModal;
