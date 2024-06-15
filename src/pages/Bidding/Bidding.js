import React, { useState } from 'react';
import {
  Card,
  Flex,
  Tag,
  Space,
  Table,
  Breadcrumb,
  Modal,
  Input,
  Button,
  Select,
  Form,
  Popover,
  Typography,
} from 'antd';
import { HomeOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { useAppContext } from '../../contexts/appContext';
import useFetchApi from '../../hooks/useFetchApi';
import { Link, useNavigate } from 'react-router-dom';
import hasPermission from '../../helpers/hasPermission';
import {
  BIDDING_CREATE,
  BIDDING_DELETE,
  BIDDING_READ,
} from '../../const/permission';
import useDeleteApi from '../../hooks/useDeleteApi';
import useCreateApi from '../../hooks/useCreateApi';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import Page from '../../components/Page';

const Bidding = () => {
  const navigate = useNavigate();
  const { setToast } = useAppContext();
  const { deleting, deleteApi } = useDeleteApi({ url: `/bidding` });
  const { creating, createApi } = useCreateApi({ url: `/bidding` });
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [form] = Form.useForm();

  const { data, fetchApi, setData, loading } = useFetchApi({
    url: '/biddings',
    defaultData: [],
  });
  const breadcrumbItems = useBreadcrumb([
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/shopping/bidding',
      title: 'Hoạt động mua sắm qua đấu thầu',
    },
  ]);
  const defaultCreateFormData = {
    trangThaiDeXuat: 'processing',
    khoaPhongDeXuat: '',
    noiDungDeXuat: '',
    tenDeXuat: '',
  };
  const [createFormData, setCreateFormData] = useState(defaultCreateFormData);
  const handleCreateFormChange = (e) => {
    setCreateFormData({
      ...createFormData,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    {
      title: 'Tên hoạt động',
      dataIndex: 'tenDeXuat',
      key: 'tenDeXuat',
      render: (text, record) => (
        <Link to={`/shopping/bidding/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Khoa phòng đề xuất',
      dataIndex: 'khoaPhongDeXuat',
      key: 'khoaPhongDeXuat',
    },

    {
      title: 'Trạng thái',
      key: 'trangThaiDeXuat',
      dataIndex: 'trangThaiDeXuat',
      render: (_, record) => {
        if (record.trangThaiDeXuat === 'approved')
          return <Tag color="success">Chấp thuận</Tag>;
        if (record.trangThaiDeXuat === 'reject')
          return <Tag color="error">Từ chối</Tag>;
        return <Tag color="processing">Chờ duyệt</Tag>;
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },

    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {hasPermission(BIDDING_READ) && (
            <Popover content="Xem chi tiết" trigger="hover">
              <Button
                type="link"
                icon={<EyeOutlined />}
                onClick={() => navigate(`/shopping/bidding/${record.id}`)}
              />
            </Popover>
          )}
          {hasPermission(BIDDING_DELETE) && (
            <Popover content="Xóa hoạt động" trigger="hover">
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  setDeleteId(record.id);
                  setShowDeleteConfirm(true);
                }}
              />
            </Popover>
          )}
        </Space>
      ),
    },
  ];

  const handleCreateBidding = async () => {
    try {
      const res = await createApi(createFormData);
      if (res.data.success) {
        setToast('Tạo mới thành công');
      }
    } catch (error) {
      console.log(error);
      setToast('Tạo mới thất bại', 'error');
    } finally {
      setIsShowCreateForm(false);
      fetchApi();
    }
  };

  const handleDeleteBidding = async (id) => {
    try {
      const res = await deleteApi(id);
      if (res.data.success) {
        setData(data.filter((item) => item.id !== id));
        setToast('Xóa thành công');
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      console.log(error);
      setToast('Xóa thất bại', 'error');
    }
  };

  if (loading)
    return (
      <Page>
        <Breadcrumb items={breadcrumbItems} />
        <Card
          title="Danh sách hoạt động mua sắm qua đấu thầu"
          extra={
            hasPermission(BIDDING_CREATE) && (
              <Button type="primary" icon={<PlusOutlined />} disabled>
                Tạo mới
              </Button>
            )
          }
        >
          <Table loading columns={columns} bordered />
        </Card>
      </Page>
    );

  return (
    <Page>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        title="Danh sách hoạt động mua sắm qua đấu thầu"
        extra={
          hasPermission(BIDDING_CREATE) && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsShowCreateForm(true)}
              disabled={deleting}
            >
              Tạo mới
            </Button>
          )
        }
      >
        <Flex gap={16} vertical>
          <Modal
            title="Xác nhận xóa hoạt động"
            open={showDeleteConfirm}
            onCancel={() => setShowDeleteConfirm(false)}
            footer={null}
          >
            <Flex gap={8} vertical>
              <Typography.Text>
                Hành động này sẽ xóa toàn bộ dữ liệu của hoạt động trong cơ sở
                dữ liệu và không thể khôi phục. Bạn có chắc chắn muốn xóa?
              </Typography.Text>
              <Flex gap={8} justify="flex-end">
                <Button key="back" onClick={() => setIsShowCreateForm(false)}>
                  Hủy
                </Button>
                <Button
                  type="primary"
                  danger={true}
                  loading={deleting}
                  onClick={() => handleDeleteBidding(deleteId)}
                >
                  Xóa
                </Button>
              </Flex>
            </Flex>
          </Modal>
          <Modal
            title="Tạo mới hoạt động"
            open={isShowCreateForm}
            onCancel={() => setIsShowCreateForm(false)}
            footer={null}
          >
            <Form
              autoComplete="off"
              onFinish={handleCreateBidding}
              form={form}
              layout="vertical"
            >
              <Form.Item
                name="tenDeXuat"
                label="Tên hoạt động"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên hoạt động!' },
                ]}
              >
                <Input
                  allowClear
                  name="tenDeXuat"
                  placeholder="Nhập tên hoạt động"
                  onChange={handleCreateFormChange}
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item
                name="khoaPhongDeXuat"
                label="Khoa phòng đề xuất"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn khoa phòng đề xuất!',
                  },
                ]}
              >
                <Select
                  allowClear
                  placeholder="Chọn khoa phòng đề xuất"
                  onChange={(value) =>
                    setCreateFormData({
                      ...createFormData,
                      khoaPhongDeXuat: value,
                    })
                  }
                  options={[
                    {
                      value: 'Khoa vi sinh',
                      label: 'Khoa vi sinh',
                    },
                    {
                      value: 'Khoa y te',
                      label: 'Khoa y te',
                    },
                    {
                      value: 'Khoa dep trai',
                      label: 'Khoa dep trai',
                    },
                    {
                      value: 'Khoa xinh gai',
                      label: 'Khoa xinh gai',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="noiDungDeXuat" label="Nội dung hoạt động">
                <Input.TextArea
                  name="noiDungDeXuat"
                  allowClear
                  placeholder="Nhập nội dung hoạt động hoạt động"
                  rows={4}
                  onChange={handleCreateFormChange}
                />
              </Form.Item>

              <Flex gap={8} justify="flex-end">
                <Button key="back" onClick={() => setIsShowCreateForm(false)}>
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit" loading={creating}>
                  Lưu
                </Button>
              </Flex>
            </Form>
          </Modal>

          <Table
            columns={columns}
            dataSource={data}
            bordered
            disabled={deleting}
          />
        </Flex>
      </Card>
    </Page>
  );
};

export default Bidding;
