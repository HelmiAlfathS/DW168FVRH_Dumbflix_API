const { Users } = require('../models');
const Joi = require('@hapi/joi'); // validation -> create schema & validate
const bcrypt = require('bcrypt'); // password-hashing
const jwt = require('jsonwebtoken'); // token

exports.register = async (req, res) => {
  try {
    const schema = Joi.object({
      fullName: Joi.string().alphanum().min(4).max(30).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
      gender: Joi.string().required(),
      phone: Joi.string().min(10).required(),
      address: Joi.string().required(),
      subscribe: Joi.boolean(),
    });
    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });

    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailCheck = await Users.findOne({
      where: { email },
    });

    if (!emailCheck) {
      const user = await Users.create({
        ...req.body,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      res.send({
        data: {
          email,
          token,
        },
      });
    } else {
      res.status(401).send({
        message: 'Email sudah terdaftar, mohon gunakan alamat email yang lain.',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().required(), //sptinya gak perlu di define lg kali ya?
      password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });

    const { email, password } = req.body;

    const userMatch = await Users.findOne({
      where: { email },
    });

    if (!userMatch) return res.status(400).send({ message: 'Invalid Login' });

    const validPass = await bcrypt.compare(password, userMatch.password);
    if (!validPass) return res.status(400).send({ message: 'Invalid Login' });

    const token = jwt.sign({ id: userMatch.id }, process.env.SECRET_KEY);
    res.send({
      data: {
        email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
