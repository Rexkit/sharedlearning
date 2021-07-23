const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('textcontent', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: "textcontent_id_unique"
    },
    page_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'pages',
        key: 'id'
      },
      unique: "textcontent_page_id_unique"
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true
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
    }
  }, {
    sequelize,
    tableName: 'textcontent',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "textcontent_id_unique",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "textcontent_page_id_unique",
        unique: true,
        fields: [
          { name: "page_id" },
        ]
      },
      {
        name: "textcontent_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
