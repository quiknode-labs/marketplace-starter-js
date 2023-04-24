'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('endpoints', [{
      quicknode_id: '1234567890',
      account_id: 1,
      chain: 'ethereum',
      network: 'mainnet',
      is_test: true,
      wss_url: 'wss://long-late-firefly.quiknode.pro/4bb1e6b2dec8294938b6fdfdb7cf0cf70c4e97a2/',
      http_url: 'https://long-late-firefly.quiknode.pro/4bb1e6b2dec8294938b6fdfdb7cf0cf70c4e97a2/',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('endpoints', null, {});
  }
};
