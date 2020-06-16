const { Users } = require('../models');

exports.read = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.status(200).send({ data: users });
  } catch (error) {
    res.status(500).json({
      error: 'internal server error',
    });
  }
};

exports.readOne = async (req, res) => {
  try {
    const { id } = req.params; //the params
    const user = await Users.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: {
        id,
      },
    });
    if (user) {
      return res.status(200).send({
        data: user,
      });
    } else {
      return res.status(400).send({ message: 'User is not found' });
    }
    // res.status(200).send({ data: user });
  } catch (error) {
    res.status(500).json({
      error: 'internal server error',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params; //the params
    const user = await Users.destroy({
      where: {
        id,
      },
    });
    res.status(200).send({ data: id });
  } catch (error) {
    console.log(error);
    // res.status(500).json({
    //   error: 'internal server error',
    // });
  }
};
