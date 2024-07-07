import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';
import { Flex, Button, Typography, Timeline, Tag } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import DatePickerFormat from '../Component/DatePickerFormat';
import hasPermission from '../../../helpers/hasPermission';
import { BIDDING_UPDATE } from '../../../const/permission';

const BiddingRequest = () => {
  const { data, saving, canAction } = useContext(BiddingContext);
  const [isEditBiddingRequest, setIsEditBiddingRequest] = useState(false);

  const chaoGia = data?.yeuCauChaoGia || { ngayDang: null, ngayHetHan: null };
  return (
    <Timeline
      mode="left"
      style={{ marginLeft: '-500px' }}
      items={[
        {
          color:
            chaoGia.ngayDang !== null && chaoGia.ngayDang !== ''
              ? 'green'
              : chaoGia.ngayDang === '' || chaoGia.ngayHetHan !== null
              ? 'orange'
              : 'grey',
          label: chaoGia.ngayDang || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Đăng yêu cầu chào giá{' '}
                  {chaoGia.ngayDang === null && chaoGia.ngayHetHan === null && (
                    <Tag color="default">Chưa cập nhật</Tag>
                  )}
                  {(chaoGia.ngayDang === null || chaoGia.ngayDang === '') &&
                    chaoGia.ngayHetHan !== null && (
                      <Tag color="warning">Chưa đăng</Tag>
                    )}
                  {chaoGia.ngayDang !== null && chaoGia.ngayDang !== '' && (
                    <Tag color="success">Đã đăng</Tag>
                  )}
                </Typography.Text>

                {!isEditBiddingRequest &&
                  hasPermission(BIDDING_UPDATE) &&
                  canAction && (
                    <Button
                      type="link"
                      disabled={saving}
                      onClick={() => setIsEditBiddingRequest(true)}
                    >
                      Cập nhật
                    </Button>
                  )}
                {isEditBiddingRequest &&
                  hasPermission(BIDDING_UPDATE) &&
                  canAction && (
                    <Button
                      disabled={saving}
                      type="link"
                      onClick={() => setIsEditBiddingRequest(false)}
                    >
                      Xác nhận
                    </Button>
                  )}
              </Flex>
              {!isEditBiddingRequest && (
                <>
                  {chaoGia.ngayHetHan && (
                    <Typography.Text>
                      Ngày hết hạn: {chaoGia.ngayHetHan}
                    </Typography.Text>
                  )}
                </>
              )}
              {isEditBiddingRequest && (
                <Flex vertical gap={8}>
                  <Typography.Text>
                    Ngày hết hạn:{' '}
                    <DatePickerFormat
                      field={'ngayHetHan'}
                      obj={'yeuCauChaoGia'}
                    />
                  </Typography.Text>
                  <Typography.Text>
                    Ngày đăng:{' '}
                    <DatePickerFormat
                      field={'ngayDang'}
                      maxDate={dayjs()}
                      obj={'yeuCauChaoGia'}
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
