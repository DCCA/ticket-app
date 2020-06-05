import express from "express";
import "express-async-errors";
import { json } from "body-parser";

// Import Routes
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
// Import errors
import { NotFoundError } from "./errors/not-found-error";

// Start app
const app = express();
app.use(json());

// Register routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.get("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

// Start server
app.listen(3000, () => {
  console.log("Auth listening on port 3000!!");
});
