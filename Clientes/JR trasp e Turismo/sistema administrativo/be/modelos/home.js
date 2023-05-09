const db = require('./db')

const { DataTypes } = require('sequelize');


// CRIAÇÃO DE TABELA

const Home = db.sequelize.define('textosite', {
  text_one: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text_two: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text_three: {
    type: DataTypes.STRING,
    allowNull: false
  },
  btn_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  btn_link: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

(async () => {
  await Home.sync( {alter: true});
  console.log("Tabela criada com sucesso!");
})();

    module.exports = Home