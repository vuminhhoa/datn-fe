import React from 'react';
import {
  Button,
  Flex,
  Row,
  Col,
  Statistic,
  Card,
  List,
  Avatar,
  Typography,
} from 'antd';
import {
  UserOutlined,
  DesktopOutlined,
  AuditOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useFetchApi from '../../hooks/useFetchApi.js';

function Home() {
  const navigate = useNavigate();
  const { data: input, loading } = useFetchApi({
    url: `/dashboard`,
    defaultData: {},
  });
  const data = input.activities;
  return (
    <Flex gap={16} vertical>
      <Row gutter={16}>
        <Col span={12}>
          <Card hoverable bordered={false} onClick={() => navigate('/users')}>
            <Statistic
              title="Số lượng thành viên"
              value={loading ? '--' : data.countUsers}
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
            onClick={() => navigate('/equipments')}
            hoverable
          >
            <Statistic
              title="Số lượng thiết bị"
              value={loading ? '--' : data.countEquipments}
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
              title="Số lượng hoạt động mua sắm đấu thầu"
              value={loading ? '--' : data.countBidding}
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
            onClick={() => navigate('/shopping/non-bidding')}
            hoverable
          >
            <Statistic
              title="Số lượng hoạt động mua sắm không đấu thầu"
              value={loading ? '--' : data.countNonBidding}
              valueStyle={{
                color: '#3f8600',
              }}
              prefix={
                <div style={{ paddingInlineEnd: '8px' }}>
                  <ProfileOutlined />
                </div>
              }
              suffix={
                <div style={{ paddingInlineStart: '8px' }}>hoạt động</div>
              }
            />
          </Card>
        </Col>
      </Row>
      <Card bordered={false}>
        <Flex gap={4} vertical>
          <Typography.Title level={5} style={{ margin: '0px' }}>
            Hoạt động gần đây
          </Typography.Title>
          <List
            loading={loading}
            footer={
              <Flex justify="center">
                <Button
                  type="link"
                  size="small"
                  style={{ padding: '0px', margin: '0px' }}
                  onClick={() => navigate(`/activities`)}
                >
                  Xem tất cả
                </Button>
              </Flex>
            }
            dataSource={data?.activities}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item?.image} icon={UserOutlined} />}
                  description={
                    <Flex justify="space-between" align="baseline">
                      <Typography.Text type="primary">
                        {item.action}
                      </Typography.Text>

                      <Typography.Text type="secondary">
                        {item.createdAt}
                      </Typography.Text>
                    </Flex>
                  }
                />
              </List.Item>
            )}
          />
        </Flex>
      </Card>
    </Flex>
  );
}

export default Home;
