<template>
  <v-card elevation="8" class="w-100 pa-5 ma-auto" max-width="576">
    <v-card-title class="text-uppercase text-center font-weight-bold my-5 mb-8">
      Argus News
    </v-card-title>

    <v-card-text>
      <v-form @submit="signin">
        <v-text-field
          variant="solo-filled"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email"
          v-model="credentials.email"
          :error-messages="v$.credentials.email.$errors.map((e) => e.$message)"
          @input="v$.credentials.email.$touch"
          :class="{ 'mb-4': v$.credentials.email.$invalid }"
        >
        </v-text-field>
        <v-text-field
          variant="solo-filled"
          prepend-inner-icon="mdi-eye"
          label="Password"
          type="password"
          v-model="credentials.password"
          :error-messages="
            v$.credentials.password.$errors.map((e) => e.$message)
          "
          @input="v$.credentials.password.$touch"
          :class="{ 'mb-4': v$.credentials.password.$invalid }"
        >
        </v-text-field>
        <v-btn color="grey-darken-4" type="submit" :disabled="isLoading"
          >Sign In</v-btn
        >
      </v-form>
      <!-- <div class="text-center text-red" v-if="error">{{ error }}</div> -->
      <div class="mt-2 text-start">
        Don't have an account?
        <router-link :to="{ name: 'signup' }">Sign up </router-link>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { signin } from "../../services/userApi";
import fetch from "../../mixins/fetch";
export default {
  mixins: [fetch],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      credentials: {
        email: "yashshah@gmail.com",
        password: "abc",
      },
    };
  },
  validations() {
    return {
      credentials: {
        email: {
          required,
          email,
        },
        password: {
          required,
        },
      },
    };
  },
  methods: {
    signin() {
      this.v$.credentials.$touch();
      
      if (this.v$.credentials.$invalid) {
        return;
      }
      const callback = (user) => {
        this.$store.dispatch("signin", user);
        this.$router.push({ name: "home" });
      };

      const params = [this.credentials];
      this._fetch(signin, params, callback);
    },
  },
};
</script>

<style scoped></style>
