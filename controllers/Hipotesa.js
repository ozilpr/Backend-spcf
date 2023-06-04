import { conn } from '../config/Database.js'

//Read
export const getHpt = async (req, res) => {
  const querySTR =
    'select id, kode_penyakit, nama_penyakit, detail_penyakit, sm_penyakit from tbl_penyakit where deleted_at is null'
  conn.query(querySTR, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(404).json({ msg: 'Penyakit tidak ditemukan' })
    }
  })
}

//Read by Id
export const getHptById = async (req, res) => {
  const param = req.query
  const id = param.id

  const querySTR =
    'select id, kode_penyakit, nama_penyakit, detail_penyakit, sm_penyakit from tbl_penyakit where not (kode_penyakit is null or nama_penyakit is null or deleted_at is not null) and id = ?'
  const values = [id]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(404).json({ msg: 'Penyakit tidak ditemukan' })
    }
  })
}

//Create
export const addHpt = async (req, res) => {
  const { kode_penyakit, nama_penyakit, detail_penyakit, sm_penyakit } =
    req.body

  const querySTR =
    'insert into tbl_penyakit (kode_penyakit, nama_penyakit, detail_penyakit, sm_penyakit) values (?, ?, ?, ?)'
  const values = [kode_penyakit, nama_penyakit, detail_penyakit, sm_penyakit]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.send(results)
    } else {
      res.status(400).json({ msg: 'Gagal menambah penyakit' })
    }
  })
}

//Edit
export const editHpt = async (req, res) => {
  const id = req.query.id
  const { kode_penyakit, nama_penyakit, detail_penyakit, sm_penyakit } =
    req.body

  const querySTR =
    'update tbl_penyakit set kode_penyakit = ?, nama_penyakit = ?, detail_penyakit = ?, sm_penyakit = ?  where id = ? and deleted_at is null'
  const values = [
    kode_penyakit,
    nama_penyakit,
    detail_penyakit,
    sm_penyakit,
    id,
  ]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(400).json({ msg: 'Gagal mengubah penyakit' })
    }
  })
}

//Delete
export const deleteHpt = async (req, res) => {
  const id = req.query.id
  const now = new Date()

  const querySTR = 'update tbl_penyakit set deleted_at = ? where id = ?'
  const values = [now, id]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(400).json({ msg: 'Gagal menghapus penyakit' })
    }
  })
}
