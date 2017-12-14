import mongoose from 'mongoose';
import service from 'feathers-mongoose-with-analog-id';
import Promise from 'bluebird';
import buildConnectionUrl from './build-connection-url';
import modelFactory from './models-factory';

mongoose.Promise = Promise;

const services = {};

export default function (params) {
  const locationGroup = params.locationGroup;
  const connectionUrl = buildConnectionUrl(this.dbUrl, this.dbPrefix, locationGroup);
  const serviceName = `${connectionUrl}/${this.collectionName}`;

  if (!services[serviceName]) {
    // getting a model from modelFactory
    let model = modelFactory.getModel(this.collectionName, locationGroup);

    // creating a service
    services[serviceName] = service({ Model: model, lean: params.lean, analogId: params.analogId });
  }

  return services[serviceName];
}
