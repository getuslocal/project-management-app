import express, { Application } from 'express';
import cors from 'cors';
import config from './config/config';
import userRouter from './routes/user';
import projectRouter from './routes/project';
import ticketRouter from './routes/ticket';
import organizationRouter from './routes/organization';
import demoRouter from './routes/demo';
import connectDB from './config/db';

const app: Application = express();
const port = config.server.port;

//Middleware
app.use(cors());
app.use(express.json());

//Connect to DB
connectDB();

//Route Middleware
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/organizations', organizationRouter);
app.use('/api/demo', demoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
