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

const ProcurementCouncil = () => {
  const { data, setData } = useContext(BiddingContext);
  const [isEditProcurementCouncil, setIsEditProcurementCouncil] =
    useState(false);
  const [isEditBudgetApproval, setIsEditBudgetApproval] = useState(false);
  const [isEditExpertTeam, setIsEditExpertTeam] = useState(false);
  const [isEditAppraisalTeam, setIsEditAppraisalTeam] = useState(false);

  return (
    <Timeline
      mode="left"
      style={{ marginLeft: '-300px' }}
      items={[
        {
          color: data.procurementCouncilMeetingDate
            ? 'green'
            : data.procurementCouncilMeetingDate === null
              ? 'grey'
              : 'orange',
          label: data.procurementCouncilMeetingDate || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Họp hội đồng mua sắm{' '}
                  {data.procurementCouncilMeetingDate && (
                    <Tag color="success">Đã họp</Tag>
                  )}
                  {data.procurementCouncilMeetingDate === '' && (
                    <Tag color="warning">Chưa họp</Tag>
                  )}
                  {data.procurementCouncilMeetingDate === null && (
                    <Tag color="default">Chưa cập nhật</Tag>
                  )}
                </Typography.Text>

                <Button
                  type="link"
                  onClick={() =>
                    setIsEditProcurementCouncil(!isEditProcurementCouncil)
                  }
                >
                  {isEditProcurementCouncil ? 'Xác nhận' : 'Cập nhật'}
                </Button>
              </Flex>

              {isEditProcurementCouncil && (
                <Typography.Text>
                  Ngày họp:{' '}
                  <DatePickerFormat field={'procurementCouncilMeetingDate'} />
                </Typography.Text>
              )}
            </Flex>
          ),
        },

        {
          color: data.budgetApprovalDate
            ? 'green'
            : data.budgetApprovalDate === null
              ? 'grey'
              : 'orange',
          label: data.budgetApprovalDate || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Quyết định phê duyệt dự toán{' '}
                  {data.budgetApprovalDate && <Tag color="success">Đã có</Tag>}
                  {data.budgetApprovalDate === '' && (
                    <Tag color="warning">Chưa có</Tag>
                  )}
                  {data.budgetApprovalDate === null && (
                    <Tag color="default">Chưa cập nhật</Tag>
                  )}
                </Typography.Text>

                <Button
                  type="link"
                  onClick={() => setIsEditBudgetApproval(!isEditBudgetApproval)}
                >
                  {isEditBudgetApproval ? 'Xác nhận' : 'Cập nhật'}
                </Button>
              </Flex>

              {isEditBudgetApproval && (
                <Flex vertical justify="right" gap={8}>
                  <Flex gap={8} align="center">
                    <Typography.Text>Ngày duyệt:</Typography.Text>
                    <DatePickerFormat field={'budgetApprovalDate'} />
                  </Flex>
                </Flex>
              )}
            </Flex>
          ),
        },

        {
          color: data.expertTeamEstablishmentDate
            ? 'green'
            : data.expertTeamEstablishmentDate === null
              ? 'grey'
              : 'orange',
          label: data.expertTeamEstablishmentDate || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Thành lập tổ chuyên gia{' '}
                  {data.expertTeamEstablishmentDate && (
                    <Tag color="success">Đã thành lập</Tag>
                  )}
                  {data.expertTeamEstablishmentDate === '' && (
                    <Tag color="warning">Chưa thành lập</Tag>
                  )}
                  {data.expertTeamEstablishmentDate === null && (
                    <Tag color="default">Chưa cập nhật</Tag>
                  )}
                </Typography.Text>

                <Button
                  type="link"
                  onClick={() => setIsEditExpertTeam(!isEditExpertTeam)}
                >
                  {isEditExpertTeam ? 'Xác nhận' : 'Cập nhật'}
                </Button>
              </Flex>

              {isEditExpertTeam && (
                <Flex vertical justify="right" gap={8}>
                  <Flex gap={8} align="center">
                    <Typography.Text>Ngày thành lập:</Typography.Text>
                    <DatePickerFormat field={'expertTeamEstablishmentDate'} />
                  </Flex>
                </Flex>
              )}
            </Flex>
          ),
        },

        {
          color: data.appraisalTeamEstablishmentDate
            ? 'green'
            : data.appraisalTeamEstablishmentDate === null
              ? 'grey'
              : 'orange',
          label: data.appraisalTeamEstablishmentDate || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Thành lập tổ thẩm định{' '}
                  {data.appraisalTeamEstablishmentDate && (
                    <Tag color="success">Đã thành lập</Tag>
                  )}
                  {data.appraisalTeamEstablishmentDate === '' && (
                    <Tag color="warning">Chưa thành lập</Tag>
                  )}
                  {data.appraisalTeamEstablishmentDate === null && (
                    <Tag color="default">Chưa cập nhật</Tag>
                  )}
                </Typography.Text>

                <Button
                  type="link"
                  onClick={() => setIsEditAppraisalTeam(!isEditAppraisalTeam)}
                >
                  {isEditAppraisalTeam ? 'Xác nhận' : 'Cập nhật'}
                </Button>
              </Flex>

              {isEditAppraisalTeam && (
                <Flex vertical justify="right" gap={8}>
                  <Flex gap={8} align="center">
                    <Typography.Text>Ngày thành lập:</Typography.Text>
                    <DatePickerFormat
                      field={'appraisalTeamEstablishmentDate'}
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

export default ProcurementCouncil;
