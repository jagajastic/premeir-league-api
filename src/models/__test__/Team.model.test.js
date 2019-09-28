const mongoose = require('mongoose');
const TeamModel = require('../Team.model');

describe('Team ', () => {
  describe('team Model', () => {
    test('name', () => {
      const name = TeamModel.schema.obj.name;

      expect(name).toEqual({
        type: String,
        trim: true,
        unique: true,
        uppercase: true,
        minlength: 2,
        maxlength: 120,
        required: true,
        index: true,
      });
    });
    test('coach', () => {
      const coach = TeamModel.schema.obj.coach;

      expect(coach).toEqual({
        type: String,
        index: true,
        trim: true,
        maxlength: 120,
        required: true,
      });
    });
    test('stadium', () => {
      const stadium = TeamModel.schema.obj.stadium;

      expect(stadium).toEqual({
        type: String,
        index: true,
        trim: true,
        maxlength: 150,
        required: true,
      });
    });
    test('address', () => {
      const address = TeamModel.schema.obj.address;

      expect(address).toEqual({
        type: String,
        index: true,
        trim: true,
        maxlength: 150,
        default: '',
      });
    });
    test('stadiumCapacity', () => {
      const stadiumCapacity = TeamModel.schema.obj.stadiumCapacity;

      expect(stadiumCapacity).toEqual({
        type: String,
        trim: true,
      });
    });
    test('founded', () => {
      const founded = TeamModel.schema.obj.founded;

      expect(founded).toEqual({
        type: String,
        trim: true,
        maxlength: 150,
        default: '',
      });
    });
    test('city', () => {
      const city = TeamModel.schema.obj.city;

      expect(city).toEqual({
        type: String,
        trim: true,
        maxlength: 150,
        default: '',
      });
    });
    test('isDeleted', () => {
      const isDeleted = TeamModel.schema.obj.isDeleted;

      expect(isDeleted).toEqual({
        type: Boolean,
        default: false,
      });
    });
  });
});
