import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Flex,
  Button,
  Avatar,
  Upload,
  Modal,
  Row,
  Col,
} from 'antd';
import { useAppContext } from '../../../contexts/appContext';
import { UploadOutlined } from '@ant-design/icons';
import { FileImageOutlined } from '@ant-design/icons';
import useEditApi from '../../../hooks/useEditApi';
import useUploadFile from '../../../hooks/useUploadFile';

const UpdateEquipmentForm = ({ open, setOpen, equipment, fetchApi }) => {
  const { departments, loadingDepartments } = useAppContext();
  const [form] = Form.useForm();
  const { editing, editApi } = useEditApi({
    url: `/equipment/${equipment.id}`,
    successCallback: () => {
      fetchApi();
      setOpen(false);
    },
  });
  const [formValue, setFormValue] = useState(equipment);
  const { uploading, uploadFile, fileBase64 } = useUploadFile();

  const handleFormChange = (e) => {
    setFormValue({
      ...formValue,
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
      setFormValue({
        ...formValue,
        hinhAnh: fileUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Cập nhật thiết bị"
      open={open}
      onCancel={() => {
        setFormValue(equipment);
        form.resetFields();
        setOpen(false);
      }}
      closeIcon={!editing}
      footer={null}
      width={800}
    >
      <Form
        autoComplete="off"
        onFinish={() =>
          editApi({ ...formValue, hinhAnh: fileBase64 || equipment.hinhAnh })
        }
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="hinhAnh"
          label="Ảnh thiết bị"
          initialValue={formValue.hinhAnh}
        >
          <Flex align="center" gap={'16px'} vertical>
            <Avatar
              size={128}
              src={formValue.hinhAnh}
              icon={<FileImageOutlined />}
              shape="square"
            />
            <Upload
              showUploadList={false}
              onChange={handleChangeFile}
              beforeUpload={() => {
                return false;
              }}
            >
              <Flex vertical align="center">
                <Button icon={<UploadOutlined />}>Thay đổi</Button>
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
              initialValue={formValue.tenThietBi}
            >
              <Input
                allowClear
                name="tenThietBi"
                placeholder="Nhập tên thiết bị"
                onChange={handleFormChange}
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="donVi"
              label="Đơn vị thiết bị"
              rules={[{ required: true, message: 'Vui lòng nhập đơn vị!' }]}
              initialValue={formValue.donVi}
            >
              <Input
                allowClear
                name="tenThietBi"
                placeholder="Nhập đơn vị"
                onChange={handleFormChange}
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="serial"
              label="Serial thiết bị"
              rules={[
                { required: true, message: 'Vui lòng nhập serial thiết bị!' },
              ]}
              initialValue={formValue.serial}
            >
              <Input
                allowClear
                name="serial"
                placeholder="Nhập serial thiết bị"
                onChange={handleFormChange}
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
              initialValue={formValue.kyMaHieu}
            >
              <Input
                allowClear
                name="kyMaHieu"
                placeholder="Nhập ký mã hiệu thiết bị"
                onChange={handleFormChange}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="hangSanXuat"
              label="Hãng sản xuất"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập hãng sản xuất thiết bị!',
                },
              ]}
              initialValue={formValue.hangSanXuat}
            >
              <Input
                allowClear
                name="hangSanXuat"
                placeholder="Nhập hãng sản xuất thiết bị"
                onChange={handleFormChange}
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="xuatXu"
              label="Xuất xứ"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập xuất xứ thiết bị!',
                },
              ]}
              initialValue={formValue.xuatXu}
            >
              <Input
                allowClear
                name="xuatXu"
                placeholder="Nhập xuất xứ thiết bị"
                onChange={handleFormChange}
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
              ]}
              initialValue={formValue.soLuong}
            >
              <Input
                allowClear
                name="soLuong"
                placeholder="Nhập số lượng thiết bị"
                onChange={handleFormChange}
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
              ]}
              initialValue={formValue.donGia}
            >
              <Input
                allowClear
                name="xuatXu"
                placeholder="Nhập đơn giá thiết bị"
                onChange={handleFormChange}
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
              initialValue={
                formValue.Department?.tenKhoaPhong || formValue.phanKhoa
              }
            >
              <Select
                allowClear
                disabled={loadingDepartments}
                placeholder="Chọn khoa phòng"
                onChange={(value) =>
                  setFormValue({
                    ...formValue,
                    khoaPhong: value,
                  })
                }
                options={departments.map((department) => ({
                  value: department.id,
                  label: department.tenKhoaPhong,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Flex gap={8} justify="flex-end">
          <Button
            key="back"
            onClick={() => {
              setFormValue(equipment);
              form.resetFields();
              setOpen(false);
            }}
            disabled={editing || uploading}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={editing || uploading}
            disabled={JSON.stringify(equipment) === JSON.stringify(formValue)}
          >
            Lưu
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
export default UpdateEquipmentForm;
