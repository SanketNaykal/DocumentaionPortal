    // server.js or api.js
    import express from 'express';
    const app = express();
    const port = 3000; // Or another port

    app.get('/api/hello', (req, res) => {
      res.json({ message: 'Hello from the server!' });
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });