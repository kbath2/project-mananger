/* eslint-disable no-console */
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello Quinta-Feira' }));

app.listen(3333, () => {
  console.log('Server Conected');
});
