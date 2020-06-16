const jwt = require('jsonwebtoken');

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

exports.super = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (user.role !== 1)
      return res.status(401).send({
        error: {
          status: 'Unauthorized',
          message: 'Access Denied !',
        },
      });
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid Token' });
  }
};
