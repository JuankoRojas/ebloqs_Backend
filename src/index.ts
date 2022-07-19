import express, { Application } from 'express'
import cors from "cors";
import fileUpload from 'express';
import path from 'path'
import morgan from 'morgan';

// ROUTES
import indexRout from './routes/index.routes'
import { connectionDB } from './database/database';

const app: Application = express();
const PORT = 5000

connectionDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());
app.use('/uploads', express.static(path.resolve()));
app.use(morgan('dev'));

// Routes
app.use(indexRout);


app.listen(PORT, () => {
    console.log("|------- ", Date(), " -------|");
    console.log("Server Listening on port: ", PORT);
})