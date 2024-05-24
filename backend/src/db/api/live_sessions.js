const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Live_sessionsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const live_sessions = await db.live_sessions.create(
      {
        id: data.id || undefined,

        scheduled_time: data.scheduled_time || null,
        platform: data.platform || null,
        link: data.link || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await live_sessions.setCourse(data.course || null, {
      transaction,
    });

    return live_sessions;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const live_sessionsData = data.map((item, index) => ({
      id: item.id || undefined,

      scheduled_time: item.scheduled_time || null,
      platform: item.platform || null,
      link: item.link || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const live_sessions = await db.live_sessions.bulkCreate(live_sessionsData, {
      transaction,
    });

    // For each item created, replace relation files

    return live_sessions;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const live_sessions = await db.live_sessions.findByPk(
      id,
      {},
      { transaction },
    );

    await live_sessions.update(
      {
        scheduled_time: data.scheduled_time || null,
        platform: data.platform || null,
        link: data.link || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await live_sessions.setCourse(data.course || null, {
      transaction,
    });

    return live_sessions;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const live_sessions = await db.live_sessions.findByPk(id, options);

    await live_sessions.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await live_sessions.destroy({
      transaction,
    });

    return live_sessions;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const live_sessions = await db.live_sessions.findOne(
      { where },
      { transaction },
    );

    if (!live_sessions) {
      return live_sessions;
    }

    const output = live_sessions.get({ plain: true });

    output.course = await live_sessions.getCourse({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.courses,
        as: 'course',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.platform) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('live_sessions', 'platform', filter.platform),
        };
      }

      if (filter.link) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('live_sessions', 'link', filter.link),
        };
      }

      if (filter.scheduled_timeRange) {
        const [start, end] = filter.scheduled_timeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            scheduled_time: {
              ...where.scheduled_time,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            scheduled_time: {
              ...where.scheduled_time,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.course) {
        var listItems = filter.course.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          courseId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.live_sessions.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.live_sessions.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('live_sessions', 'course', query),
        ],
      };
    }

    const records = await db.live_sessions.findAll({
      attributes: ['id', 'course'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['course', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.course,
    }));
  }
};
