const router = require('express').Router();
const {
  middlewareMovieId, middlewareCreateMovie,
} = require('../middleware/regex');

const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', middlewareCreateMovie, createMovie);
router.delete('/:_Id', middlewareMovieId, deleteMovieById);

module.exports = router;
