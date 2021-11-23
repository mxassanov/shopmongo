<template>
  <li
    class="border list-none rounded-sm px-5 py-5 w-1/3 mx-auto m-5 bg-gray-50 flex justify-around rounded-lg"
  >
   <span class="text-xl">{{ item.title }}</span>
   <span class="font-bold">$ {{ item.price }}</span>
  </li>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>