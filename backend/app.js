// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorsHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000, DB_ADDRESS = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();
app.use(cors);
app.use(requestLogger);
app.use(express.json());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT} port`);
});
