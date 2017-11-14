const glob = require('glob');
const path = require('path');
const Sequelize = require('sequelize');

let database = {};
const sequelize = new Sequelize(process.env.DB_NAME, null, null, {
  dialect: process.env.DB_DIALECT,
  storage: path.resolve(__dirname, process.env.DB_STORAGE),
  host: null,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorsAliases: {
    $eq: Sequelize.Op.eq,
    $ne: Sequelize.Op.ne,
    $gte: Sequelize.Op.gte,
    $gt: Sequelize.Op.gt,
    $lte: Sequelize.Op.lte,
    $lt: Sequelize.Op.lt,
    $not: Sequelize.Op.not,
    $in: Sequelize.Op.in,
    $notIn: Sequelize.Op.notIn,
    $is: Sequelize.Op.is,
    $like: Sequelize.Op.like,
    $notLike: Sequelize.Op.notLike,
    $iLike: Sequelize.Op.iLike,
    $notILike: Sequelize.Op.notILike,
    $regexp: Sequelize.Op.regexp,
    $notRegexp: Sequelize.Op.notRegexp,
    $iRegexp: Sequelize.Op.iRegexp,
    $notIRegexp: Sequelize.Op.notIRegexp,
    $between: Sequelize.Op.between,
    $notBetween: Sequelize.Op.notBetween,
    $overlap: Sequelize.Op.overlap,
    $contains: Sequelize.Op.contains,
    $contained: Sequelize.Op.contained,
    $adjacent: Sequelize.Op.adjacent,
    $strictLeft: Sequelize.Op.strictLeft,
    $strictRight: Sequelize.Op.strictRight,
    $noExtendRight: Sequelize.Op.noExtendRight,
    $noExtendLeft: Sequelize.Op.noExtendLeft,
    $and: Sequelize.Op.and,
    $or: Sequelize.Op.or,
    $any: Sequelize.Op.any,
    $all: Sequelize.Op.all,
    $values: Sequelize.Op.values,
    $col: Sequelize.Op.col,
  },
});
glob.sync(path.resolve(__dirname, 'models', '**/*.js')).forEach(file => {
  const model = sequelize.import(path.resolve(file));
  database[model.name] = model;
});
sequelize.sync();
database.sequelize = sequelize;
database.Sequelize = Sequelize;
module.exports = database;
