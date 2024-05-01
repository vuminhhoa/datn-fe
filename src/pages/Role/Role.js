import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Flex,
  Breadcrumb,
  Table,
  Button,
  Form,
  Input,
  Modal,
  Typography,
  Checkbox,
} from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import useFetchApi from '../../hooks/useFetchApi.js';
import {
  DASHBOARD_READ,
  ALL_PERMISSION,
  PERMISSION_GROUP,
  ROLE_CREATE,
} from '../../const/permission.js';
import axios from 'axios';
import { useApp } from '../../contexts/appProvider.js';
import hasPermission from '../../helpers/hasPermission.js';
import { useBreadcrumb } from '../../hooks/useBreadcrumb.js';

const columns = [
  {
    title: 'Vai trò',
    dataIndex: 'role',
    ellipsis: true,
    width: 240,
    render: (text, record) => {
      return <Link to={`/role/${record.id}`}>{text}</Link>;
    },
  },
  {
    title: 'Quyền hạn',
    dataIndex: 'permissions',
  },
];

const Role = () => {
  const { setToast } = useApp();
  const { data, setData, loading, fetchApi } = useFetchApi({
    url: '/roles',
  });

  const breadcrumbItems = useBreadcrumb([
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/roles',
      title: 'Cài đặt phân quyền',
    },
  ]);
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (loading) return;
    if (!loading && data.roles) {
      setData(data);
    }
  }, [loading]);

  const dataSource = data?.roles?.map((role) => {
    return {
      key: role.id,
      id: role.id,
      role: role.name,
      permissions:
        role.Permissions.length === ALL_PERMISSION.length
          ? 'Tất cả quyền hạn'
          : role.Permissions.map((permission) => permission.name).join(', '),
    };
  });

  const [createFormData, setCreateFormData] = useState({});
  const handleCreateFormChange = (e) => {
    setCreateFormData({
      ...createFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectPermission = (e, item) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedPermission((prev) => [...prev, item]);
    }
    if (!checked) {
      setSelectedPermission((prev) => prev.filter((i) => i !== item));
    }
  };

  const handleCreateRole = async () => {
    try {
      setCreating(true);
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_API_URL}/role`,
        data: { ...createFormData, permissions: selectedPermission },
      });
      if (!res.data.success) {
        return setToast(res.data.message, 'error');
      }

      return setToast('Tạo mới thành công');
    } catch (error) {
      console.log(error);
      setToast('Tạo mới thất bại', 'error');
    } finally {
      setCreating(false);
      setIsShowCreateForm(false);
      fetchApi();
    }
  };

  return (
    <Flex vertical gap={16}>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title="Danh sách vai trò trong hệ thống"
        extra={
          hasPermission(ROLE_CREATE) && (
            <Button
              type="primary"
              disabled={loading || creating}
              icon={<PlusOutlined />}
              onClick={() => setIsShowCreateForm(true)}
            >
              Tạo mới
            </Button>
          )
        }
      >
        <Flex vertical gap={16}>
          <Modal
            title="Tạo mới vai trò"
            open={isShowCreateForm}
            onCancel={() => setIsShowCreateForm(false)}
            footer={null}
          >
            <Form
              autoComplete="off"
              onFinish={handleCreateRole}
              form={form}
              layout="vertical"
            >
              <Form.Item
                name="name"
                label="Tên vai trò"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên vai trò!' },
                ]}
              >
                <Input
                  name="name"
                  onChange={handleCreateFormChange}
                  placeholder="Tên vai trò"
                  disabled={creating}
                />
              </Form.Item>
              <Form.Item
                name="permissions"
                label="Quyền hạn"
                rules={[
                  {
                    required: true,
                    validator: () => {
                      if (selectedPermission.length > 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Cần chọn ít nhất 1 quyền hạn cho vai trò!')
                      );
                    },
                  },
                ]}
              >
                <Flex vertical gap={8} style={{ marginLeft: '24px' }}>
                  <Checkbox
                    checked={selectedPermission.includes(DASHBOARD_READ)}
                    disabled={creating}
                    onChange={(e) => handleSelectPermission(e, DASHBOARD_READ)}
                  >
                    {DASHBOARD_READ}
                  </Checkbox>
                  {PERMISSION_GROUP.map((group) => (
                    <Flex vertical>
                      <Typography.Text>Quản lý {group}</Typography.Text>
                      {ALL_PERMISSION.filter((item) =>
                        item.includes(group)
                      ).map((item) => (
                        <Checkbox
                          checked={selectedPermission.includes(item)}
                          disabled={creating}
                          onChange={(e) => handleSelectPermission(e, item)}
                        >
                          {item}
                        </Checkbox>
                      ))}
                    </Flex>
                  ))}
                </Flex>
              </Form.Item>

              <Flex gap={8} justify="flex-end">
                <Button key="back" onClick={() => setIsShowCreateForm(false)}>
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit" loading={creating}>
                  Tạo mới
                </Button>
              </Flex>
            </Form>
          </Modal>

          <Table
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            bordered
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Role;
