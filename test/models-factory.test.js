import test from 'ava';
import { assert } from 'chai';
import { Schema } from 'mongoose';
import modelFactory from '../src/models-factory';

const schema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number
  }
});

test.serial('init models factory', () => {
  modelFactory.setup({
    schemasCollection: {
      test_schema: schema
    }
  });
});

test.serial('get model by collection and locationGroup', () => {
  const model = modelFactory.getModel('test_schema', 'location');
  const model2 = modelFactory.getModel('test_schema', '');
  assert.deepEqual(schema, model2.schema);
  assert.deepEqual(schema, model.schema);
});
