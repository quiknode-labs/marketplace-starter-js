// Import the built-in data types
const { DataTypes } = require("sequelize");

const getAccountModel = (sequelize, { DataTypes }) => {
  const Account = sequelize.define('account', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    quicknode_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    plan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    is_test: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Account.associate = (models) => {
    Account.hasMany(models.Endpoint, {
      foreignKey: {
        name: 'account_id',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };

  Account.findByQuicknodeId = async (quicknodeId) => {
    let account = await Account.findOne({
      where: { quicknodeId: quicknodeId },
    });

    return account;
  };

  return Account;
};

export default getAccountModel;