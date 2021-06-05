const express = require('express');
const app = express();
const mongoose = require("mongoose");

const Song = require('./models/song');

// Connect to MongoDB
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.oy8wd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    // For backwards compatibility
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

// Specified default engine to ejs
app.set('view engine', 'ejs');

// Tell express to use json
app.use(express.json());

// Tell express where the assets such as styles and javascripts are located at
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

// Save the song to the database
app.post('/songs', async (req, res) => {
    const song = new Song({
        notes:  req.body.songNotes
    })
    await song.save();
    res.json(song);
})

app.get('/songs/:id', async (req, res) => {
    let song;

    try {
        song = await Song.findById(req.params.id);
    } catch (e) {
        song = undefined;
    }
    res.render('index', { song: song });
})

app.listen(5000);