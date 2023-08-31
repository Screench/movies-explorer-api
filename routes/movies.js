const router = require('express').Router();
const {
  middlewareDeleteMovieById, middlewareCreateMovie,
} = require('../middleware/regex');

const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', middlewareCreateMovie, createMovie);
router.delete('/:_id', middlewareDeleteMovieById, deleteMovieById);

module.exports = router;
