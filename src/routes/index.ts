import express from "express";

import * as SearchController from "../controllers/search-controller";

const router = express.Router();

router.route("/search")
  .get(SearchController.search)
  .post(SearchController.search);

export default router;
