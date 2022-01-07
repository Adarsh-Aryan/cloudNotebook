const express = require('express')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const Note = require("../models/Notes")
const fetchUserData = require("../models/fetchUserData")

router.get("/fetchAllNotes", fetchUserData, async (req, res) => { //Login Required
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        res.status(500).send("Internal Server Error!")
    }


})


router.post("/addNote",             //Login Required
    body('title', "Title must be atleast 5 Characters").isLength({ min: 5 }),
    // password must be at least 5 chars long
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 }), fetchUserData, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description, tag } = req.body
            const note = await Note.findOne({ title: title, user: req.user.id })

            if (note) {

                if (note.user.toString() !== req.user.id) {
                    Note.create({
                        user: req.user.id,
                        title: title,
                        description: description,
                        tag: tag,
                    }).then(note => res.json(note))
                }
                else {
                    res.send("Note of the given title is already exist")
                }
            }
            if (!note) {

                Note.create({
                    user: req.user.id,
                    title: title,
                    description: description,
                    tag: tag,
                }).then(note => res.json(note))
            }

        } catch (error) {
            res.status(500).send("Internal Server Error!")
        }
    })
//Login Required
router.put("/updateNote/:id", fetchUserData, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        // console.log(note)

        if (note) {
            if (note.user.toString() !== req.user.id) {
                res.send(400).send("Not Allowed")
            }
            else {
                const { title, description, tag } = req.body
                const UpdateNote = {}
                if (title) {
                    UpdateNote.title = title
                }
                if (description) {
                    UpdateNote.description = description
                }
                if (tag) {
                    UpdateNote.tag = tag
                }

                Note.findByIdAndUpdate(req.params.id, { $set: UpdateNote }, { new: true }).then(updateNote=>res.json(updateNote))
                

            }
        } else {
            res.send("Note Not found")
        }
    } catch (error) {
        res.status(500).send("Internal Server Error!")

    }

})
router.delete("/deleteNote/:id", fetchUserData, async (req, res) => {
    try {

        const note = await Note.findById(req.params.id)
        
       
        if (note) {
            if (note.user.toString() !== req.user.id) {
                res.status(401).send("Not Allowed")
            }
            else {
                Note.findByIdAndDelete(req.params.id).then(
                    () => {
                        res.status(200).send("Note Deleted Successfully")
                    }
                )
            }
        } else {
            res.send("Note Not Found")
        }

    } catch (error) {
        res.status(500).send("Internal Server Error!")

    }
})









module.exports = router

