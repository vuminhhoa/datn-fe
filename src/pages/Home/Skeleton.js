import React from 'react';
import { Flex, Row, Col, Statistic, Card, List, Typography } from 'antd';
import {
  UserOutlined,
  DesktopOutlined,
  AuditOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page/Page.js';

function Skeleton() {
  const navigate = useNavigate();

  return (
    <Page>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            hoverable
            bordered={false}
            onClick={() => navigate('/users/list_users')}
          >
            <Statistic
              title="Số lượng thành viên"
              value={'--'}
              valueStyle={{
                color: '#3f8600',
              }}
              prefix={
                <div style={{ paddingInlineEnd: '8px' }}>
                  <UserOutlined />
                </div>
              }
              suffix={
                <div style={{ paddingInlineStart: '8px' }}>thành viên</div>
              }
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            bordered={false}
            onClick={() => navigate('/equipments/list_equipments')}
            hoverable
          >
            <Statistic
              title="Số lượng thiết bị"
              value={'--'}
              valueStyle={{
                color: '#3f8600',
              }}
              prefix={
                <div style={{ paddingInlineEnd: '8px' }}>
                  <DesktopOutlined />
                </div>
              }
              suffix={<div style={{ paddingInlineStart: '8px' }}>thiết bị</div>}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            bordered={false}
            onClick={() => navigate('/shopping/bidding')}
            hoverable
          >
            <Statistic
              title="Số lượng hoạt động mua sắm"
              value={'--'}
              valueStyle={{
                color: '#3f8600',
              }}
              prefix={
                <div style={{ paddingInlineEnd: '8px' }}>
                  <AuditOutlined />
                </div>
              }
              suffix={
                <div style={{ paddingInlineStart: '8px' }}>hoạt động</div>
              }
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            bordered={false}
            onClick={() => navigate('/departmens/list_departments')}
            hoverable
          >
            <Statistic
              title="Số lượng khoa phòng"
              value={'--'}
              valueStyle={{
                color: '#3f8600',
              }}
              prefix={
                <div style={{ paddingInlineEnd: '8px' }}>
                  <ApartmentOutlined />
                </div>
              }
              suffix={
                <div style={{ paddingInlineStart: '8px' }}>khoa phòng</div>
              }
            />
          </Card>
        </Col>
      </Row>
      <Card bordered={false}>
        <Flex gap={4} vertical>
          <Typography.Title level={5} style={{ margin: '0px' }}>
            Thông kê hoạt động mua sắm
          </Typography.Title>
          <List loading={true} />
        </Flex>
      </Card>
      <Card bordered={false}>
        <Flex gap={4} vertical>
          <Typography.Title level={5} style={{ margin: '0px' }}>
            Hoạt động gần đây
          </Typography.Title>
          <List loading={true} />
        </Flex>
      </Card>
    </Page>
  );
}

export default Skeleton;
