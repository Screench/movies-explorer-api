const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { JWT_SECRET, NODE_ENV } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new AuthError('Пожалуйста, авторизуйтесь');
    }

    const token = authorization.replace('Bearer ', '');

    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
