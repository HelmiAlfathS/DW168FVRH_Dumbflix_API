const { Users, Transaction } = require('../models');
const Joi = require('@hapi/joi');

exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findAll({
      include: [
        {
          model: Users,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password', 'id'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
    });
    res.status(200).send({
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      error: 'internal server error',
    });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const schema = Joi.object({
      startDate: Joi.date().required(),
      dueDate: Joi.date().required(),
      userId: Joi.number().required(),
      attachment: Joi.string().required(),
      status: Joi.boolean().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: error.details[0].message,
      });
    }
    const transaction = await Transaction.create(req.body);

    if (transaction) {
      const grabTransaction = await Transaction.findOne({
        where: { id: transaction.id },
        include: [
          {
            model: Users,
            as: 'user',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password'],
            },
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'userId'],
        },
      });
      return res.send({
        data: grabTransaction,
      });
    } else {
      return res.status(400).send({ message: 'Transaction is failed.' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'internal server error',
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'transaction has been deleted',
    });
    // const transaction = await Transaction.findOne({
    //   where: { id },
    //   // include: [
    //   //   {
    //   //     model: Users,
    //   //     as: 'user',
    //   //     attributes: {
    //   //       exclude: ['createdAt', 'updatedAt', 'password'],
    //   //     },
    //   //   },
    //   // ],
    //   // attributes: {
    //   //   exclude: ['createdAt', 'updatedAt', 'userId'],
    //   // },
    // });
    // if (transaction) {
    //   return res.status(200).send({
    //     id: id,
    //   });
    // } else {
    //   return res.status(400).send({
    //     message: 'transaction is not found',
    //   });
    // }
  } catch (error) {
    res.status(500).json({
      error: 'internal server error',
    });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const schema = Joi.object({
      // startDate: Joi.date().required(),
      // dueDate: Joi.date().required(),
      userId: Joi.number().required(),
      attachment: Joi.string().required(),
      status: Joi.boolean().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: error.details[0].message,
      });
    }
    const update = await Transaction.update(req.body, { where: { id } });
    if (update) {
      // const { title } = req.body;
      const grabResult = await Transaction.findOne({
        where: { id },
        include: [
          {
            model: Users,
            as: 'user',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password'],
            },
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'userId'],
        },
      });
      if (grabResult) {
        const stats = req.body.status;
        const idUser = req.body.userId;
        // console.log(stats);
        // console.log(idUser);
        const changeSubs = await Users.update(
          { subscribe: stats },
          { where: { id: idUser } }
        );
      }

      return res.status(200).send({
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
