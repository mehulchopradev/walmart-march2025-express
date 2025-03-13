// all the route definitions for the books resource in the system
import { Router } from 'express';

const books = [
  { id: 1, title: 'The Accursed God', price: 900, },
  { id: 2, title: 'The Rise of Sivagami', price: 800, },
  { id: 3, title: 'The Secret of the Nagas', price: 700, },
  { id: 4, title: 'The Immortals of Meluha', price: 600, },
  { id: 5, title: 'The Oath of the Vayuputras', price: 500, },
];

// /books
const booksRouter = Router();

booksRouter.get('/', (req, res) => {
  res.send(books);
});

booksRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundBook = books.find((book) => book.id === id);
  if (foundBook) {
    res.send(foundBook);
    // by default status code is 200
  } else {
    res.status(404).send({ message: `Book with id ${id} not found` });
  }
});

export default booksRouter;
