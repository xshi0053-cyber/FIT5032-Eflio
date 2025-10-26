// server.js (root)
import express from 'express';
import cors from 'cors';

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// health check
app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
