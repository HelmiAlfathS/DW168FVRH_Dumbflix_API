const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');
const {
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
} = require('../controllers/category');
const {
  getFilm,
  addFilm,
  editFilm,
  deleteFilm,
  detailFilm,
  readEpisodes,
} = require('../controllers/film');
const { auth } = require('../middleware');

const {
  getEpisode,
  addEpisode,
  detailEpisode,
  editEpisode,
  deleteEpisode,
} = require('../controllers/episode');

const {
  read: findContacts,
  create: createContact,
} = require('../controllers/contact.js');

const {
  read: findUsers,
  readOne: findUser,
  deleteUser: deleteUser,
} = require('../controllers/user.js');
const {
  getTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = require('../controllers/transaction');

// ------------- ROUTINGS ----------------------------

router.get('/users', findUsers);
router.get('/user/:id', findUser);
router.delete('/user/:id', deleteUser);

router.post('/register', register);
router.post('/login', login);

router.post('/contact', createContact);
router.get('/contacts', findContacts);

router.get('/category', getCategory);
router.post('/category', auth, addCategory);
router.put('/category/:id', auth, editCategory);
router.delete('/category/:id', auth, deleteCategory);

router.get('/film', getFilm);
router.post('/film', auth, addFilm);
router.get('/film/:id', detailFilm);
router.put('/film/:id', auth, editFilm);
router.delete('/film/:id', auth, deleteFilm);

router.get('/film/:id/episode', getEpisode);
router.get('/film/:idFilm/episode/:idEps', detailEpisode);
router.post('/film/:id/episode', auth, addEpisode);
router.put('/film/:idFilm/episode/:idEps', auth, editEpisode);
router.delete('/film/:idFilm/episode/:idEps', auth, deleteEpisode);

router.get('/transaction', getTransaction);
router.delete('/transaction/:id', auth, deleteTransaction);
router.post('/transaction', auth, addTransaction);
router.put('/transaction/:id', auth, editTransaction);
module.exports = router;

// router.get('/filmeps', readEpisodes);
