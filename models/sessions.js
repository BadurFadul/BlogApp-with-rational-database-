const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Sessions extends Model {}

Sessions.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false,
    },
    valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    underscored:true,
    timestamps: false,
    modelName: 'sessions'
  })

  module.exports = Sessions