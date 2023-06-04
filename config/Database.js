import mysql from 'mysql'

const conn = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_spcf',
  charset: 'utf8mb4',
  timezone: '+07:00',
})

conn.getConnection((err) => {
  if (err) throw err
  console.log('db connected')
})

export { conn }
