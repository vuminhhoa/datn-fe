import React, { useEffect } from 'react';
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
  ApartmentOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useFetchApi from '../../hooks/useFetchApi.js';
import Page from '../../components/Page/Page.js';
import socket from '../../helpers/socket.js';
import { timeAgo } from '../../helpers/date.js';

const getFetchUrl = (type) => {
  switch (type) {
    case 'bidding':
      return 'shopping';
    default:
      return type;
  }
};

function Home() {
  const navigate = useNavigate();
  const { data, loading, setData } = useFetchApi({
    url: `/dashboard`,
    defaultData: {},
  });

  useEffect(() => {
    socket.connect();
    socket.on('newActivity', (newActivity) => {
      setData((prev) => ({
        ...prev,
        activities: [newActivity, ...prev.activities],
      }));
    });

    return () => {
      socket.off('newActivity');
      socket.disconnect();
    };
  }, [setData]);

  if (loading) {
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
          <Card
            hoverable
            bordered={false}
            onClick={() => navigate('/users/list_users')}
          >
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
            onClick={() => navigate('/equipments/list_equipments')}
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
              title="Số lượng hoạt động mua sắm"
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
            onClick={() => navigate('/departments/list_departments')}
            hoverable
          >
            <Statistic
              title="Số lượng khoa phòng"
              value={loading ? '--' : data.countDepartments}
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
                        <Typography.Text>
                          <Button
                            type="link"
                            size="small"
                            style={{ padding: '0px', margin: '0px' }}
                            onClick={() => navigate(`/user/${item.actor.id}`)}
                          >
                            {item.actor.name || item.actor.email}
                          </Button>{' '}
                          <Typography.Text type="primary">
                            {item.action}
                          </Typography.Text>{' '}
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
                        </Typography.Text>
                        <Flex
                          align="flex-end"
                          style={{ width: '150px' }}
                          justify="flex-end"
                        >
                          <Typography.Text type="secondary">
                            {timeAgo(item.createdAt)}
                          </Typography.Text>
                        </Flex>
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
