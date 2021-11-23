<template>
<div>
  <Hero />
  <div class="flex justify-center">
    <ProductCard
      v-for="(product, i) in products" :key="i" 
      :title="product.title"
      :description="product.description"
      :price="product.price"
      :imageUrl="product.imageUrl"
      @add-to-cart="addToCart(product)"
      :inCart="cartItemsIds.includes(product._id)"
     />
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Home',
  components: {
    ProductCard: () => import ('@/components/product/ProductCard'),
    Hero: () => import('@/components/header/Hero')
  },
  mounted() {
    this.fetchProducts()
  },
  computed: {
    ...mapGetters('product', ['products']),
    ...mapGetters('cart', ['cartItems']),
    cartItemsIds() {
      return this.cartItems.map(({ _id }) => _id)
    }
  },
  methods: {
    ...mapActions('product', ['fetchProducts']
    ),
    ...mapMutations('cart', ['addToCart'])
  }
}
</script>
