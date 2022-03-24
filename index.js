require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { productsRoute, salesRoute } = require('./routes/index.routes');
const { errorMiddleware } = require('./middlewares/index.middlewares');

const app = express();
app.use(express.json());

app.use(bodyParser.json());

// Routes
app.use('/products', productsRoute);
app.use('/sales', salesRoute);
app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
