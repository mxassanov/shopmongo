import { getCategory, getCategories } from '../services/categories.service'

const category = {
  state: () => ({
    category: {},
    categories: [],
    categoryError: null
  }),
  mutations: {
    setCategory(state, category) {
      state.category = category
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setCategoryError(state, error) {
      state.categoryError = error
    }
  },
  actions: {
    async fetchCategory({ commit }, id) {
      try {
        const category = await getCategory(id)
        commit('setCategory', category)
      } catch (err) {
        commit('setCategoryError', err)
      }
    },
    async fetchCategories({ commit }) {
      try {
        const categories = await getCategories()
        commit('setCategories', categories)
      } catch (err) {
        commit('setCategoryError', err)
      }
    }
  },
  getters: {
    category: ({ category }) => category,
    categories: ({ categories }) => categories,
    categoryError: ({ categoryError }) => categoryError,
  },
  namespaced: true
}

export default category