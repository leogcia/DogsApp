const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('temperament', {
    // id: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     unique: true,
    //     primaryKey: true,
    //     defaultValue: DataTypes.UUIDV4
    // },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    });
};