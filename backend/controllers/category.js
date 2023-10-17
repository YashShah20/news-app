const CategoryService = require("../services/category");

const getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryService.getCategories();
    const category_names = categories.map(({ tag, label, image_url }) => ({
      tag,
      label,
      image_url,
    }));
    res.send(category_names);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
};
