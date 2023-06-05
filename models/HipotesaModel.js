import { Sequelize } from 'sequelize'
// import Rules from './RulesModel.js'
import db from '../config/Database.js'

const { DataTypes } = Sequelize

const Hipotesa = db.define(
  'tbl_penyakit',
  {
    penyakit_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kode_penyakit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 5],
      },
    },
    nama_penyakit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    detail_penyakit: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
        len: [2, 200],
      },
    },
    sm_penyakit: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
        len: [2, 200],
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

export default Hipotesa
