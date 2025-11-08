const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');

// GET /api/notes?search=&tag=&pinned=
router.get('/', auth, async (req, res, next) => {
  try {
    const { search, tag, pinned } = req.query;
    const query = { user: req.user.id };
    if (search) query.$or = [{ title: new RegExp(search, 'i') }, { content: new RegExp(search, 'i') }];
    if (tag) query.tags = tag;
    if (pinned === 'true') query.pinned = true;
    const notes = await Note.find(query).sort({ pinned: -1, updatedAt: -1 });
    res.json(notes);
  } catch (err) { next(err); }
});

// POST /api/notes
router.post('/', auth, [
  body('title').isLength({ min: 1 }).withMessage('Title required')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, content = '', tags = [], pinned = false } = req.body;
    const note = new Note({ user: req.user.id, title, content, tags, pinned });
    await note.save();
    res.status(201).json(note);
  } catch (err) { next(err); }
});

// PUT /api/notes/:id
router.put('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    const allowed = ['title','content','tags','pinned'];
    allowed.forEach(k => { if (k in req.body) note[k] = req.body[k]; });
    await note.save();
    res.json(note);
  } catch (err) { next(err); }
});

// DELETE /api/notes/:id
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
