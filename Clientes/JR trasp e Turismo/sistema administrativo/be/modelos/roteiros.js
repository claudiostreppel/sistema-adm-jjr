const db = require('./db')

const { DataTypes } = require('sequelize');


// CRIAÇÃO DE TABELA

const Roteiro = db.sequelize.define('roteiros', {
    tit_rot: DataTypes.STRING,
    des_rot: DataTypes.STRING,
    cod_tab: DataTypes.STRING,         
    inf_rot: DataTypes.STRING,
  });
  Roteiro.associate = function(models) {
    Roteiro.hasMany(models.Dependente, { as: 'dependentes', foreignKey: 'RoteiroId' });
  };
(async () => {
    await Roteiro.sync( {alter: true});
    console.log("Tabela ROTEIROS criada com sucesso!");
  })();
  
module.exports = Roteiro