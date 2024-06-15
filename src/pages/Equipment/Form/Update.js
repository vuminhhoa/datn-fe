import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Flex, Button, Avatar, Upload, Modal } from 'antd';
import { useApp } from '../../../contexts/appProvider';
import { UploadOutlined } from '@ant-design/icons';
import { FileImageOutlined } from '@ant-design/icons';
import useEditApi from '../../../hooks/useEditApi';
import { convertBase64 } from '../../../helpers/uploadFile';

const UpdateEquipmentForm = ({
  open,
  setOpen,
  equipment,
  setEquipment,
  fetchApi,
}) => {
  const [form] = Form.useForm();
  const { setToast } = useApp();
  const { editing, editApi } = useEditApi({
    url: `/equipment/${equipment.id}`,
  });
  const [formValue, setFormValue] = useState(equipment);
  const [initData, setInitdata] = useState(null);

  useEffect(() => {
    if (initData) return;
    setInitdata(equipment);
  }, []);

  const handleFormChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateEquipment = async () => {
    try {
      const res = await editApi(formValue);
      if (res.data.success) {
        return setToast('Cập nhật thành công!');
      }
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
      const file = e.file;
      const imgUrl = URL.createObjectURL(file);
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
      setFormValue({
        ...formValue,
        image: fileBase64,
      });
      setEquipment({
        equipment: { ...equipment, image: imgUrl },
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
        setEquipment({ equipment: initData });
        setFormValue(initData);
        form.resetFields();
        setOpen(false);
      }}
      closeIcon={!editing}
      footer={null}
    >
      <Form
        autoComplete="off"
        onFinish={handleCreateEquipment}
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="image"
          label="Ảnh thiết bị"
          initialValue={equipment.image}
        >
          <Flex align="center" gap={'16px'} vertical>
            <Avatar
              size={128}
              src={equipment.image}
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
        <Form.Item
          name="maThietBi"
          label="Mã thiết bị"
          rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị!' }]}
          initialValue={equipment.maThietBi}
        >
          <Input
            allowClear
            name="maThietBi"
            placeholder="Nhập mã thiết bị"
            onChange={handleFormChange}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          name="tenThietBi"
          label="Tên thiết bị"
          rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị!' }]}
          initialValue={equipment.tenThietBi}
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
          name="trangThai"
          label="Trạng thái thiết bị"
          rules={[
            { required: true, message: 'Vui lòng chọn trạng thái thiết bị!' },
          ]}
          initialValue={equipment.trangThai}
        >
          <Select
            allowClear
            placeholder="Chọn khoa phòng"
            onChange={(value) =>
              setFormValue({
                ...formValue,
                trangThai: value,
              })
            }
            options={[
              {
                value: 'Mới nhập',
                label: 'Mới nhập',
              },
              {
                value: 'Đang sử dụng',
                label: 'Đang sử dụng',
              },
              {
                value: 'Đang sửa chữa',
                label: 'Đang sửa chữa',
              },
              {
                value: 'Đã hỏng',
                label: 'Đã hỏng',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="serial"
          label="Serial thiết bị"
          rules={[
            { required: true, message: 'Vui lòng nhập serial thiết bị!' },
          ]}
          initialValue={equipment.serial}
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
          name="model"
          label="Model thiết bị"
          rules={[{ required: true, message: 'Vui lòng nhập model thiết bị!' }]}
          initialValue={equipment.model}
        >
          <Input
            allowClear
            name="model"
            placeholder="Nhập model thiết bị"
            onChange={handleFormChange}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          name="namSanXuat"
          label="Năm sản xuất"
          rules={[
            { required: true, message: 'Vui lòng nhập năm sản xuất thiết bị!' },
          ]}
          initialValue={equipment.namSanXuat}
        >
          <Input
            allowClear
            name="namSanXuat"
            placeholder="Nhập năm sản xuất thiết bị"
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
          initialValue={equipment.khoaPhong}
        >
          <Select
            allowClear
            placeholder="Chọn khoa phòng"
            onChange={(value) =>
              setFormValue({
                ...formValue,
                khoaPhong: value,
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

        <Flex gap={8} justify="flex-end">
          <Button
            key="back"
            onClick={() => {
              setEquipment({ equipment: initData });
              setFormValue(initData);
              form.resetFields();
              setOpen(false);
            }}
            disabled={editing}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={editing}
            disabled={JSON.stringify(initData) === JSON.stringify(formValue)}
          >
            Lưu
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
export default UpdateEquipmentForm;
