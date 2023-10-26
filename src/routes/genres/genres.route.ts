/**
 * @swagger
 * /api/genres:
 *   post:
 *     summary: Create a new genre.
 *     description: Create a new genre by providing the necessary data in the request body.
 *     tags:
 *       - Genres
 *     requestBody:
 *       description: Genre data to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: The created genre.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Request body is missing
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Get a list of all genres.
 *     description: Retrieve a list of all genres.
 *     tags:
 *       - Genres
 *     responses:
 *       200:
 *         description: A list of genres.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /api/genres/{id}:
 *   put:
 *     summary: Update a genre by ID.
 *     description: Update a genre's data by providing its ID and the new data in the request body.
 *     tags:
 *       - Genres
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the genre to update.
 *     requestBody:
 *       description: Updated genre data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: The updated genre.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Genre not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /api/genres/{id}:
 *   delete:
 *     summary: Delete a genre by ID.
 *     description: Delete a genre by providing its ID.
 *     tags:
 *       - Genres
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the genre to delete.
 *     responses:
 *       404:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Genre not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Internal Server Error
 */

import express from "express";
import { deleteGenresResponse, getGenresResponse, postGenreResponse, putGenresResponse } from "../../controllers/genres/genres.controller";
import { genreValidation, validate } from "../../shared/validators/genre.validator";
const router = express.Router();

//Create new genre
router.post('/', genreValidation, validate, postGenreResponse)

//Get a list of all genres
router.get('/', getGenresResponse)

//Update an existing genre by id
router.put('/:id', genreValidation, validate, putGenresResponse)

//Delete genre by id
router.delete('/:id', deleteGenresResponse)

export default router;
