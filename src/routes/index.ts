import { healthCheckRoute } from "./health-check/health-check.route";
import { movieRoute } from "./movie/movie.route";
import { Router } from "express";

const router = Router();

router.use("", healthCheckRoute);
router.use("/movies", movieRoute);

export default router;
