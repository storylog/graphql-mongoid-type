/* eslint-env jest */

import { Kind } from 'graphql/language';
import mongoose from 'mongoose';
import GraphQLMongoID from '../src/index';

describe('GraphQLMongoID', () => {
  describe('serialize', () => {
    it('should serialize ObjectId value', () => {
      const _id = new mongoose.Types.ObjectId();

      expect(GraphQLMongoID.serialize(_id)).toBe(_id.toString());
    });

    it('should throw error when serialize non ObjectId value', () => {
      const _id = 'invalid';

      expect(GraphQLMongoID.serialize.bind(null, _id)).toThrow();
    });
  });

  describe('parseValue', () => {
    it('should parse mongo id value to ObjectId', () => {
      const _id = new mongoose.Types.ObjectId();

      expect(GraphQLMongoID.parseValue(_id.toString())).toEqual(_id);
    });

    it('should throw error when parse non mongo id value', () => {
      const _id = 'invalid';

      expect(GraphQLMongoID.parseValue.bind(null, _id)).toThrow();
    });
  });

  describe('parseLiteral', () => {
    it('should parse ast literal', () => {
      const ast = {
        kind: Kind.STRING,
        value: (new mongoose.Types.ObjectId()).toString(),
      };
      const _id = GraphQLMongoID.parseLiteral(ast);

      expect(_id).toBeInstanceOf(mongoose.Types.ObjectId);
    });

    it('should return null when parse invalid ast', () => {
      const ast = {
        kind: Kind.STRING,
        value: 'invalid',
      };
      const _id = GraphQLMongoID.parseLiteral(ast);

      expect(_id).toBeNull();
    });
  });
});
