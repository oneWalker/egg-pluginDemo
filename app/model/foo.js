'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FooSchema = new Schema({
    id: { type: String },
    count: { type: Number },
  });

  return mongoose.model('foo', FooSchema);
};
