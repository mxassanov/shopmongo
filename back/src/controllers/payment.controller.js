const dollarsToCents = require('dollars-to-cents')
const { sum } = require('ramda')
const { Order } = require('../models')

const stripe = require('stripe')('sk_test_51Jyh8OGVdMQXoVlrbhgbe2XnrtaMbPHUTgEQYDStV5alxQchbIhDMEx6eeWQXUpU4M8kHILmNMzC5WHdOhtakGFR00Iid4wMpm')

const createPaymentIntent =
  async ({ body: { fullname, address, phone, email, products } }, res) => {
    try {

      if (!address) {
        throw new Error('Адрес обязателен')
      }

      const amount = sum(products.map(item => Number(item.price)))
      const productsIds = products.map(({ _id }) => _id)
      const prepareOrder = {
        fullname, address, phone, email, products: productsIds, amount
      }

      const newOrder = await new Order(prepareOrder)
      const saveOrder = await newOrder.save()

      const paymentIntent = await stripe.paymentIntents.create({
        amount: dollarsToCents(amount),
        currency: "eur",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          orderId: String(saveOrder._id)
        }
      });

      return res.status(200).send({
        paymentIntent,
        saveOrder
      })
    }
    catch (error) {
      return res.status(500).send(error);
    }
  }

const stripeWebHook = async ({ body: { data } }, res) => {
  try {
    const { metadata: { orderId } } = data.object
    const order = await Order.findById(orderId)
    if (!order) {
      throw new Error('order not found')
    }

    await Order.findByIdAndUpdate(orderId, { status: 'paid' })

    return res.status(200).send('success')
  }
  catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  stripeWebHook,
  createPaymentIntent
}