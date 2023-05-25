import express from 'express';
import cors from 'cors';
import {authRouter} from './routers/authRouter.js';

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }))
.use(express.json());
app.use(cors()); 

app.get('/', (req, res) => {
  res.sendFile(__dirname, 'build', 'index.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.use('/auth', authRouter)



