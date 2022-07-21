import { DataTypes } from 'sequelize'

import { sequelize } from '../database'

export const Token = sequelize.define(
  'Tokens',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    token: {
      type: DataTypes.STRING
    },
    device: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
)
