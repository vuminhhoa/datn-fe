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
    console.log('filteredData', filteredData);
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
    console.log(
      'bidding',
      typeof bidding.createdAt,
      bidding.createdAt.toLocaleString()
    );
    const dateformat = formatDateFields2(bidding);
    console.log('dateformat', dateformat);
    return res.send(formatDateFields2(bidding));
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

function prepareDate(obj, fields = null) {
  if (Array.isArray(obj)) {
    return obj.map((item) => prepareDate(item, fields));
  } else if (typeof obj === 'object' && obj !== null) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!fields || (fields && fields.includes(key))) {
          if (obj[key] instanceof Date) {
            obj[key] = obj[key].toLocaleString();
          } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            obj[key] = prepareDate(obj[key], fields);
          }
        }
      }
    }
    return obj;
  } else {
    return obj;
  }
}

function formatDateFields2(obj) {
  const fieldsToFormat = findDateFields(obj);
  fieldsToFormat.forEach((field) => {
    if (obj[field]) {
      const date = new Date(obj[field]);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
      obj[field] = formattedDate;
    }
  });

  return obj;
}

function findDateFields(obj) {
  const dateFields = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && key.endsWith('Date')) {
      dateFields.push(key);
    }
  }
  return dateFields;
}

function filterFields(obj, fieldsToRemove) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !fieldsToRemove.includes(key))
  );
}
