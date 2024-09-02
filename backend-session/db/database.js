import {createPool} from 'mysql2/promise';
2
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'db_system',
});

pool.getConnection(function (err, connection) {
    if (err instanceof Error) {
    console.log(err);
    return;
}

  // ... some query

connection.release();
});