const { DataTypes, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
   sequelize.define('videogame', {
    id:{type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },

    name: {type: DataTypes.STRING,allowNull: false},
    description:{type:DataTypes.STRING,allowNull:false},
    released:{type:DataTypes.STRING,allowNull:true},
    platforms:{type:DataTypes.ARRAY(DataTypes.STRING),allowNull:true},
    rating:{type:DataTypes.FLOAT,allowNull:true},
    background_image:{type:DataTypes.STRING,allowNull:true},
    createdInDb:{type:DataTypes.BOOLEAN,allownull:false,defaultValue:true}

  });
};
