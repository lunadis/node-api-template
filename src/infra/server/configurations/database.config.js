const databaseParameters = require('../parameters/database.parameters');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = function initDatabase() {
  const database = { models: {} };

  const sequelize = new Sequelize(
    databaseParameters.database,
    databaseParameters.username,
    databaseParameters.password,
    {
      host: databaseParameters.host,
      dialect: databaseParameters.dialect,
      port: databaseParameters.port,

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      timezone: '-03:00',
    }
  );

  const modelsRelativePath = 'src/infra/database/models/';
  const modelRelations = {};

  fs.readdirSync(modelsRelativePath).forEach(function (filename) {
    const modelPath = path.join(modelsRelativePath, filename);
    const model = require(modelPath)(sequelize, Sequelize.DataTypes);
    database.models[model.modelName] = model.defineModel();
    modelRelations[model.modelName] = model;
  });

  Object.entries(modelRelations).forEach(([modelName, model]) => {
    if (typeof model.attachRelations === 'function') {
      model.attachRelations(database.models);
    }
  });

  database.models.sequelize = Sequelize;

  sequelize.sync({ force: false });

  return new Promise(function (resolve, reject) {
    sequelize
      .authenticate()
      .then(() => {
        console.log('Database connection has been established successfully.');
        database.sequelize = sequelize;
        resolve(database);
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
        reject('Unable to connect to the database');
      });
  });
};
