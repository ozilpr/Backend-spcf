import { conn } from '../config/Database.js'

//Read
export const getRls = async (req, res) => {
  const querySTR =
    'select r.id, r.kode_rules, g.nama_gejala, p.nama_penyakit, r.mb, r.md from tbl_rules r inner join tbl_gejala g on r.gejala_id = g.id inner join tbl_penyakit p on r.penyakit_id = p.id where r.deleted_at is null order by r.penyakit_id, r.gejala_id'
  conn.query(querySTR, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(404).json({ msg: 'Rules tidak ditemukan' })
    }
  })
}

//Read by Id
export const getRlsById = async (req, res) => {
  const param = req.query
  const id = param.id

  const querySTR =
    'select r.id, r.kode_rules, r.penyakit_id, r.gejala_id, p.kode_penyakit, p.nama_penyakit, g.kode_gejala, g.nama_gejala, r.mb, r.md from tbl_rules r inner join tbl_gejala g on r.gejala_id = g.id inner join tbl_penyakit p on r.penyakit_id = p.id where r.id = ? and r.deleted_at is null'
  const values = [id]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(404).json({ msg: 'Rules tidak ditemukan' })
    }
  })
}

//Read by Data
export const getRlsByData = async (req, res) => {
  const param = req.query
  const hpt = param.penyakit_id
  const evd = param.gejala_id

  const querySTR =
    'select penyakit_id, gejala_id from tbl_rules where penyakit_id = ? and gejala_id = ? and deleted_at is null'
  const values = [hpt, evd]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(404).json({ msg: 'Rules tidak ditemukan' })
    }
  })
}

//Create
export const addRls = async (req, res) => {
  const param = req.body
  const kode_rules = param.kode_rules
  const penyakit_id = param.penyakit_id
  const gejala_id = param.gejala_id
  const mb = param.mb
  const md = param.md

  const querySTR =
    'insert into tbl_rules (kode_rules, penyakit_id, gejala_id, mb, md) values (?, ?, ?, ?, ?)'
  const values = [kode_rules, penyakit_id, gejala_id, mb, md]

  conn.query(querySTR, values, (err, results) => {
    if (results.length > 0) {
      res.send(results)
    } else {
      res.status(400).json({ msg: 'Tidak dapat menambah Rules' })
    }
  })
}

//Edit
export const editRls = async (req, res) => {
  const id = req.query.id
  const param = req.body
  const penyakit_id = param.penyakit_id
  const gejala_id = param.gejala_id
  const mb = param.mb
  const md = param.md

  const querySTR =
    'update tbl_rules set penyakit_id = ?, gejala_id = ?, mb = ?, md = ?  where id = ? and deleted_at is null'
  const values = [penyakit_id, gejala_id, mb, md, id]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(400).json({ msg: 'Tidak dapat memperbarui Rules' })
    }
  })
}

//Delete
export const deleteRls = async (req, res) => {
  const id = req.query.id
  const now = new Date()

  const querySTR = 'update tbl_rules set deleted_at = ? where id = ?'
  const values = [now, id]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(400).json({ msg: 'Gagal menghapus Rules' })
    }
  })
}
