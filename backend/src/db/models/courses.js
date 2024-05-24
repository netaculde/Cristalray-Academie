const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const courses = sequelize.define(
    'courses',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      start_date: {
        type: DataTypes.DATE,
      },

      end_date: {
        type: DataTypes.DATE,
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

  courses.associate = (db) => {
    db.courses.belongsToMany(db.users, {
      as: 'instructors',
      foreignKey: {
        name: 'courses_instructorsId',
      },
      constraints: false,
      through: 'coursesInstructorsUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.courses.hasMany(db.discussion_boards, {
      as: 'discussion_boards_course',
      foreignKey: {
        name: 'courseId',
      },
      constraints: false,
    });

    db.courses.hasMany(db.enrollments, {
      as: 'enrollments_course',
      foreignKey: {
        name: 'courseId',
      },
      constraints: false,
    });

    db.courses.hasMany(db.live_sessions, {
      as: 'live_sessions_course',
      foreignKey: {
        name: 'courseId',
      },
      constraints: false,
    });

    //end loop

    db.courses.hasMany(db.file, {
      as: 'resources',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.courses.getTableName(),
        belongsToColumn: 'resources',
      },
    });

    db.courses.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.courses.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return courses;
};
