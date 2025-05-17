import express from 'express';
import Certification from '../models/Certification.js';

const router = express.Router();

// Get all certifications
router.get('/', async (req, res) => {
    try {
        const certifications = await Certification.find();
        res.json(certifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new certification
router.post('/', async (req, res) => {
    try {
        const certification = new Certification(req.body);
        await certification.save();
        res.status(201).json(certification);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a certification
router.put('/:id', async (req, res) => {
    try {
        const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(certification);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a certification
router.delete('/:id', async (req, res) => {
    try {
        await Certification.findByIdAndDelete(req.params.id);
        res.json({ message: 'Certification deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;