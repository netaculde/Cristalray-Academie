const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const live_sessions = sequelize.define(
    'live_sessions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      scheduled_time: {
        type: DataTypes.DATE,
      },

      platform: {
        type: DataTypes.TEXT,
      },

      link: {
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

  live_sessions.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.live_sessions.belongsTo(db.courses, {
      as: 'course',
      foreignKey: {
        name: 'courseId',
      },
      constraints: false,
    });

    db.live_sessions.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.live_sessions.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return live_sessions;
};
