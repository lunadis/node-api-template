module.exports = {
  host: process.env.DATABASE_HOST || 'localhost',
  database: process.env.DATABASE_NAME || 'microblog',
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  port: process.env.DATABASE_PORT || 3310,
  seederStorage: 'sequelize',
  logging: console.log,
  dialect: 'mysql',
};
