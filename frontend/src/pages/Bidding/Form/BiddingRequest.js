import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';
import { Flex, Button, Typography, DatePicker, Timeline, Tag } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import DatePickerFormat from '../Component/DatePickerFormat';

const BiddingRequest = () => {
  const { data, setData } = useContext(BiddingContext);
  const [isEditBiddingRequest, setIsEditBiddingRequest] = useState(false);

  return (
    <Timeline
      mode="left"
      items={[
        {
          color:
            data.biddingRequestPublishedDate !== null &&
            data.biddingRequestPublishedDate !== ''
              ? 'green'
              : data.biddingRequestPublishedDate === '' ||
                  data.biddingRequestDeadlineDate !== null
                ? 'orange'
                : 'grey',
          label: data.biddingRequestPublishedDate || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Đăng yêu cầu chào giá{' '}
                  {data.biddingRequestPublishedDate === null &&
                    data.biddingRequestDeadlineDate === null && (
                      <Tag color="default">Chưa cập nhật</Tag>
                    )}
                  {(data.biddingRequestPublishedDate === null ||
                    data.biddingRequestPublishedDate === '') &&
                    data.biddingRequestDeadlineDate !== null && (
                      <Tag color="warning">Chưa đăng</Tag>
                    )}
                  {data.biddingRequestPublishedDate !== null &&
                    data.biddingRequestPublishedDate !== '' && (
                      <Tag color="success">Đã đăng</Tag>
                    )}
                </Typography.Text>

                {!isEditBiddingRequest && (
                  <Button
                    type="link"
                    onClick={() => setIsEditBiddingRequest(true)}
                  >
                    Cập nhật
                  </Button>
                )}
                {isEditBiddingRequest && (
                  <Button
                    type="link"
                    onClick={() => setIsEditBiddingRequest(false)}
                  >
                    Xác nhận
                  </Button>
                )}
              </Flex>
              {!isEditBiddingRequest && (
                <>
                  {data.biddingRequestDeadlineDate && (
                    <Typography.Text>
                      Ngày hết hạn: {data.biddingRequestDeadlineDate}
                    </Typography.Text>
                  )}
                </>
              )}
              {isEditBiddingRequest && (
                <Flex vertical gap={8}>
                  <Typography.Text>
                    Ngày hết hạn:{' '}
                    <DatePickerFormat field={'biddingRequestDeadlineDate'} />
                  </Typography.Text>
                  <Typography.Text>
                    Ngày đăng:{' '}
                    <DatePickerFormat
                      field={'biddingRequestPublishedDate'}
                      maxDate={dayjs()}
                    />
                  </Typography.Text>
                </Flex>
              )}
            </Flex>
          ),
        },
      ]}
    />
  );
};

export default BiddingRequest;
