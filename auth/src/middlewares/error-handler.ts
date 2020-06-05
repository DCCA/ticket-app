import { Request, Response, NextFunction } from "express";
// import { DatabaseConnectionError } from "../errors/database-connection-error";
// import { RequestValidationError } from "../errors/request-validation-error";
// Using an abstract class to define an common error format
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(400).send({ errors: err.serializeErrors() });
  }
  // if (err instanceof DatabaseConnectionError) {
  //   return res.status(500).send({ errors: err.serializeErrors() });
  // }
  res.status(400).send({
    errrors: [{ message: err.message }],
  });
};
