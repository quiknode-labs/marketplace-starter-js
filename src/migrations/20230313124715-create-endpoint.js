'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('endpoints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quicknode_id: {
        type: Sequelize.STRING
      },
      account_id: {
        type: Sequelize.INTEGER,
        index: true,
      },
      chain: {
        type: Sequelize.STRING
      },
      network: {
        type: Sequelize.STRING
      },
      wss_url: {
        type: Sequelize.STRING,
      },
      http_url: {
        type: Sequelize.STRING,
      },
      is_test: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("endpoints");
  }
};