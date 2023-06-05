import Rule from '../models/RulesModel.js'
import Evidences from '../models/EvidenceModel.js'
import Hipotesa from '../models/HipotesaModel.js'
import { Op } from 'sequelize'
import Rules from '../models/RulesModel.js'

//Read
export const getRls = async (req, res) => {
  try {
    const rules = await Rule.findAll({
      attributes: ['id', 'kode_rule', 'mb', 'md'],
      where: {
        deleted_at: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: Evidences,
          attributes: ['nama_gejala'],
        },
        {
          model: Hipotesa,
          attributes: ['nama_penyakit'],
        },
      ],
      order: [['penyakit_id'], ['gejala_id']],
    })
    res.status(200).json(rules)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

//Read by Id
export const getRlsById = async (req, res) => {
  try {
    const response = await Rules.findOne({
      attributes: ['id', 'kode_rule', 'mb', 'md'],
      where: {
        id: req.query.id,
        deleted_at: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: Evidences,
          attributes: ['nama_gejala'],
        },
        {
          model: Hipotesa,
          attributes: ['nama_penyakit'],
        },
      ],
    })
    res.status(200).json(response)
  } catch (error) {
    return res.status(404).json({ msg: error.message })
  }
}

//Read by Data
export const getRlsByData = async (req, res) => {
  const { penyakit_id, gejala_id } = req.query
  try {
    const rules = await Rules.findOne({
      attributes: ['penyakit_id', 'gejala_id'],
      where: {
        penyakit_id: penyakit_id,
        gejala_id: gejala_id,
        deleted_at: {
          [Op.is]: null,
        },
      },
    })
    res.status(200).json(rules)
  } catch (error) {
    res.status(404).json({ msg: error.message })
  }
}

//Create
export const addRls = async (req, res) => {
  const { kode_rule, penyakit_id, gejala_id, mb, md } = req.body

  try {
    const rules = await Rules.create({
      kode_rule: kode_rule,
      penyakit_id: penyakit_id,
      gejala_id: gejala_id,
      mb: mb,
      md: md,
    })
    res.status(200).json(rules)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

//Edit
export const editRls = async (req, res) => {
  const { id } = req.query
  const rules = await Rules.findOne({
    where: {
      id: id,
      deleted_at: {
        [Op.is]: null,
      },
    },
  })

  if (!rules) return res.status(404).json({ msg: 'Rule tidak ditemukan' })

  const { kode_rule, penyakit_id, gejala_id, mb, md } = req.body
  try {
    await Rules.update(
      {
        kode_rule: kode_rule,
        penyakit_id: penyakit_id,
        gejala_id: gejala_id,
        mb: mb,
        md: md,
      },
      {
        where: {
          id: rules.id,
          deleted_at: {
            [Op.is]: null,
          },
        },
      }
    )
    res.status(200).json({ msg: 'Berhasil memperbarui rule' })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

//Delete
export const deleteRls = async (req, res) => {
  const now = new Date()

  try {
    await Rules.update(
      {
        deleted_at: now,
      },
      {
        where: {
          id: req.query.id,
        },
      }
    )
    res.status(200).json({ msg: 'Berhasil menghapus rule' })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}
