import argon2 from 'argon2'
import User from '../models/UserModel.js'
import { Op } from 'sequelize'

// Read
export const getUser = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: [
        'id',
        'uuid',
        'kode_pendaftaran',
        'nama_user',
        'no_hp',
        'role',
      ],
      where: {
        kode_pendaftaran: { [Op.not]: null },
        role: { [Op.not]: 'admin' },
        deleted_at: {
          [Op.is]: null,
        },
      },
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

// Read
export const getUserByFirstLetter = async (req, res) => {
  const { letter } = req.query
  try {
    const response = await User.findAll({
      attributes: [
        'id',
        'uuid',
        'kode_pendaftaran',
        'nama_user',
        'no_hp',
        'role',
      ],
      where: {
        nama_user: { [Op.startsWith]: letter },
        deleted_at: {
          [Op.is]: null,
        },
      },
    })
    res.status(200).json(response.length + 1)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

// Read by id
export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: [
        'id',
        'uuid',
        'kode_pendaftaran',
        'nama_user',
        'no_hp',
        'role',
      ],
      where: {
        id: req.query.id,
        deleted_at: {
          [Op.is]: null,
        },
      },
    })
    res.status(200).json(response)
  } catch (error) {
    if (!response) return res.status(404).json({ msg: error.message })
  }
}

// Create
export const addUser = async (req, res) => {
  const { kode_pendaftaran, nama_user, password, confPassword, no_hp, role } =
    req.body

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: 'Password dan Konfirmasi Password tidak cocok!' })

  const hashPassword = await argon2.hash(password)

  try {
    await User.create({
      kode_pendaftaran: kode_pendaftaran,
      nama_user: nama_user,
      password: hashPassword,
      no_hp: no_hp,
      role: role,
    })
    res.status(201).json({ msg: 'Register Berhasil' })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

// Update
export const editUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.query.id,
      deleted_at: {
        [Op.is]: null,
      },
    },
  })

  if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' })

  const { kode_pendaftaran, nama_user, password, confPassword, no_hp, role } =
    req.body

  let hashPassword

  if (password === '' || password === null) {
    hashPassword = user.password
  } else {
    hashPassword = await argon2.hash(password)
  }

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: 'Password dan Konfirmasi Password tidak cocok!' })

  try {
    await User.update(
      {
        kode_pendaftaran: kode_pendaftaran,
        nama_user: nama_user,
        password: hashPassword,
        no_hp: no_hp,
        role: role,
      },
      {
        where: {
          id: user.id,
          deleted_at: {
            [Op.is]: null,
          },
        },
      }
    )
    res.status(200).json({ msg: 'Update User Berhasil' })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

// Delete
export const deleteUser = async (req, res) => {
  const id = req.query.id
  const now = new Date()

  const user = await User.findOne({
    attributes: ['id', 'role'],
    where: {
      id: id,
      deleted_at: {
        [Op.is]: null,
      },
    },
  })

  if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' })
  if (user.role === 'admin')
    return res.status(400).json({ msg: 'Tidak dapat menghapus Administrator' })

  try {
    await User.update(
      {
        deleted_at: now,
      },
      {
        where: {
          id: user.id,
        },
      }
    )
    res.status(200).json({ msg: 'Berhasil menghapus user' })
  } catch (error) {
    res.status(400).json({ msg: 'Gagal menghapus user' })
  }
}
