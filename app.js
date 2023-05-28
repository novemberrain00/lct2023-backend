import express from 'express';
import cors from 'cors';
import {authRouter} from './routers/authRouter.js';
import {industriesRouter} from './routers/industriesRouter.js';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import path from 'path';

const app = express();
const port = 443; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: false }))
.use(express.json());
app.use(cors()); 

app.get('/', (req, res) => {
  res.sendFile(__dirname, 'lct2023-frontend/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.use('/auth', authRouter);
app.use('/industries', industriesRouter);



