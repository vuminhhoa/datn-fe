export function getBiddingStatus(status) {
  let color = '';
  let content = '';

  switch (status) {
    case 'approved':
      return { color: 'success', content: 'Hoàn thành' };
    case 'pendingProcess':
      return { color: 'gold', content: 'Chờ xử lý' };

    case 'pendingApprove':
      return { color: 'blue', content: 'Chờ duyệt' };

    case 'rejected':
      return { color: 'error', content: 'Đã hủy' };

    case 'processing':
      return { color: 'purple', content: 'Đang xử lý' };
    default:
      break;
  }

  return { color, content };
}

export function getProposalStatus(status) {
  let color = '';
  let content = '';

  switch (status) {
    case 'approved':
      return { color: 'success', content: 'Chấp thuận' };

    case 'rejected':
      return { color: 'error', content: 'Từ chối' };

    case 'processing':
      return { color: 'processing', content: 'Chờ duyệt' };
    default:
      break;
  }

  return { color, content };
}
