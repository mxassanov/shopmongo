<template>
  <header class="bg-black flex justify-between px-1">
    <router-link 
      to="/cart" 
      class="text-white pt-3 pl-3 flex">
    <Icon 
      icon="emojione-monotone:shopping-cart"
      color="white"
      width="26"
    />
     <span class="px-2 text-xl font-extrabold">{{ cartCount }}</span>
    </router-link>
      <nav class="p-2">
        <ul class="space-x-2 flex">
          <NavItem 
            v-for="category in categories" :key="category.id"
            :category="category" 
            />
        </ul>
      </nav>
      <router-link  
        to="/" 
        class="block px-4 py-2 text-white bg-black font-semibold hover:text-black hover:bg-white mt-2">
        Home
      </router-link>
  </header>
</template>

<script>
import NavItem from './NavItem';
import { Icon } from '@iconify/vue2';

export default {
  name: "AppHeader",
  components: {
    NavItem,
    Icon
  },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    cartCount: {
      type: Number,
      default: 0
    }
  },
};
</script>
