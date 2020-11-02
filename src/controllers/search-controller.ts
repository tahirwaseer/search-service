import { Request, Response, NextFunction } from "express"
import { check, validationResult } from "express-validator"

import SearchModel from '../models/Search'

export const search = async (req: Request, res: Response, next: NextFunction) => {
  // add some validations on input data
  await check("service_name", "Service name <service_name> cannot be blank").isLength({min: 1}).trim().escape().run(req)
  await check("geo_location", "GeoLocation <geo_location> cannot be blank").isLength({min: 1}).trim().escape().run(req)

  // if there are any validation errors user should get an error response
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const service_name: string = req.query.service_name || req.body.service_name
  const geo_location: string = req.query.geo_location || req.body.geo_location

  try {
    const results = SearchModel.search(service_name, geo_location)
    return res.status(200).json(results)
  } catch (err) {
    console.log("error", err)
    return res.status(500).json({ errors: [{ name: 'Internal Server Error', msg: "An internal server error has occured! Please contact the support team if error persists." }] });
  }
}
