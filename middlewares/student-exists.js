import { connect } from '../lib/db-connect.js';

export default async function studentExists(req, res, next) {
    const id = parseInt(req.params.id);
    console.log('Checking if student exists with id:', id);
    let connection;
    try {
      connection = await connect();
      const query = 'select count(id) as count from students where id = ?';
      const result = await connection.query(query, [id]);
      if(parseInt(result[0].count) > 0) {
        next(); // pass the request to the next middleware / route handler
      } else {
        res.status(404).send('Student not found');
      }
    } finally {
      if (connection) {
        connection.release();
      }
    }
}