import Sequelize from 'sequelize';

const {DBNAME, DBUSER, DBPASS, DBTYPE} = process.env;

const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
  dialect: DBTYPE
});

//const transaction = sequelize.transaction();

const Op = Sequelize.Op;

//sequelize.sync({ force: true});

export { Sequelize, sequelize, Op};
