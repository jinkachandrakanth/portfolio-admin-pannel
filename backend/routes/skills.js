import express from 'express';
import Skill from '../models/Skill.js';

const router = express.Router();

// Get all skills
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new skill
router.post('/', async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        res.status(201).json(skill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a skill
router.put('/:id', async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(skill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a skill
router.delete('/:id', async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Skill deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;