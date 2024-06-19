import React, { useState } from 'react';
import { Card, Flex, Breadcrumb, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { ADMIN } from '../../const/role';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import Page from '../../components/Page';
import { Input, Select, Form } from 'antd';
import useCreateApi from '../../hooks/useCreateApi';
import { useAuthContext } from '../../contexts/authContext';
import { useAppContext } from '../../contexts/appContext';

const CreateUser = () => {
  const { user } = useAuthContext();
  const { roles, departments, loadingRoles, loadingDepartments } =
    useAppContext();
  const [form] = Form.useForm();
  const { creating, createApi } = useCreateApi({
    url: '/auth/register',
    successCallback: () => {
      form.resetFields();
    },
  });

  const [createFormData, setCreateFormData] = useState({});
  const handleCreateFormChange = (e) => {
    setCreateFormData({
      ...createFormData,
      [e.target.name]: e.target.value,
    });
  };

  const breadcrumbItems = useBreadcrumb([
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/users/list_users',
      title: 'Quản lý thành viên',
    },
    {
      href: '/users/create_user',
      title: 'Tạo mới thành viên',
    },
  ]);

  return (
    <Page>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title="Tạo mới thành viên"
        extra={
          <Button
            type="primary"
            htmlType="submit"
            loading={creating}
            disabled={loadingDepartments || loadingRoles}
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
                  ...createFormData,
                  isCreateUser: true,
                  actorId: user.id,
                },
              })
            }
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Tài khoản"
              rules={[
                {
                  type: 'email',
                  message: 'Email không đúng định dạng!',
                },
                { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
              ]}
            >
              <Input
                name="email"
                onChange={handleCreateFormChange}
                placeholder="Tên đăng nhập"
                disabled={creating}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input
                name="password"
                onChange={handleCreateFormChange}
                type="password"
                placeholder="Mật khẩu"
                disabled={creating}
              />
            </Form.Item>
            <Form.Item
              name="name"
              label="Tên người dùng"
              rules={[
                { required: true, message: 'Vui lòng nhập tên người dùng!' },
              ]}
            >
              <Input
                name="name"
                disabled={creating}
                onChange={handleCreateFormChange}
                placeholder="Tên người dùng"
              />
            </Form.Item>
            <Form.Item
              name="DepartmentId"
              label="Khoa phòng"
              rules={[{ required: true, message: 'Vui lòng chọn khoa phòng' }]}
            >
              <Select
                allowClear
                disabled={loadingDepartments || creating}
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
            </Form.Item>
            <Form.Item name="address" label="Địa chỉ">
              <Input
                name="address"
                disabled={creating}
                onChange={handleCreateFormChange}
                placeholder="Địa chỉ"
              />
            </Form.Item>
            <Form.Item name="phone" label="Số điện thoại">
              <Input
                name="phone"
                disabled={creating}
                onChange={handleCreateFormChange}
                placeholder="Số điện thoại"
              />
            </Form.Item>

            <Form.Item
              name="role"
              label="Vai trò"
              rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
            >
              <Select
                allowClear
                disabled={loadingRoles || creating}
                placeholder="Chọn vai trò"
                onChange={(value) =>
                  setCreateFormData({
                    ...createFormData,
                    role: value,
                  })
                }
                options={roles
                  .filter((role) => role.name !== ADMIN)
                  .map((role) => {
                    return {
                      value: role.id,
                      label: role.name,
                    };
                  })}
              />
            </Form.Item>
          </Form>
        </Flex>
      </Card>
    </Page>
  );
};

export default CreateUser;
