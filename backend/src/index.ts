import express from 'express';
import bodyParser from 'body-parser';
import customerRouter from './routes/customer';
import calculateRouter from './routes/calculate';
import cors from 'cors';

const app = express();
const port = 5000;

const apiPrefix = '/api';

app.use(cors());
app.use(bodyParser.json());
app.use(apiPrefix + '/customer', customerRouter);
app.use(apiPrefix + '/routes', calculateRouter);

app.listen(port,'0.0.0.0', () => {
  console.log(`🔥 Server is running on port ${port} 🔥`);
});