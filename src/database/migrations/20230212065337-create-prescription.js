'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Prescription', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      prescription_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'User',
          key: 'user_id',
          as: 'user'
        }
      },
      drug_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dose: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      unit: {
        type: Sequelize.ENUM("mg", "ml", "micrograms"),
        defaultValue: "mg",
        allowNull: false,
      },
      num_of_intake: {
        type: Sequelize.ENUM("1", "2", "3", "4"),
        defaultValue: "1",
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("active", "ended"),
        defaultValue: "active",
        allowNull: false,
      },
      first_timer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      second_timer: {
        type: Sequelize.STRING
      },
      third_timer: {
        type: Sequelize.STRING
      },
      fourth_timer: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Prescription');
  }
};