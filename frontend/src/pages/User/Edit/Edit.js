import React from 'react';
import {
  Card,
  Flex,
  Row,
  Col,
  Avatar,
  Typography,
  Button,
  Form,
  Input,
  Breadcrumb,
  Spin,
} from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import useEditApi from '../../../hooks/useEditApi';
import { useAuth } from '../../../contexts/authProvider';
import useFetchApi from '../../../hooks/useFetchApi';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const { setToast } = useAuth();
  const { editing, editApi } = useEditApi('/profile/edit');
  const { data, loading, setData } = useFetchApi({ url: `/user/${id}` });

  const user = data.user;

  const onFinish = async (val) => {
    try {
      console.log(val);
      const res = await editApi({ ...user, ...val });
      if (res.data.success) {
        setData({ ...data, user: { ...user, ...val } });
        setToast('Cập nhật thành công');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Spin />;
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
            href: '/profile',
            title: 'Danh sách người dùng',
          },
          {
            title: user?.name || user?.email,
          },
        ]}
      />
      <Row gutter={12}>
        <Col span={16}>
          <Card title="Cập nhật thông tin">
            <Form onFinish={onFinish}>
              <Form.Item
                label="Tên"
                name="name"
                rules={[{ required: true, message: 'Thông tin bắt buộc!' }]}
              >
                <Input defaultValue={user.name} disabled={editing} />
              </Form.Item>

              <Form.Item label="Email">
                <Input defaultValue={user.email} disabled />
              </Form.Item>

              <Form.Item label="Vai trò">
                <Input defaultValue={user.Role.name} disabled />
              </Form.Item>

              {/* <Form.Item
              label="Khoa phòng"
              name={'department'}
              rules={[{ required: true, message: 'Thông tin bắt buộc!' }]}
            >
              <Input defaultValue={user.department} />
            </Form.Item> */}

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: 'Thông tin bắt buộc!' }]}
              >
                <Input defaultValue={user.phone} disabled={editing} />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Thông tin bắt buộc!' }]}
              >
                <Input defaultValue={user.address} disabled={editing} />
              </Form.Item>

              <Form.Item label="Quyền hạn">
                <Input.TextArea
                  defaultValue={user.Role.Permissions.map(
                    (permission) => permission.name
                  ).join(', ')}
                  disabled
                  multiple
                  rows={4}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={editing}>
                Lưu
              </Button>
            </Form>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Ảnh đại diện"
            extra={<Button type="link">Thay đổi</Button>}
          >
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
    </Flex>
  );
};

export default EditUser;
