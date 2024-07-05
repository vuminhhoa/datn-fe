// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Card,
  Flex,
  Form,
  Tag,
  Breadcrumb,
  Descriptions,
  Select,
  Typography,
  Input,
  Button,
  Skeleton,
} from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import BiddingContext from '../../../contexts/biddingContext';
import BiddingRequest from '../Form/BiddingRequest';
import LenDuToanThanhLapCacTo from '../Form/LenDuToanThanhLapCacTo';
import KeHoachLuaChonNhaThau from '../Form/KeHoachLuaChonNhaThau';
import Ehsmt from '../Form/Ehsmt';
import useFetchApi from '../../../hooks/useFetchApi';
import { useParams, useNavigate } from 'react-router-dom';
import CollapsibleForm from '../Component/CollapsibleForm';
import Ehsdt from '../Form/Ehsdt';
import KyKetThucHienHopDong from '../Form/KyKetThucHienHopDong';
import { useBreadcrumb } from '../../../hooks/useBreadcrumb';
import useEditApi from '../../../hooks/useEditApi';
import NotFound from '../../NotFound/NotFound';
import Page from '../../../components/Page';
import { defaultBidding } from '../../../const/defaultBidding';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/vi'; // import locale Vietnamese
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useAppContext } from '../../../contexts/appContext';
import hasPermission from '../../../helpers/hasPermission';
import { BIDDING_UPDATE } from '../../../const/permission';

dayjs.extend(localizedFormat);
dayjs.locale('vi'); // set locale to Vietnamese

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    [],
  ],
};

