import { Bidding } from '../models/index.js';

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
