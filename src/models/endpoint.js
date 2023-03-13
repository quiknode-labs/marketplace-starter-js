// Import the built-in data types
const { DataTypes } = require("sequelize");

const getEndpointModel = (sequelize, { DataTypes }) => {
  const Endpoint = sequelize.define('endpoint', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      index: true,
      validate: {
        notEmpty: true,
      },
    },
    quicknode_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    chain: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    network: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    wss_url: {
      type: DataTypes.STRING,
    },
    http_url: {
      type: DataTypes.STRING,
    },
    is_test: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Endpoint.associate = (models) => {
    Endpoint.belongsTo(models.Account, {
      foreignKey: {
        name: 'account_id',
        allowNull: false,
      }
    });
  };

  return Endpoint;
};

export default getEndpointModel;