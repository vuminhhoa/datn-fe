// @ts-nocheck
import React, { useState } from 'react';
import { Flex, Avatar, Button, Modal, Form, Input, Upload } from 'antd';
import { ApartmentOutlined, UploadOutlined } from '@ant-design/icons';
import useEditApi from '../../hooks/useEditApi';
import useUploadFile from '../../hooks/useUploadFile';

const EditModal = ({ open, input, setInput, fetchApi, setOpen }) => {
  const { editing, editApi } = useEditApi({
    url: `/department/${input.department.id}`,
    successCallback: () => {
      fetchApi();
      setOpen(false);
    },
  });
  const { uploading, uploadFile, fileBase64 } = useUploadFile();
  const [form] = Form.useForm();
  const [value, setValue] = useState(input.department);

  console.log('EditModal', value);

  const handleEditFormChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = async (e) => {
    form.setFields([
      {
        name: 'hinhAnh',
        errors: [],
      },
    ]);
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

    setValue({
      ...value,
      hinhAnh: fileUrl,
    });
  };

  return (
    <Modal
      title="Cập nhật thông tin khoa phòng"
      open={open}
      onCancel={() => {
        if (editing) return;
        setOpen(false);
      }}
      footer={null}
    >
      <Form
        autoComplete="off"
        onFinish={() =>
          editApi({
            ...value,
            hinhAnh: fileBase64 ? fileBase64 : value.hinhAnh,
          })
        }
        form={form}
        layout="vertical"
      >
        <Form.Item name="image" label="Ảnh đại diện khoa phòng">
          <Flex align="center" gap={'16px'} vertical>
            <Avatar
              size={128}
              src={value.hinhAnh}
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
                <Button icon={<UploadOutlined />} loading={uploading}>
                  Thay đổi
                </Button>
              </Flex>
            </Upload>
          </Flex>
        </Form.Item>
        <Form.Item
          name="tenKhoaPhong"
          label="Tên khoa phòng"
          rules={[{ required: true, message: 'Vui lòng nhập tên khoa phòng!' }]}
          initialValue={input.department.tenKhoaPhong}
        >
          <Input
            name="tenKhoaPhong"
            onChange={handleEditFormChange}
            placeholder="Tên khoa phòng"
          />
        </Form.Item>
        <Form.Item
          name="diaChi"
          label="Địa chỉ khoa phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập địa chỉ khoa phòng!' },
          ]}
          initialValue={input.department.diaChi}
        >
          <Input
            name="diaChi"
            onChange={handleEditFormChange}
            placeholder="Địa chỉ khoa phòng"
          />
        </Form.Item>
        <Form.Item
          name="soDienThoai"
          label="Số điện thoại khoa phòng"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại khoa phòng!',
            },
          ]}
          initialValue={input.department.soDienThoai}
        >
          <Input
            name="soDienThoai"
            onChange={handleEditFormChange}
            placeholder="Số điện thoại khoa phòng"
          />
        </Form.Item>

        <Flex gap={8} justify="flex-end">
          <Button key="back" onClick={() => setOpen(false)} disabled={editing}>
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={editing}
            disabled={
              JSON.stringify(value) === JSON.stringify(input.department)
            }
          >
            Lưu
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default EditModal;
