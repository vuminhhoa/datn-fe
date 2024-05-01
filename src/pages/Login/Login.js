import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Typography,
  Space,
  message,
} from 'antd';
import './Login.css';
import { useApp } from '../../contexts/appProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const auth = useApp();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      auth.loginAction(values);
    } catch (error) {
      console.log(error);
      return messageApi.open({
        type: 'error',
        content: 'Đăng nhập thất bại',
      });
    } finally {
      setLoading(false);
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
        <Form name="normal_login" onFinish={onFinish} autoComplete="off">
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Flex justify="center">
              <Typography.Title level={3}>Đăng nhập</Typography.Title>
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
                  { required: true, message: 'Vui lòng email đăng nhập!' },
                ]}
              >
                <Input
                  name="email"
                  onChange={handleInputChange}
                  prefix={<UserOutlined />}
                  placeholder="Tên đăng nhập"
                  disabled={loading}
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
                  disabled={loading}
                />
              </Form.Item>
            </Space>

            <Flex justify="space-between">
              <Checkbox disabled={loading}>Ghi nhớ đăng nhập</Checkbox>
              <Typography.Link>Quên mật khẩu</Typography.Link>
            </Flex>

            <Button
              size="large"
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Đăng nhập
            </Button>
            <Typography>
              hoặc{' '}
              <Typography.Link onClick={() => navigate('/sign-up')}>
                đăng ký ngay!
              </Typography.Link>
            </Typography>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
