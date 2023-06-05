import { Sequelize } from 'sequelize'
import db from '../config/Database.js'
import Evidences from './EvidenceModel.js'
import Hipotesa from './HipotesaModel.js'

const { DataTypes } = Sequelize

const Rules = db.define(
  'tbl_rules',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 5],
      },
    },
    kode_rule: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 5],
      },
    },
    penyakit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 5],
      },
    },
    gejala_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 5],
      },
    },
    mb: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    md: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  },
  {
    freezeTableName: true,
  }
)
Evidences.hasMany(Rules, { foreignKey: 'gejala_id' })
Hipotesa.hasMany(Rules, { foreignKey: 'penyakit_id' })
Rules.belongsTo(Hipotesa, { foreignKey: 'penyakit_id' })
Rules.belongsTo(Evidences, {
  foreignKey: 'gejala_id',
})

export default Rules
