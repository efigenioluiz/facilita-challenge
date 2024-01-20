import express from 'express';
import bodyParser from 'body-parser';
import customerRouter from './routes/customer';

const app = express();
const port = 5000;

const apiPrefix = '/api';

app.use(bodyParser.json());
app.use(apiPrefix + '/customer', customerRouter);

app.listen(port,'0.0.0.0', () => {
  console.log(`🔥 Server is running on port ${port} 🔥`);
});