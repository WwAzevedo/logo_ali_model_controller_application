const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRouter = require('./src/routes/usersRouter');
const bookingRouter = require('./src/routes/bookingRouter');
const carsRouter = require('./src/routes/carsRouter');
const tripsRouter = require('./src/routes/tripsRouter');
const reviewsRouter = require('./src/routes/reviewsRouter');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use(usersRouter);
app.use(bookingRouter);
app.use(carsRouter);
app.use(tripsRouter);
app.use(reviewsRouter);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});