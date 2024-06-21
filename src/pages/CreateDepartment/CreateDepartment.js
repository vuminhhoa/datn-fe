import React, { useState } from 'react';
import { Card, Flex, Breadcrumb, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import Page from '../../components/Page';
import { Input, Form } from 'antd';
import useCreateApi from '../../hooks/useCreateApi';

import { Avatar, Upload } from 'antd';
import { ApartmentOutlined, UploadOutlined } from '@ant-design/icons';

import useUploadFile from '../../hooks/useUploadFile.js';
import { useAppContext } from '../../contexts/appContext.js';

const CreateDepartment = () => {
  const { fetchDepartments } = useAppContext();
  const { uploading, fileBase64, uploadFile } = useUploadFile();
  const [form] = Form.useForm();
  const [formValue, setFormValue] = useState({});

  const { creating, createApi } = useCreateApi({
    url: '/department',
    successCallback: () => {
      setFormValue({});
      fetchDepartments();
      form.resetFields();
    },
  });

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

  const breadcrumbItems = useBreadcrumb([
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/departments/list_departments',
      title: 'Quản lý khoa phòng',
    },
    {
      href: '/departments/create_department',
      title: 'Tạo mới khoa phòng',
    },
  ]);

  return (
    <Page>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title="Tạo mới khoa phòng"
        extra={
          <Button
            type="primary"
            htmlType="submit"
            loading={creating}
            onClick={() => form.submit()}
          >
            Lưu
          </Button>
        }
      >
        <Flex gap={16} vertical>
          <Form
            autoComplete="off"
            onFinish={() =>
              createApi({
                body: {
                  ...formValue,
                  hinhAnh: fileBase64,
                },
              })
            }
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
                      disabled={creating}
                      loading={uploading}
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
              rules={[
                { required: true, message: 'Vui lòng nhập tên khoa phòng!' },
              ]}
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
                {
                  required: true,
                  message: 'Vui lòng nhập địa chỉ khoa phòng!',
                },
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
          </Form>
        </Flex>
      </Card>
    </Page>
  );
};

export default CreateDepartment;
