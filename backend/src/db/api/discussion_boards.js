const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Discussion_boardsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const discussion_boards = await db.discussion_boards.create(
      {
        id: data.id || undefined,

        topic: data.topic || null,
        description: data.description || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await discussion_boards.setCourse(data.course || null, {
      transaction,
    });

    return discussion_boards;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const discussion_boardsData = data.map((item, index) => ({
      id: item.id || undefined,

      topic: item.topic || null,
      description: item.description || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const discussion_boards = await db.discussion_boards.bulkCreate(
      discussion_boardsData,
      { transaction },
    );

    // For each item created, replace relation files

    return discussion_boards;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const discussion_boards = await db.discussion_boards.findByPk(
      id,
      {},
      { transaction },
    );

    await discussion_boards.update(
      {
        topic: data.topic || null,
        description: data.description || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await discussion_boards.setCourse(data.course || null, {
      transaction,
    });

    return discussion_boards;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const discussion_boards = await db.discussion_boards.findByPk(id, options);

    await discussion_boards.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await discussion_boards.destroy({
      transaction,
    });

    return discussion_boards;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const discussion_boards = await db.discussion_boards.findOne(
      { where },
      { transaction },
    );

    if (!discussion_boards) {
      return discussion_boards;
    }

    const output = discussion_boards.get({ plain: true });

    output.course = await discussion_boards.getCourse({
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

      if (filter.topic) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('discussion_boards', 'topic', filter.topic),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'discussion_boards',
            'description',
            filter.description,
          ),
        };
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
          count: await db.discussion_boards.count({
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
      : await db.discussion_boards.findAndCountAll({
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
          Utils.ilike('discussion_boards', 'topic', query),
        ],
      };
    }

    const records = await db.discussion_boards.findAll({
      attributes: ['id', 'topic'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['topic', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.topic,
    }));
  }
};
