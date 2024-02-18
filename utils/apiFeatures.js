const Product = require("./../model/productModel");

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    if (this.queryString.page) {
      const numProduct = Product.countDocuments();
    }
    return this;
  }

  search() {
    if (this.queryString.search) {
      const searchRegex = new RegExp(this.queryString.search, "i");
      this.query = this.query.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          // { price: searchRegex },
        ],
      });
    }else if (this.queryString.price) {
      const price = parseFloat(this.queryString.price);
      this.query = this.query.find({ price: price });
    }
  

    return this;
  }
}

module.exports = ApiFeatures;
