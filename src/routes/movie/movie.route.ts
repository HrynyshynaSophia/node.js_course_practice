

import express, { Request, Response } from "express";
import Movie from "../../models/movie";
const router = express.Router();
/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie.
 *     tags:
 *       - Movies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Bad request. The request body is invalid.
 */


router.post('/', async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(movie);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Movie deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/genre/:genreName', async (req: Request, res: Response) => {
    try {
        const { genreName } = req.params;
        const movies = await Movie.find({ genre: { $in: [genreName] } });
        if (movies.length === 0) {
            res.json({ message: 'No movies found with the specified genre' });
        } else {
            res.json(movies);
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
})

export { router as movieRoute }
