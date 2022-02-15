exports.Query = {
  products: (_, args, __) => {
    let filteredProducts = __.products;

    if (args.filter) {
      const { onSale, avgRating } = args.filter;

      if (onSale)
        filteredProducts = filteredProducts.filter(
          (product) => product.onSale === true
        );

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0,
            numberofReviews = 0;
          __.reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberofReviews++;
            }
          });
          const avgProductRating = sumRating / numberofReviews;

          return avgProductRating >= avgRating;
        });
      }
    }

    return filteredProducts;
  },

  product: (_, args, __) => {
    return __.products.find((product) => product.id === args.id);
  },

  categories: (_, args, __) => __.categories,

  category: (_, args, __) => {
    return __.categories.find((category) => category.id === args.id);
  },

  reviews: (_, args, __) => __.reviews,

  review: (_, args, __) => {
    return __.reviews.find((review) => review.id === args.id);
  },
};
