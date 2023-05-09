const db = require('./db')

const { DataTypes } = require('sequelize');


// CRIAÇÃO DE TABELA

const Cliente = db.sequelize.define('clientes', {
    nom_cli: DataTypes.STRING,
    cpf_cli: {type: DataTypes.STRING,
              unique: true},
    end_cli: DataTypes.STRING,
    bai_cli: DataTypes.STRING,
    cid_cli: DataTypes.STRING,
    tel_cli: DataTypes.STRING,
    sta_cli: DataTypes.STRING
  });
  Cliente.associate = function(models) {
    Cliente.hasMany(models.Dependente, { as: 'dependentes', foreignKey: 'clienteId' });
  };
(async () => {
    await Cliente.sync( {alter: true});
    console.log("Tabela criada com sucesso!");
  })();
  
module.exports = Cliente