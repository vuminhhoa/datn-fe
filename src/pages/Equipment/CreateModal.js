import React, { useState } from 'react';
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
  Modal,
} from 'antd';
import { useAppContext } from '../../contexts/appContext';
import useCreateApi from '../../hooks/useCreateApi';
import { FileImageOutlined, UploadOutlined } from '@ant-design/icons';
import useUploadFile from '../../hooks/useUploadFile';

const CreateModal = ({ fetchApi, setIsShowCreateForm, isShowCreateForm }) => {
  const { departments, loadingDepartments, biddings, loadingBiddings } =
    useAppContext();
  const [form] = Form.useForm();
  const [createFormData, setCreateFormData] = useState({});
  const { creating, createApi } = useCreateApi({
    url: '/equipment',
    successCallback: () => {
      form.resetFields();
      setCreateFormData({});
      setIsShowCreateForm(false);
      fetchApi();
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
  return (
    <Modal
      title="Tạo mới thiết bị"
      open={isShowCreateForm}
      onCancel={() => {
        form.resetFields();
        setCreateFormData({});
        setIsShowCreateForm(false);
      }}
      footer={null}
      width={800}
    >
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
                <Button icon={<UploadOutlined />}>Tải lên</Button>
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
                { required: true, message: 'Vui lòng nhập serial thiết bị!' },
              ]}
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
                placeholder="Nhập đơn giá thiết bị"
                onChange={handleCreateFormChange}
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item name="khoaPhong" label="Khoa phòng">
              <Select
                allowClear
                disabled={loadingDepartments}
                placeholder="Chọn khoa phòng"
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
                disabled={loadingBiddings}
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

        <Flex gap={8} justify="flex-end">
          <Button
            key="back"
            onClick={() => setIsShowCreateForm(false)}
            disabled={uploading}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={creating}
            disabled={uploading}
          >
            Lưu
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
export default CreateModal;
