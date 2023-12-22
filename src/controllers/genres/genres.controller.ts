import { type Request, type Response } from 'express'
import Genres from '../../models/genres';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

//Create genre controller
const postGenreResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const newGenre = req.body;
        if (Object.keys(newGenre).length === 0) {
            res.status(400).json({ error: 'Request body is missing' });
            return;
        }
        const genre = await Genres.create(req.body);
        res.json(genre)
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
}

//Get genres controller
const getGenresResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const genres = await Genres.find({});
        res.json(genres)
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
}

//Update genres controller
const putGenresResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedGenreData = req.body;
        if (!ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid genre ID' });
            return;
        }
        if (!id) {
            res.status(400).json({ error: 'Genre ID is missing' });
            return;
        }
        if (!updatedGenreData) {
            res.status(400).json({ error: 'Request body is missing' });
            return;
        }
        const genre = await Genres.findByIdAndUpdate(id, req.body, { new: true });
        if (!genre) {
            res.status(404).json({ error: 'Genre not found' });
            return;
        }
        res.json(genre)
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
}

//Delete genres controller
const deleteGenresResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'Genre ID is missing' });
            return;
        }
        if (!ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid Genre ID' });
            return;
        }
        const genre = await Genres.findByIdAndDelete(id);
        if (!genre) {
            res.status(404).json({ error: 'Genre not found' });
            return;
        }
        res.json({ message: 'Genre deleted successfully' })
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
}

export { postGenreResponse, getGenresResponse, putGenresResponse, deleteGenresResponse }