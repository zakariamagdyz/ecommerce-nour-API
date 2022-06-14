module.exports = class ApiFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryClone = { ...this.queryString };
    ["sort", "page", "limit", "fields"].forEach((el) => delete queryClone[el]);

    let queryStr = JSON.stringify(queryClone);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortFields = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortFields);
    } else {
      this.query = this.query.sort("-_id");
    }
    return this;
  }

  limitingFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page || 1;
    const limit = this.queryString.limit || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
};
