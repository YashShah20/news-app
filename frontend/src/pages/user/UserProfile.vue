<template>
  <v-card class="pa-3 mx-auto" max-width="600" elevation="0">
    <v-card-title>User Profile</v-card-title>
    <v-list density="compact">
      <v-list-subheader>General</v-list-subheader>
      <v-list-item
        prepend-icon="mdi-account-tie"
        :title="username"
      ></v-list-item>
      <v-list-item prepend-icon="mdi-email" :title="user.email"></v-list-item>

      <v-list-subheader>Security</v-list-subheader>
      <v-list-item>
        <template #title>
          <v-form @submit="changePassword">
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
            ></v-text-field>
            <v-text-field
              variant="solo-filled"
              prepend-inner-icon="mdi-eye"
              label="New Password"
              type="password"
              v-model="credentials.new_password"
              :error-messages="
                v$.credentials.new_password.$errors.map((e) => e.$message)
              "
              @input="v$.credentials.new_password.$touch"
              :class="{ 'mb-4': v$.credentials.new_password.$invalid }"
            ></v-text-field>
            <v-text-field
              variant="solo-filled"
              prepend-inner-icon="mdi-eye"
              label="Confirm Password"
              type="password"
              v-model="credentials.confirm_password"
              :error-messages="
                v$.credentials.confirm_password.$errors.map((e) => e.$message)
              "
              @input="v$.credentials.confirm_password.$touch"
              :class="{ 'mb-4': v$.credentials.confirm_password.$invalid }"
            ></v-text-field>
            <v-btn type="submit" color="grey-darken-4" :loading="isLoading"
              >Change</v-btn
            >
          </v-form>
        </template>
      </v-list-item>
    </v-list>
    <!-- <v-list :items="items" item-title="title" item-value="id" lines="three">
      <template v-slot:subtitle="{ item }">
        <div v-html="item.content"></div>
      </template>
      <template v-slot:prepend="{ item }">
        <v-img
          :src="item.image_url"
          width="250"
          height="150"
          cover
          class="d-none d-md-inline-block mr-2"
        />
      </template>
      <template v-slot:append>
        <v-btn
          variant="solo-filled"
          icon="mdi-square-edit-outline"
          color="primary"
        ></v-btn>
        <v-btn variant="solo-filled" icon="mdi-delete" color="red-darken-4"></v-btn>
      </template>
    </v-list> -->
  </v-card>
</template>

<script>
import { required, minLength, sameAs } from "@vuelidate/validators";
import { changePassword } from "@/services/userApi";
import useVuelidate from "@vuelidate/core";
import fetch from "@/mixins/fetch";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  mixins: [fetch],
  data: () => ({
    credentials: {
      password: null,
      new_password: null,
      confirm_password: null,
    },
  }),
  validations() {
    return {
      credentials: {
        password: {
          required,
        },
        new_password: {
          required,
          minLength: minLength(8),
        },
        confirm_password: {
          password: sameAs(this.credentials.new_password, "new password"),
        },
      },
    };
  },
  methods: {
    changePassword() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }

      const callback = () => {
        this.reset();
        this.v$.credentials.$reset();
        this.$toast.success("Password Changed Successfully!!");
      };
      const params = [this.credentials];

      this._fetch(changePassword, params, callback);
    },
    reset() {
      this.credentials = {
        password: null,
        new_password: null,
        confirm_password: null,
      };
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    username() {
      return this.user.first_name + " " + this.user.last_name;
    },
  },
};
</script>
