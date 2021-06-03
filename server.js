const express = require('express');
const app = express();

// Specified default engine to ejs
app.set('view engine', 'ejs');

// Tell express where the assets such as styles and javascripts are located at
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(5000);