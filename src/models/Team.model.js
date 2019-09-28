const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const formatQuery = require('../helpers/formatQuery');

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      minlength: 2,
      maxlength: 120,
      required: true,
      index: true,
    },
    coach: {
      type: String,
      index: true,
      trim: true,
      maxlength: 120,
      required: true,
    },
    stadium: {
      type: String,
      index: true,
      trim: true,
      maxlength: 150,
      required: true,
    },
    address: {
      type: String,
      index: true,
      trim: true,
      maxlength: 150,
      default: '',
    },
    stadiumCapacity: {
      type: String,
      trim: true,
    },
    founded: {
      type: String,
      trim: true,
      maxlength: 150,
      default: '',
    },
    city: {
      type: String,
      trim: true,
      maxlength: 150,
      default: '',
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

TeamSchema.methods = {
  /**
   *update record base on params passed
   *
   * @param {object} obj
   * @returns {object}
   */
  async update(obj) {
    for (key in obj) {
      this[key] = obj[key];
    }

    await this.save();
    return this;
  },
};

/**
 * Statics methods
 */
TeamSchema.statics = {
  /**
   *Result is return base on id
   *
   * @param {string} id
   * @returns {object}
   */
  async get(id) {
    try {
      return await this.findById(id).exec();
    } catch (error) {
      throw new APIError({
        message: error.message,
        status: httpStatus.BAD_REQUEST,
      });
    }
  },

  /**
   *Get result base on option of get
   *
   * @param {string} option
   * @returns {object}
   */
  async getBy(option) {
    try {
      const res = await this.find(option).exec();
      return res;
    } catch (error) {
      throw new APIError({
        message: error.message,
        status: httpStatus.BAD_REQUEST,
      });
    }
  },

  /**
   * return object base on search result
   * @param {string} query
   * @returns {object}
   */
  async search(query) {
    try {
      let teams = [];
      let searchRegex = [
        { name: { $regex: formatQuery(query), $option: 'i' } },
        { coach: { $regex: formatQuery(query), $option: 'i' } },
        { stadium: { $regex: formatQuery(query), $optioin: 'i' } },
      ];

      if (query) {
        teams = await this.find({
          $or: searchRegex,
        });
      }

      return teams;
    } catch (error) {
      throw new APIError(error);
    }
  },
};

module.exports = mongoose.model('team', TeamSchema);
