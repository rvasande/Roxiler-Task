const express = require('express');
const productController = require('./../controller/productController')

const router = express.Router()


router.route('/seedData').get(productController.fetchAndSeedData)

router.route('/').get(productController.getAllProducts)

router.route('/stats/:month').get(productController.productsStats)

router.route('/category/:month').get(productController.productCategeory)

router.route('/barChart/:month').get(productController.productBarChart)

router.route('/combinedRes/:month' ).get(productController.combinedResponse)

module.exports = router;
