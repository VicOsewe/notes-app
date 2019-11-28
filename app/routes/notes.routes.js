module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    //create a new note
    app.post('/notes', notes.create);

    //Retrieve all notes
    app.get('/notes/:noteId', notes.findOne);

    //updateing  a note with noteid
    app.put('notes/:noteId', notes.delete);
}