const User = require("../models/User");
const Order = require("../models/Order");

exports.analytics = async (req, res, next) => {
  try {
    const countClients = await User.countDocuments();

    const totalIncome = await Order.aggregate([
      { $match: { status: { $ne: Order.orderStatusCancel } } },
      { $group: { _id: null, totalIncome: { $sum: "$total" } } },
    ]);

    const totalMonth = await Order.aggregate([
      {
        $match: {
          updatedAt: {
            $gte: currentMonth().startDate,
            $lt: currentMonth().endDate,
          },
        },
      },
      {
        $group: { _id: null, totalMonth: { $sum: "$total" } },
      },
    ]);

    const newOrders = await Order.find({ status: Order.orderStatusNew })
      .select("-products")
      .populate([
        { path: "userId", select: "_id fullName phone address" },
        // { path: "products.product", select: "_id name price" }
      ]);
    const countNewOrders = newOrders.length;

    return res.status(200).json({
      countClients,
      totalIncome: totalIncome.length !== 0 ? totalIncome[0].totalIncome : 0,
      totalMonth: totalMonth.length !== 0 ? totalMonth[0].totalMonth : 0,
      countNewOrders,
      newOrders,
    });
  } catch (error) {
    // Handle error
    next(error);
  }
};

function currentMonth() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const startDate = new Date(Date.UTC(currentYear, currentMonth, 1));
  const endDate = new Date(Date.UTC(currentYear, currentMonth + 1, 0));

  return { startDate, endDate };
}
