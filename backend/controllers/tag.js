const TagService = require("../services/tag");

const getTags = async (req, res, next) => {
  try {
    const tags = await TagService.getTags();
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

const addTag = async (req, res, next) => {
  try {
    const { name } = req.body;

    const tag = await TagService.addTag(name);

    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};

const updateTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const tag = await TagService.updateTagById(id, name);

    res.json(tag);
  } catch (error) {
    next(error);
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tag = await TagService.deleteTagById(id);

    res.json(tag);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTags,
  addTag,
  updateTag,
  deleteTag,
};
