import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  // Validating the inputs from the user
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 chars"),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    // validation
    const errors = validationResult(req);
    // Handle the errors
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    // Create a new user
    console.log("creating a user...");
    throw new DatabaseConnectionError();

    //
    res.send({});
  }
);

export { router as signupRouter };
