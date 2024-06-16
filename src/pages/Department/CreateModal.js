import React, { useState } from 'react';
import { Flex, Button, Form, Input, Modal, Avatar, Upload } from 'antd';
import { ApartmentOutlined, UploadOutlined } from '@ant-design/icons';

import useCreateApi from '../../hooks/useCreateApi.js';
import useUploadFile from '../../hooks/useUploadFile.js';

const CreateModal = ({ isShowCreateForm, setIsShowCreateForm, fetchApi }) => {
  const { creating, createApi } = useCreateApi({
    url: '/department',
    successCallback: () => {
      setFormValue({});
      setIsShowCreateForm(false);
      form.resetFields();
      fetchApi();
    },
  });
  const { uploading, fileBase64, uploadFile } = useUploadFile();

  const [form] = Form.useForm();

  const [formValue, setFormValue] = useState({});
  const handleChangeForm = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = async (e) => {
    if (e.file.size > 2000000) {
      form.resetFields(['hinhAnh']);
      return form.setFields([
        {
          name: 'hinhAnh',
          errors: ['Vui lòng chọn file có dung lượng nhỏ hơn 2MB!'],
        },
      ]);
    }
    const { fileUrl } = await uploadFile(e.file);

    form.setFields([
      {
        name: 'hinhAnh',
        errors: [],
      },
    ]);

    setFormValue({
      ...formValue,
      hinhAnh: fileUrl,
    });
  };

  return (
    <Modal
      title="Tạo mới khoa phòng"
      open={isShowCreateForm}
      onCancel={() => {
        if (creating) return;
        setIsShowCreateForm(false);
      }}
      footer={null}
    >
      <Form
        autoComplete="off"
        onFinish={() => createApi({ ...formValue, hinhAnh: fileBase64 })}
        form={form}
        layout="vertical"
      >
        <Form.Item name="image" label="Ảnh đại diện khoa phòng">
          <Flex align="center" gap={'16px'} vertical>
            <Avatar
              size={128}
              src={formValue.hinhAnh}
              icon={<ApartmentOutlined />}
              shape="square"
            />
            <Upload
              name="hinhAnh"
              beforeUpload={() => {
                return false;
              }}
              showUploadList={false}
              onChange={handleChangeFile}
            >
              <Flex vertical align="center">
                <Button
                  icon={<UploadOutlined />}
                  loading={uploading}
                  disabled={creating}
                >
                  Tải lên
                </Button>
              </Flex>
            </Upload>
          </Flex>
        </Form.Item>
        <Form.Item
          name="tenKhoaPhong"
          label="Tên khoa phòng"
          rules={[{ required: true, message: 'Vui lòng nhập tên khoa phòng!' }]}
        >
          <Input
            name="tenKhoaPhong"
            onChange={handleChangeForm}
            placeholder="Tên khoa phòng"
            disabled={creating}
          />
        </Form.Item>
        <Form.Item
          name="diaChi"
          label="Địa chỉ khoa phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập địa chỉ khoa phòng!' },
          ]}
        >
          <Input
            name="diaChi"
            onChange={handleChangeForm}
            placeholder="Địa chỉ khoa phòng"
            disabled={creating}
          />
        </Form.Item>
        <Form.Item
          name="soDienThoai"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại khoa phòng!',
            },
          ]}
        >
          <Input
            name="soDienThoai"
            onChange={handleChangeForm}
            placeholder="Số điện thoại khoa phòng"
            disabled={creating}
          />
        </Form.Item>

        <Flex gap={8} justify="flex-end">
          <Button
            key="back"
            onClick={() => setIsShowCreateForm(false)}
            disabled={creating}
          >
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={creating}>
            Tạo mới
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default CreateModal;
