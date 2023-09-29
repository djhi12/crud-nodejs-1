const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemsRouter = require('./routes/items');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger'); // Import your Swagger configuration

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());
// 
// Serve Swagger UI at the /api-docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api', itemsRouter);

// Add a simple "Hello, World!" route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
