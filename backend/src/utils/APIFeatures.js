class APIFeatures {
  // constructors
  constructor(query, queryString) {
    this.query = query; //  15 properties
    this.queryString = queryString;
  }

  // methods
  filter() {
    let filterQuery = {};
    let queryObj = { ...this.queryString };

    // MIN and MAX values
    if (queryObj.minPrice && queryObj.maxPrice) {
      if (queryObj.maxPrice.includes(">")) {
        filterQuery.price = { $gte: queryObj.minPrice };
      } else {
        filterQuery.price = {
          $gte: queryObj.minPrice,
          $lte: queryObj.maxPrice,
        };
      }
    }

    // Property Type
    if (queryObj.propertyType) {
      let propertyTypeArray = queryObj.propertyType
        .split(",")
        .map((value) => value.trim());

      filterQuery.propertyType = { $in: propertyTypeArray };
    }

    // Room Type
    if (queryObj.roomType) {
      filterQuery.roomType = queryObj.roomType;
    }

    // Amenities
    if (queryObj.amenities) {
      const amenitiesArray = Array.isArray(queryObj.amenities)
        ? queryObj.amenities
        : [queryObj.amenities];

      filterQuery["amenities.name"] = { $all: amenitiesArray };
    }

    // db.properties.find(price:{$gte:0, $lte:2000})
    this.query = this.query.find(filterQuery);
    return this;
  }

  search() {
    let searchQuery = {};
    let queryObj = { ...this.queryString };

    // search using cities
    searchQuery = queryObj.city
      ? {
          $or: [
            {
              "address.city": queryObj.city?.toLowerCase().replaceAll(" ", ""),
            },
            {
              "address.state": queryObj.city?.toLowerCase().replaceAll(" ", ""),
            },
            {
              "address.area": queryObj.city?.toLowerCase().replaceAll(" ", ""),
            },
          ],
        }
      : {};

    if (queryObj.guests) {
      searchQuery.maximumGuest = { $gte: queryObj.guests };
      // queryObj.guests
    }

    if (queryObj.dateIn && queryObj.dateOut) {
      searchQuery.$and = [
        {
          currentBookings: {
            $not: {
              $eleMatch: {
                $or: [
                  {
                    fromDate: { $lt: queryObj.dateOut },
                    toDate: { $gt: queryObj.dateIn },
                  },
                  {
                    fromDate: { $lt: queryObj.dateIn },
                    toDate: { $gt: queryObj.dateIn },
                  },
                ],
              },
            },
          },
        },
      ];
    }
    this.query = this.query.find(searchQuery);
    return this;
  }

  pagination() {
    let page = this.queryString.page * 1 || 1;
    let limit = this.queryString.limit * 1 || 12;
    let skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export { APIFeatures };
