import express from 'express';
import Experience from '../models/Experience.js';

const router = express.Router();

// Get all experience entries
router.get('/', async (req, res) => {
    try {
        const experience = await Experience.find();
        res.json(experience);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new experience entry
router.post('/', async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.status(201).json(experience);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update an experience entry
router.put('/:id', async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(experience);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an experience entry
router.delete('/:id', async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ message: 'Experience entry deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;