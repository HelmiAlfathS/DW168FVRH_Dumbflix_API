const { Episode, Films, Category } = require('../models');
const Joi = require('@hapi/joi');

exports.getEpisode = async (req, res) => {
  try {
    const id = req.params.id;

    const episode = await Episode.findAll({
      where: { filmId: id },
      include: {
        model: Films,
        as: 'film',
        include: {
          model: Category,
          as: 'category',
          attributes: {
            exclude: ['categoryId', 'createdAt', 'updatedAt'],
          },
        },
        attributes: ['title', 'thumbnailFilm', 'year'],
      },
      attributes: {
        exclude: ['filmId', 'createdAt', 'updatedAt'],
      },
    });
    if (episode) {
      return res.status(200).send({
        data: episode,
      });
    } else {
      return res.status(400).send({ message: 'Episode is not found' });
    }
    // res.send({ data: episode });
  } catch (error) {
    res.status(500).json({
      error: 'internal server error',
    });
  }
};

exports.addEpisode = async (req, res) => {
  try {
    const id = req.params.id;
    const schema = Joi.object({
      title: Joi.string().required(),
      thumbnailFilm: Joi.string().required(),
      linkFilm: Joi.string().required(),
      filmId: Joi.number(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }
    const newEpisode = await Episode.create(req.body);
    res.status(200).send({
      data: newEpisode,
    });
  } catch (error) {
    console.log(error);
    // res.status(500).json({
    //   error: 'internal server error',
    // });
  }
};

exports.detailEpisode = async (req, res) => {
  try {
    const { idFilm, idEps } = req.params;

    const episode = await Episode.findOne({
      where: { filmId: idFilm, title: idEps },
      include: {
        model: Films,
        as: 'film',
        include: {
          model: Category,
          as: 'category',
          attributes: {
            exclude: ['categoryId', 'createdAt', 'updatedAt'],
          },
        },
        attributes: ['title', 'thumbnailFilm', 'year'],
      },
      attributes: {
        exclude: ['filmId', 'createdAt', 'updatedAt'],
      },
    });
    if (episode) {
      return res.status(200).send({
        data: episode,
      });
    } else {
      return res.status(400).send({ message: 'Episode is not found' });
    }
    // res.send({ data: episode });
  } catch (error) {
    res.status(500).json({
      error: 'internal server error',
    });
  }
};

exports.editEpisode = async (req, res) => {
  try {
    const { idEps } = req.params;
    // const newFilm = req.body.Film;
    const schema = Joi.object({
      title: Joi.string().required(),
      thumbnailFilm: Joi.string().required(),
      linkFilm: Joi.string().required(),
      filmId: Joi.number(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({
        error: error.details[0].message,
      });
    }
    const update = await Episode.update(req.body, { where: { id: idEps } });
    if (update) {
      const { title } = req.body;
      const grabResult = await Episode.findOne({
        where: {
          id: idEps,
        },
        include: {
          model: Films,
          as: 'film',
          include: {
            model: Category,
            as: 'category',
            attributes: {
              exclude: ['categoryId', 'createdAt', 'updatedAt'],
            },
          },
          attributes: ['title', 'thumbnailFilm', 'year'],
        },
        attributes: {
          exclude: ['filmId', 'createdAt', 'updatedAt'],
        },
      });

      return res.send({
        data: grabResult,
      });
    } else {
      return res.status(400).send({ message: 'Please Try Again' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'internal server error',
    });
  }
};

exports.deleteEpisode = async (req, res) => {
  try {
    const { idEps } = req.params;
    const episode = await Episode.destroy({
      where: {
        title: idEps,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Episode has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      error: 'internal server error',
    });
  }
};
