import React, { useState } from 'react';
import {
  Card,
  Flex,
  Breadcrumb,
  Modal,
  Input,
  Button,
  Select,
  List,
  Form,
  Avatar,
  Popover,
} from 'antd';
import {
  HomeOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { useApp } from '../../contexts/appProvider';
import useFetchApi from '../../hooks/useFetchApi';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN } from '../../const/role';
import useCreateApi from '../../hooks/useCreateApi';
import useDeleteApi from '../../hooks/useDeleteApi';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';

const User = () => {
  const navigate = useNavigate();
  const { setToast } = useApp();
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const [form] = Form.useForm();
  const { creating, createApi } = useCreateApi('/auth/register');
  const { deleting, deleteApi } = useDeleteApi(`/user`);
  const { data, fetchApi, setData, loading } = useFetchApi({
    url: '/users',
    defaultData: [],
  });
  const breadcrumbItems = useBreadcrumb([
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/users',
      title: 'Quản lý thành viên',
    },
  ]);
  const { data: rolesData, loading: loadingRoles } = useFetchApi({
    url: '/settings/roles',
    defaultData: [],
  });
  const roles = rolesData.roles;

  const [createFormData, setCreateFormData] = useState({});
  const handleCreateFormChange = (e) => {
    setCreateFormData({
      ...createFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = async () => {
    try {
      const res = await createApi(createFormData);
      if (!res.data.success) {
        return setToast(res.data.message, 'error');
      }

      return setToast('Tạo mới thành công');
    } catch (error) {
      console.log(error);
      setToast('Tạo mới thất bại', 'error');
    } finally {
      setIsShowCreateForm(false);
      fetchApi();
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await deleteApi(id);
      if (!res.data.success) {
        setToast(res.data.message, 'error');
      }
      setData(data.filter((item) => item.id !== id));
      setToast('Xóa thành công');
    } catch (error) {
      console.log(error);
      setToast('Xóa thất bại', 'error');
    }
  };

  if (loading || loadingRoles)
    return (
      <Flex vertical gap={16}>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title="Danh sách thành viên"
          extra={
            <Button type="primary" icon={<PlusOutlined />} disabled>
              Tạo mới
            </Button>
          }
        >
          <List bordered pagination loading itemLayout="horizontal" />
        </Card>
      </Flex>
    );
  return (
    <Flex vertical gap={16}>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title="Danh sách thành viên"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsShowCreateForm(true)}
            disabled={deleting}
          >
            Tạo mới
          </Button>
        }
      >
        <Flex gap={16} vertical>
          <Modal
            title="Tạo mới người dùng"
            open={isShowCreateForm}
            onCancel={() => setIsShowCreateForm(false)}
            footer={null}
          >
            <Form
              autoComplete="off"
              onFinish={handleCreateUser}
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
                  onChange={handleCreateFormChange}
                  placeholder="Tên người dùng"
                />
              </Form.Item>
              <Form.Item name="address" label="Địa chỉ">
                <Input
                  name="address"
                  onChange={handleCreateFormChange}
                  placeholder="Địa chỉ"
                />
              </Form.Item>
              <Form.Item name="phone" label="Số điện thoại">
                <Input
                  name="phone"
                  onChange={handleCreateFormChange}
                  placeholder="Số điện thoại"
                />
              </Form.Item>
              <Form.Item
                name="department"
                label="Khoa phòng"
                rules={[
                  { required: true, message: 'Vui lòng chọn khoa phòng!' },
                ]}
              >
                <Select
                  allowClear
                  placeholder="Chọn khoa phòng"
                  onChange={(value) =>
                    setCreateFormData({
                      ...createFormData,
                      department: value,
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
              <Form.Item
                name="role"
                label="Vai trò"
                rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
              >
                <Select
                  allowClear
                  placeholder="Chọn vai trò"
                  onChange={(value) =>
                    setCreateFormData({
                      ...createFormData,
                      role: value,
                    })
                  }
                  options={roles.map((role) => {
                    return {
                      value: role.id,
                      label: role.name,
                    };
                  })}
                />
              </Form.Item>

              <Flex gap={8} justify="flex-end">
                <Button key="back" onClick={() => setIsShowCreateForm(false)}>
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit" loading={creating}>
                  Lưu
                </Button>
              </Flex>
            </Form>
          </Modal>

          <List
            bordered
            pagination
            loading={loading}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                extra={[
                  <Popover content="Xem chi tiết" trigger="hover">
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => navigate(`/user/${item.id}`)}
                    />
                  </Popover>,

                  item.Role.name !== ADMIN ? (
                    <Popover content="Xóa thành viên" trigger="hover">
                      <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteUser(item.id)}
                      />
                    </Popover>
                  ) : null,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} icon={<UserOutlined />} />}
                  title={
                    <Link to={`/user/${item.id}`}>
                      {item.name ? item.name : item.email}
                    </Link>
                  }
                  description={item.Role.name}
                />
              </List.Item>
            )}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default User;
