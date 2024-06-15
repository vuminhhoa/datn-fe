// @ts-nocheck
import React, { useState } from 'react';
import { Flex, Avatar, Button, Modal, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import useEditApi from '../../hooks/useEditApi';
import useUploadFile from '../../hooks/useUploadFile';
import useFetchApi from '../../hooks/useFetchApi';
import { useAuthContext } from '../../contexts/authContext';

const EditModal = ({ open, input, fetchApi, setOpen }) => {
  const { user, setUser } = useAuthContext();
  const { data: roles, loading: loadingRoles } = useFetchApi({
    url: '/roles',
    defaultData: [],
  });
  const { editing, editApi } = useEditApi({
    url: `/user`,
    successCallback: () => {
      if (user.id === value.id) {
        setUser(value);
        localStorage.setItem('CURRENT_USER', JSON.stringify(value));
      }
      setOpen(false);
      fetchApi();
    },
  });
  const { uploading, uploadFile, fileBase64 } = useUploadFile();

  const [value, setValue] = useState(input);

  const [form] = Form.useForm();
  const handleEditFormChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = async (e) => {
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
    setValue({
      ...value,
      image: fileUrl,
    });
  };
  return (
    <Modal
      title="Cập nhật thông tin người dùng"
      open={open}
      onCancel={() => {
        if (editing) return;
        setOpen(false);
      }}
      footer={null}
    >
      <Form
        autoComplete="off"
        onFinish={() => editApi({ ...value, image: fileBase64 || value.image })}
        form={form}
        layout="vertical"
      >
        <Form.Item name="image" label="Ảnh đại diện">
          <Flex align="center" gap={'16px'} vertical>
            <Avatar size={128} src={value.image} icon={<UserOutlined />} />
            <Upload
              name="avatar"
              showUploadList={false}
              beforeUpload={() => {
                return false;
              }}
              onChange={handleChangeFile}
            >
              <Flex vertical align="center">
                <Button
                  icon={<UploadOutlined />}
                  loading={uploading}
                  disabled={editing}
                >
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
          initialValue={value.name}
        >
          <Input
            name="name"
            disabled={editing}
            onChange={handleEditFormChange}
            placeholder="Tên người dùng"
          />
        </Form.Item>
        {/* <Form.Item
          name="DepartmentId"
          label="Khoa phòng"
          rules={[{ required: true, message: 'Vui lòng chọn khoa phòng' }]}
        >
          <Select
            allowClear
            disabled={loadingDepartment || creating}
            placeholder="Chọn khoa phòng"
            onChange={(value) =>
              setCreateFormData({
                ...createFormData,
                department: value,
              })
            }
            options={departments.map((department) => {
              return {
                value: department.id,
                label: department.tenKhoaPhong,
              };
            })}
          />
        </Form.Item> */}

        <Form.Item name="address" label="Địa chỉ" initialValue={value.address}>
          <Input
            name="address"
            disabled={editing}
            onChange={handleEditFormChange}
            placeholder="Địa chỉ"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          initialValue={value.phone}
        >
          <Input
            name="phone"
            disabled={editing}
            onChange={handleEditFormChange}
            placeholder="Số điện thoại"
          />
        </Form.Item>

        <Form.Item
          name="role"
          label="Vai trò"
          rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
          initialValue={value.Role.name}
        >
          <Select
            allowClear
            disabled={loadingRoles || editing}
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
          <Button key="back" onClick={() => setOpen(false)} disabled={editing}>
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
