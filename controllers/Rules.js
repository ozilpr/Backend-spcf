import Rule from '../models/RulesModel.js'
import Evidences from '../models/EvidenceModel.js'
import Hipotesa from '../models/HipotesaModel.js'
import { Op } from 'sequelize'
import Rules from '../models/RulesModel.js'

//Read
export const getRls = async (req, res) => {
  try {
    const rules = await Rules.findAll({
      attributes: ['id', 'kode_rule', 'penyakit_id', 'gejala_id', 'mb', 'md'],
      where: {
        deleted_at: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: Evidences,
          attributes: ['nama_gejala'],
          where: {
            deleted_at: {
              [Op.is]: null,
            },
          },
        },
        {
          model: Hipotesa,
          attributes: ['nama_penyakit'],
          where: {
            deleted_at: {
              [Op.is]: null,
            },
          },
        },
      ],
      order: [['penyakit_id'], ['gejala_id']],
    })
    res.status(200).json(rules)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

//Read
export const getAllRls = async (req, res) => {
  try {
    const rules = await Rules.findAll({
      attributes: ['kode_rule'],
      // where: {
      //   deleted_at: {
      //     [Op.is]: null,
      //   },
      // },
      // include: [
      //   {
      //     model: Evidences,
      //     attributes: ['nama_gejala'],
      //   },
      //   {
      //     model: Hipotesa,
      //     attributes: ['nama_penyakit'],
      //   },
      // ],
      // order: [['penyakit_id'], ['gejala_id']],
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
      attributes: ['id', 'kode_rule', 'penyakit_id', 'gejala_id', 'mb', 'md'],
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
  const { kode_rule, penyakit_id, gejala_id } = req.body

  let { mb, md } = req.body
  if (mb === '') {
    mb = 0
  }
  if (md === '') {
    md = 0
  }

  const check = () => {
    try {
      const get = Rules.findOne({
        where: {
          penyakit_id: penyakit_id,
          gejala_id: gejala_id,
          deleted_at: {
            [Op.is]: null,
          },
        },
      })
      return get
    } catch (error) {
      return 0
    }
  }

  const checked = await check()

  const update = async () => {
    try {
      await Rules.create({
        kode_rule: kode_rule,
        penyakit_id: penyakit_id,
        gejala_id: gejala_id,
        mb: mb,
        md: md,
      })
      return res.status(200).json({ msg: 'Berhasil memperbarui rule' })
    } catch (error) {
      return res.status(400).json({
        msg: 'Rule sudah ada, tidak dapat menambah rule',
        error: error.message,
      })
    }
  }

  if (!checked) {
    return await update()
  } else {
    return res
      .status(400)
      .json({ msg: 'Rule sudah ada, tidak dapat menambah rule' })
  }
}

//Edit
export const editRls = async (req, res) => {
  const { id } = req.query
  const { kode_rule, penyakit_id, gejala_id } = req.body
  let { mb, md } = req.body

  if (mb === '') {
    mb = 0
  }
  if (md === '') {
    md = 0
  }

  const found = async () => {
    try {
      const result = await Rules.findOne({
        attributes: ['penyakit_id', 'gejala_id'],
        where: {
          id: id,
          deleted_at: {
            [Op.is]: null,
          },
        },
      })

      return result
    } catch (error) {
      return 0
    }
  }
  const first = await found()
  if (!first) return res.status(404).json({ msg: 'Rule tidak ditemukan' })

  const checked = async () => {
    try {
      const check = await Rules.findOne({
        attributes: ['penyakit_id', 'gejala_id'],
        where: {
          penyakit_id: penyakit_id,
          gejala_id: gejala_id,
          deleted_at: {
            [Op.is]: null,
          },
        },
      })
      if (!check) {
        return { penyakit_id: penyakit_id, gejala_id: gejala_id }
      }
      return check
    } catch (error) {
      return 0
    }
  }

  const second = await checked()

  async function update() {
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
            id: id,
            deleted_at: {
              [Op.is]: null,
            },
          },
        }
      )
      return res.status(200).json({ msg: 'Berhasil memperbarui rule' })
    } catch (error) {
      return res.status(400).json({ msg: error.message })
    }
  }

  try {
    if (!second) {
      return await update()
    } else if (
      first.gejala_id === second.gejala_id &&
      first.penyakit_id === second.penyakit_id
    ) {
      return await update()
    } else {
      return res
        .status(400)
        .json({ msg: 'Rule sudah ada, Tidak dapat memperbarui rule' })
    }
  } catch (error) {
    return res.status({ msg: error.message })
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
