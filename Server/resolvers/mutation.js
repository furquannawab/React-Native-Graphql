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
};
