const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (_, args, __) => {
    const { name } = args.input;
    const newCategory = {
      id: uuid(),
      name,
    };

    __.categories.push(newCategory);
    return newCategory;
  },

  addProduct: (_, args, __) => {
    const newProduct = {
      id: uuid(),
      ...args.input,
    };

    __.products.push(newProduct);
    return newProduct;
  },

  addReview: (_, args, __) => {
    const newReview = {
      id: uuid(),
      ...args.input,
    };

    __.reviews.push(newReview);
    return newReview;
  },

  deleteCategory: (_, args, __) => {
    const index = __.categories.findIndex(
      (category) => category.id === args.input
    );
    return __.categories.splice(index, 1) ? true : false;
  },

  deleteProduct: (_, args, __) => {
    const index = __.products.findIndex((product) => product.id === args.input);
    return __.products.splice(index, 1) ? true : false;
  },

  deleteReview: (_, args, __) => {
    const index = __.reviews.findIndex((review) => review.id === args.input);
    return __.reviews.splice(index, 1) ? true : false;
  },

  updateCategory: (_, args, __) => {
    const index = __.categories.findIndex(
      (category) => category.id === args.id
    );
    __.categories[index] = {
      ...__.categories[index],
      ...args.input,
    };

    return __.categories[index];
  },

  updateProduct: (_, args, __) => {
    const index = __.products.findIndex((product) => product.id === args.id);
    __.products[index] = {
      ...__.products[index],
      ...args.input,
    };

    return __.products[index];
  },

  updateReview: (_, args, __) => {
    const index = __.reviews.findIndex((review) => review.id === args.id);
    __.reviews[index] = {
      ...__.reviews[index],
      ...args.input,
    };

    return __.reviews[index];
  },
};
