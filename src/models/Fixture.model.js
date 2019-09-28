const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const formatQuery = require('../helpers/formatQuery');
const { generateLink } = require('../services/crypto.service');

/**
 * Fixture schema
 */
const FixtureSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      require: true,
      index: true,
    },
    time: {
      type: String,
      require: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
      index: true,
    },
    stadium: {
      type: String,
      require: true,
      index: true,
    },
    home: {
      type: String,
      require: true,
      index: true,
    },
    home_team: {
      type: mongoose.Types.ObjectId,
      ref: 'team',
      index: true,
    },
    away: {
      type: String,
      require: true,
      index: true,
    },
    away_team: {
      type: mongoose.Types.ObjectId,
      ref: 'team',
      index: index,
    },
    result: {
      type: String,
      get: function(v) {
        return this.status === 'Pending' ? ' - ' : v;
      },
    },
    link: {
      type: String,
      get: v => generateLink(),
      default: generateLink(),
      immutable: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      immutable: true,
    },
  },
  {
    timestamps: true,
  },
);

FixtureSchema.methods = {
  /**
   *Update record base on the data passed
   *
   * @param {object} obj
   * @returns
   */
  async update(obj) {
    for (key in obj) {
      this[key] = obj[key];
    }

    await this.save();
    return this;
  },
};

FixtureSchema.status = {
  /**
   *Reurn result base on id passed
   *
   * @param {string} id
   * @returns
   */
  async get(id) {
    try {
      return await this.findById(id)
        .populate({ path: 'home_team', select: 'name coach stadium' })
        .populate({ path: 'away_team', select: 'name coach' })
        .exec();
    } catch (error) {
      throw new APIError({
        message: error.message,
        status: httpStatus.BAD_REQUEST,
      });
    }
  },

  /**
   *result return is base onthe options
   *
   * @param {string} option
   * @returns
   */
  async getBy(option) {
    try {
      const res = await this.find(option)
        .populate({ path: 'home_team', select: 'name coach stadium' })
        .populate({ path: 'away_team', select: 'name coach' })
        .exec();
      return res;
    } catch (error) {
      throw new APIError({
        message: error.message,
        status: httpStatus.BAD_REQUEST,
      });
    }
  },

  /**
   *Result base on search value
   *
   * @param {string} query
   * @returns {object} fixture
   */
  async search(query) {
    try {
      let fixtures = [];
      let searchRegex = [
        { time: { $regex: formatQuery(query), $option: 'i' } },
        { status: { $regex: formatQuery(query), $option: 'i' } },
        { stadium: { $regex: formatQuery(query), $option: 'i' } },
        { home: { $regex: formatQuery(query), $option: 'i' } },
        { away: { $regex: formatQuery(query), $option: 'i' } },
      ];

      if (query) {
        fixtures = await this.find({
          $or: searchRegex,
        })
          .populate({ path: 'home_team', select: 'name coach stadium' })
          .populate({ path: 'away_team', select: 'name coach' })
          .exec();
      }

      return fixtures;
    } catch (error) {
      throw new APIError(error);
    }
  },
};

module.exports = mongoose.model('fixture', FixtureSchema);
