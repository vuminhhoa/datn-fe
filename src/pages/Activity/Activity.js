// @ts-nocheck
import React from 'react';
import { Card, Flex, Breadcrumb, Typography, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import useFetchApi from '../../hooks/useFetchApi';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import { UserOutlined } from '@ant-design/icons';
import { List, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import { timeAgo } from '../../helpers/date';

const getFetchUrl = (type) => {
  switch (type) {
    case 'user':
      return 'user';
    case 'role':
      return 'role';
    case 'bidding':
      return 'shopping/bidding';
    case 'equipment':
      return 'equipment';
    default:
      break;
  }
};

const Activity = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetchApi({
    url: `/activities`,
  });
  const breadcrumbItems = useBreadcrumb([
    { href: '/', title: <HomeOutlined /> },
    { href: '/activities', title: 'Danh sách hoạt động' },
  ]);

  if (loading)
    return (
      <Page>
        <Breadcrumb items={breadcrumbItems} />
        <Card bordered={false}>
          <Flex gap={4} vertical>
            <Typography.Title level={5} style={{ margin: '0px' }}>
              Danh sách hoạt động
            </Typography.Title>
            <List loading pagination />
          </Flex>
        </Card>
      </Page>
    );

  return (
    <Page>
      <Breadcrumb items={breadcrumbItems} />
      <Card bordered={false}>
        <Flex gap={4} vertical>
          <Typography.Title level={5} style={{ margin: '0px' }}>
            Danh sách hoạt động
          </Typography.Title>
          <List
            loading={loading}
            footer={
              data.hasNext && (
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
              )
            }
            dataSource={data}
            pagination
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
        </Flex>
      </Card>
    </Page>
  );
};

export default Activity;
