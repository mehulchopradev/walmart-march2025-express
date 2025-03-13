// define all the routes related to students resource in the system
import { Router } from 'express';
import { connect } from '../lib/db-connect.js';
import studentExists from '../middlewares/student-exists.js';

const studentsRouter = Router();

// /students -- baseurl
studentsRouter.post('/', async (req, res) => {
  const newStudentData = req.body;

  let connection;

  try {
    connection = await connect();
    const query = 'insert into students (username, password, gender) values (?, ?, ?)';
    const result = await connection.query(query, [newStudentData.username, newStudentData.password, newStudentData.gender]);
    console.log(result);
  } finally {
    if (connection) {
      connection.release();
    }
  }

  res.status(201).send('Student created');
});

studentsRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  let connection;
  try {
    connection = await connect();
    const query = 'select * from students where id = ?';
    const result = await connection.query(query, [id]);
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send('Student not found');
    }
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// Pre requisite for this route to work:
// 1. The student with the given id should exist
studentsRouter.delete('/:id', [studentExists], async (req, res) => {
  const id = parseInt(req.params.id);

  let connection;
  try {
    connection = await connect();
    const query = 'delete from students where id = ?';
    const result = await connection.query(query, [id]);
    console.log(result);
    res.status(204).send();
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// Pre requisite for this route to work:
// 1. The student with the given id should exist
studentsRouter.put('/:id', [studentExists], (req, res) => {
  // Homework!
  res.send('Student updated');
});

export default studentsRouter