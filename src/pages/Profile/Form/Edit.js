// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Flex, Avatar, Button, Modal, Form, Input, Upload } from 'antd';
import { useApp } from '../../../contexts/appProvider';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { convertBase64 } from '../../../helpers/uploadFile';
import useEditApi from '../../../hooks/useEditApi';

const EditProfileForm = ({
  open,
  input,
  setInput,
  setOpen,
  formValue,
  setFormValue,
}) => {
  const { setToast, setUser } = useApp();
  const { editing, editApi } = useEditApi(`/user`);
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
      const res = await editApi(formValue);
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
      setOpen(false);
    }
  };

  const handleChangeFile = async (e) => {
    try {
      setUploading(true);
      const file = e.file;
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
            <Upload
              showUploadList={false}
              onChange={handleChangeFile}
              beforeUpload={() => {
                return false;
              }}
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
          <Button type="primary" htmlType="submit" loading={editing}>
            Lưu
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default EditProfileForm;
