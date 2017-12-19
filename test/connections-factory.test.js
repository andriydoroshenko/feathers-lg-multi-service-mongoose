import test from 'ava';
import { assert } from 'chai';
import _ from 'lodash';
import connectionsFactory from '../src/connections-factory';
import buildConnection from '../src/build-connection-url';

const url = 'mongodb://localhost';
const prefix = 'testdb';
const locationGroup1 = 'location1';
const locationGroup2 = 'location2';

let connection1 = null;
let connection2 = null;

const connectionUrl1 = buildConnection(url, prefix, locationGroup1);
const connectionUrl2 = buildConnection(url, prefix, locationGroup2);

test.serial('init factory', () => {
  connectionsFactory.setup({
    useMongoClient: true,
    additionalOptions: true
  });
});

test.serial('get connection by url location1', () => {
  connection1 = connectionsFactory.getConnection(connectionUrl1);
  assert.isTrue(connection1.options.useMongoClient);
  assert.equal(connection1.name, `${prefix}-${locationGroup1}`);
});


test.serial('chage options and get connection by url location2', () => {
  connectionsFactory.setup({
    useMongoClient: false
  });

  connection2 = connectionsFactory.getConnection(connectionUrl2);
  assert.isFalse(connection2.options.useMongoClient);
  assert.equal(connection2.name, `${prefix}-${locationGroup2}`);
});

test.serial('check if connection1 not changed after changing options', () => {
  assert.isTrue(connection1.options.useMongoClient);
});

test.serial('check for normal connections keys', () => {
  assert.deepEqual(_.keys(connectionsFactory.connections), [connectionUrl1, connectionUrl2]);
  assert.equal(_.keys(connectionsFactory.connections).length, 2);
});
