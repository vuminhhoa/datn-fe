import React, { useContext } from 'react';
import { Timeline } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import BiddingItem from '../Component/BiddingItem';
import getStatus from '../../../helpers/getBiddingItemStatus';

const Ehsmt = () => {
  const { data } = useContext(BiddingContext);
  const input = data.eHsmt;

  const items = [
    {
      title: 'Dự thảo E-HSMT',
      dateField: 'ngayDuThao',
      documentField: 'taiLieuDuThao',
    },
    {
      title: 'Báo cáo xây dựng E-HSMT',
      dateField: 'ngayTaiLieuBcXayDung',
      documentField: 'taiLieuBcXayDung',
    },
    {
      title: 'Phê duyệt E-HSMT tổ chuyên gia',
      dateField: 'ngayPheDuyetToChuyenGia',
      documentField: 'taiLieuPheDuyetToChuyenGia',
    },
    {
      title: 'Báo cáo thẩm định E-HSMT',
      dateField: 'ngayBcThamDinh',
      documentField: 'taiLieuBcThamDinh',
    },
    {
      title: 'Phê duyệt E-HSMT tổ thẩm định',
      dateField: 'ngayPheDuyetToThamDinh',
      documentField: 'taiLieuPheDuyetToThamDinh',
    },
    {
      title: 'Quyết định phê duyệt E-HSMT',
      dateField: 'ngayPheDuyet',
      documentField: 'taiLieuQuyetDinhPheDuyet',
    },
    {
      title: 'Đăng thông báo mời thầu lên mạng đấu thầu',
      dateField: 'ngayDangLenMangDauThau',
    },
  ];

  const itemsWithStatus = items.map((val) => {
    return {
      ...val,
      status: getStatus(input, val.dateField, val.documentField),
    };
  });

  return (
    <Timeline
      mode="left"
      style={{ marginLeft: '-500px' }}
      items={itemsWithStatus.map((val) => {
        return {
          color: val.status.dotColor,
          label: input[val.dateField] || ' ',
          children: (
            <BiddingItem
              title={val.title}
              obj={'eHsmt'}
              input={input}
              tagStatus={val.status}
              dateField={val.dateField}
              documentField={val.documentField}
            />
          ),
        };
      })}
    />
  );
};

export default Ehsmt;
