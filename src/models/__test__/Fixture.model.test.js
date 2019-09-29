const mongoose = require('mongoose');
const FixtureModel = require('../Fixture.model');

describe('Fixture model', () => {
  describe('schema', () => {
    test('date', () => {
      const date = FixtureModel.schema.obj.date;
      expect(date).toEqual({
        type: Date,
        require: true,
        index: true,
      });
    });
    test('time', () => {
      const time = FixtureModel.schema.obj.time;
      expect(time).toEqual({
        type: String,
        require: true,
        index: true,
      });
    });
    test('status', () => {
      const status = FixtureModel.schema.obj.status;
      expect(status).toEqual({
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending',
        index: true,
      });
    });
    test('stadium', () => {
      const stadium = FixtureModel.schema.obj.stadium;
      expect(stadium).toEqual({
        type: String,
        require: true,
        index: true,
      });
    });
    test('home', () => {
      const home = FixtureModel.schema.obj.home;
      expect(home).toEqual({
        type: String,
        require: true,
        index: true,
      });
    });
    test('home_team', () => {
      const home_team = FixtureModel.schema.obj.home_team;
      expect(home_team).toEqual({
        type: mongoose.Types.ObjectId,
        ref: 'team',
        index: true,
      });
    });
    test('away', () => {
      const away = FixtureModel.schema.obj.away;
      expect(away).toEqual({
        type: String,
        require: true,
        index: true,
      });
    });
    test('away_team', () => {
      const away_team = FixtureModel.schema.obj.away_team;
      expect(away_team).toEqual({
        type: mongoose.Types.ObjectId,
        ref: 'team',
        index: true,
      });
    });
    test('isDeleted', () => {
      const isDeleted = FixtureModel.schema.obj.isDeleted;
      expect(isDeleted).toEqual({
        type: Boolean,
        default: false,
      });
    });
    test('createdAt', () => {
      const createdAt = FixtureModel.schema.obj.createdAt;
      expect(createdAt).toEqual({
        type: Date,
        immutable: true,
      });
    });
  });
});
