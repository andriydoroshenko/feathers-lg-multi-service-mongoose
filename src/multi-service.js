import service from 'feathers-multi-service';
import getService from './service-proxy';

export default ({
  app = null,
  collectionName = null,
  dbUrl = app.get('dbUrl'),
  dbPrefix = app.get('dbPrefix'),
  lean = false,
  analogId = false
}) => {
  if (!app || !collectionName) {
    throw new Error(
      'Wrong multi service usage. Required app, collectionName'
    );
  }

  return service({
    collectionName,
    dbUrl,
    dbPrefix,
    getService,
    lean,
    analogId
  });
};
