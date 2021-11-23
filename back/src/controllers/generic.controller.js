const boom = require('boom')

const genericCrud = (model) => ({
  async get({ params: { id } }, res) {
    try {
      const item = await model.findById(id);
      return res.send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async getAll(_, res) {
    try {
      const items = await model.find();
      return res.send(items);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async create({ body }, res) {
    try {
      const item = new model(body);
      const savedItem = await item.save();
      return res.send(savedItem);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async update({ params: { id }, body }, res) {
    try {
      const item = await model.findByIdAndUpdate(id, body, { new: true });
      return res.send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async delete({ params: { id } }, res) {
    try {
      await model.findByIdAndDelete(id);
      return res.send({ status: 'OK', message: 'Удаление прошло успешно!' });
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  }
})

module.exports = {
  genericCrud
};