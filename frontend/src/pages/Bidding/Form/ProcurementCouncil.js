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
          color: data.ngayHopHoiDongMuaSam
            ? 'green'
            : data.ngayHopHoiDongMuaSam === null
              ? 'grey'
              : 'orange',
          label: data.ngayHopHoiDongMuaSam || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Họp hội đồng mua sắm{' '}
                  {data.ngayHopHoiDongMuaSam && (
                    <Tag color="success">Đã họp</Tag>
                  )}
                  {data.ngayHopHoiDongMuaSam === '' && (
                    <Tag color="warning">Chưa họp</Tag>
                  )}
                  {data.ngayHopHoiDongMuaSam === null && (
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
                  Ngày họp: <DatePickerFormat field={'ngayHopHoiDongMuaSam'} />
                </Typography.Text>
              )}
            </Flex>
          ),
        },

        {
          color: data.ngayPheDuyetDuToan
            ? 'green'
            : data.ngayPheDuyetDuToan === null
              ? 'grey'
              : 'orange',
          label: data.ngayPheDuyetDuToan || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Quyết định phê duyệt dự toán{' '}
                  {data.ngayPheDuyetDuToan && <Tag color="success">Đã có</Tag>}
                  {data.ngayPheDuyetDuToan === '' && (
                    <Tag color="warning">Chưa có</Tag>
                  )}
                  {data.ngayPheDuyetDuToan === null && (
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
                    <DatePickerFormat field={'ngayPheDuyetDuToan'} />
                  </Flex>
                </Flex>
              )}
            </Flex>
          ),
        },

        {
          color: data.ngayThanhLapToChuyenGia
            ? 'green'
            : data.ngayThanhLapToChuyenGia === null
              ? 'grey'
              : 'orange',
          label: data.ngayThanhLapToChuyenGia || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Thành lập tổ chuyên gia{' '}
                  {data.ngayThanhLapToChuyenGia && (
                    <Tag color="success">Đã thành lập</Tag>
                  )}
                  {data.ngayThanhLapToChuyenGia === '' && (
                    <Tag color="warning">Chưa thành lập</Tag>
                  )}
                  {data.ngayThanhLapToChuyenGia === null && (
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
                    <DatePickerFormat field={'ngayThanhLapToChuyenGia'} />
                  </Flex>
                </Flex>
              )}
            </Flex>
          ),
        },

        {
          color: data.ngayThanhLapToThamDinh
            ? 'green'
            : data.ngayThanhLapToThamDinh === null
              ? 'grey'
              : 'orange',
          label: data.ngayThanhLapToThamDinh || ' ',
          children: (
            <Flex vertical gap={8}>
              <Flex align="flex-start" gap={8} justify="space-between">
                <Typography.Text>
                  Thành lập tổ thẩm định{' '}
                  {data.ngayThanhLapToThamDinh && (
                    <Tag color="success">Đã thành lập</Tag>
                  )}
                  {data.ngayThanhLapToThamDinh === '' && (
                    <Tag color="warning">Chưa thành lập</Tag>
                  )}
                  {data.ngayThanhLapToThamDinh === null && (
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
                    <DatePickerFormat field={'ngayThanhLapToThamDinh'} />
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
