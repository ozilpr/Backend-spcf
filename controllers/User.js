import { conn } from '../config/Database.js'
import argon2 from 'argon2'
import axios from 'axios'
import { v4 } from 'uuid'

// Read
export const getUser = async (req, res) => {
  const querySTR =
    'select id, uuid, kode_pendaftaran, nama_user, password, no_hp, role from tbl_user where not (id=1 or kode_pendaftaran is null or nama_user is null or no_hp is null or deleted_at is not null)'

  conn.query(querySTR, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(404).json({ msg: 'User tidak ditemukan' })
    }
  })
}

// Read by id
export const getUserById = async (req, res) => {
  const { id } = req.query

  const querySTR =
    'select id, uuid, kode_pendaftaran, nama_user, no_hp, role from tbl_user where not (kode_pendaftaran is null or nama_user is null or deleted_at is not null) and id = ?'
  const values = [id]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(404).json({ msg: 'User tidak ditemukan' })
    }
  })
}

// Read by kode_reg
export const getUserByKodeReg = async (req, res) => {
  const { kode_reg } = req.query

  const querySTR =
    'select uuid, kode_pendaftaran, nama_user, password, no_hp, role from tbl_user where not (uuid is null or kode_pendaftaran is null or nama_user is null or deleted_at is not null) and kode_pendaftaran = ?'
  const values = [kode_reg]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(404).json({ msg: 'User tidak ditemukan' })
    }
  })
}

// Read by uuid
export const getUserByUuid = async (req, res) => {
  const { uuid } = req.query

  const querySTR =
    'select uuid, kode_pendaftaran, nama_user, role from tbl_user where not (uuid is null or kode_pendaftaran is null or nama_user is null or deleted_at is not null) and uuid = ?'
  const values = [uuid]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(404).json({ msg: 'User tidak ditemukan' })
    }
  })
}

// Create
export const addUser = async (req, res) => {
  const { kode_reg, name, password, confPassword, phone, role } = req.body
  const uuid = v4()

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: 'Password dan Konfirmasi Password tidak cocok!' })
  const hashPassword = await argon2.hash(password)

  const querySTR =
    'insert into tbl_user (uuid, kode_pendaftaran, nama_user, password, no_hp, role) values (?, ?, ?, ?, ?, ?)'
  const values = [uuid, kode_reg, name, hashPassword, phone, role]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(201).json(results)
    } else {
      res.status(400).json({ msg: 'Tidak dapat menambah user' })
    }
  })
}

// Update
export const editUser = async (req, res) => {
  const { kode_reg, name, password, confPassword, phone, role } = req.body
  const { id } = req.query
  let hashPassword

  const getUser = await axios.get(`http://localhost:5000/get-userbyid?id=${id}`)

  if (!getUser.data[0])
    return res.status(404).json({ msg: 'User tidak ditemukan' })
  if (password === '' || password === null) {
    hashPassword = getUser.data[0].password
  } else {
    hashPassword = await argon2.hash(password)
  }

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: 'Password dan Konfirmasi Password tidak cocok!' })

  const querySTR =
    'update tbl_user set kode_pendaftaran = ?, nama_user = ?, password = ?, no_hp = ?, role =? where id = ?'
  const values = [kode_reg, name, hashPassword, phone, role, id]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      //   res.err(err.sqlMessage, res)
      res.status(200).json(results)
    } else {
      res.status(404).json({ msg: 'Tidak dapat memperbarui user' })
    }
  })
}

// Delete
export const deleteUser = async (req, res) => {
  const id = req.query.id
  const now = new Date()

  if (id === 1)
    return res.status(400).json({ msg: 'Tidak dapat menghapus Administrator' })

  const querySTR = 'update tbl_user set deleted_at = ? where id = ?'
  const values = [now, id]

  conn.query(querySTR, values, (err, results) => {
    if (!err) {
      res.status(200).json(results)
    } else {
      res.status(400).json({ msg: 'Gagal menghapus user' })
    }
  })
}
