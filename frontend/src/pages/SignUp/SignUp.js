import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Typography,
  Space,
  message,
} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/auth/register',
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
            <Flex justify="center">
              <Typography.Title level={3}>Đăng kí</Typography.Title>
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

            <Button size="large" type="primary" htmlType="submit" block>
              Đăng kí
            </Button>
            <Typography>
              hoặc {''}
              <Typography.Link href="/login">đăng nhập </Typography.Link>
              nếu đã có tài khoản!
            </Typography>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
