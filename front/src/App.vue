<template>
  <div id="app">
    <AppHeader :categories="categories" :cartCount="cartCount"/>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    AppHeader: () => import('@/components/header/Header'),
  },
  mounted() {
   this.fetchCategories() 
  },
  computed: {
    ...mapGetters('category', ['categories']),
    ...mapGetters('cart', ['cartCount'])
  },
  methods: {
    ...mapActions('category', ['fetchCategories'])
  }
}
</script>

<style>
body,
html {
  padding: 0;
  margin: 0
}

#app {
  font-family: Oswald, sans-serif;
  text-align: center;
}
</style>
