import Hipotesa from '../models/HipotesaModel.js'
import { Op } from 'sequelize'

//Read
export const getHpt = async (req, res) => {
  try {
    const hpt = await Hipotesa.findAll({
      attributes: [
        'penyakit_id',
        'kode_penyakit',
        'nama_penyakit',
        'detail_penyakit',
        'sm_penyakit',
      ],
      where: {
        deleted_at: {
          [Op.is]: null,
        },
      },
    })
    res.status(200).json(hpt)
  } catch (error) {
    res.status(404).json({ msg: error.message })
  }
}

//Read
export const getAllHpt = async (req, res) => {
  try {
    const hpt = await Hipotesa.findAll({
      attributes: ['penyakit_id'],
      // where: {
      //   deleted_at: {
      //     [Op.is]: null,
      //   },
      // },
    })
    res.status(200).json(hpt)
  } catch (error) {
    res.status(404).json({ msg: error.message })
  }
}

//Read by Id
export const getHptById = async (req, res) => {
  const { id } = req.query

  try {
    const hpt = await Hipotesa.findOne({
      attributes: [
        'penyakit_id',
        'kode_penyakit',
        'nama_penyakit',
        'detail_penyakit',
        'sm_penyakit',
      ],
      where: {
        penyakit_id: id,
        deleted_at: {
          [Op.is]: null,
        },
      },
    })
    res.status(200).json(hpt)
  } catch (error) {
    res.status(404).json({ msg: error.message })
  }
}

//Create
export const addHpt = async (req, res) => {
  const { kode_penyakit, nama_penyakit, detail_penyakit, sm_penyakit } =
    req.body

  try {
    const hpt = await Hipotesa.create({
      kode_penyakit: kode_penyakit,
      nama_penyakit: nama_penyakit,
      detail_penyakit: detail_penyakit,
      sm_penyakit: sm_penyakit,
    })
    res.status(201).json(hpt)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

//Edit
export const editHpt = async (req, res) => {
  const { id } = req.query

  const check = await Hipotesa.findOne({
    where: {
      penyakit_id: id,
      deleted_at: {
        [Op.is]: null,
      },
    },
  })
  if (!check) return res.status(404).json({ msg: 'Penyakit tidak ditemukan' })

  const { kode_penyakit, nama_penyakit, detail_penyakit, sm_penyakit } =
    req.body
  try {
    await Hipotesa.update(
      {
        kode_penyakit: kode_penyakit,
        nama_penyakit: nama_penyakit,
        detail_penyakit: detail_penyakit,
        sm_penyakit: sm_penyakit,
      },
      {
        where: {
          penyakit_id: id,
          deleted_at: {
            [Op.is]: null,
          },
        },
      }
    )
    res.status(200).json({ msg: 'Penyakit berhasi diperbarui' })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

//Delete
export const deleteHpt = async (req, res) => {
  const { id } = req.query
  const now = new Date()

  try {
    await Hipotesa.update(
      {
        deleted_at: now,
      },
      {
        where: {
          penyakit_id: id,
        },
      }
    )
    res.status(200).json({ msg: 'Berhasil menghapus penyakit' })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}
