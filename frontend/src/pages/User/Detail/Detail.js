import React from 'react';
import { Link, useParams } from 'react-router-dom';
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
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import useFetchApi from '../../../hooks/useFetchApi';
import isHasPermission from '../../../helpers/isHasPermission';
import { permissionsConsts } from '../../../const/permissionConsts';

const DetailUser = () => {
  const { id } = useParams();
  const { data } = useFetchApi({ url: `/user/${id}` });

  const items = [
    {
      key: '1',
      label: 'Tên',
      children: data.user?.name,
    },
    {
      key: '2',
      label: 'Số điện thoại',
      children: data.user?.phone,
    },
    {
      key: '3',
      label: 'Địa chỉ',
      children: data.user?.address,
    },
    {
      key: '4',
      label: 'Khoa phòng',
      children: data.user?.department,
    },
    {
      key: '5',
      label: 'Vai trò',
      children: data.user?.Role.name,
    },
    {
      key: '6',
      label: 'Email',
      children: data.user?.email,
    },
    {
      key: '6',
      label: 'Quyền hạn',
      children: data.user?.Role.Permissions.map(
        (permission) => permission.name
      ).join(', '),
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
            title: 'Danh sách người dùng',
          },
          {
            href: '/',
            title: data.user?.name ? data.user?.name : data.user?.email,
          },
        ]}
      />
      <Row gutter={12}>
        <Col span={16}>
          <Card
            title="Thông tin người dùng"
            extra={
              isHasPermission(permissionsConsts.USER_UPDATE) && (
                <Button type="link">
                  <Link to={'/profile/edit'}>
                    <Flex gap={6}>
                      <EditOutlined />
                      Cập nhật
                    </Flex>
                  </Link>
                </Button>
              )
            }
          >
            <Flex flex>
              <Descriptions items={items} column={2} />
            </Flex>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Ảnh đại diện"
            extra={
              isHasPermission(permissionsConsts.USER_UPDATE) && (
                <Button type="link">Thay đổi</Button>
              )
            }
          >
            <Flex align="center" vertical gap={16}>
              <Avatar
                size={128}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                shape="circle"
              />
              <Typography.Title level={3} style={{ margin: '0px' }}>
                {data.user?.name}
              </Typography.Title>
              <Typography.Paragraph style={{ margin: '0px' }}>
                {data.user?.Role.name}
              </Typography.Paragraph>
            </Flex>
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};

export default DetailUser;
