import { healthCheckRoute } from "./health-check/health-check.route";
import movieRoute from "./movie/movie.route";
import genreRoute from "./genres/genres.route";

import { Router } from "express";

const router = Router();

router.use("", healthCheckRoute);
router.use("/movies", movieRoute);
router.use("/genres", genreRoute);

export default router;
