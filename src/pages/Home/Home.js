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
import Page from '../../components/Page/Page.js';

const getFetchUrl = (type) => {
  switch (type) {
    case 'bidding':
      return 'shopping/bidding';
    default:
      return type;
  }
};

function Home() {
  const navigate = useNavigate();
  const { data, loading } = useFetchApi({
    url: `/dashboard`,
    defaultData: {},
  });

  if (loading) {
    return (
      <Page>
        <Row gutter={16}>
          <Col span={12}>
            <Card hoverable bordered={false} onClick={() => navigate('/users')}>
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
              onClick={() => navigate('/equipments')}
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
                suffix={
                  <div style={{ paddingInlineStart: '8px' }}>thiết bị</div>
                }
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
              onClick={() => navigate('/shopping/non-bidding')}
              hoverable
            >
              <Statistic
                title="Số lượng hoạt động mua sắm không đấu thầu"
                value={'--'}
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
            <List loading={true} />
          </Flex>
        </Card>
      </Page>
    );
  }

  return (
    <Page>
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
              value={loading ? '--' : data.countBiddings}
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
              value={loading ? '--' : data.countNonBiddings}
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
          <Flex justify="space-between">
            <Typography.Title level={5} style={{ margin: '0px' }}>
              Hoạt động gần đây
            </Typography.Title>
            {data.hasNext && (
              <Button
                type="link"
                size="small"
                style={{ padding: '0px', margin: '0px' }}
                onClick={() => navigate(`/activities`)}
              >
                Xem tất cả
              </Button>
            )}
          </Flex>

          <List
            loading={loading}
            dataSource={data.activities}
            renderItem={(item) => {
              const url = item.target ? getFetchUrl(item.target.type) : '';
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.actor.image} icon={<UserOutlined />} />
                    }
                    description={
                      <Flex justify="space-between" align="baseline">
                        <Flex gap={4} align="baseline">
                          <Button
                            type="link"
                            size="small"
                            style={{ padding: '0px', margin: '0px' }}
                            onClick={() => navigate(`/user/${item.actor.id}`)}
                          >
                            {item.actor.name || item.actor.email}
                          </Button>
                          <Typography.Text type="primary">
                            {item.action}
                          </Typography.Text>
                          {item.target && (
                            <Button
                              type="link"
                              size="small"
                              style={{ padding: '0px', margin: '0px' }}
                              onClick={() =>
                                navigate(`/${url}/${item.target.id}`)
                              }
                            >
                              {item.target.name}
                            </Button>
                          )}
                        </Flex>

                        <Typography.Text type="secondary">
                          {item.createdAt}
                        </Typography.Text>
                      </Flex>
                    }
                  />
                </List.Item>
              );
            }}
          />
        </Flex>
      </Card>
    </Page>
  );
}

export default Home;
