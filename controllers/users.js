const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');

const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const UnknownError = require('../errors/UnknownError');
const { JWT_SECRET, NODE_ENV } = require('../utils/constants');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError('Пользователь с таким email уже существует');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => User.create({
      name, email, password: hashedPassword,
    }))
    .then((userData) => res.status(201).send(userData.toJSON()))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { name, email }, { new: true, runValidators: true })
    .then((userData) => res.send(userData))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(new UnknownError('Неизвестная ошибка'));
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(new AuthError('Нет такого пользователя'))
    .then((userData) => {
      bcrypt.compare(password, userData.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({ _id: userData._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
            res.status(200).send({ token: jwt });
          } else {
            throw new AuthError('Неправильный пароль');
          }
        })
        .catch(next);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      return next(new UnknownError('Неизвестная ошибка'));
    });
};

module.exports = {
  createUser,
  updateProfile,
  login,
  getCurrentUser,
};
