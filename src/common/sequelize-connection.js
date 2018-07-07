import Sequelize from 'sequelize';

const {DBNAME, DBUSER, DBPASS, DBTYPE} = process.env;

const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
  dialect: DBTYPE
});

sequelize.sync();

export { Sequelize, sequelize};
