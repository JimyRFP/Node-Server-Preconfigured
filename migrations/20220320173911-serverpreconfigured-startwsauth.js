'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return await queryInterface.createTable('spc_wsauth', 
     { id: {
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true,
          allowNull:false 
       } ,
       user_id:{
          type:Sequelize.INTEGER,
          references:{model:'spc_users',key:'id'}
       },
       token:{
         type:Sequelize.STRING,
         allowNull:false,
       },
       expiration:{
         type:Sequelize.DATE,
         allowNull:false,
       },
       created_at:{
        type:Sequelize.DATE,
        allowNull:false,
      },
      updated_at:{
        type:Sequelize.DATE,
        allowNull:false,
      },
     }
     
     );
  },

  async down (queryInterface, Sequelize) {
     return await queryInterface.dropTable('spc_wsauth');
  }
};