const Edit = () => {
  const { departments, loadingDepartments, fetchBiddings } = useAppContext();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { editing, editApi } = useEditApi({
    url: `/bidding/${id}`,
    successCallback: () => {
      setCreatedFields([]);
      setDeletedFields([]);
      setUpdatedFields([]);
      setInitData(data);
      fetchApi();
      fetchBiddings();
    },
  });
  const { data, setData, loading, fetchApi } = useFetchApi({
    url: `/bidding/${id}`,
    defaultData: {},
  });

  const breadcrumbItems = useBreadcrumb([
    !loading ? (
      !data.isProposal ? (
        { href: '/shopping/bidding', title: 'Hoạt động mua sắm qua đấu thầu' }
      ) : (
        { href: '/shopping/proposal', title: 'Đề xuất hoạt động mua sắm' }
      )
    ) : (
      <Skeleton.Input size="small" />
    ),
    {
      href: `/shopping/${id}`,
      title: loading ? <Skeleton.Input size="small" /> : data?.tenDeXuat,
    },
  ]);
  const [initData, setInitData] = useState(defaultBidding);
  const [deletedFields, setDeletedFields] = useState([]);
  const [createdFields, setCreatedFields] = useState([]);
  const [updatedFields, setUpdatedFields] = useState([]);
  const [isEditItem, setIsEditItem] = useState(false);

  useEffect(() => {
    if (loading || JSON.stringify(initData) !== JSON.stringify(defaultBidding))
      return;
    setInitData(data);
  }, [data]);

  const items = [
    {
      label: 'Khoa phòng đề xuất',
      children: data?.Department?.tenKhoaPhong,
    },
    data?.ngayDeXuat !== null && {
      label: 'Ngày đề xuất',
      children: data?.ngayDeXuat,
    },
    {
      label: 'Trạng thái hoạt động',
      children: (
        <>
          {data?.trangThaiHoatDong === 'approved' && (
            <Tag color="success">Chấp thuận</Tag>
          )}
          {data?.trangThaiHoatDong === 'pendingProcess' && (
            <Tag color="blue">Chờ xử lý</Tag>
          )}
          {data?.trangThaiHoatDong === 'pendingApprove' && (
            <Tag color="blue">Chờ duyệt</Tag>
          )}
          {data?.trangThaiHoatDong === 'rejected' && (
            <Tag color="error">Từ chối</Tag>
          )}
          {data?.trangThaiHoatDong === 'processing' && (
            <Tag color="purple">Đang xử lý</Tag>
          )}
        </>
      ),
    },
    data?.trangThaiDeXuat
      ? {
          label: 'Trạng thái đề xuất',
          children: (
            <>
              {data?.trangThaiDeXuat === 'approved' && (
                <Tag color="success">Chấp thuận</Tag>
              )}
              {data?.trangThaiDeXuat === 'pendingProcess' && (
                <Tag color="blue">Chờ xử lý</Tag>
              )}
              {data?.trangThaiDeXuat === 'pendingApprove' && (
                <Tag color="blue">Chờ duyệt</Tag>
              )}
              {data?.trangThaiDeXuat === 'rejected' && (
                <Tag color="error">Từ chối</Tag>
              )}
              {data?.trangThaiDeXuat === 'processing' && (
                <Tag color="purple">Đang xử lý</Tag>
              )}
            </>
          ),
        }
      : false,
    (data?.trangThaiDeXuat === 'approved' ||
      data?.trangThaiDeXuat === 'rejected') && {
      label: 'Ngày phê duyệt đề xuất',
      children: dayjs(data?.ngayPheDuyetDeXuat).format('dd, D/MM/YYYY  h:mm A'),
    },
    data?.ngayTaoHoatDong
      ? {
          label: 'Ngày tạo hoạt động',
          children: dayjs(data?.ngayTaoHoatDong).format(
            'dd, D/MM/YYYY  h:mm A'
          ),
        }
      : false,
    data?.ngayBatDauXuLy
      ? {
          label: 'Ngày bắt đầu xử lý hồ sơ',
          children: dayjs(data?.ngayBatDauXuLy).format('dd, D/MM/YYYY  h:mm A'),
        }
      : false,
    data?.ngayTaoDeXuat
      ? {
          label: 'Ngày tạo đề xuất',
          children: dayjs(data?.ngayTaoDeXuat).format('dd, D/MM/YYYY  h:mm A'),
        }
      : false,
    data?.NguoiTaoDeXuat
      ? {
          label: 'Người tạo đề xuất',
          children: (
            <Button
              size="small"
              type="link"
              onClick={() => navigate(`/user/${data?.NguoiTaoDeXuat.id}`)}
            >
              {data?.NguoiTaoDeXuat.name}
            </Button>
          ),
        }
      : false,
    data?.NguoiDuyetDeXuat
      ? {
          label: 'Người duyệt đề xuất',
          children: (
            <Button
              size="small"
              type="link"
              onClick={() => navigate(`/user/${data?.NguoiDuyetDeXuat.id}`)}
            >
              {data?.NguoiDuyetDeXuat.name}
            </Button>
          ),
        }
      : false,
    data?.NguoiTaoHoatDong
      ? {
          label: 'Người tạo hoạt động',
          children: (
            <Button
              size="small"
              type="link"
              onClick={() => navigate(`/user/${data?.NguoiTaoHoatDong.id}`)}
            >
              {data?.NguoiTaoHoatDong.name}
            </Button>
          ),
        }
      : false,
    data?.NguoiDuyetHoatDong
      ? {
          label: 'Người duyệt hoạt động',
          children: (
            <Button
              size="small"
              type="link"
              onClick={() => navigate(`/user/${data?.NguoiDuyetHoatDong.id}`)}
            >
              {data?.NguoiDuyetHoatDong.name}
            </Button>
          ),
        }
      : false,

    {
      label: 'Lần cập nhật cuối',
      children: dayjs(data?.updatedAt).format('dd, D/MM/YYYY  h:mm A'),
    },
    {
      label: 'Nội dung',
      children: (
        <div dangerouslySetInnerHTML={{ __html: data?.noiDungDeXuat }} />
      ),
    },
  ].filter(Boolean);

  if (loading)
    return (
      <Page>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title={
            <Flex align="center" gap={8}>
              <Typography.Title level={5} style={{ margin: '0' }}>
                <Skeleton.Input size="small" />
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
      </Page>
    );

  if (!data) return <NotFound />;

  return (
    <BiddingContext.Provider
      value={{
        data,
        setData,
        editing,
        initData,
        deletedFields,
        setDeletedFields,
        createdFields,
        setCreatedFields,
        updatedFields,
        setUpdatedFields,
      }}
    >
      <Page>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title={
            data.isProposal
              ? 'Chi tiết đề xuất hoạt động mua sắm: ' + data?.tenDeXuat
              : 'Chi tiết hoạt động mua sắm: ' + data?.tenDeXuat
          }
          extra={
            <Flex gap={8}>
              {data?.trangThaiDeXuat === 'approved' && (
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    navigate(
                      `/equipments/import_equipments_by_excel?biddingId=${id}&departmentId=${data?.DepartmentId}`
                    );
                  }}
                >
                  Nhập thiết bị
                </Button>
              )}
              {data.trangThaiDeXuat !== 'rejected' &&
                hasPermission(BIDDING_UPDATE) && (
                  <Button
                    type="primary"
                    disabled={JSON.stringify(data) === JSON.stringify(initData)}
                    icon={<SaveOutlined />}
                    onClick={() =>
                      editApi({
                        body: {
                          ...data,
                          deletedFields,
                          createdFields,
                          updatedFields,
                          ...(data.trangThaiHoatDong === 'pendingProcess'
                            ? {
                                trangThaiHoatDong: 'processing',
                                ngayBatDauXuLy: new Date(),
                              }
                            : {}),
                        },
                      })
                    }
                    loading={editing}
                  >
                    Lưu
                  </Button>
                )}
            </Flex>
          }
        >
          <Flex justify="space-between">
            <Typography.Title level={5} style={{ margin: '0px' }}>
              {data.isProposal ? 'Thông tin đề xuất' : '1. Khoa phòng đề xuất'}
            </Typography.Title>
            {hasPermission(BIDDING_UPDATE) && (
              <Button
                disabled={editing}
                type="link"
                onClick={() => setIsEditItem(!isEditItem)}
                style={{ margin: '0px' }}
              >
                {isEditItem ? 'Xác nhận' : 'Cập nhật'}
              </Button>
            )}
          </Flex>
          {!isEditItem && <Descriptions items={items} column={2} />}
          {isEditItem && (
            <Form autoComplete="off" form={form} layout="vertical">
              <Form.Item
                name="tenDeXuat"
                label="Tên hoạt động mua sắm"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên hoạt động mua sắm!',
                  },
                ]}
                initialValue={data.tenDeXuat}
              >
                <Input
                  allowClear
                  name="tenDeXuat"
                  placeholder="Nhập tên hoạt động mua sắm"
                  onChange={(e) =>
                    setData({ ...data, tenDeXuat: e.target.value })
                  }
                  autoComplete="off"
                />
              </Form.Item>
              {data.trangThaiDeXuat !== 'approved' && (
                <Form.Item
                  name="khoaPhongDeXuat"
                  label="Khoa phòng đề xuất"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn khoa phòng đề xuất!',
                    },
                  ]}
                  initialValue={data.Department.tenKhoaPhong}
                >
                  <Select
                    allowClear
                    disabled={loadingDepartments}
                    placeholder="Chọn khoa phòng đề xuất"
                    onChange={(value) =>
                      setData({
                        ...data,
                        DepartmentId: value,
                      })
                    }
                    options={departments.map((item) => ({
                      label: item.tenKhoaPhong,
                      value: item.id,
                    }))}
                  />
                </Form.Item>
              )}

              <Form.Item
                name="noiDungDeXuat"
                label="Nội dung hoạt động mua sắm"
                initialValue={data.noiDungDeXuat}
              >
                <ReactQuill
                  style={{
                    borderRadius: '12px',
                    height: '220px',
                    paddingBottom: '44px',
                  }}
                  value={data.noiDungDeXuat}
                  onChange={(val) =>
                    setData({
                      ...data,
                      noiDungDeXuat: val,
                    })
                  }
                  modules={modules}
                  theme="snow"
                  placeholder="Nhập nội dung hoạt động mua sắm"
                />
              </Form.Item>
            </Form>
          )}
          {(data?.trangThaiDeXuat === 'approved' || !data?.trangThaiDeXuat) && (
            <>
              <Typography.Title level={5}>2. Lập kế hoạch</Typography.Title>

              <Flex vertical gap={8}>
                <CollapsibleForm
                  title="2.1. Chào giá"
                  children={<BiddingRequest />}
                />
                <CollapsibleForm
                  title="2.2. Lên dự toán, thành lập tổ chuyên gia, tổ thẩm định"
                  children={<LenDuToanThanhLapCacTo />}
                />
                <CollapsibleForm
                  title="2.3. Kế hoạch lựa chọn nhà thầu"
                  children={<KeHoachLuaChonNhaThau />}
                />
                <CollapsibleForm
                  title="2.4. E - Hồ sơ mời thầu (E-HSMT)"
                  children={<Ehsmt />}
                />
                <CollapsibleForm
                  title="2.5. E - Hồ sơ dự thầu (E-HSDT)"
                  children={<Ehsdt />}
                />
                <CollapsibleForm
                  title="2.6. Ký kết thực hiện hợp đồng"
                  children={<KyKetThucHienHopDong />}
                />
              </Flex>
            </>
          )}
        </Card>
      </Page>
    </BiddingContext.Provider>
  );
};

export default Edit;
