const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');
const projectRouter = require('./routes/projects');
const ticketRouter = require('./routes/tickets');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

//Connect to DB
connectDB();

//Route Middleware
app.use('/users', userRouter);
app.use('/projects', projectRouter);
app.use('/tickets', ticketRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});