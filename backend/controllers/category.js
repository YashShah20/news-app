const CategoryService = require("../services/category");

const getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryService.getCategories();
    const category_names = categories.map(({ id, label }) => ({
      tag: id,
      label,
    }));
    res.send(category_names);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
};
