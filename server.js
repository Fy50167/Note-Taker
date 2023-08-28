const express = require('express');
const fs = require('fs');
const path = require('path');
const reviews = require('./db/db.json');
const uuid = require('./helpers/uuid');


const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    const notes = res.json(reviews);
    return notes
});

app.post('/api/notes', (req, res) => {
  const {title, text} = req.body;
  const newNote = {
    title,
    text,
    note_id: uuid()
  }
  reviews.push(newNote);
  fs.writeFile('./db/db.json', JSON.stringify(reviews, 0, 4), (err) =>
      err ? console.log(err) : console.log('Successfully saved new note!')
    );
})



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
