'use strict';

/** @type {import('sequelize-cli').Migration} */



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
    await queryInterface.bulkInsert('Prescription', [{
      prescription_id: '5bb68f75-9c24-45c6-95dd-b3992e9264ac',
      user_id: 'c2279573-0c07-4809-87ef-644f7c956e14',
      drug_name: 'paracetamol',
      dose: '250',
      unit: 'mg',
      end_date: '2023-06-13',
      status: 'active',
      num_of_intake: "2",
      first_timer: '14:00',
      second_timer: '19:00',
      created_at: new Date(),
      updated_at: new Date()
    },
      {
        prescription_id: '635a2070-de34-4992-97dc-40aae2882e60',
        user_id: 'c2279573-0c07-4809-87ef-644f7c956e14',
        drug_name: 'nivaquine',
        dose: '100',
        unit: 'mg',
        end_date: '2023-06-13',
        status: 'active',
        num_of_intake: "2",
        first_timer: '12:00',
        second_timer: '18:00',
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
    await queryInterface.bulkDelete('Prescription', null, {});
  }
};
