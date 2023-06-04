import { conn } from '../config/Database.js'

//Read
export const getEvd = async (req, res) => {
  const querySTR =
    'select id, kode_gejala, nama_gejala from tbl_gejala where deleted_at is null'
  conn.query(querySTR, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(404).json({ msg: 'Gejala tidak ditemukan' })
    }
  })
}

//Read by Id
export const getEvdById = async (req, res) => {
  const param = req.query
  const id = param.id

  const querySTR =
    'select id, kode_gejala, nama_gejala from tbl_gejala where not (kode_gejala is null or nama_gejala is null or deleted_at is not null) and id = ?'
  const values = [id]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(404).json({ msg: 'Gejala tidak ditemukan' })
    }
  })
}

//Create
export const addEvd = async (req, res) => {
  const param = req.body
  const kode = param.kode_gejala
  const nama = param.nama_gejala

  const querySTR =
    'insert into tbl_gejala (kode_gejala, nama_gejala) values (?, ?)'
  const values = [kode, nama]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.send(results)
    } else {
      res.status(400).json({ msg: 'Tidak dapat menambah gejala' })
    }
  })
}

//Edit
export const editEvd = async (req, res) => {
  const id = req.query.id
  const param = req.body
  const kode = param.kode_gejala
  const gejala = param.nama_gejala

  const querySTR =
    'update tbl_gejala set kode_gejala = ?, nama_gejala = ?  where id = ? and deleted_at is null'
  const values = [kode, gejala, id]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(400).json({ msg: 'Tidak dapat memperbarui gejala' })
    }
  })
}

//Delete
export const deleteEvd = async (req, res) => {
  const id = req.query.id
  const now = new Date()

  const querySTR = 'update tbl_gejala set deleted_at = ? where id = ?'
  const values = [now, id]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(400).json({ msg: 'Tidak dapat menghapus gejala' })
    }
  })
}

//Restore
export const restoreEvd = async (req, res) => {
  const id = req.query.id
  const now = new Date()

  const querySTR = 'update tbl_gejala set deleted_at is null where id = ?'
  const values = [now, id]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(400).json({ msg: 'Tidak dapat mengembalikan gejala' })
    }
  })
}
