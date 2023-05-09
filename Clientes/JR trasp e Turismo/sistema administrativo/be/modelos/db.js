const Sequelize = require('sequelize');

const sequelize = new Sequelize('teste', 'streppel', 'Crs@270172', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00'
});

sequelize.authenticate()
  .then(function() {
    console.log('Conexão realizada com sucesso.');
  })
  .catch(function(err) {
    console.log('Erro ao realizar a conexão com o BD: ' + err);
  });

  module.exports={
    Sequelize: Sequelize,
    sequelize: sequelize
  }