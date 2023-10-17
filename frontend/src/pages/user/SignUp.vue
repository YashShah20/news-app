<template>
  <v-card elevation="8" class="pa-5 ma-auto" max-width="800">
    <v-card-title class="text-uppercase text-center font-weight-bold my-5 mb-8">
      Argus News
    </v-card-title>

    <v-card-text>
      <v-form @submit="signup">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              variant="solo-filled"
              label="First Name"
              type="text"
              v-model="user.first_name"
              :error-messages="
                v$.user.first_name.$errors.map((e) => e.$message)
              "
              @input="v$.user.first_name.$touch"
              :class="{ 'mb-4': v$.user.first_name.$invalid }"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              variant="solo-filled"
              label="Last Name"
              type="text"
              v-model="user.last_name"
              :error-messages="v$.user.last_name.$errors.map((e) => e.$message)"
              @input="v$.user.last_name.$touch"
              :class="{ 'mb-4': v$.user.last_name.$invalid }"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="solo-filled"
              label="Email"
              type="email"
              v-model="user.email"
              :error-messages="v$.user.email.$errors.map((e) => e.$message)"
              @input="v$.user.email.$touch"
              :class="{ 'mb-4': v$.user.email.$invalid }"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="solo-filled"
              label="Password"
              type="password"
              v-model="user.password"
              :error-messages="v$.user.password.$errors.map((e) => e.$message)"
              @input="v$.user.password.$touch"
              :class="{ 'mb-4': v$.user.password.$invalid }"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="solo-filled"
              label="Confirm Password"
              type="password"
              v-model="user.confirm_password"
              :error-messages="
                v$.user.confirm_password.$errors.map((e) => e.$message)
              "
              @input="v$.user.confirm_password.$touch"
              :class="{ 'mb-4': v$.user.confirm_password.$invalid }"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-btn color="grey-darken-4" type="submit" :loading="isLoading"
          >Sign Up</v-btn
        >
      </v-form>
      <!-- <div class="text-center text-red" v-if="error">{{ error }}</div> -->
    </v-card-text>
    <v-card-text>
      Already have an account?
      <router-link :to="{ name: 'signin' }">Sign in </router-link>
    </v-card-text>
  </v-card>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  helpers,
  minLength,
  maxLength,
} from "@vuelidate/validators";

import { signup } from "../../services/userApi";
import fetch from "../../mixins/fetch";
export default {
  mixins: [fetch],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      user: {
        first_name: null,
        last_name: null,
        username: null,
        email: null,
        password: null,
        confirm_password: null,
      },
    };
  },
  validations() {
    return {
      user: {
        first_name: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(30),
        },
        last_name: {
          optional: !helpers.req(),
          minLength: minLength(2),
          maxLength: maxLength(30),
        },
        username: {},
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(8),
        },
        confirm_password: {
          sameAsPassword: sameAs(this.user.password, "password"),
        },
      },
    };
  },
  methods: {
    signup() {
      this.v$.user.$touch();
      if (this.v$.user.$invalid) {
        return;
      }
      const callback = (user) => {
        this.$store.dispatch("signup", user);
        this.$router.push({ name: "signin" });
        this.$toast.success("Account created successfully");
      };

      const params = [this.user];
      this._fetch(signup, params, callback);
    },
  },
};
</script>

<style scoped></style>
