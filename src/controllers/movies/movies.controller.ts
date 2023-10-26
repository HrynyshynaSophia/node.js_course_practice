import { type Request, type Response } from 'express'
import Movie from '../../models/movie';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

//Movie creation controller
const postMoviesResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const newMovie = req.body;
        if (Object.keys(newMovie).length === 0) {
            res.status(400).json({ error: 'Request body is missing' });
            return;
        }
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

//Get movies controller
const getMoviesResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

//Update movies controller
const putMoviesResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedMovieData = req.body;
        if (!ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid Movie ID' });
            return;
        }
        if (!id) {
            res.status(400).json({ error: 'Movie ID is missing' });
            return;
        }
        if (!updatedMovieData) {
            res.status(400).json({ error: 'Request body is missing' });
            return;
        }
        const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (!movie) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }
        res.json(movie);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

//Delete movies controller
const deleteMoviesResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'Movie ID is missing' });
            return;
        }
        if (!ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid Movie ID' });
            return;
        }
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

//Search movies controller
const findByGenreMoviesResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { genreName } = req.params;
        if (!genreName.length || genreName === "{genreName}") {
            res.status(404).json({ message: 'Genre is missing' })
            return
        }
        const movies = await Movie.find({ genre: { $in: [genreName] } });
        if (movies.length === 0) {
            res.status(404).json({ message: 'No movies found with the specified genre' });
            return
        } else {
            res.json(movies);
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
export { postMoviesResponse, getMoviesResponse, putMoviesResponse, deleteMoviesResponse, findByGenreMoviesResponse }