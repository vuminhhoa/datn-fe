import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

const Bidding = sequelize.define(
  'Bidding',
  {
    //Tên đề xuất
    biddingName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tên phòng ban đề xuất
    proposedDepartmentName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Ngày đề xuất
    proposedDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Nội dung đề xuất
    proposedContent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Trạng thái đề xuất
    proposedStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Ngày phê duyệt đề xuất
    approvedDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Ngày đăng yêu cầu chào giá
    biddingRequestPublishedDate: {
      type: DataTypes.STRING,
      allowNull: true, // Có thể không có ngày đăng
    },
    // Ngày hết hạn yêu cầu chào giá
    biddingRequestDeadlineDate: {
      type: DataTypes.STRING,
      allowNull: true, // Có thể không có ngày hết hạn
    },
    // Ngày họp hội đồng mua sắm
    procurementCouncilMeetingDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Ngày phê duyệt dự toán
    budgetApprovalDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tài liệu họp hội đồng mua sắm
    budgetApprovalDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tài liệu họp hội đồng mua sắm
    procurementCouncilMeetingDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Ngày thành lập tổ chuyên gia
    expertTeamEstablishmentDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tài liệu thành lập tổ chuyên gia
    expertTeamEstablishmentDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Ngày thành lập tổ thẩm định
    appraisalTeamEstablishmentDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tài liệu thành lập tổ thẩm định
    appraisalTeamEstablishmentDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // ngày lập khlcnt
    khlcntEstablishmentDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tài liệu lập khlcnt
    khlcntDocumentEstablishment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // ngày Báo cáo thẩm định khlcnt
    khlcntAppraisalDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Báo cáo thẩm định khlcnt
    khlcntAppraisalReport: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // ngày phê duyệt khlcnt
    khlcntApprovalDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tài liệu phê duyệt khlcnt
    khlcntApprovalDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // ngày quyết định phê duyệt khlcnt
    khlcntApprovalDecisionDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tài liệu quyết định phê duyệt khlcnt
    khlcntApprovalDecisionDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Ngày đăng tải kế hoạch lên mạng đấu thầu
    biddingPlanPostingDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tài liệu dự thảo ehsmt
    ehsmtDraftDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tài liệu báo cáo xây dựng ehsmt
    ehsmtConstructionReportDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tài liệu phê duyệt ehsmt tổ chuyên gia
    ehsmtExpertTeamApprovalDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tài liệu báo cáo thẩm định ehsmt
    ehsmtAppraisalReportDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tài liệu phê duyệt ehsmt tổ thẩm định
    ehsmtAppraisalApprovalDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Tài liệu quyết định phê duyệt ehsmt
    ehsmtApprovalDecisionDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Ngày đăng thông báo mời thầu lên mạng đấu thầu
    biddingInvitationPostingDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);
export default Bidding;
