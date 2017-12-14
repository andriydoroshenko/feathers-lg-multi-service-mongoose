import service from 'feathers-multi-service';
import getService from './service-proxy';

export default ({
  app = null,
  collectionName = null,
  schema = null,
  dbUrl = app.get('dbUrl'),
  dbPrefix = app.get('dbPrefix'),
  lean = false,
  analogId = false
}) => {
  if (!app || !collectionName || !schema) {
    throw new Error(
      'Wrong multi service usage. Required schema, app, collectionName'
    );
  }

  return service({
    collectionName,
    dbUrl,
    dbPrefix,
    schema,
    getService,
    lean,
    analogId
  });
};
