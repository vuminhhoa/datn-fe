import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Flex,
  Row,
  Col,
  Avatar,
  Typography,
  Breadcrumb,
  Button,
} from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/authProvider';

const Profile = () => {
  const { user } = useAuth();
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
    <Flex vertical gap={16}>
      <Breadcrumb
        items={[
          {
            href: '/',
            title: <HomeOutlined />,
          },
          {
            href: '/profile',
            title: (
              <>
                <UserOutlined />
                <span>Thông tin cá nhân</span>
              </>
            ),
          },
        ]}
      />
      <Row gutter={12}>
        <Col span={16}>
          <Card>
            <Flex flex>
              <Descriptions
                title="Thông tin tài khoản"
                items={items}
                column={2}
                extra={
                  <Button type="link">
                    <Link to={'/profile/edit'}>
                      <Flex gap={6}>
                        <EditOutlined />
                        Cập nhật
                      </Flex>
                    </Link>
                  </Button>
                }
              />
            </Flex>
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

export default Profile;
