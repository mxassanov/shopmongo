<template>
  <div>
    <template v-if="cartItems.length">
      <div class="flex justify-center mt-4">
        <p class="pr-3 text-3xl">Cart</p>
        <Icon icon="emojione-monotone:shopping-cart" color="black" width="40" />
      </div>
      <ul>
        <CartItem v-for="(item, i) in cartItems" :key="i" :item="item" />
      </ul>
      <div class="text-lg flex justify-evenly pt-2">
        <p>Количество: {{ cartCount }}</p>
        <p>Тотал: {{ cartTotalPrice }}</p>
      </div>

      <div>
        <UserForm v-show="!paymentIntent" @onFormSubmit="handleGetPaymentIntent" />
      </div>

      <div 
        v-show="paymentIntent"
        class="mt-8 w-2/6 mx-auto"
      >
        <label for="cardInput">Введите данные:</label>
        <StripeElementCard
          id="cardInput"
          ref="elementRef"
          :pk="publishableKey"
          @token="tokenCreated"
        />
        <button
          type="button"
          @click="submit"
          class="bg-green-500 px-5 py-2 rounded-lg text-white mt-3"
        >
          Купить
        </button>
      </div>
    </template>
    <template v-else>
      <p>Cart is empty</p>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Icon } from "@iconify/vue2";
import { StripeElementCard } from "@vue-stripe/vue-stripe";
import UserForm from '@/components/cart/UserForm';

export default {
  name: "Cart",
  components: {
    Icon,
    StripeElementCard,
    UserForm,
    CartItem: () => import("@/components/cart/CartItem.vue"),
  },
  computed: {
    ...mapGetters("cart", ["cartItems", "cartTotalPrice", "cartCount"]),
  },
  data() {
    this.publishableKey =
      "pk_test_51Jyh8OGVdMQXoVlrRgS9n74xnGJkImGiow3LpK3bRItkHr1vyPUMRV4EWtJrslGMA68JzF0frINbZPvrSnDO7hjH007l6sENRG";
    return {
      token: null,
      paymentIntent: null,
      clientSecret: "",
    };
  },
  methods: {
    ...mapActions("cart", ["handlePayment"]),
    ...mapMutations("cart", ["clearCart"]),

    async handleGetPaymentIntent(formData) {
      const intent = await this.handlePayment({
          ...formData,
          products: this.cartItems
        });
      this.paymentIntent = intent.paymentIntent.client_secret
    },
    async submit() {
      try {
        this.$refs.elementRef.submit();
        this.clearCart()
      } 
      catch (error) {
        console.log(error);
      }
    },
    tokenCreated (token) {
      console.log(token);
      this.token = token
    },
  },
};
</script>
