'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'postgres://postgres:postgresAngelus@localhost:5432/conge', //'postgres://postgres:postgres9AdagP@167.114.250.127:5432/artwork-dev'
    options: {
      logging: false,
      //storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: true

};
