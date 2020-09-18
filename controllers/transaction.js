const { Transaction, Users } = require('../models');

const statusChecker = async (status, id) => {
  let transactionStatus = status.toLowerCase();
  if (transactionStatus === 'approved') {
    await Users.update({ subscribe: 1 }, { where: { id: id } });
  } else {
    await Users.update({ subscribe: 0 }, { where: { id: id } });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: {
        model: Users,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password', 'gender'],
        },
      },

      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.status(200).send({ data: transactions });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      attachment: req.file.filename,
    });
    // await statusChecker(req.body.status, req.body.userId);
    const transactionCreated = await Transaction.findOne({
      where: { id: transaction.id },
      include: {
        model: Users,
        // as: 'user',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      },
      attributes: { exclude: ['userId', 'UserId', 'createdAt', 'updatedAt'] },
    });
    return res
      .status(200)
      .send({ status: 'Success', data: transactionCreated });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const getTransaction = await Transaction.findByPk(req.params.id);

    if (transaction > 0 && req.body.status === 'approved') {
      const user = await Users.update(
        { subscribe: 1 },
        {
          where: {
            id: getTransaction.userId,
          },
        }
      );

      res.status(200).json({
        status: 'success',
        data: {
          transaction: getTransaction,
        },
      });
    } else if (transaction > 0 && req.body.status === 'cancel') {
      const user = await Users.update(
        { subscribe: 0 },
        {
          where: {
            id: getTransaction.userId,
          },
        }
      );

      res.status(200).json({
        status: 'success',
        data: {
          transaction: getTransaction,
        },
      });
    } else {
      console.log(error);
      return res.status(500).send({ error: 'update is failed' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

// exports.editTransaction = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Transaction.update(req.body, { where: { id } });
//     const transactionUpdated = await Transaction.findOne({
//       where: { id },
//       include: {
//         model: Users,
//         attributes: { exclude: ['createdAt', 'updatedAt'] },
//       },
//       attributes: { exclude: ['userId', 'UserId', 'createdAt', 'updatedAt'] },
//     });
//     if (!transactionUpdated)
//       return res.status(400).send({
//         Status: 'Something wrong',
//         Message: `Transaction with id : ${id} Not Found`,
//       });
//     return res
//       .status(200)
//       .send({ status: 'Success', data: transactionUpdated });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ error: 'Internal Server Error' });
//   }
// };

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.destroy({ where: { id } });
    res.status(200).send({
      status: 'Success',
      message: `Transaction with id : ${id} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};
