import React from 'react';
import { useAppContext } from '../../contexts/appContext.js';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import moment from 'moment';
import { Card, Flex, Typography, Spin } from 'antd';

function BiddingChart() {
  const { biddings, loadingBiddings } = useAppContext();

  const formatVND = (value) => `${value.toLocaleString()} VND`;
  const formatXAxis = (tickItem) => {
    const monthYear = moment(tickItem).format('MM - YYYY');
    return `Tháng ${monthYear}`;
  };

  const preparedData = prepareData(biddings);

  return (
    <Card bordered={false} style={{ minHeight: '450px' }}>
      <Flex gap={4} vertical>
        <Typography.Title level={5} style={{ margin: '0px' }}>
          Thống kê hoạt động mua sắm
        </Typography.Title>
        {loadingBiddings ? (
          <Flex
            vertical
            align="center"
            justify="center"
            style={{
              minHeight: '350px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spin />
          </Flex>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
              data={preparedData}
              margin={{
                top: 20,
                right: 60,
                left: 20,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="updatedAt"
                scale="time"
                domain={['auto', 'auto']} // Let Recharts handle the domain automatically
                type="number"
                tickFormatter={formatXAxis} // Format ticks on XAxis
              />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#82ca9d"
                tickFormatter={formatVND}
              />
              <Tooltip
                formatter={(val, name, props) => {
                  if (props.dataKey === 'totalPrice') {
                    return formatVND(val);
                  }
                  return val;
                }}
                labelFormatter={formatXAxis} // Format ticks on XAxis
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="totalEquipments"
                fill="#8884d8"
                name="Tổng số lượng thiết bị"
                barSize={20} // Giảm width của Bar xuống
              />
              <Bar
                yAxisId="right"
                dataKey="totalPrice"
                fill="#82ca9d"
                name="Tổng tiền"
                barSize={20}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </Flex>
    </Card>
  );
}

function prepareData(data) {
  const aggregatedData = {};

  // Loop through each bidding entry
  data.forEach((bidding) => {
    const monthKey = moment(bidding.updatedAt).format('YYYY-MM');

    // If the month key doesn't exist in aggregatedData, initialize it
    if (!aggregatedData[monthKey]) {
      aggregatedData[monthKey] = {
        updatedAt: moment(bidding.updatedAt).toISOString(),
        totalEquipments: 0,
        totalPrice: 0,
      };
    }

    // Add totalEquipments and totalPrice for the current entry to aggregatedData
    aggregatedData[monthKey].totalEquipments += bidding.totalEquipments;
    aggregatedData[monthKey].totalPrice += bidding.totalPrice;
  });

  // Convert aggregatedData object to an array of objects
  const aggregatedArray = Object.keys(aggregatedData).map((key) => ({
    updatedAt: aggregatedData[key].updatedAt,
    totalEquipments: aggregatedData[key].totalEquipments,
    totalPrice: aggregatedData[key].totalPrice,
  }));

  const dataWithUnixTimestamp = aggregatedArray
    .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
    .map((bidding) => ({
      ...bidding,
      updatedAt: moment(bidding.updatedAt).valueOf(),
    }));

  return dataWithUnixTimestamp;
}
// Initialize an object to store aggregated data by month

export default BiddingChart;
