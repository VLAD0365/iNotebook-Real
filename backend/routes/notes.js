const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//Route:1 Get All The Notes: GET "/api/notes/getuser" .Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

})
//Route:2 Get All The Notes: GET "/api/notes/addnote" .Login Required
// Route: Add a Note: POST "/api/auth/addnote". Login Required
router.post('/addnote', fetchuser, [
    body('Title', 'Title must be at least 5 characters long').isLength({ min: 3 }),
    body('Description', 'Description must be at least 15 characters long').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Title, Description, Tag } = req.body;

        const note = new Note({
            Title,
            Description,
            Tag,
            user: req.user.id // Use lowercase 'user'
        });

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Route:3 Get All The Notes: GET "/api/notes/updatenote" .Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { Title, Description, Tag } = req.body;
        //create a NewNote Object
        const newNote = {};
        if (Title) { newNote.Title = Title };
        if (Description) { newNote.Description = Description };
        if (Tag) { newNote.Tag = Tag };
        //Find the node to be Updated and Update it
        let note = await Note.findById(req.params.id)
        if (!note) { res.status(404).send("Not Found") }

        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Route:3 Get All The Notes: GET "/api/notes/deletenote" .Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        const { Title, Description, Tag } = req.body;

        //Find the node to be delete and delete it
        let note = await Note.findById(req.params.id)
        if (!note) { res.status(404).send("Not Found") }

        //Allow delection only if user owns this note
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ Success: "Note has Been Deleted!", note: note });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
module.exports = router