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

exports.create = async (req, res) => {
  try {
    const user = await Users.create(req.body);

    res.send({ data: user });
  } catch (error) {
    console.log(error);
  }
};
