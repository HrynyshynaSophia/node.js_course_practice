import { NextFunction } from 'express';
import { body, validationResult } from 'express-validator'
import { Request, Response } from 'express';

// Validation for creating and updating genre
const genreValidation = [
    body('name').isString().notEmpty(),
];

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
export { genreValidation, validate }