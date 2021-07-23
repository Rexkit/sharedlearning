const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('media', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: "media_id_unique"
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    page_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'pages',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'media',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "media_id_unique",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "media_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
