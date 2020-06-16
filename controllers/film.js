const { Films, Category, Episode } = require('../models');
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
      return res.status(200).send({
        data: film,
      });
    } else {
      return res.status(400).send({ message: 'Film is not found' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'internal server error',
    });
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
          attributes: ['id', 'category'],
        },
        attributes: {
          exclude: ['categoryId', 'CategoryId', 'createdAt', 'updatedAt'],
        },
      });

      return res.status(200).send({
        data: grabResult,
      });
    } else {
      return res.status(400).send({ message: 'Please Try Again' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'internal server error',
    });
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
    res.status(500).json({
      error: 'internal server error',
    });
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
    res.status(500).json({
      error: 'internal server error',
    });
  }
};

exports.detailFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Films.findOne({
      where: { id },
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
    if (!film) {
      return res.status(400).json({
        message: 'Film is not Found',
      });
    }
    res.status(200).send({ data: film });
  } catch (error) {
    res.status(500).json({
      error: 'internal server error',
    });
  }
};

// exports.getEpisodebyFilm = async (req,res)=>{
//   try {
//     const {id} = req.params;
//     const episode = await Films.findOne({
//       where : {id},
//       include: [
//         {
//           [arraymodel]
//         }
//       ]
//     })
//   } catch (error) {

//   }
// }
exports.readEpisodes = async (req, res) => {
  try {
    const { id: filmId } = req.params;
    const film = await Film.findOne({
      where: { id: filmId },
      include: [
        {
          model: Category,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Episode,
          attributes: {
            exclude: ['FilmId', 'filmId', 'createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['categoryId', 'CategoryId', 'createdAt', 'updatedAt'],
      },
    });
    return res.send({ data: { film } });
  } catch (error) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};
