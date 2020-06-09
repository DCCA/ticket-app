import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  // Validating the inputs from the user
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 chars'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    // validation
    const errors = validationResult(req);
    // Handle the errors
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    // Create a new user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('E-mail in use');
    }

    const user = User.build({ email, password });
    console.log(user);

    await user.save();

    return res.status(201).send({ message: 'here', user });
  }
);

export { router as signupRouter };
