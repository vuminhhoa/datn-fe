import React, { useEffect } from 'react';
import { Button, Flex, Card, List, Avatar, Typography, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
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

function Activities({ data, loading, setData }) {
  const navigate = useNavigate();

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

  return (
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
        {loading ? (
          <Flex vertical align="center" justify="center">
            <Spin />
          </Flex>
        ) : (
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
                      <Flex justify="space-between" align="baseline" gap={16}>
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
                          style={{ width: '240px' }}
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
        )}
      </Flex>
    </Card>
  );
}

export default Activities;
