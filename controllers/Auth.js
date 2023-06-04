import { conn } from '../config/Database.js'
import axios from 'axios'
import argon2 from 'argon2'

export const Login = async (req, res) => {
  const { kode_reg, password } = req.body
  const getUser = await axios.get(
    `http://localhost:5000/get-userbykodereg?kode_reg=${kode_reg}`
  )
  const user = getUser.data[0]

  if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' })

  const match = await argon2.verify(user.password, password)
  if (!match) return res.status(400).json({ msg: 'Password salah' })

  req.session.userId = user.uuid
  const kode = user.kode_pendaftaran
  const name = user.nama_user
  const phone = user.no_hp
  const role = user.role

  res.status(200).json({ kode_reg: kode, name: name, phone: phone, role: role })
}

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Mohon login ke akun Anda' })
  }

  const getUser = await axios.get(
    `http://localhost:5000/get-userbyuuid?uuid=${req.session.userId}`
  )

  const user = getUser.data[0]

  if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' })
  res.status(200).json({
    uuid: user.uuid,
    kode_reg: user.kode_pendaftaran,
    name: user.nama_user,
    role: user.role,
  })
}

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: 'Tidak dapat logout' })
    res.status(200).json({ msg: 'Anda berhasil logout' })
  })
}
