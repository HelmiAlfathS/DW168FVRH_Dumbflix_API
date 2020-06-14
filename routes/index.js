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
} = require('../controllers/film');
const { auth } = require('../middleware');

const {
  getEpisode,
  addEpisode,
  detailEpisode,
  editEpisode,
  deleteEpisode,
} = require('../controllers/episode');
// -------------- DECLARING -------------------------

const {
  read: findContacts,
  create: createContact,
} = require('../controllers/contact.js');

const {
  read: findUsers,
  readOne: findUser,
  deleteUser: deleteUser,
} = require('../controllers/user.js');

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
router.post('/film/:id/episode', addEpisode);
router.put('/film/:idFilm/episode/:idEps', editEpisode);
router.delete('/film/:idFilm/episode/:idEps', deleteEpisode);

module.exports = router;
