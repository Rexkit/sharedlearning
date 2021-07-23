var DataTypes = require("sequelize").DataTypes;
var _knex_migrations = require("./knex_migrations");
var _knex_migrations_lock = require("./knex_migrations_lock");
var _media = require("./media");
var _pages = require("./pages");
var _textcontent = require("./textcontent");
var _users = require("./users");

function initModels(sequelize) {
  var knex_migrations = _knex_migrations(sequelize, DataTypes);
  var knex_migrations_lock = _knex_migrations_lock(sequelize, DataTypes);
  var media = _media(sequelize, DataTypes);
  var pages = _pages(sequelize, DataTypes);
  var textcontent = _textcontent(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  media.belongsTo(pages, { as: "page", foreignKey: "page_id"});
  pages.hasMany(media, { as: "media", foreignKey: "page_id"});
  textcontent.belongsTo(pages, { as: "page", foreignKey: "page_id"});
  pages.hasOne(textcontent, { as: "textcontent", foreignKey: "page_id"});
  media.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(media, { as: "media", foreignKey: "user_id"});
  pages.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(pages, { as: "pages", foreignKey: "user_id"});

  return {
    knex_migrations,
    knex_migrations_lock,
    media,
    pages,
    textcontent,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
