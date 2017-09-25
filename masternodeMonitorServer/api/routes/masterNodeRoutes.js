'use strict';
module.exports = function(app) {
  var masterNode = require('../../controllers/masterNodeController');

  app.route('/masterNode/:type/:address/status')
    .get(masterNode.getStatus);

  app.route('/masterNode/:type/:address/balance')
    .get(masterNode.getBalance);
};