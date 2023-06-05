import {
  // ForeignKeyConstraintError,
  Sequelize,
} from 'sequelize'
import db from '../config/Database.js'
// import Rules from './RulesModel.js'

const { DataTypes } = Sequelize

const Evidences = db.define(
  'tbl_gejala',
  {
    gejala_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kode_gejala: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 5],
      },
    },
    nama_gejala: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 80],
      },
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
)

export default Evidences
