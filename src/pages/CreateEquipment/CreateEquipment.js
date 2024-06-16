import React, { useState } from 'react';
import { Card, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useBreadcrumb } from '../../hooks/useBreadcrumb.js';
import Page from '../../components/Page/index.js';
import useCreateApi from '../../hooks/useCreateApi.js';
import {
  Form,
  Input,
  Flex,
  Button,
  Avatar,
  Upload,
  Row,
  Col,
  Select,
} from 'antd';
import { useAppContext } from '../../contexts/appContext';
import { FileImageOutlined, UploadOutlined } from '@ant-design/icons';
import useUploadFile from '../../hooks/useUploadFile';

const CreateEquipment = () => {
  const { departments, loadingDepartments, biddings, loadingBiddings } =
    useAppContext();
  const [form] = Form.useForm();
  const [createFormData, setCreateFormData] = useState({});
  const { creating, createApi } = useCreateApi({
    url: '/equipment',
    successCallback: () => {
      form.resetFields();
      setCreateFormData({});
    },
  });
  const { uploading, uploadFile, fileBase64 } = useUploadFile();

  const handleCreateFormChange = (e) => {
    setCreateFormData({
      ...createFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = async (e) => {
    try {
      const file = e.file;
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
      const { fileUrl } = await uploadFile(file);
      setCreateFormData({
        ...createFormData,
        hinhAnh: fileUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const breadcrumbItems = useBreadcrumb([
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/equipments/list_equipments',
      title: 'Quản lý thiết bị',
    },
    {
      href: '/equipments/create_equipment',
      title: 'Tạo mới thiết bị',
    },
  ]);

  return (
    <Page>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title="Tạo mới thiết bị"
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
              createApi({ ...createFormData, hinhAnh: fileBase64 || null })
            }
            form={form}
            layout="vertical"
          >
            <Form.Item name="hinhAnh" label="Ảnh thiết bị">
              <Flex align="center" gap={'16px'} vertical>
                <Avatar
                  size={128}
                  src={createFormData.hinhAnh}
                  icon={<FileImageOutlined />}
                  shape="square"
                />
                <Upload
                  showUploadList={false}
                  onChange={handleChangeFile}
                  loading={uploading}
                  beforeUpload={() => {
                    return false;
                  }}
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
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="tenThietBi"
                  label="Tên thiết bị"
                  rules={[
                    { required: true, message: 'Vui lòng nhập tên thiết bị!' },
                  ]}
                >
                  <Input
                    allowClear
                    disabled={creating}
                    name="tenThietBi"
                    placeholder="Nhập tên thiết bị"
                    onChange={handleCreateFormChange}
                    autoComplete="off"
                  />
                </Form.Item>
                <Form.Item
                  name="donVi"
                  label="Đơn vị thiết bị"
                  rules={[{ required: true, message: 'Vui lòng nhập đơn vị!' }]}
                >
                  <Input
                    allowClear
                    disabled={creating}
                    name="donVi"
                    placeholder="Nhập đơn vị"
                    onChange={handleCreateFormChange}
                    autoComplete="off"
                  />
                </Form.Item>

                <Form.Item
                  name="serial"
                  label="Serial thiết bị"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập serial thiết bị!',
                    },
                  ]}
                >
                  <Input
                    allowClear
                    disabled={creating}
                    name="serial"
                    placeholder="Nhập serial thiết bị"
                    onChange={handleCreateFormChange}
                    autoComplete="off"
                  />
                </Form.Item>
                <Form.Item
                  name="kyMaHieu"
                  label="Ký mã hiệu thiết bị"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập ký mã hiệu thiết bị!',
                    },
                  ]}
                >
                  <Input
                    allowClear
                    disabled={creating}
                    name="kyMaHieu"
                    placeholder="Nhập ký mã hiệu thiết bị"
                    onChange={handleCreateFormChange}
                    autoComplete="off"
                  />
                </Form.Item>
                <Form.Item
                  name="hangSanXuat"
                  label="Hãng sản xuất"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập hãng sản xuất thiết bị!',
                    },
                  ]}
                >
                  <Input
                    allowClear
                    disabled={creating}
                    name="hangSanXuat"
                    placeholder="Nhập hãng sản xuất thiết bị"
                    onChange={handleCreateFormChange}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="xuatXu"
                  label="Xuất xứ"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập xuất xứ thiết bị!',
                    },
                  ]}
                >
                  <Input
                    allowClear
                    disabled={creating}
                    name="xuatXu"
                    placeholder="Nhập xuất xứ thiết bị"
                    onChange={handleCreateFormChange}
                    autoComplete="off"
                  />
                </Form.Item>
                <Form.Item
                  name="soLuong"
                  label="Số lượng"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập số lượng thiết bị!',
                    },
                    {
                      type: 'number',
                      message: 'Số lượng phải là số!',
                      transform: (value) => Number(value),
                    },
                  ]}
                >
                  <Input
                    allowClear
                    name="soLuong"
                    placeholder="Nhập số lượng thiết bị"
                    disabled={creating}
                    onChange={handleCreateFormChange}
                    autoComplete="off"
                  />
                </Form.Item>
                <Form.Item
                  name="donGia"
                  label="Đơn giá"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập đơn giá thiết bị!',
                    },
                    {
                      type: 'number',
                      message: 'Đơn giá phải là số!',
                      transform: (value) => Number(value),
                    },
                  ]}
                >
                  <Input
                    allowClear
                    name="donGia"
                    disabled={creating}
                    placeholder="Nhập đơn giá thiết bị"
                    onChange={handleCreateFormChange}
                    autoComplete="off"
                  />
                </Form.Item>
                <Form.Item name="khoaPhong" label="Khoa phòng">
                  <Select
                    allowClear
                    disabled={loadingDepartments || creating}
                    placeholder="Chọn thiết bị"
                    onChange={(value) =>
                      setCreateFormData({
                        ...createFormData,
                        DepartmentId: value,
                      })
                    }
                    options={departments.map((department) => ({
                      value: department.id,
                      label: department.tenKhoaPhong,
                    }))}
                  />
                </Form.Item>
                <Form.Item name="duAn" label="Dự án">
                  <Select
                    allowClear
                    disabled={loadingBiddings || creating}
                    placeholder="Chọn dự án"
                    onChange={(value) =>
                      setCreateFormData({
                        ...createFormData,
                        BiddingId: value,
                      })
                    }
                    options={biddings.map((bidding) => ({
                      value: bidding.id,
                      label: bidding.tenDeXuat,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Flex>
      </Card>
    </Page>
  );
};

export default CreateEquipment;
