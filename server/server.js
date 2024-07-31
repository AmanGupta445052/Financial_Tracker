const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
require('dotenv').config(); // Load environment variables

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
