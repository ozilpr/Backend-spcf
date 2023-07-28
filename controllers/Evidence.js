import Evidences from '../models/EvidenceModel.js'
import { Op } from 'sequelize'

//Read
export const getEvd = async (req, res) => {
  try {
    const evd = await Evidences.findAll({
      attributes: ['gejala_id', 'kode_gejala', 'nama_gejala'],
      where: {
        deleted_at: {
          [Op.is]: null,
        },
      },
    })
    res.status(200).json(evd)
  } catch (error) {
    res.status(404).json({ msg: error.message })
  }
}

//Read
export const getAllEvd = async (req, res) => {
  try {
    const evd = await Evidences.findAll({
      attributes: ['gejala_id'],
      // where: {
      //   deleted_at: {
      //     [Op.is]: null,
      //   },
      // },
    })
    res.status(200).json(evd)
  } catch (error) {
    res.status(404).json({ msg: error.message })
  }
}

//Read by Id
export const getEvdById = async (req, res) => {
  const { id } = req.query
  try {
    const evd = await Evidences.findOne({
      attributes: ['gejala_id', 'kode_gejala', 'nama_gejala'],
      where: {
        gejala_id: id,
        deleted_at: {
          [Op.is]: null,
        },
      },
    })
    res.status(200).json(evd)
  } catch (error) {
    res.status(404).json({ msg: error.message })
  }
}

//Create
export const addEvd = async (req, res) => {
  const { kode_gejala, nama_gejala } = req.body

  try {
    const evd = await Evidences.create({
      kode_gejala: kode_gejala,
      nama_gejala: nama_gejala,
    })
    res.status(201).json(evd)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

//Edit
export const editEvd = async (req, res) => {
  const { id } = req.query

  const check = await Evidences.findOne({
    where: {
      gejala_id: id,
      deleted_at: {
        [Op.is]: null,
      },
    },
  })
  if (!check) return res.status(404).json({ msg: 'Gejala tidak ditemukan' })

  const { kode_gejala, nama_gejala } = req.body
  try {
    await Evidences.update(
      {
        kode_gejala: kode_gejala,
        nama_gejala: nama_gejala,
      },
      {
        where: {
          gejala_id: id,
          deleted_at: {
            [Op.is]: null,
          },
        },
      }
    )
    res.status(200).json({ msg: 'Gejala berhasi diperbarui' })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

//Delete
export const deleteEvd = async (req, res) => {
  const { id } = req.query
  const now = new Date()

  try {
    await Evidences.update(
      {
        deleted_at: now,
      },
      {
        where: {
          gejala_id: id,
        },
      }
    )
    res.status(200).json({ msg: 'Berhasil menghapus gejala' })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

//Restore
export const restoreEvd = async (req, res) => {
  const { id } = req.query

  try {
    await Evidences.update(
      {
        deleted_at: null,
      },
      {
        where: {
          penyakit_id: id,
        },
      }
    )
    res.status(200).json({ msg: 'Berhasil mengembalikan penyakit' })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}
