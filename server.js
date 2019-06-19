const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// COnnect to MONGO
mongoose
    .connect(db)
    .then(() => console.log('mongoDB connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

//? Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //* Set Static Folder
    app.use(express.static('client/build'));

    app.length('*', (req, res) => {
        // Load Index.HTML file
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));