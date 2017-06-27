import { GraphQLScalarType } from 'graphql';
import mongoose from 'mongoose';

export default new GraphQLScalarType({
  name: 'MongoId',
  description: 'Mongo ID custom scalar type',
  parseValue(value) {
    try {
      return mongoose.Types.ObjectId(value);
    } catch (e) {
      throw new TypeError('MongoId cannot represent non ObjectId value');
    }
  },
  parseLiteral(ast) {
    try {
      return mongoose.Types.ObjectId(ast.value);
    } catch (e) {
      return null;
    }
  },
  serialize(value) {
    try {
      return mongoose.Types.ObjectId(value).toString();
    } catch (e) {
      throw new TypeError('MongoId cannot represent non ObjectId value');
    }
  },
});
