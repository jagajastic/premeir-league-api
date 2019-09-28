const mongoose = require('mongoose');
const EncodeToken = require('../helpers/TokenEncoder');
const bcryptService = require('../services/bcrypt.service');
const pick = require('ramda/src/pick');
const httppStatus = require('http-status');
const APIError = require('../helpers/APIError');
const bcrypt = require('bcrypt');

/**
 * User schema
 */
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
      require: true,
    },
    email: {
      type: String,
      index: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    favouriteTeam: {
      type: String,
      trim: true,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
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

UserSchema.pre('save', async function(next) {
  try {
    this.password = await bcryptService().hashPassword(this);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods = {
  /**
   *
   *
   * @returns id, name, email, isAdmin
   */
  transform() {
    const fields = ['id', 'name', 'email', 'isAdmin', 'isDeleted'];
    return pick(fields, this);
  },
  token() {
    return EncodeToken(this.email, this._id, this.isAdmin);
  },

  /**
   *Compare two password
   *
   * @param {string} password
   * @returns true of false
   */
  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
};

UserSchema.static = {
  /**
   *
   *
   * @param {Object} payload
   * @returns
   */
  async loginAndGenerateToken(payload) {
    const { email, password } = payload;

    if (!email) {
      throw new APIError({
        message: 'An email is required to generate a token',
      });
    }

    const user = await this.findOne({ email }).exec();

    const err = {
      status: httppStatus.UNAUTHORIZED,
      isPublic: true,
    };

    if (password) {
      if (user && (await user.passwordMatches(password))) {
        return { user, accessToken: user.token() };
      }
      err.message = 'Incorrect username or password';
    }

    throw new APIError(err);
  },

  /**
   *
   *
   * @param {object} payload
   * @returns object
   */
  async getOne(payload) {
    return this.findOne(payload).exec();
  },

  /**
   *
   *
   * @param {object} payload
   * @returns object
   */
  async getAll(payload) {
    return this.find(payload);
  },
};

module.exports = mongoose.model('user', UserSchema);
