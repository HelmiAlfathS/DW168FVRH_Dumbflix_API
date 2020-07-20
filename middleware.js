const jwt = require('jsonwebtoken');
const { Users } = require('./models');

exports.auth = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header('Authorization')) ||
    !(token = header.replace('Bearer ', ''))
  )
    return res.status(401).send({ message: 'Access denied!' });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token' });
  }
};

exports.superUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.user.id,
      },
    });
    roles = req.user.id;
    console.log(roles);

    if (user.role !== 1)
      return res.status(400).send({ message: 'Invalid Operation' });

    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token' });
  }
};
