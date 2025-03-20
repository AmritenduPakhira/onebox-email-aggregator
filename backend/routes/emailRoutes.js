import express from 'express';
import Email from '../models/emailModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const emails = await Email.find().sort({ date: -1 });
        res.json(emails);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching emails', error });
      }
});

router.get('/:id', async (req, res) => {
    try {
      const email = await Email.findById(req.params.id);
      if (!email) {
        return res.status(404).json({ message: 'Email not found' });
      }
      res.json(email);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching email', error });
    }
  });

export default router;
