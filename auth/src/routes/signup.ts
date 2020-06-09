import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import jwt from 'jsonwebtoken';

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
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // Create a new user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('E-mail in use');
    }

    const user = User.build({ email, password });

    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      // I have a check when the app start
      process.env.JWT_KEY!
    );

    if (req.session !== null) {
      req.session.jwt = userJwt;
    }
    // Store on the session obj

    res.status(201).send(user);
  }
);

export { router as signupRouter };
