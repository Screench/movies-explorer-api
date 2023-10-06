const {
  JWT_SECRET,
  NODE_ENV,
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const CORS_SETTINGS = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3000',
    'https://localhost:3001',
    'http://api.diploma.nomoredomainsicu.ru',
    'https://api.diploma.nomoredomainsicu.ru',
    'https://diploma.nomoredomainsicu.ru',
  ],
  credentials: true,
};

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  PORT,
  DB_URL,
  CORS_SETTINGS,
};
