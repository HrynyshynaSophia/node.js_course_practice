import request from 'supertest';
import 'dotenv/config'
import Genres from '../models/genres';
import genreRoute from "../routes/genres/genres.route";
import bodyParser from 'body-parser'
import { app } from '..';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/genres', genreRoute)

const mockGenres = [{
    _id: "65908e0fb1822a193b2d874e",
    name: "Fiction",
}, {
    _id: "65908e34d1579bf0d0672c4b",
    name: "Crime",
}]

describe('Genre GET API Endpoint', () => {

    it('should return a list of genres', async () => {
        Genres.find = jest.fn().mockResolvedValue(mockGenres);
        const response = await request(app).get('/api/genres');
        expect(Genres.find).toHaveBeenCalledTimes(1);
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(mockGenres.length);
        expect(response.body).toEqual(mockGenres);
    });

    it('should handle internal server error', async () => {
        Genres.find = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
        const response = await request(app).get('/api/genres');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
})
describe('POST /api/genres', () => {
    const newGenre = { name: "Genre" };

    it('should create a new genre', async () => {
        Genres.findOne = jest.fn().mockResolvedValue(null);
        Genres.create = jest.fn().mockResolvedValue(newGenre);
        const response = await request(app)
            .post('/api/genres')
            .send(newGenre);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(newGenre);
    });

    it('should throw an error if user try to add genre that already exist', async () => {
        Genres.findOne = jest.fn().mockResolvedValue(newGenre);
        const response = await request(app)
            .post('/api/genres')
            .send(newGenre);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'This genre is already exist' });
    });

    it('should handle internal server error', async () => {
        Genres.findOne = jest.fn().mockResolvedValue(null);
        Genres.create = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
        const response = await request(app)
            .post('/api/genres')
            .send(newGenre);
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});

describe('PUT /api/genres/:id', () => {
    const genreId = '65908e0fb1822a193b2d874e';
    const updatedGenre = {
        name: 'Updated Genre',
    };
    it('should update an existing genre', async () => {
        const mockUpdatedGenre = { _id: genreId, ...updatedGenre };
        Genres.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedGenre);
        const response = await request(app)
            .put(`/api/genres/${genreId}`)
            .send(updatedGenre);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUpdatedGenre);
    });

    it('should handle "Invalid Genre ID" error', async () => {
        const invalidGenreId = '65908e0fb1822a193b2';
        const response = await request(app)
            .put(`/api/genres/${invalidGenreId}`)
            .send(updatedGenre);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid genre ID' });
    });

    it('should handle "Genre not found" error', async () => {
        const wrongGenreId = '65908e0fb1822a193b2d874d'
        Genres.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
        const response = await request(app)
            .put(`/api/genres/${wrongGenreId}`)
            .send(updatedGenre);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Genre not found' });
    });

    it('should handle internal server error', async () => {
        Genres.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
        const response = await request(app).delete(`/api/genres/${genreId}`)
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});
describe('DELETE /api/genres/:id', () => {
    const genreId = '65908e0fb1822a193b2d874e';
    const mockDeletedGenre = { _id: genreId, name: 'Deleted Genre' };

    it('should delete an existing genre', async () => {
        Genres.findByIdAndDelete = jest.fn().mockResolvedValue(mockDeletedGenre);
        const response = await request(app).delete(`/api/genres/${genreId}`)
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Genre deleted successfully' });
    });

    it('should handle "Invalid Genre ID" error', async () => {
        const invalidGenreId = '65908e0fb1822a193b2';
        const response = await request(app)
            .delete(`/api/genres/${invalidGenreId}`)
            .send({ _id: genreId, name: 'Deleted Genre' });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid Genre ID' });
    });

    it('should handle "Genre not found" error', async () => {
        const wrongGenreId = '65908e0fb1822a193b2d874d'
        Genres.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
        const response = await request(app)
            .put(`/api/genres/${wrongGenreId}`)
            .send({ _id: genreId, name: 'Deleted Genre' });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Genre not found' });
    });

    it('should handle internal server error', async () => {
        Genres.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
        const response = await request(app).delete(`/api/genres/${genreId}`)
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});

describe('Genre GET API Endpoints', () => {

    it('handlers missing request body', async () => {
        const response = await request(app).post('/api/genres').send({});
        expect(response.status).toBe(400);
    });

    it('handlers invalid data format', async () => {
        const invalidData = {
            name: 121
        }
        const response = await request(app).post('/api/genres').send(invalidData);
        expect(response.status).toBe(400);
    })
})
