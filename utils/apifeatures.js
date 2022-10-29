class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
        title: {
          $regex: this.queryStr.keyword,
          $options: "i",
        },
      }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filterForDigits() {
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const removeFields = ["keyword", "page", "limit", "sort"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  filterForAlphabet() {
    const category = this.queryStr.category
      ? { categories: this.queryStr.category, }
      : {};

    this.query = this.query.find({ ...category });
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    if (this.queryStr.sort == "newest") {
      this.query = this.query.sort({ createdAt: -1 }).limit(resultPerPage).skip(skip);
    } else if (this.queryStr.sort == "oldest") {
      this.query = this.query.sort({ createdAt: 1 }).limit(resultPerPage).skip(skip);
    }

    return this;
  }
}

module.exports = ApiFeatures;