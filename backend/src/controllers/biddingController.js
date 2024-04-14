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
    const filteredData = filterFields(data, ['updatedAt', 'createdAt']);
    await Bidding.update(filteredData, {
      where: {
        id: data.id,
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Cập nhật hoạt động thất bại',
      error: error,
    });
  }
}

export async function deleteBidding(req, res) {
  try {
    const { id } = req.params;
    await Bidding.destroy({
      where: {
        id: id,
      },
    });
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: 'Xóa hoạt động thất bại',
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
      raw: true,
    });

    return res.send(prepareDate(bidding));
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

function prepareDate(objOrArray) {
  const fields = ['createdAt', 'updatedAt'];
  if (Array.isArray(objOrArray)) {
    return objOrArray.map((obj) => {
      for (const field of fields) {
        if (field in obj) {
          obj[field] = new Date(obj[field]).toLocaleString();
        }
      }
      return obj;
    });
  } else {
    for (const field of fields) {
      if (field in objOrArray) {
        objOrArray[field] = new Date(objOrArray[field]).toLocaleString();
      }
    }
    return objOrArray;
  }
}

function filterFields(obj, fieldsToRemove) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !fieldsToRemove.includes(key))
  );
}
