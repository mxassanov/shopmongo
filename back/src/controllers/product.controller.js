const { genericCrud } = require('./generic.controller');
const { Product } = require('../models');


module.exports = {
  ...genericCrud(Product),
};