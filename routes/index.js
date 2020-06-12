const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');

// -------------- DECLARING -------------------------
const {
  read: findContacts, //getALL
  create: createContact, //post, CREATE
  // readOne: findContact,
} = require('../controllers/contact.js');

const {
  read: findUsers,
  create: createUser,
  readOne: findUser,
} = require('../controllers/user');

// ------------- ROUTINGS ----------------------------

router.post('/user', createUser);
router.get('/users', findUsers);

router.post('/register', register);
router.post('/login', login);

router.post('/contact', createContact);
router.get('/contacts', findContacts);

// router.get("/contact", auth, findContact); //PRIVATE

module.exports = router;
