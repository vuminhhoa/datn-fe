// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Flex, Avatar, Button, Modal, Form, Input, Select, Upload } from 'antd';
import axios from 'axios';
import { useAuth } from '../../../contexts/authProvider';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { convertBase64 } from '../../../helpers/uploadFile';

const Edit = ({
  open,
  input,
  setInput,
  roles,
  setOpen,
  formValue,
  setFormValue,
}) => {
  const { setToast, setUser } = useAuth();
  const [updating, setUpdating] = useState(false);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [initData, setInitdata] = useState();

  useEffect(() => {
    setInitdata(input);
  }, []);

  const handleEditFormChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async () => {
    try {
      setUpdating(true);
      const res = await axios({
        method: 'POST',
        url: '${process.env.REACT_APP_BASE_API_URL}/user',
        data: formValue,
      });
      if (!res.data.success) {
        return setToast(res.data.message, 'error');
      }
      setUser(formValue);
      localStorage.setItem('CURRENT_USER', JSON.stringify(formValue));
      return setToast('Cập nhật thành công!');
    } catch (error) {
      console.log(error);
      setToast('Cập nhật thất bại', 'error');
    } finally {
      setUpdating(false);
      setOpen(false);
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
      console.log(fileBase64);
      setFormValue({
        ...formValue,
        image: fileBase64,
      });
      setInput({
        ...input,
        image: imgUrl,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      title="Cập nhật thông tin cá nhân"
      open={open}
      onCancel={() => {
        setInput(initData);
        setOpen(false);
      }}
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
            <Avatar size={128} src={input.image} icon={<UserOutlined />} />
            <Upload showUploadList={false} onChange={handleChangeFile}>
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
          initialValue={input.name}
        >
          <Input
            name="name"
            onChange={handleEditFormChange}
            placeholder="Tên người dùng"
          />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ" initialValue={input.address}>
          <Input
            name="address"
            onChange={handleEditFormChange}
            placeholder="Địa chỉ"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          initialValue={input.phone}
        >
          <Input
            name="phone"
            onChange={handleEditFormChange}
            placeholder="Số điện thoại"
          />
        </Form.Item>
        <Form.Item
          name="department"
          label="Khoa phòng"
          rules={[{ required: true, message: 'Vui lòng chọn khoa phòng!' }]}
          initialValue={input.department}
        >
          <Select
            allowClear
            placeholder="Chọn khoa phòng"
            onChange={(val) =>
              setFormValue({
                ...formValue,
                department: val,
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
        <Form.Item
          name="role"
          label="Vai trò"
          rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
          initialValue={input.Role.name}
        >
          <Select
            allowClear
            placeholder="Chọn vai trò"
            onChange={(val) =>
              setFormValue({
                ...formValue,
                role: val,
              })
            }
            options={roles.map((role) => {
              return {
                value: role.id,
                label: role.name,
              };
            })}
          />
        </Form.Item>

        <Flex gap={8} justify="flex-end">
          <Button
            key="back"
            onClick={() => {
              setInput(initData);
              setOpen(false);
            }}
          >
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={updating}>
            Lưu
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default Edit;
