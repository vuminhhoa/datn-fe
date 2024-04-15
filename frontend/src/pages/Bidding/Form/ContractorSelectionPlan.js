import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';
import {
  Flex,
  Button,
  Typography,
  DatePicker,
  Timeline,
  Tag,
  Select,
  Upload,
} from 'antd';
import { SmileOutlined, UploadOutlined } from '@ant-design/icons';
import BiddingContext from '../../../contexts/biddingContext';
import DatePickerFormat from '../Component/DatePickerFormat';

const ContractorSelectionPlan = () => {
  const { data, setData } = useContext(BiddingContext);
  const [isEditProcurementCouncil, setIsEditProcurementCouncil] =
    useState(false);
  const [isEditBudgetApproval, setIsEditBudgetApproval] = useState(false);
  const [isEditExpertTeam, setIsEditExpertTeam] = useState(false);
  const [isEditAppraisalTeam, setIsEditAppraisalTeam] = useState(false);
  const [isEditKhlcntEstablishment, setIsEditKhlcntEstablishment] =
    useState(false);
  const [isEditKhlcntAppraisal, setIsEditKhlcntAppraisal] = useState(false);
  const [isEditKhlcntApproval, setIsEditKhlcntApproval] = useState(false);
  const [isEditKhlcntApprovalDecision, setIsEditKhlcntApprovalDecision] =
    useState(false);
  const [isEditKhlcntPlanPosting, setIsEditKhlcntPlanPosting] = useState(false);

  return (
    <Timeline
      mode="left"
      style={{ marginLeft: '-300px' }}
      items={[
        {
          color: data.ngayLapKhlcnt
            ? 'green'
            : data.ngayLapKhlcnt === null
              ? 'gray'
              : 'orange',
          label: data.ngayLapKhlcnt || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Tờ trình tổ chuyên gia đấu thầu về lập KHLCNT{' '}
                  {data.ngayLapKhlcnt && <Tag color="success">Đã có</Tag>}
                  {data.ngayLapKhlcnt === '' && (
                    <Tag color="warning">Chưa có</Tag>
                  )}
                  {data.ngayLapKhlcnt === null && (
                    <Tag color="default">Chưa cập nhật</Tag>
                  )}
                </Typography.Text>

                {!isEditKhlcntEstablishment && (
                  <Button
                    type="link"
                    onClick={() => setIsEditKhlcntEstablishment(true)}
                  >
                    Cập nhật
                  </Button>
                )}
                {isEditKhlcntEstablishment && (
                  <Button
                    type="link"
                    onClick={() => setIsEditKhlcntEstablishment(false)}
                  >
                    Xác nhận
                  </Button>
                )}
              </Flex>

              {isEditKhlcntEstablishment && (
                <Typography.Text>
                  Ngày nộp: <DatePickerFormat field={'ngayLapKhlcnt'} />
                </Typography.Text>
              )}
            </Flex>
          ),
        },

        {
          color: data.ngayBaoCaoThamDinhKhclnt
            ? 'green'
            : data.ngayBaoCaoThamDinhKhclnt === null
              ? 'grey'
              : 'orange',
          label: data.ngayBaoCaoThamDinhKhclnt || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Báo cáo thẩm định KHLCNT{' '}
                  {data.ngayBaoCaoThamDinhKhclnt && (
                    <Tag color="success">Đã có</Tag>
                  )}
                  {data.ngayBaoCaoThamDinhKhclnt === null && (
                    <Tag color="default">Chưa cập nhật</Tag>
                  )}
                  {data.ngayBaoCaoThamDinhKhclnt === '' && (
                    <Tag color="warning">Chưa có</Tag>
                  )}
                </Typography.Text>

                {!isEditKhlcntAppraisal && (
                  <Button
                    type="link"
                    onClick={() => setIsEditKhlcntAppraisal(true)}
                  >
                    Cập nhật
                  </Button>
                )}
                {isEditKhlcntAppraisal && (
                  <Button
                    type="link"
                    onClick={() => setIsEditKhlcntAppraisal(false)}
                  >
                    Xác nhận
                  </Button>
                )}
              </Flex>

              {isEditKhlcntAppraisal && (
                <Flex vertical justify="right" gap={8}>
                  <Flex gap={8} align="center">
                    <Typography.Text>Ngày nộp:</Typography.Text>
                    <DatePickerFormat field={'ngayBaoCaoThamDinhKhclnt'} />
                  </Flex>
                </Flex>
              )}
            </Flex>
          ),
        },

        {
          color: data.ngayPheDuyetKhclnt
            ? 'green'
            : data.ngayPheDuyetKhclnt === null
              ? 'grey'
              : 'orange',
          label: data.ngayPheDuyetKhclnt || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Tờ trình tổ thẩm định về phê duyệt KHLCNT{' '}
                  {data.ngayPheDuyetKhclnt && <Tag color="success">Đã có</Tag>}{' '}
                  {data.ngayPheDuyetKhclnt === '' && (
                    <Tag color="warning">Chưa có</Tag>
                  )}
                  {data.ngayPheDuyetKhclnt === null && (
                    <Tag color="default">Chưa cập nhật</Tag>
                  )}
                </Typography.Text>

                {!isEditKhlcntApproval && (
                  <Button
                    type="link"
                    onClick={() => setIsEditKhlcntApproval(true)}
                  >
                    Cập nhật
                  </Button>
                )}
                {isEditKhlcntApproval && (
                  <Button
                    type="link"
                    onClick={() => setIsEditKhlcntApproval(false)}
                  >
                    Xác nhận
                  </Button>
                )}
              </Flex>

              {isEditKhlcntApproval && (
                <Flex vertical justify="right" gap={8}>
                  <Flex gap={8} align="center">
                    <Typography.Text>Ngày nộp:</Typography.Text>
                    <DatePickerFormat field={'ngayPheDuyetKhclnt'} />
                  </Flex>
                </Flex>
              )}
            </Flex>
          ),
        },

        {
          color: data.ngayQuyetDinhPheDuyetKhlcnt
            ? 'green'
            : data.ngayQuyetDinhPheDuyetKhlcnt === null
              ? 'grey'
              : 'orange',
          label: data.ngayQuyetDinhPheDuyetKhlcnt || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Quyết định phê duyệt KHLCNT{' '}
                  {data.ngayQuyetDinhPheDuyetKhlcnt && (
                    <Tag color="success">Đã có</Tag>
                  )}
                  {data.ngayQuyetDinhPheDuyetKhlcnt === '' && (
                    <Tag color="warning">Chưa có</Tag>
                  )}
                  {data.ngayQuyetDinhPheDuyetKhlcnt === null && (
                    <Tag color="default">Chưa cập nhật</Tag>
                  )}
                </Typography.Text>

                {!isEditKhlcntApprovalDecision && (
                  <Button
                    type="link"
                    onClick={() => setIsEditKhlcntApprovalDecision(true)}
                  >
                    Cập nhật
                  </Button>
                )}
                {isEditKhlcntApprovalDecision && (
                  <Button
                    type="link"
                    onClick={() => setIsEditKhlcntApprovalDecision(false)}
                  >
                    Xác nhận
                  </Button>
                )}
              </Flex>

              {isEditKhlcntApprovalDecision && (
                <Flex vertical justify="right" gap={8}>
                  <Flex gap={8} align="center">
                    <Typography.Text>Ngày nộp:</Typography.Text>
                    <DatePickerFormat field={'ngayQuyetDinhPheDuyetKhlcnt'} />
                  </Flex>
                </Flex>
              )}
            </Flex>
          ),
        },

        {
          color: data.ngayDangTaiKeHoachLenMangDauThau
            ? 'green'
            : data.ngayDangTaiKeHoachLenMangDauThau === null
              ? 'grey'
              : 'orange',
          label: data.ngayDangTaiKeHoachLenMangDauThau || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Đăng tải kế hoạch lên mạng đấu thầu{' '}
                  {data.ngayDangTaiKeHoachLenMangDauThau && (
                    <Tag color="success">Đã đăng</Tag>
                  )}
                  {data.ngayDangTaiKeHoachLenMangDauThau === '' && (
                    <Tag color="warning">Chưa đăng</Tag>
                  )}
                  {data.ngayDangTaiKeHoachLenMangDauThau === null && (
                    <Tag color="default">Chưa cập nhật</Tag>
                  )}
                </Typography.Text>

                {!isEditKhlcntPlanPosting && (
                  <Button
                    type="link"
                    onClick={() => setIsEditKhlcntPlanPosting(true)}
                  >
                    Cập nhật
                  </Button>
                )}
                {isEditKhlcntPlanPosting && (
                  <Button
                    type="link"
                    onClick={() => setIsEditKhlcntPlanPosting(false)}
                  >
                    Xác nhận
                  </Button>
                )}
              </Flex>

              {isEditKhlcntPlanPosting && (
                <Flex vertical justify="right" gap={8}>
                  <Flex gap={8} align="center">
                    <Typography.Text>Ngày đăng:</Typography.Text>
                    <DatePickerFormat
                      field={'ngayDangTaiKeHoachLenMangDauThau'}
                    />
                  </Flex>
                </Flex>
              )}
            </Flex>
          ),
        },
      ]}
    />
  );
};

export default ContractorSelectionPlan;
