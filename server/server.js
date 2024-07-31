const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Ensure this path is correct
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from public folder

app.use('/api', routes); // Use routes defined in router.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
