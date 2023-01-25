const { DataTypes } = require('sequelize');
const { down } = require('./20230124_initaize_blg_and_users');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('blogs', 'year', {
            type: DataTypes.INTEGER,
            defaultValue: new Date().getFullYear(),
            validate: {
                min: 1991,
                max: new Date().getFullYear()
            }
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('blogs', 'year')
    }
}