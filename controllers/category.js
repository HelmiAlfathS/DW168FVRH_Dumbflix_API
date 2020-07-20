const { Category, Films, Episode } = require('../models');
const Joi = require('@hapi/joi');

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [
        {
          model: Films,
          as: 'films',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.send({
      data: category,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addCategory = async (req, res) => {
  try {
    const schema = Joi.object({
      category: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: error.details[0].message,
      });
    }

    const { category } = req.body;

    const categoryCheck = await Category.findOne({
      where: { category },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!categoryCheck) {
      Category.create({ category });

      res.status(200).send({
        data: category,
      });
    } else {
      res.status(401).send({
        message: `Category ${category} is already exist`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const newCategory = req.body.category;
    const schema = Joi.object({
      category: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({
        error: error.details[0].message,
      });
    }
    const update = await Category.update(req.body, { where: { id: id } });
    res.status(200).json({
      status: 'Succes, category has been updated.',
      data: {
        category: {
          id: id,
          name: newCategory,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Category has been deleted',
    });
  } catch (error) {
    console.log(error);
  }
};
