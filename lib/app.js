import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controllers/auth.js';
import postsController from './controllers/posts.js';
import cookieParser from 'cookie-parser';
import commentsController from './controllers/comments.js';

const app = express();

app.use(express.json());


app.use(cookieParser());
app.use(authController);
app.use(postsController);
app.use(commentsController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
