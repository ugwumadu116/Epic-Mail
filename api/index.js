import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import userRouter from './routes/user.route';
import messageRouter from './routes/message.route';

const app = express();
dotenv.config();

app.use(bodyParser.json());


const PORT = process.env.PORT || 3001;
const prefix = '/api/v1';

app.get('/', (req, res) => {
  res.send('welcome to Epic-Mail Api');
});

app.use(`${prefix}/`, userRouter);
app.use(`${prefix}/messages`, messageRouter);

app.listen(PORT, () => console.log(`Welcome ${PORT}`));

export default app;
