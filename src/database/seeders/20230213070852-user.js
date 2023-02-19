'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs');


const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hashSync(password, salt);
};

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('User', [{
      user_id: 'c2279573-0c07-4809-87ef-644f7c956e14',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: await hashPassword('qwertyuiop'),
      calling_code: '+1',
      phone_number: '1234567890',
      created_at: new Date(),
      updated_at: new Date()
    },
      {
        user_id: '72ebb0f7-e488-435a-a29b-558112361a19',
        first_name: 'Jessica',
        last_name: 'Doe',
        email: 'jessica@example.com',
        password: await hashPassword('qwertyuiop'),
        calling_code: '+1',
        phone_number: '1234567890',
        created_at: new Date(),
        updated_at: new Date()
      }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('User', null, {});
  }
};
