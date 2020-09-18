const express = require('express');
const { uploadImage } = require('../middleware/upload');
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
  findEpisodes,
  findEpisode,
  findEpisodeTitle,
} = require('../controllers/film');
const { auth, superUser } = require('../middleware');

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
  getTransactions,
  createTransaction,
  editTransaction,
  deleteTransaction,
} = require('../controllers/transaction');

// ------------- ROUTINGS ----------------------------

router.get('/users', findUsers); //
router.get('/user/:id', findUser);
router.delete('/user/:id', superUser, deleteUser);

router.post('/register', register);
router.post('/login', login);

router.post('/contact', createContact);
router.get('/contacts', findContacts);

router.get('/category', getCategory);
router.post('/category', auth, superUser, addCategory);
router.put('/category/:id', auth, editCategory);
router.delete('/category/:id', auth, superUser, deleteCategory);

router.get('/film', getFilm);
router.post('/film', uploadImage('thumbnailFilm'), addFilm); //auth, superUser,
router.get('/film/:id', detailFilm);
router.put('/film/:id', auth, superUser, editFilm);
router.delete('/film/:id', auth, superUser, deleteFilm);
router.get('/film/:id/episodes', findEpisodes); //NEW //AMAN
router.get('/episode/:id', findEpisode); //NEW //aman
router.get('/episodetitle/:title', findEpisodeTitle); //New //sepertinya pake title lebih oke krn ntar harusnya kita isi title pake  tabel episode lita isi dgn nomor episode (1,2,3 dll), kalau id kan agak aneh

router.get('/film/:idFilm/episode/:idEps', detailEpisode);
router.post('/film/:id/episode', uploadImage('thumbnailFilm'), addEpisode);
router.put('/film/:idFilm/episode/:idEps', auth, editEpisode);
router.delete('/film/:idFilm/episode/:idEps', auth, deleteEpisode);

///combine UI
router.post('/episode', uploadImage('thumbnailFilm'), addEpisode);
router.get('/film/:id/episode', getEpisode);
// router.post('/film', uploadImage('thumbnailFilm'), addFilm);

router.get('/transaction', getTransactions);
router.delete('/transaction/:id', auth, superUser, deleteTransaction);
router.post('/transaction', uploadImage('attachment'), createTransaction);
router.put('/transaction/:id', editTransaction);

// router.get('/transaction', getTransaction);
// router.delete('/transaction/:id', auth, superUser, deleteTransaction);
// router.post('/transaction', auth, addTransaction);
// router.put('/transaction/:id', auth, superUser, editTransaction);
// module.exports = router;

// router.get('/filmeps', readEpisodes);
module.exports = router;
