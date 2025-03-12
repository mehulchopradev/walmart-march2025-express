import express from 'express';

const PORT = parseInt(process.env.PORT || '3000');

const users = [
  { id: 1, name: 'Mehul' },
  { id: 2, name: 'Rahul' },
  { id: 3, name: 'John' },
]

// create an express Application object
const app = express();

app.get('/me/:name', (req, res) => {
  const name = req.params.name; // accessing the path parameters / dynamic path parameters
  res.send(`Hello ${name}`);
});

app.get('/hello', (req, res) => {
  res.send('Hello World');
});

app.get('/users', (req, res) => {
  res.send(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});