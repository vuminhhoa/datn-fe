import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Flex,
  Avatar,
  Typography,
  Breadcrumb,
  Button,
  Skeleton,
  Modal,
  Form,
  Input,
  Select,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import useFetchApi from '../../hooks/useFetchApi';
import isHasPermission from '../../helpers/isHasPermission';
import { permissionsConsts } from '../../const/permissionConsts';
import axios from 'axios';
import { useAuth } from '../../contexts/authProvider';

const Profile = () => {
  const { id } = useParams();
  const { setToast, user, setUser } = useAuth();
  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [form] = Form.useForm();

  const { data: rolesData, loading: loadingRoles } = useFetchApi({
    url: '/settings/roles',
    defaultData: [],
  });
  const roles = rolesData.roles;

  const [editFormData, setEditFormData] = useState(user);

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async () => {
    try {
      setUpdating(true);
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:5000/api/user',
        data: editFormData,
      });

      if (!res.data.success) {
        return setToast(res.data.message, 'error');
      }
      setUser(editFormData);
      localStorage.setItem('CURRENT_USER', JSON.stringify(editFormData));
      return setToast('Cập nhật thành công!');
    } catch (error) {
      console.log(error);
      setToast('Cập nhật thất bại', 'error');
    } finally {
      setUpdating(false);
      setIsShowEditForm(false);
    }
  };

  const items = [
    {
      key: '1',
      label: 'Tên',
      children: user?.name,
    },
    {
      key: '2',
      label: 'Số điện thoại',
      children: user?.phone,
    },
    {
      key: '3',
      label: 'Địa chỉ',
      children: user?.address,
    },
    {
      key: '4',
      label: 'Khoa phòng',
      children: user?.department,
    },
    {
      key: '5',
      label: 'Vai trò',
      children: user?.Role.name,
    },
    {
      key: '6',
      label: 'Email',
      children: user?.email,
    },
    {
      key: '6',
      label: 'Quyền hạn',
      children: user?.Role.Permissions.map(
        (permission) => permission.name
      ).join(', '),
    },
  ];

  if (loadingRoles) {
    return (
      <Flex vertical gap={16}>
        <Breadcrumb
          items={[
            {
              href: '/',
              title: <HomeOutlined />,
            },
            {
              href: '/users',
              title: 'Danh sách người dùng',
            },
            {
              href: `/user/${id}`,
              title: '----------',
            },
          ]}
        />
        <Card
          title="Thông tin người dùng"
          extra={
            isHasPermission(permissionsConsts.USER_UPDATE) && (
              <Button type="primary" icon={<EditOutlined />} disabled>
                Cập nhật
              </Button>
            )
          }
        >
          <Flex vertical align="center" gap={24}>
            <Flex vertical align="center" gap={8}>
              <Avatar size={128} shape="circle" />
              <Flex vertical align="center" gap={4}>
                <Skeleton.Input />
              </Flex>
            </Flex>
            <Skeleton
              paragraph={{
                rows: 4,
              }}
            />
          </Flex>
        </Card>
      </Flex>
    );
  }
  return (
    <Flex vertical gap={16}>
      <Breadcrumb
        items={[
          {
            href: '/',
            title: <HomeOutlined />,
          },
          {
            href: '/users',
            title: 'Danh sách người dùng',
          },
          {
            href: '/',
            title: user?.name ? user?.name : user?.email,
          },
        ]}
      />
      <Modal
        title="Cập nhật thông tin người dùng"
        open={isShowEditForm}
        onCancel={() => setIsShowEditForm(false)}
        footer={null}
      >
        <Form
          autoComplete="off"
          onFinish={handleUpdateUser}
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Tên người dùng"
            rules={[
              { required: true, message: 'Vui lòng nhập tên người dùng!' },
            ]}
            initialValue={user.name}
          >
            <Input
              name="name"
              onChange={handleEditFormChange}
              placeholder="Tên người dùng"
            />
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ" initialValue={user.address}>
            <Input
              name="address"
              onChange={handleEditFormChange}
              placeholder="Địa chỉ"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            initialValue={user.phone}
          >
            <Input
              name="phone"
              onChange={handleEditFormChange}
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="department"
            label="Khoa phòng"
            rules={[{ required: true, message: 'Vui lòng chọn khoa phòng!' }]}
            initialValue={user.department}
          >
            <Select
              allowClear
              placeholder="Chọn khoa phòng"
              onChange={(value) =>
                setEditFormData({
                  ...editFormData,
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
            initialValue={user.Role.name}
          >
            <Select
              allowClear
              placeholder="Chọn vai trò"
              onChange={(value) =>
                setEditFormData({
                  ...editFormData,
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
            <Button key="back" onClick={() => setIsShowEditForm(false)}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={updating}>
              Lưu
            </Button>
          </Flex>
        </Form>
      </Modal>
      <Card
        title="Thông tin người dùng"
        extra={
          isHasPermission(permissionsConsts.USER_UPDATE) && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsShowEditForm(true)}
            >
              Cập nhật
            </Button>
          )
        }
      >
        <Flex vertical align="center" gap={24}>
          <Flex vertical align="center" gap={8}>
            <Avatar
              size={128}
              src={
                user.image ||
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              }
              shape="circle"
            />
            <Flex vertical align="center" gap={4}>
              <Typography.Title level={3} style={{ margin: '0px' }}>
                {user?.name || user?.email}
              </Typography.Title>
              <Typography.Paragraph style={{ margin: '0px' }}>
                {user?.Role.name}
              </Typography.Paragraph>
            </Flex>
          </Flex>
          <Descriptions items={items} column={3} />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Profile;
