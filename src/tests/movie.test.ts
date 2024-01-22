import request from 'supertest';
import 'dotenv/config'
import Movie from '../models/movie';
import bodyParser from 'body-parser';
import movieRoute from "../routes/movie/movie.route";
import Genres from '../models/genres';
import { app } from '..';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/movies', movieRoute);

const mockMovies = [{
    id: "d5fE_asz",
    title: "The Matrix",
    description: "A groundbreaking science fiction movie",
    releaseDate: "1999-03-31",
    genre: [
        "Sci-Fi",
        "Action"
    ]
}, {
    id: "d5fE_fgr",
    title: "Titanic",
    description: "Description",
    releaseDate: "1978-03-31",
    genre: [
        "Drama",
    ]
}]

describe('Movie GET API Endpoint', () => {
    it('should return a list of movies', async () => {
        Movie.find = jest.fn().mockResolvedValue(mockMovies);
        const response = await request(app).get('/api/movies');
        expect(Movie.find).toHaveBeenCalledTimes(1);
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(mockMovies.length);
        expect(response.body).toEqual(mockMovies);
    });

    it('should handle internal server error', async () => {
        Movie.find = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
        const response = await request(app).get('/api/movies');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
})

describe('POST /api/movies', () => {
    const newMovie = {
        title: "Movie",
        description: "Description",
        releaseDate: "1978-03-31",
        genre: [
            "Drama",
        ]
    };

    it('should create a new movie', async () => {
        Movie.find = jest.fn().mockResolvedValue([]);
        Genres.find = jest.fn().mockResolvedValue([{ name: "Drama" }]);
        Movie.create = jest.fn().mockResolvedValue(newMovie);
        const response = await request(app)
            .post('/api/movies')
            .send(newMovie);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newMovie);
    });

    it('should throw an error if there no such genre in db', async () => {
        const newMovie = {
            title: "Movie",
            description: "Description",
            releaseDate: "1978-03-31",
            genre: [
                "Fantasy",
            ]
        };
        Movie.find = jest.fn().mockResolvedValue([]);
        Genres.find = jest.fn().mockResolvedValue([{ name: "Drama" }]);
        Movie.create = jest.fn().mockResolvedValue(newMovie);
        const response = await request(app)
            .post('/api/movies')
            .send(newMovie);
        expect(response.status).toBe(400);
    });

    it('should handle internal server error', async () => {
        Movie.create = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
        const response = await request(app)
            .post('/api/movies')
            .send(newMovie);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});

describe('PUT /api/movies/:id', () => {
    const movieId = '65908e0fb1822a193b2d874e';
    const updatedMovie = {
        title: "Updated movie",
        description: "Description",
        releaseDate: "1978-03-31",
        genre: [
            "Drama",
        ]
    };
    const mockUpdatedMovie = { _id: movieId, ...updatedMovie };

    it('should update an existing movie', async () => {
        Movie.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedMovie);
        const response = await request(app)
            .put(`/api/movies/${movieId}`)
            .send(updatedMovie);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUpdatedMovie);
    });

    it('should handle "Invalid Movie ID" error', async () => {
        const invalidMovieId = '65908e0fb1822a193b2d8';
        const response = await request(app)
            .put(`/api/movies/${invalidMovieId}`)
            .send(updatedMovie);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid Movie ID' });
    });

    it('should handle "Request body is missing" error', async () => {
        const emptyMovie = {};
        const response = await request(app)
            .put(`/api/movies/${movieId}`)
            .send(emptyMovie);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Request body is missing' });
    });

    it('should handle "Movie not found" error', async () => {
        const wrongMovieId = '659aef86979d3c29f0ae94c8'
        Movie.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
        const response = await request(app)
            .put(`/api/movies/${wrongMovieId}`)
            .send(updatedMovie);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Movie not found' });
    });

    it('should handle internal server error', async () => {
        Movie.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
        const response = await request(app)
            .put(`/api/movies/${movieId}`)
            .send(updatedMovie);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});

describe('DELETE /api/movies/:id', () => {
    const movieId = '65908e0fb1822a193b2d874e';
    const mockDeletedMovie = { _id: movieId, name: 'Deleted Movie' };

    it('should delete an existing movie', async () => {
        Movie.findByIdAndDelete = jest.fn().mockResolvedValue(mockDeletedMovie);
        const response = await request(app).delete(`/api/movies/${movieId}`)
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Movie deleted successfully' });
    });

    it('should handle "Invalid Movie ID" error', async () => {
        const invalidMovieId = '65908e0fb1822a193b2d8';
        const response = await request(app)
            .delete(`/api/movies/${invalidMovieId}`)
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid Movie ID' });
    });

    it('should handle "Movie not found" error', async () => {
        const wrongMovieId = '659aef86979d3c29f0ae94c8'
        Movie.findByIdAndDelete = jest.fn().mockResolvedValue(null);
        const response = await request(app)
            .delete(`/api/movies/${wrongMovieId}`)
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Movie not found' });
    });

    it('should handle internal server error', async () => {
        Movie.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
        const response = await request(app).delete(`/api/movies/${movieId}`)
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});

describe('Genre GET API Endpoints', () => {

    it('handlers missing request body', async () => {
        const response = await request(app).post('/api/movies').send({});
        expect(response.status).toBe(400);
    });

    it('handlers invalid data format', async () => {
        const invalidData = {
            title: "The country old man 2",
            releaseDate: "1994-09-23T00:00:00.000Z",
            genre: [
                "Western",
            ],
        }
        const response = await request(app).post('/api/movies').send(invalidData);
        expect(response.status).toBe(400);
    })
})

describe('GET /api/movies/genre/:genreName', () => {

    it('should return movies by genre', async () => {
        const genre = 'Drama';
        const moviesByGenre = mockMovies.filter(movie => movie.genre.includes(genre));
        Movie.find = jest.fn().mockResolvedValue(moviesByGenre);
        const response = await request(app).get(`/api/movies/genre/${genre}`);
        expect(Movie.find).toHaveBeenCalledWith({ genre: { $in: [genre] } });
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(moviesByGenre.length);
        expect(response.body).toEqual(moviesByGenre);
    });

    it('should return 404 if no movies found for the genre', async () => {
        const genre = 'Horror';
        Movie.find = jest.fn().mockResolvedValue([]);
        const response = await request(app).get(`/api/movies/genre/${genre}`);
        expect(Movie.find).toHaveBeenCalledWith({ genre: { $in: [genre] } });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'No movies found with the specified genre' });
    });

    it('should handle internal server error', async () => {
        const genre = 'Drama';
        Movie.find = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
        const response = await request(app).get(`/api/movies/genre/${genre}`);
        expect(Movie.find).toHaveBeenCalledWith({ genre: { $in: [genre] } });
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});
