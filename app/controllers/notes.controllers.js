const Note = require('../models/note.model.js');

//creating and saving a new note
exports.create = (req, res) => {
    //validate request 
    if(!req.body.content){
        return res.status(400).send({
            message: 'note should not be empty'
        });
    }
    //create a note
    const note = new Note({
        title: req.body.title || 'Untitled Note',
        content: req.body.content
    });
    // save note in db
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'an error occured while saving the note.'
        });
    });
};
//retrieve and return all the notes from the db
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving notes."
        });
    });

};
//find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note){
            return res.status(404).send({
                message: "Note not found with the id " + req.params.noteId
            });   
        }
        return res.status(500).send({
            message: 'Error retrieving the note with id' + req.params.noteId
        });
    });
};
//updating a note by the noteId
exports.update = (req, res) => {
    //validate request
    if(!req.body.content){
        return res.status(400).send({
            message: 'note cannot be empty'
        });
    }
    //finnding a note and updating it 
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || 'Untitled note',
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.staus(404).send({
                message: 'note not found with id ' + req.params.noteId
            });
        }
        return res.status(500).send({
            message: 'error updating note with the id ' + req.params.noteId
        });
    });
};
// deleting a note
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note){
            return res.status(404).send({
                message: 'note not found' + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'Not found'){
            return res.status(404).send({
                message: 'Note not found '
            });
        }
        return res.status(500).send({
            message: 'could not delete note '
        });
    });
};