import { sum } from 'ramda';
import { getPaymentIntent } from '../services/payments.service'

const cart = {
  state: () => ({
    cart: {
      total: 0
    },
    cartItems: [],
    paymentError: null
  }),
  getters: {
    cartTotalPrice: ({ cartItems }) => sum(cartItems.map(cart => cart.price)),
    cart: ({ cart }) => cart,
    cartItems: ({ cartItems }) => cartItems,
    cartCount: ({ cartItems }) => cartItems.length,
    paymentError: ({ paymentError }) => paymentError,
  },
  mutations: {
    addToCart(state, product) {
      const productInCart = state.cartItems.find(({ _id }) => product._id === _id)
      if (productInCart) {
        state.cartItems = state.cartItems.filter(({ _id }) => product._id !== _id)
      } else {
        state.cartItems.push(product)
        console.log(state.cartItems)
      }
    },
    setPaymentError(state, error) {
      state.paymentError = error
    },
    clearCart(state) {
      state.cartItems = []
    }
  },
  actions: {
    async handlePayment({ getters, commit }, formData) {
      try {
        const intent = await getPaymentIntent({amount: getters.cartTotalPrice, ...formData})

        return intent
      } catch (error) {
        commit('setPaymentError', error)
      }
    }
  },
  namespaced: true
}

export default cart