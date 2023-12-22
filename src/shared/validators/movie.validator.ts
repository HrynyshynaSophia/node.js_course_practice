import { NextFunction } from 'express';
import { body, validationResult } from 'express-validator'
import { Request, Response } from 'express';

// Validation for creating a new movie
const createMovieValidation = [
    body('title').isString().notEmpty(),
    body('description').isString().notEmpty(),
    body('releaseDate').isISO8601(),
    body('genre').isArray().notEmpty(),
];

// Validation for updating an existing movie
const updateMovieValidation = [
    body('title').isString().optional(),
    body('description').isString().optional(),
    body('releaseDate').isISO8601().optional(),
    body('genre').isArray().optional(),
];

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
export { createMovieValidation, updateMovieValidation, validate }