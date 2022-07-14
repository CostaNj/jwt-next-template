import { DataTypes } from 'sequelize'

import { sequelize } from '../database'

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING
  },
  active: {
    type: DataTypes.STRING
  },
  link: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
})