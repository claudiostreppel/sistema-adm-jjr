const db = require('./db')

const { DataTypes } = require('sequelize');


// CRIAÇÃO DE TABELA

const Dependente = db.sequelize.define('Dependente', {
  nom_dep: DataTypes.STRING,
  end_dep: DataTypes.STRING,
  dtn_dep: DataTypes.DATEONLY,
  tel_dep: DataTypes.STRING,
  sex_dep:DataTypes.STRING,
  par_dep: DataTypes.STRING,
  loc_dep: DataTypes.STRING,
  roteiroId: DataTypes.STRING,
  clienteId: DataTypes.STRING
}, {});
Dependente.associate = function(models) {
  Dependente.belongsTo(models.Cliente, { as: 'cliente', foreignKey: 'clienteId' });
};
(async () => {
  await Dependente.sync( {alter: true});
  console.log("Tabela criada com sucesso!");
})();

module.exports = Dependente