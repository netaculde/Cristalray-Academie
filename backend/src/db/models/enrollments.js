const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const enrollments = sequelize.define(
    'enrollments',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      enrolled_at: {
        type: DataTypes.DATE,
      },

      payment_status: {
        type: DataTypes.ENUM,

        values: ['paid', 'pending', 'cancelled'],
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

  enrollments.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.enrollments.belongsTo(db.users, {
      as: 'student',
      foreignKey: {
        name: 'studentId',
      },
      constraints: false,
    });

    db.enrollments.belongsTo(db.courses, {
      as: 'course',
      foreignKey: {
        name: 'courseId',
      },
      constraints: false,
    });

    db.enrollments.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.enrollments.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return enrollments;
};
