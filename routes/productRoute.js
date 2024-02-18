const express = require('express');
const productController = require('./../controller/productController')

const router = express.Router()

router.route('/').get(productController.getAllProducts)

router.route('/seedData').get(productController.fetchAndSeedData)

router.route('/:month').get(productController.productsStats)

module.exports = router;
