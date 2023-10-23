import express, { Request, Response } from "express";
import Genres from "../../models/genres";
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const genres = await Genres.create(req.body);
        res.json(genres)
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/', async (req: Request, res: Response) => {
    try {
        const genres = await Genres.find({});
        res.json(genres)
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
})
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const genres = await Genres.findByIdAndUpdate(req.params._id, req.body, { new: true });
        res.json(genres)
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const genres = await Genres.findByIdAndDelete(req.params._id);
        res.json({ message: 'Genres deleted successfully' })
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
})
