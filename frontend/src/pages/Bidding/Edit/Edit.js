import React, { useState } from 'react';
import {
  Card,
  Flex,
  Tag,
  Breadcrumb,
  Descriptions,
  Typography,
  Button,
  Skeleton,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import BiddingContext from '../../../contexts/biddingContext';
import BiddingRequest from '../Form/BiddingRequest';
import ProcurementCouncil from '../Form/ProcurementCouncil';
import ContractorSelectionPlan from '../Form/ContractorSelectionPlan';
import Ehsmt from '../Form/Ehsmt';
import useFetchApi from '../../../hooks/useFetchApi';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../contexts/authProvider';
import CollapsibleForm from '../Component/CollapsibleForm';
const defaultData = {
  id: 12,
  biddingName: 'Mua may sieu vi tinh',
  // Tên khoa phòng đề xuất
  proposedDepartmentName: 'Marketing Department',
  // Ngày đề xuất
  proposedDate: '2024-04-05',
  // Nội dung đề xuất
  proposedContent: '01 máy siêu âm 100 máy đẹp trai',
  // Trạng thái đề xuất
  proposedStatus: 'approved',
  // Ngày phê duyệt đề xuất
  approvedDate: '2024-04-07',

  // Ngày đăng yêu cầu chào giá
  biddingRequestPublishedDate: null,
  // Ngày hết hạn yêu cầu chào giá
  biddingRequestDeadlineDate: null,

  // Ngày họp hội đồng mua sắm
  procurementCouncilMeetingDate: '2024-04-15',
  // ngày phê duyệt dự toán
  budgetApprovalDate: '2024-04-15',
  // Tài liệu họp hội đồng mua sắm
  budgetApprovalDocument: 'ProcurementCouncilMinutes.pdf',
  // Tài liệu họp hội đồng mua sắm
  procurementCouncilMeetingDocument: 'ProcurementCouncilMinutes.pdf',
  // Ngày thành lập tổ chuyên gia
  expertTeamEstablishmentDate: '2024-04-18',
  // Tài liệu thành lập tổ chuyên gia
  expertTeamEstablishmentDocument: 'ExpertTeamEstablishment.pdf',
  // Ngày thành lập tổ thẩm định
  appraisalTeamEstablishmentDate: '2024-04-19',
  // Tài liệu thành lập tổ thẩm định
  appraisalTeamEstablishmentDocument: 'AppraisalTeamEstablishment.pdf',

  // ngày lập khlcnt
  khlcntEstablishmentDate: null,
  // Tài liệu lập khlcnt
  khlcntDocumentEstablishment: 'khlcntDocument.pdf',
  // ngày Báo cáo thẩm định khlcnt
  khlcntAppraisalDate: '2024-04-19',
  // Báo cáo thẩm định khlcnt
  khlcntAppraisalReport: 'khlcntAppraisalReport.pdf',
  // ngày phê duyệt khlcnt
  khlcntApprovalDate: '2024-04-19',
  // Tài liệu phê duyệt khlcnt
  khlcntApprovalDocument: 'khlcntApprovalDocument.pdf',
  // ngày quyết định phê duyệt khlcnt
  khlcntApprovalDecisionDate: '2024-04-19',
  // Tài liệu quyết định phê duyệt khlcnt
  khlcntApprovalDecisionDocument: 'khlcntApprovalDecision.pdf',
  // Ngày đăng tải kế hoạch lên mạng đấu thầu
  biddingPlanPostingDate: '2024-04-25',

  // Tài liệu dự thảo ehsmt
  ehsmtDraftDocument: 'ehsmtDraftDocument.pdf',
  // Tài liệu báo cáo xây dựng ehsmt
  ehsmtConstructionReportDocument: 'ehsmtConstructionReport.pdf',
  // Tài liệu phê duyệt ehsmt tổ chuyên gia
  ehsmtExpertTeamApprovalDocument: 'ehsmtExpertTeamApproval.pdf',
  // Tài liệu báo cáo thẩm định ehsmt
  ehsmtAppraisalReportDocument: 'ehsmtAppraisalReport.pdf',
  // Tài liệu phê duyệt ehsmt tổ thẩm định
  ehsmtAppraisalApprovalDocument: 'ehsmtAppraisalApproval.pdf',
  // Tài liệu quyết định phê duyệt ehsmt
  ehsmtApprovalDecisionDocument: 'ehsmtApprovalDecision.pdf',
  // Ngày đăng thông báo mời thầu lên mạng đấu thầu
  biddingInvitationPostingDate: '2024-04-28',
};

const EditBidding = () => {
  const { id } = useParams();
  const { setToast } = useAuth();
  const { data, setData, loading } = useFetchApi({
    url: `/bidding/${id}`,
    defaultData: defaultData,
  });
  const [saving, setSaving] = useState(false);

  const items = [
    {
      key: '1',
      label: 'Tên khoa phòng',
      children: data.proposedDepartmentName,
    },
    data.proposedDate !== null && {
      key: '2',
      label: 'Ngày đề xuất',
      children: data.proposedDate,
    },

    {
      key: '4',
      label: 'Trạng thái',
      children: (
        <>
          {data.proposedStatus === 'approved' && (
            <Tag color="success">Chấp thuận</Tag>
          )}
          {data.proposedStatus === 'reject' && <Tag color="error">Từ chối</Tag>}
          {data.proposedStatus === 'processing' && (
            <Tag color="processing">Chờ duyệt</Tag>
          )}
        </>
      ),
    },
    (data.proposedStatus === 'approved' ||
      data.proposedStatus === 'reject') && {
      key: '5',
      label: 'Ngày phê duyệt',
      children: data.approvedDate,
    },
    {
      key: '6',
      label: 'Ngày tạo hoạt động',
      children: data.createdAt,
    },
    {
      key: '7',
      label: 'Lần cập nhật cuối',
      children: data.updatedAt,
    },
    {
      key: '3',
      label: 'Nội dung',
      children: data.proposedContent,
    },
  ];

  const handleSaveBidding = async () => {
    try {
      setSaving(true);
      await axios({
        method: 'POST',
        url: `http://localhost:5000/api/bidding/${id}`,
        data: {
          ...data,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        },
      });
      setToast('Lưu thành công');
    } catch (error) {
      console.log(error);
      setToast('Lưu thất bại', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <Flex vertical gap={16}>
        <Breadcrumb
          items={[
            {
              href: '/',
              title: <HomeOutlined />,
            },
            {
              href: '/shopping/bidding',
              title: 'Hoạt động mua sắm qua đấu thầu',
            },
            {
              href: `/shopping/bidding/${data.id}`,
              title: data.biddingName,
            },
          ]}
        />
        <Card
          title={
            <Flex align="center" gap={8}>
              <Typography.Title level={5} style={{ margin: '0' }}>
                Chi tiết hoạt động:
              </Typography.Title>
              <Skeleton.Input />
            </Flex>
          }
          extra={
            <Button type="primary" disabled={loading}>
              Lưu
            </Button>
          }
        >
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Card>
      </Flex>
    );
  return (
    <BiddingContext.Provider value={{ data, setData }}>
      <Flex vertical gap={16}>
        <Breadcrumb
          items={[
            {
              href: '/',
              title: <HomeOutlined />,
            },
            {
              href: '/shopping/bidding',
              title: 'Hoạt động mua sắm qua đấu thầu',
            },
            {
              href: `/shopping/bidding/${data.id}`,
              title: data.biddingName,
            },
          ]}
        />
        <Card
          title={`Chi tiết hoạt động: ${data.biddingName}`}
          extra={
            <Button type="primary" onClick={handleSaveBidding} loading={saving}>
              Lưu
            </Button>
          }
        >
          <Descriptions
            title="1. Khoa phòng đề xuất"
            items={items}
            column={2}
          />
          <Typography.Title level={5}>2. Lập kế hoạch</Typography.Title>

          <Flex vertical gap={8}>
            <CollapsibleForm
              title="2.1. Chào giá"
              children={<BiddingRequest />}
            />
            <CollapsibleForm
              title="2.2. Lên dự toán, thành lập tổ chuyên gia, tổ thẩm định"
              children={<ProcurementCouncil />}
            />
            <CollapsibleForm
              title="2.3. Kế hoạch lựa chọn nhà thầu"
              children={<ContractorSelectionPlan />}
            />
            <CollapsibleForm
              title="2.4. E - Hồ sơ mời thầu"
              children={<Ehsmt />}
            />
            <CollapsibleForm
              title="2.5. E - Hồ sơ dự thầu"
              children={<ContractorSelectionPlan />}
            />
          </Flex>
        </Card>
      </Flex>
    </BiddingContext.Provider>
  );
};

export default EditBidding;
