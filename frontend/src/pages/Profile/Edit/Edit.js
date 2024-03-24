import React, { useContext } from 'react';
import {
  Card,
  Descriptions,
  Flex,
  Row,
  Col,
  Avatar,
  Typography,
  Button,
  Form,
  Input,
  InputNumber,
} from 'antd';
import UserContext from '../../../contexts/userContext';

const EditProfile = () => {
  const user = useContext(UserContext);
  const items = [
    {
      key: '1',
      label: 'Tên',
      children: user.name,
    },
    {
      key: '2',
      label: 'Số điện thoại',
      children: user.phone,
    },
    {
      key: '3',
      label: 'Địa chỉ',
      children: user.address,
    },
    {
      key: '4',
      label: 'Khoa phòng',
      children: user.department,
    },
    {
      key: '5',
      label: 'Vai trò',
      children: user.Role.name,
    },
    {
      key: '6',
      label: 'Email',
      children: user.email,
    },
    {
      key: '6',
      label: 'Quyền hạn',
      children: user.Role.Permissions.map((permission) => permission.name).join(
        ', '
      ),
    },
  ];

  return (
    <Row gutter={12}>
      <Col span={16}>
        <Card title="Thông tin tài khoản">
          <Form>
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="InputNumber"
              name="InputNumber"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="TextArea"
              name="TextArea"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Ảnh đại diện" extra={<Button>Thay đổi</Button>}>
          <Flex align="center" vertical gap={16}>
            <Avatar
              size={128}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              shape="circle"
            />
            <Typography.Title level={3} style={{ margin: '0px' }}>
              {user.name}
            </Typography.Title>
            <Typography.Paragraph style={{ margin: '0px' }}>
              {user.Role.name}
            </Typography.Paragraph>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};

export default EditProfile;
