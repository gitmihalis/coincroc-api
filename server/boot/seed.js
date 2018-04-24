'use strict';
module.exports = function(app) {

  app.models.Admin.findOrCreate(
    {where: {username: 'admin'}},
    {
      username: 'admin',
      email: 'mihaliswastaken@protonmail.com',
      password: process.env.ADMIN_PASS,
    },
    function(err, instance, created) {
      if (err) console.log('Error seeding!');
      console.log('Seed created? ', !!created);
    });
};
