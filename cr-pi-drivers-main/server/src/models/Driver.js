const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue:DataTypes.UUIDV4,
      },
    
    forename: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    surname: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,  
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
  },
  {
    timestamps: false,
  }
  );
}; 

