const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const discussion_boards = sequelize.define(
    'discussion_boards',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      topic: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  discussion_boards.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.discussion_boards.belongsTo(db.courses, {
      as: 'course',
      foreignKey: {
        name: 'courseId',
      },
      constraints: false,
    });

    db.discussion_boards.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.discussion_boards.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return discussion_boards;
};
