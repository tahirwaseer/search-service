import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

import SearchModel from "../models/Search";

export const search = async (req: Request, res: Response, next: NextFunction) => {
  // add some validations on input data
  await check("serviceName", "Service name <serviceName> cannot be blank").isLength({min: 1}).trim().escape().run(req);
  await check("geoLocation", "GeoLocation <geoLocation> cannot be blank").isLength({min: 1}).trim().escape().run(req);

  // if there are any validation errors user should get an error response
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const serviceName: string = req.query.serviceName || req.body.serviceName;
  const geoLocation: string = req.query.geoLocation || req.body.geoLocation;

  try {
    const results = SearchModel.search(serviceName, geoLocation);
    return res.status(200).json(results);
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({ errors: [{ name: "Internal Server Error", msg: "An internal server error has occured! Please contact the support team if error persists." }] });
  }
};
