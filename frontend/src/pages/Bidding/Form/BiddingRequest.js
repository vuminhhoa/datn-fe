import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';
import { Flex, Button, Typography, Timeline, Tag } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import DatePickerFormat from '../Component/DatePickerFormat';

const BiddingRequest = () => {
  const { data } = useContext(BiddingContext);
  const [isEditBiddingRequest, setIsEditBiddingRequest] = useState(false);

  return (
    <Timeline
      mode="left"
      style={{ marginLeft: '-500px' }}
      items={[
        {
          color:
            data.ngayDangYeuCauChaoGia !== null &&
            data.ngayDangYeuCauChaoGia !== ''
              ? 'green'
              : data.ngayDangYeuCauChaoGia === '' ||
                  data.ngayHetHanYeuCauChaoGia !== null
                ? 'orange'
                : 'grey',
          label: data.ngayDangYeuCauChaoGia || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Đăng yêu cầu chào giá{' '}
                  {data.ngayDangYeuCauChaoGia === null &&
                    data.ngayHetHanYeuCauChaoGia === null && (
                      <Tag color="default">Chưa cập nhật</Tag>
                    )}
                  {(data.ngayDangYeuCauChaoGia === null ||
                    data.ngayDangYeuCauChaoGia === '') &&
                    data.ngayHetHanYeuCauChaoGia !== null && (
                      <Tag color="warning">Chưa đăng</Tag>
                    )}
                  {data.ngayDangYeuCauChaoGia !== null &&
                    data.ngayDangYeuCauChaoGia !== '' && (
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
                  {data.ngayHetHanYeuCauChaoGia && (
                    <Typography.Text>
                      Ngày hết hạn: {data.ngayHetHanYeuCauChaoGia}
                    </Typography.Text>
                  )}
                </>
              )}
              {isEditBiddingRequest && (
                <Flex vertical gap={8}>
                  <Typography.Text>
                    Ngày hết hạn:{' '}
                    <DatePickerFormat field={'ngayHetHanYeuCauChaoGia'} />
                  </Typography.Text>
                  <Typography.Text>
                    Ngày đăng:{' '}
                    <DatePickerFormat
                      field={'ngayDangYeuCauChaoGia'}
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
