import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Flex,
  Form,
  Input,
  Divider,
  Typography,
  Space,
  message,
} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      setSaving(true);
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_API_URL}/auth/register`,
        data: values,
      });
      if (!res.data.success) {
        return messageApi.open({
          type: 'error',
          content: res.data.message,
        });
      }

      await messageApi.open({
        type: 'success',
        content: 'Đăng ký thành công!',
      });
      await messageApi.open({
        type: 'info',
        content: 'Đang chuyển sang trang đăng nhập!',
      });
      return navigate('/login');
    } catch (error) {
      console.log(error);
      return messageApi.open({
        type: 'error',
        content: 'Lỗi hệ thống',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      {contextHolder}
      <Card style={{ width: 350 }}>
        <Form
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Flex justify="center" vertical align="center">
              <Flex gap={16} align="center" justify="center">
                <Avatar
                  size={48}
                  src="https://inhoangkien.vn/wp-content/uploads/2020/04/Logo-B%E1%BB%99-Y-t%E1%BA%BF-01-e1585994422207-300x213.png"
                />

                <Flex vertical>
                  <Typography.Title level={4} style={{ margin: '0px' }}>
                    Quản lý hoạt động
                  </Typography.Title>
                  <Typography.Title level={4} style={{ margin: '0px' }}>
                    Phòng Vật tư Y tế
                  </Typography.Title>
                </Flex>
              </Flex>
              <Divider />
              <Typography.Title level={3} style={{ margin: 0 }}>
                Đăng kí
              </Typography.Title>
            </Flex>

            <Space
              direction="vertical"
              size="small"
              style={{ display: 'flex' }}
            >
              <Form.Item
                name="email"
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
                  onChange={handleInputChange}
                  prefix={<UserOutlined />}
                  placeholder="Tên đăng nhập"
                  disabled={saving}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input
                  name="password"
                  onChange={handleInputChange}
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Mật khẩu"
                  disabled={saving}
                />
              </Form.Item>
              <Form.Item
                name="passwordConfirm"
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Mật khẩu không giống nhau')
                      );
                    },
                  }),
                ]}
                disabled={saving}
              >
                <Input
                  name="passwordConfirm"
                  onChange={handleInputChange}
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                />
              </Form.Item>
            </Space>

            <Button
              size="large"
              type="primary"
              htmlType="submit"
              block
              loading={saving}
            >
              Đăng kí
            </Button>
            <Typography>
              hoặc {''}
              <Typography.Link onClick={() => navigate('/login')}>
                đăng nhập{' '}
              </Typography.Link>
              nếu đã có tài khoản!
            </Typography>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
