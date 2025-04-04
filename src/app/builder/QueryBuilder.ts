import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: this.query.searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  // filter() {
  //   const queryObj = { ...this.query };

  //   const excludeFields = ['searchTerm', 'page', 'limit'];
  //   excludeFields.forEach((item) => delete queryObj[item]);

  //   this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

  //   return this;
  // }
  filter() {
    const queryObj = { ...this.query };

    const excludeFields = ['searchTerm', 'page', 'limit'];
    excludeFields.forEach((item) => delete queryObj[item]);

    // Make sure all filter values are case-insensitive
    Object.keys(queryObj).forEach((key) => {
      const value = queryObj[key];

      if (typeof value === 'string') {
        // Using regex with 'i' for case-insensitive search
        queryObj[key] = { $regex: new RegExp(value, 'i') };
      }
    });

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  pagination() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
}

export default QueryBuilder;
