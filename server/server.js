    // server.js or api.js
    import postRoutes from './routes/posts.js';
    import userRoutes from './routes/users.js';
    import authRoutes from './routes/auths.js';
    import processedDataRoutes from './routes/processedDatas.js';
    import express from 'express';
    import cors from 'cors';
    import cookieParser from 'cookie-parser';

    const app = express();
    const port = 3000; // Or another port
    const corsOptions = {
      origin: 'http://localhost:5173', // Replace with your frontend URL
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(cors(corsOptions));
    app.use(express.json()); // Middleware to parse JSON bodies
    app.use(cookieParser());

    app.use('/api/posts/', postRoutes);
    app.use('/api/users/', userRoutes);
    app.use('/api/auths/', authRoutes);
    app.use('/api/processedDatas/', processedDataRoutes);

    app.get('/api/hello', (req, res) => {
      res.json({ message: 'Hello from the server!' });
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });