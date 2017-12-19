import _ from 'lodash';
import mongoose from 'mongoose';

class ConnectionsFactory {

  constructor() {
    this.options = {};
    this.connections = {};
  }

  setup(options) {
    this.options = options;
  }

  addConnection(url, connection) {
    _.set(this.connections, url, connection);
  }

  getConnection(url) {
    let connection = _.get(this.connections, url, null);
    if (!connection) {
      connection = this.createConnection(url);
      this.addConnection(url, connection);
    }
    return connection;
  }

  createConnection(url) {
    return mongoose.createConnection(url, this.options);
  }
}

export default new ConnectionsFactory();
