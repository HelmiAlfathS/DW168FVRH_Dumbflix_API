const { Films, Category } = require('../models');
const Joi = require('@hapi/joi');

exports.getFilm = async (req, res) => {
  try {
    const film = await Films.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: {
          exclude: ['CategoryId', 'createdAt', 'updatedAt'],
        },
      },
      attributes: {
        exclude: ['categoryId', 'createdAt', 'updatedAt', 'CategoryId'],
      },
    });
    if (film) {
      return res.send({
        data: film,
      });
    } else {
      return res.status(400).send({ message: 'Film is not found' });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addFilm = async (req, res) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      thumbnailFilm: Joi.string().required(),
      year: Joi.number().required(),
      categoryId: Joi.required(),
      description: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const { title } = req.body;

    const film = await Films.create(req.body);
    if (film) {
      const grabResult = await Films.findOne({
        where: {
          title,
        },
        include: {
          model: Category,
          as: 'category',
          attributes: {
            exclude: ['CategoryId', 'createdAt', 'updatedAt'],
          },
        },
        attributes: {
          exclude: ['categoryId', 'CategoryId', 'createdAt', 'updatedAt'],
        },
      });

      return res.send({
        data: grabResult,
      });
    } else {
      return res.status(400).send({ message: 'Please Try Again' });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.editFilm = async (req, res) => {
  try {
    const { id } = req.params;
    // const newFilm = req.body.Film;
    const schema = Joi.object({
      title: Joi.string().required(),
      thumbnailFilm: Joi.string().required(),
      year: Joi.number().required(),
      categoryId: Joi.required(),
      description: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({
        error: error.details[0].message,
      });
    }
    const update = await Films.update(req.body, { where: { id: id } });
    if (update) {
      const { title } = req.body;
      const grabResult = await Films.findOne({
        where: {
          title,
        },
        include: {
          model: Category,
          as: 'category',
          attributes: {
            exclude: ['CategoryId', 'createdAt', 'updatedAt'],
          },
        },
        attributes: {
          exclude: ['categoryId', 'CategoryId', 'createdAt', 'updatedAt'],
        },
      });

      return res.send({
        data: grabResult,
      });
    } else {
      return res.status(400).send({ message: 'Please Try Again' });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.deleteFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const Film = await Films.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Film has been deleted',
    });
  } catch (error) {
    console.log(error);
  }
};
