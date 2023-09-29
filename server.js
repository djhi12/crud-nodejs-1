const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemsRouter = require('./routes/items');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // Corrected option
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());

app.use('/api', itemsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
