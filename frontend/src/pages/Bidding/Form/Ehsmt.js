import React, { useContext } from 'react';
import { Timeline } from 'antd';
import BiddingContext from '../../../contexts/biddingContext';
import BiddingItem from '../Component/BiddingItem';
import getStatus from '../../../helpers/getBiddingItemStatus';

const Ehsmt = () => {
  const { data } = useContext(BiddingContext);

  const items = [
    {
      title: 'Dự thảo E-HSMT',
      dateField: 'ngayDuThaoEhsmt',
      documentField: 'taiLieuDuThaoEhsmt',
    },
    {
      title: 'Báo cáo xây dựng E-HSMT',
      dateField: 'ngayTaiLieuBcXayDungEhsmt',
      documentField: 'taiLieuBcXayDungEhsmt',
    },
    {
      title: 'Phê duyệt E-HSMT tổ chuyên gia',
      dateField: 'ngayPheDuyetEhsmtToChuyenGia',
      documentField: 'taiLieuPheDuyetEhsmtToChuyenGia',
    },
    {
      title: 'Báo cáo thẩm định E-HSMT',
      dateField: 'ngayBcThamDinhEhsmt',
      documentField: 'taiLieuBcThamDinhEhsmt',
    },
    {
      title: 'Phê duyệt E-HSMT tổ thẩm định',
      dateField: 'ngayPheDuyetEhsmtToThamDinh',
      documentField: 'taiLieuPheDuyetEhsmtToThamDinh',
    },
    {
      title: 'Quyết định phê duyệt E-HSMT',
      dateField: 'ngayPheDuyetEhsmt',
      documentField: 'taiLieuQuyetDinhPheDuyetEhsmt',
    },
    {
      title: 'Đăng thông báo mời thầu lên mạng đấu thầu',
      dateField: 'ngayDangThongBaoMoiThauLenMangDauThau',
    },
  ];

  const itemsWithStatus = items.map((val) => {
    return {
      ...val,
      status: getStatus(data, val.dateField, val.documentField),
    };
  });

  return (
    <Timeline
      mode="left"
      style={{ marginLeft: '-500px' }}
      items={itemsWithStatus.map((val) => {
        return {
          color: val.status.dotColor,
          label: data[val.dateField] || ' ',
          children: (
            <BiddingItem
              title={val.title}
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
