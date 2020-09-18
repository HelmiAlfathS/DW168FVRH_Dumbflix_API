const { Users } = require('../models');

exports.read = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.send({ data: users });
  } catch (error) {
    console.log(error);
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

    res.send({ data: user });
  } catch (error) {
    console.log(error);
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
    res.send({ data: id });
  } catch (error) {
    console.log(error);
  }
};
