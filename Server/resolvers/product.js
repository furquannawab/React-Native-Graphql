exports.Product = {
  category: (_, args, __) => {
    return __.categories.find((category) => category.id === _.categoryId);
  },
  reviews: (_, args, __) => {
    return __.reviews.filter((review) => review.productId === _.id);
  },
};
