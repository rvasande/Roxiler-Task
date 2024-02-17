const axios = require('axios')
const Product = require('./../model/productModel')

exports.fetchAndSeedData = async(req,res) =>{
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;

        for (const product of products) {
            await Product.create(product);
        }

        res.status(201).json({
            status:'success',
            message:'data inserted successfully!'
        })

    } catch (error) {
        res.status(404).json({
            status:'fail',
            message:error.message
        })
    }
}