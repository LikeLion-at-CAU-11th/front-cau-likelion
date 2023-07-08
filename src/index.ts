import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { AppDataSource } from './data-source';
import router from './routes/index';
dotenv.config();

const app: Express = express();
const port = 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
AppDataSource.initialize()
  .then(async () => {})
  .catch((err) => console.log(err));

app.use(router);
app.get('/', (req: Request, res: Response) => {
  res.send('Server Setting');
});

app.listen(port, () => {
  console.log(`(●'◡'●) Server On (●'◡'●)`);
});

app.use((req, res, next) => {
  res.status(404).send('404 Not Found ( •̀ ω •́ )');
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

export default app;
