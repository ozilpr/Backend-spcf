import { Sequelize } from 'sequelize'

const db = new Sequelize('spcf_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})
// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'db_spcf',
//   charset: 'utf8mb4',
//   timezone: '+07:00',
// })

// conn.getConnection((err) => {
//   if (err) throw err
//   console.log('db connected')
// })

export default db
