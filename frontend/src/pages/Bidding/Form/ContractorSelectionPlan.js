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
          color: data.khlcntEstablishmentDate
            ? 'green'
            : data.khlcntEstablishmentDate === null
              ? 'gray'
              : 'orange',
          label: data.khlcntEstablishmentDate || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Tờ trình tổ chuyên gia đấu thầu về lập KHLCNT{' '}
                  {data.khlcntEstablishmentDate && (
                    <Tag color="success">Đã có</Tag>
                  )}
                  {data.khlcntEstablishmentDate === '' && (
                    <Tag color="warning">Chưa có</Tag>
                  )}
                  {data.khlcntEstablishmentDate === null && (
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
                  Ngày nộp:{' '}
                  <DatePickerFormat field={'khlcntEstablishmentDate'} />
                </Typography.Text>
              )}
            </Flex>
          ),
        },

        {
          color: data.khlcntAppraisalDate
            ? 'green'
            : data.khlcntAppraisalDate === null
              ? 'grey'
              : 'orange',
          label: data.khlcntAppraisalDate || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Báo cáo thẩm định KHLCNT{' '}
                  {data.khlcntAppraisalDate && <Tag color="success">Đã có</Tag>}
                  {data.khlcntAppraisalDate === null && (
                    <Tag color="default">Chưa cập nhật</Tag>
                  )}
                  {data.khlcntAppraisalDate === '' && (
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
                    <DatePickerFormat field={'khlcntAppraisalDate'} />
                  </Flex>
                </Flex>
              )}
            </Flex>
          ),
        },

        {
          color: data.khlcntApprovalDate
            ? 'green'
            : data.khlcntApprovalDate === null
              ? 'grey'
              : 'orange',
          label: data.khlcntApprovalDate || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Tờ trình tổ thẩm định về phê duyệt KHLCNT{' '}
                  {data.khlcntApprovalDate && <Tag color="success">Đã có</Tag>}{' '}
                  {data.khlcntApprovalDate === '' && (
                    <Tag color="warning">Chưa có</Tag>
                  )}
                  {data.khlcntApprovalDate === null && (
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
                    <DatePickerFormat field={'khlcntApprovalDate'} />
                  </Flex>
                </Flex>
              )}
            </Flex>
          ),
        },

        {
          color: data.khlcntApprovalDecisionDate
            ? 'green'
            : data.khlcntApprovalDecisionDate === null
              ? 'grey'
              : 'orange',
          label: data.khlcntApprovalDecisionDate || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Quyết định phê duyệt KHLCNT{' '}
                  {data.khlcntApprovalDecisionDate && (
                    <Tag color="success">Đã có</Tag>
                  )}
                  {data.khlcntApprovalDecisionDate === '' && (
                    <Tag color="warning">Chưa có</Tag>
                  )}
                  {data.khlcntApprovalDecisionDate === null && (
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
                    <DatePickerFormat field={'khlcntApprovalDecisionDate'} />
                  </Flex>
                </Flex>
              )}
            </Flex>
          ),
        },

        {
          color: data.biddingPlanPostingDate
            ? 'green'
            : data.biddingPlanPostingDate === null
              ? 'grey'
              : 'orange',
          label: data.biddingPlanPostingDate || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Đăng tải kế hoạch lên mạng đấu thầu{' '}
                  {data.biddingPlanPostingDate && (
                    <Tag color="success">Đã đăng</Tag>
                  )}
                  {data.biddingPlanPostingDate === '' && (
                    <Tag color="warning">Chưa đăng</Tag>
                  )}
                  {data.biddingPlanPostingDate === null && (
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
                    <DatePickerFormat field={'biddingPlanPostingDate'} />
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
