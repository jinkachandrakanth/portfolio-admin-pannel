import express from 'express';
import Education from '../models/Education.js';

const router = express.Router();

// Get all education entries
router.get('/', async (req, res) => {
    try {
        const education = await Education.find();
        res.json(education);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new education entry
router.post('/', async (req, res) => {
    try {
        const education = new Education(req.body);
        await education.save();
        res.status(201).json(education);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update an education entry
router.put('/:id', async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(education);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an education entry
router.delete('/:id', async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ message: 'Education entry deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;