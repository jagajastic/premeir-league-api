const mongoose = require('mongoose');
const UserModel = require('../User.model');

describe('', () => {
  describe('User model', () => {
    test('name', () => {
      const name = UserModel.schema.obj.name;
      expect(name).toEqual({
        type: String,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
        require: true,
      });
    });

    test('email', () => {
      const email = UserModel.schema.obj.email;
      expect(email).toEqual({
        type: String,
        index: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 5,
        maxlength: 200,
        require: true,
      });
    });
    test('password', () => {
      const password = UserModel.schema.obj.password;
      expect(password).toEqual({
        type: String,
        require: true,
      });
    });
    test('favouriteTeam', () => {
      const favouriteTeam = UserModel.schema.obj.favouriteTeam;
      expect(favouriteTeam).toEqual({
        type: String,
        trim: true,
        default: '',
      });
    });
    test('isAdmin', () => {
      const isAdmin = UserModel.schema.obj.isAdmin;
      expect(isAdmin).toEqual({
        type: Boolean,
        default: false,
      });
    });
    test('isDeleted', () => {
      const isDeleted = UserModel.schema.obj.isDeleted;
      expect(isDeleted).toEqual({
        type: Boolean,
        default: false,
      });
    });
    test('createdAt', () => {
      const createdAt = UserModel.schema.obj.createdAt;
      expect(createdAt).toEqual({
        type: Date,
        immutable: true,
      });
    });
  });
});
