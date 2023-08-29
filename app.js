require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middleware/rateLimit');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT, DB_URL, CORS_SETTINGS } = require('./utils/constants');

mongoose.connect(DB_URL);

const app = express();
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(requestLogger);
app.use(cookieParser());
app.use(cors(CORS_SETTINGS));

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер проходит краш тест');
//   }, 0);
// });

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Прослушивание порта: ${PORT}`);
});
