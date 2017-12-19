import test from 'ava';
import { assert } from 'chai';
import service from '../src/index';

test('should return locationGroupMiddleware', () => {
  assert.isDefined(service.locationGroupHeader);
});

test('should return service', () => {
  assert.isDefined(service.service);
});

test('should return modelsFactory', () => {
  assert.isDefined(service.modelsFactory);
});

test('should return connectionsFactory', () => {
  assert.isDefined(service.connectionsFactory);
});
