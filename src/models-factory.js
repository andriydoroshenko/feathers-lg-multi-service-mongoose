import _ from 'lodash';
import buildConnectionUrl from './build-connection-url';
import connectionsFactory from './connections-factory';

class ModelsFactory {
  constructor() {
    this.models = {};
    this.schemas = {};
  }

  /**
   *
   * @param {Object} options
   * @param {Object} options.schemasCollection
   * @param {String} options.dbUrl
   * @param {String} options.dbPrefix
   * @param {String} options.defaultLocationGroup
   */
  setup({ schemasCollection, dbUrl, dbPrefix, defaultLocationGroup }) {
    this.schemas = schemasCollection;
    this.dbUrl = dbUrl;
    this.dbPrefix = dbPrefix;
    this.defaultLocationGroup = defaultLocationGroup;
  }

  /**
   *
   * @param {String} collectionName
   * @param {String} locationGroup
   * @param {Model} model
   */
  addModel(collectionName, locationGroup, model) {
    _.set(this.models, `${collectionName}.${locationGroup}`, model);
  }

  /**
   *
   * @param {String} collectionName
   * @param {String} locationGroup
   */
  getModel(collectionName, locationGroup) {
    let model = _.get(this.models, `${collectionName}.${locationGroup}`);
    if (!model) {
      model = this.createModel(collectionName, locationGroup);
      this.addModel(collectionName, locationGroup, model);
    }
    return model;
  }

  /**
   *
   * @param {String} collectionName
   * @param {String} locationGroup
   */
  createModel(collectionName, locationGroup) {
    const connectionUrl = buildConnectionUrl(this.dbUrl, this.dbPrefix, locationGroup);
    const connection = connectionsFactory.getConnection(connectionUrl);
    const schema = _.get(this.schemas, collectionName);
    if (!schema) {
      throw new Error(`Schema for collection ${collectionName} not defined`);
    }
    if (typeof schema === 'function') {
      return schema(connection, collectionName);
    }
    return connection.model(collectionName, schema);
  }
}

export default new ModelsFactory();
