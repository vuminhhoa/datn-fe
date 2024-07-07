import React, { useEffect } from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import {
  UserOutlined,
  DesktopOutlined,
  AuditOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useFetchApi from '../../hooks/useFetchApi.js';
import socket from '../../helpers/socket.js';

function Summary() {
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

  return (
    <>
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
    </>
  );
}

export default Summary;
