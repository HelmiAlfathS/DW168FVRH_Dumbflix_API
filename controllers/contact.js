const { Contact } = require('../models');

exports.read = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'], // nah atribute exclude ini fitur utk menghiding data yg tiidak ingin ditampilkan, createdat dan updateat itu kan dibuatkan oleh controller, kita hide aja krn kita cuma pgn menampilkan data yg kita isi dalam database
      },
    });

    res.send({ data: contacts });
  } catch (error) {
    console.log(error);
  }
};

exports.create = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    res.send({ data: contact });
  } catch (error) {
    console.log(error);
  }
};

// exports.readOne = async (req, res) => {
//   try {
//     const { id } = req.user;
//     const user = await User.findOne({
//       where: {
//         id,
//       },
//     });

//     res.send({ data: user });
//   } catch (error) {
//     console.log(error);
//   }
// };
