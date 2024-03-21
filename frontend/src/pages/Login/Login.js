import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, Typography } from 'antd';
import axios from 'axios';
import './Login.css'; // Import file CSS để tùy chỉnh căn giữa và background

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <Card>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <h1>Đăng nhập</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
            ]}
          >
            <Input
              name="email"
              onChange={handleInputChange}
              prefix={<UserOutlined className="site-form-item-icon" />}
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
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Quên mật khẩu
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={async () => {
                const res = await axios({
                  method: 'POST',
                  url: 'http://localhost:5000/api/auth/login',
                  data: formData,
                });
                if (res.data.success === true) {
                  return alert('Success');
                }
                alert(res.data.message);
              }}
            >
              Đăng nhập
            </Button>
            hoặc <a href="">đăng ký ngay!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
