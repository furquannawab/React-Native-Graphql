exports.Category = {
  products: (_, args, __) => {
    let categoryProducts = __.products.filter(
      (product) => product.categoryId === _.id
    );

    if (args.filter) {
      const { onSale, avgRating } = args.filter;

      if (onSale) {
        categoryProducts = categoryProducts.filter(
          (product) => product.onSale === true
        );
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        categoryProducts = categoryProducts.filter((product) => {
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

    return categoryProducts;
  },
};
