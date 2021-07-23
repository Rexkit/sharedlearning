const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('knex_migrations_lock', {
    index: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    is_locked: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'knex_migrations_lock',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "knex_migrations_lock_pkey",
        unique: true,
        fields: [
          { name: "index" },
        ]
      },
    ]
  });
};
