<template>
  <div class="container mx-auto">
    <div class="max-w-xl p-5 mx-auto my-10 bg-white rounded-md shadow-sm">
      <div class="text-center">
        <h1 class="my-3 text-3xl font-semibold text-gray-700">Контакты</h1>
        <p class="text-gray-400 my-2">
          Заполните форму для отправки данных
        </p>
      </div>
      <div>
        <form @submit.prevent="handleSubmit">
          <div class="mb-6">
            <label for="name" class="block mb-2 text-sm text-gray-600"
              >Ваше имя</label
            >
            <input
              v-model="userForm.fullname"
              type="text"
              name="fullname"
              placeholder="John Doe"
              required
              class="
                w-full
                px-3
                py-2
                placeholder-gray-300
                border border-gray-300
                rounded-md
                focus:outline-none
                focus:ring
                focus:ring-indigo-100
                focus:border-indigo-300
              "
            />
          </div>
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm text-gray-600"
              >Электронный адрес</label
            >
            <input
              v-model="userForm.email"
              type="email"
              name="email"
              placeholder="you@email.com"
              required
              class="
                w-full
                px-3
                py-2
                placeholder-gray-300
                border border-gray-300
                rounded-md
                focus:outline-none
                focus:ring
                focus:ring-indigo-100
                focus:border-indigo-300
              "
            />
          </div>
          <div class="mb-6">
            <label for="phone" class="text-sm text-gray-600"
              >Номер телефона</label
            >
            <input
              v-model="userForm.phone"
              type="number"
              name="phone"
              placeholder="91 1234-567"
              required
              class="
                w-full
                px-3
                py-2
                placeholder-gray-300
                border border-gray-300
                rounded-md
                focus:outline-none
                focus:ring
                focus:ring-indigo-100
                focus:border-indigo-300
              "
            />
          </div>
          <div class="mb-6">
            <label for="address" class="block mb-2 text-sm text-gray-600"
              >Ваш адрес</label
            >
            <input
              v-model="userForm.address"              
              name="address"
              placeholder="Your address"
              class="
                w-full
                px-3
                py-2
                placeholder-gray-300
                border border-gray-300
                rounded-md
                focus:outline-none
                focus:ring
                focus:ring-indigo-100
                focus:border-indigo-300
              "
              required
            />
          </div>
          <div class="mb-6">
            <button
              type="submit"
              class="
                w-full
                px-2
                py-4
                text-white
                bg-indigo-500
                rounded-md
                focus:bg-indigo-600 focus:outline-none
              "
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserForm",
  data: () => ({
    userForm: {
      fullname: "",
      email: "",
      phone: "",
      address: "",
    },
  }),
  methods: {
    handleSubmit() {
     this.$emit('onFormSubmit', this.userForm) 
    }
  }
};
</script>