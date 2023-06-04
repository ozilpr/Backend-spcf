import { conn } from '../config/Database.js'
import axios from 'axios'

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Mohon login ke akun anda' })
  }

  const getUser = await axios.get(
    `http://localhost:5000/get-userbyuuid?uuid=${req.session.userId}`
  )

  const user = getUser.data[0]

  if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' })
  req.userId = user.id
  req.role = user.role
  next()
}

export const adminOnly = async (req, res, next) => {
  const getUser = await axios.get(
    `http://localhost:5000/get-userbyuuid?uuid=${req.session.userId}`
  )

  const user = getUser.data[0]

  if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' })
  if (user.role !== 'admin')
    return res.status(403).json({ msg: 'Akses terlarang' })
  next()
}
