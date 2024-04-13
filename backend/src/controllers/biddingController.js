import { Bidding } from '../models/index.js';

export async function createBidding(req, res) {
  try {
    const data = req.body;
    console.log(data);
    const createdBidding = await Bidding.create({ ...data });
    return res.send({ data: createdBidding, success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function updateBidding(req, res) {
  try {
    const data = req.body;
    await Bidding.update(data, {
      where: {
        id: data.id,
      },
    });
    return res.send({ data: req.body, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Cập nhật hoạt động thất bại',
      error: error,
    });
  }
}

export async function getOneBidding(req, res) {
  try {
    const { id } = req.params;
    const bidding = await Bidding.findOne({
      where: {
        id: id,
      },
    });
    return res.send({ bidding: bidding, success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu hoạt động thất bại',
      error: error,
    });
  }
}

export async function getListBiddings(req, res) {
  try {
    const biddings = await Bidding.findAll({
      attributes: [
        'id',
        'biddingName',
        'proposedDepartmentName',
        'proposedStatus',
        'createdAt',
        'updatedAt',
      ],
      raw: true,
    });
    return res.send(prepareDate(biddings));
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Lấy dữ liệu hoạt động thất bại',
      error: error,
    });
  }
}

function prepareDate(data) {
  const newData = data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt).toLocaleString(),
    updatedAt: new Date(item.updatedAt).toLocaleString(),
  }));
  return newData;
}
