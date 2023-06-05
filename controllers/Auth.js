// import { conn } from '../config/Database.js'
// import axios from 'axios'
import argon2 from 'argon2'
import { Op } from 'sequelize'
import User from '../models/UserModel.js'

export const Login = async (req, res) => {
  const user = await User.findOne({
    attributes: ['uuid', 'kode_pendaftaran', 'nama_user', 'password', 'role'],
    where: {
      kode_pendaftaran: req.body.kode_pendaftaran,
    },
  })
  if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' })

  const match = await argon2.verify(user.password, req.body.password)
  if (!match) return res.status(400).json({ msg: 'Password salah' })

  req.session.userId = user.uuid
  const kode = user.kode_pendaftaran
  const name = user.nama_user
  const role = user.role
  res.status(200).json({ kode_pendaftaran: kode, nama_user: name, role: role })
}

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Mohon login ke akun Anda' })
  }

  const user = await User.findOne({
    attributes: ['uuid', 'kode_pendaftaran', 'nama_user', 'role'],
    where: {
      uuid: req.session.userId,
    },
  })
  if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' })
  res.status(200).json(user)
}

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: 'Tidak dapat logout' })
    res.status(200).json({ msg: 'Anda berhasil logout' })
  })
}
