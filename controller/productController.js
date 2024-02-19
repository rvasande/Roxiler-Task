const axios = require("axios");
const Product = require("./../model/productModel");
const catchAsync = require("./../utils/catchAsync");
const ApiFeatures = require("./../utils/apiFeatures");

exports.fetchAndSeedData = catchAsync(async (req, res, next) => {
  const response = await axios.get(
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
  );
  const products = response.data;

  for (const product of products) {
    await Product.create(product);
  }

  res.status(201).json({
    status: "success",
    message: "data inserted successfully!",
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = new ApiFeatures(Product.find(), req.query)
    .pagination()
    .search();

  const results = await products.query;

  res.status(200).json({
    status: "success",
    results: results.length,
    data: {
      results,
    },
  });
});

exports.productsStats = catchAsync(async (req, res, next) => {
  const month = req.params.month * 1;

  const stats = await Product.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, month],
        },
      },
    },
    {
      $group: {
        _id: { $month: "$dateOfSale" },
        totalSaleAmount: { $sum: "$price" },
        totalSoldItems: { $sum: { $cond: { if: "$sold", then: 1, else: 0 } } },
        totalNotSoldItems: {
          $sum: { $cond: { if: "$sold", then: 0, else: 1 } },
        },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
  ]);

  console.log(stats);
  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.productCategeory = catchAsync(async (req, res, next) => {
  const month = req.params.month * 1;

  const category = await Product.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, month],
        },
      },
    },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.productBarChart = catchAsync(async (req, res, next) => {
  const month = req.params.month * 1;

  const stats = await Product.aggregate([
    {
      $match: {
        $expr: { $eq: [{ $month: "$dateOfSale" }, month] },
      },
    },
    {
      $group: {
        _id: {
          $switch: {
            branches: [
              { case: { $lte: ["$price", 100] }, then: "0 - 100" },
              { case: { $lte: ["$price", 200] }, then: "101 - 200" },
              { case: { $lte: ["$price", 300] }, then: "201 - 300" },
              { case: { $lte: ["$price", 400] }, then: "301 - 400" },
              { case: { $lte: ["$price", 500] }, then: "401 - 500" },
              { case: { $lte: ["$price", 600] }, then: "501 - 600" },
              { case: { $lte: ["$price", 700] }, then: "601 - 700" },
              { case: { $lte: ["$price", 800] }, then: "701 - 800" },
              { case: { $lte: ["$price", 900] }, then: "801 - 900" },
              { case: { $gte: ["$price", 901] }, then: "901 - above" },
            ],
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  res.json(stats);
});


exports.combinedResponse = catchAsync( async(req, res, next) =>{
  const month = req.params.month * 1;
  const statsPromise = axios.get(`http://localhost:3000/api/v1/products/stats/${month}`);
  const categoryPromise = axios.get(`http://localhost:3000/api/v1/products/category/${month}`);
  const barChartPromise = axios.get(`http://localhost:3000/api/v1/products/barChart/${month}`);

  const [statsResponse, categoryResponse, barChartResponse] = await Promise.all([statsPromise, categoryPromise, barChartPromise]);

  const combinedResponse = {
    stats: statsResponse.data,
    categories: categoryResponse.data,
    barChart: barChartResponse.data
  };

  console.log(statsPromise);

  res.json(combinedResponse);
})