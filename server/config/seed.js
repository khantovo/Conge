/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var User = sqldb.User;


User.sync()
  //.then(() => User.destroy({ where: {} }))
  .then(() => {
    User.findOrCreate({where:{
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com'
    } , attributes:{password: 'admin'}})
  });
