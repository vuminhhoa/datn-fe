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

const defaultData = {
  countEquipments: 0,
  countUsers: 0,
  countBidding: 0,
  countNonBidding: 0,
  activities: [
    {
      ActorId: 1,
      Actor: {
        name: 'Vũ Minh Hòa',
        image: 'https://i.pravatar.cc/300',
      },
      action: 'đã cập nhật vai trò',
      actionModel: 'Role',
      RoleId: 1,
      Role: {
        id: 1,
        name: 'Quản trị viên',
      },
      createdAt: '59 phút trước',
    },
    {
      ActorId: 1,
      Actor: {
        name: 'Vũ Minh Hòa',
        image: 'https://i.pravatar.cc/300',
      },
      action: 'đã cập nhật thiết bị',
      actionModel: 'Equipment',
      EquipmentId: 1,
      Equipment: {
        id: 1,
        name: 'máy tính',
      },
      createdAt: '12 phút trước',
    },
    {
      ActorId: 1,
      Actor: {
        name: 'Vũ Minh Hòa',
        image: 'https://i.pravatar.cc/300',
      },
      action: 'đã xóa vai trò',
    },
    {
      ActorId: 1,
      Actor: {
        name: 'Vũ Minh Hòa',
        image: 'https://i.pravatar.cc/300',
      },
      action: 'đã xóa vai trò',
    },
    {
      ActorId: 1,
      Actor: {
        name: 'Vũ Minh Hòa',
        image: 'https://i.pravatar.cc/300',
      },
      action: 'đã xóa vai trò',
    },
    {
      ActorId: 1,
      Actor: {
        name: 'Vũ Minh Hòa',
        image: 'https://i.pravatar.cc/300',
      },
      action: 'đã xóa vai trò',
    },
  ],
};

function Home() {
  const navigate = useNavigate();
  const { data, loading } = useFetchApi({
    url: `/dashboard`,
    defaultData: defaultData,
  });
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
              prefix={<UserOutlined />}
              suffix="thành viên"
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
              prefix={<DesktopOutlined />}
              suffix="thiết bị"
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
              prefix={<AuditOutlined />}
              suffix="hoạt động"
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
              prefix={<ProfileOutlined />}
              suffix="hoạt động"
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
            dataSource={data.activities}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.Actor.image} icon={UserOutlined} />}
                  description={
                    <Flex justify="space-between" align="baseline">
                      <Flex align="center" gap={4}>
                        <Button
                          type="link"
                          size="small"
                          style={{ padding: '0px', margin: '0px' }}
                          onClick={() => navigate(`/user/${item.ActorId}`)}
                        >
                          {item.Actor.name}
                        </Button>
                        {item.action}
                        {item[item.actionModel] && (
                          <Button
                            type="link"
                            size="small"
                            style={{ padding: '0px', margin: '0px' }}
                            onClick={() =>
                              navigate(
                                `/${item.actionModel.toLowerCase()}/${
                                  item[item.actionModel].id
                                }`
                              )
                            }
                          >
                            {item[item.actionModel].name}
                          </Button>
                        )}
                      </Flex>
                      {item.createdAt}
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
