<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="900" ref="news" attach="body">
      <template v-slot:activator="{ props }">
        <v-btn
          color="grey-darken-4"
          v-bind="props"
          icon="mdi-plus"
          position="fixed"
          class="mr-2 mb-4 mr-md-8 mb-md-8"
          elevation="24"
          style="bottom: 0; right: 0"
        >
        </v-btn>
      </template>
      <v-card class="pa-4">
        <v-card-title>
          <span class="text-h4">Add Your News</span>
        </v-card-title>
        <v-card-title>
          <v-alert
            v-for="error in errors"
            :key="error.msg"
            closable
            size="small"
            class="my-2"
            :text="error.msg"
            density="compact"
            border="start"
            color="red-lighten-4"
            border-color="red-darken-4"
          ></v-alert>
        </v-card-title>
        <v-card-title>
          <v-chip prepend-icon="mdi-map-marker" color="black" variant="text">
            {{ location.city }}, {{ location.country }}
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addNews">
            <v-text-field
              label="Title"
              prepend-inner-icon="mdi-format-title"
              variant="solo-filled"
              elevation="2"
              v-model="news.title"
              :error-messages="v$.news.title.$errors.map((e) => e.$message)"
              @input="v$.news.title.$touch"
              :class="{ 'mb-4': v$.news.title.$invalid }"
            ></v-text-field>
            <v-textarea
              label="Content"
              prepend-inner-icon="mdi-file-document"
              variant="solo-filled"
              elevation="2"
              counter="500"
              auto-grow
              rows="5"
              class="mb-2"
              v-model="news.content"
              :error-messages="v$.news.content.$errors.map((e) => e.$message)"
              @input="v$.news.content.$touch"
              :class="{ 'mb-4': v$.news.content.$invalid }"
            ></v-textarea>
            <v-text-field
              label="Thumbnail URL"
              prepend-inner-icon="mdi-image"
              variant="solo-filled"
              elevation="2"
              v-model="news.image_url"
              :error-messages="v$.news.image_url.$errors.map((e) => e.$message)"
              @input="v$.news.image_url.$touch"
              :class="{ 'mb-4': v$.news.image_url.$invalid }"
            ></v-text-field>
            <v-autocomplete
              label="Tags"
              prepend-inner-icon="mdi-tag-multiple"
              variant="solo-filled"
              elevation="2"
              chips
              deletable-chips
              multiple
              :items="tagOptions"
              v-model="news.tags"
              :error-messages="v$.news.tags.$errors.map((e) => e.$message)"
              @input="v$.news.tags.$touch"
              :class="{ 'mb-4': v$.news.tags.$invalid }"
            >
            </v-autocomplete>
            <div class="d-flex flex-row-reverse">
              <v-btn type="submit" color="black">Add</v-btn>
              <v-btn type="button" color="white" class="me-4" @click="close">
                Close
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import fetch from "@/mixins/fetch";
import { addLocalNews } from "@/services/localNewsApi";
import { getTags } from "@/services/tagApi";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  url,
  // helpers,
} from "@vuelidate/validators";
// import { isImage } from "@/services/image";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  mixins: [fetch],
  data() {
    return {
      dialog: false,

      news: {
        title: "Dummy News",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum sit, soluta ipsa maiores, earum quisquam blanditiis perferendis voluptate rerum numquam consequuntur quo ad velit labore dignissimos temporibus delectus, voluptates sed odit dolor provident quia aperiam harum! Perferendis ullam autem non totam, consequatur ipsa ipsum unde doloribus velit, aliquam quisquam officia.",
        image_url:
          "https://static.inshorts.com/inshorts/images/v1/variants/jpg/m/2023/09_sep/17_sun/img_1694966953305_258.jpg?",
        tags: ["2"],
      },
      tagOptions: [],
      errors: [],
    };
  },
  validations() {
    return {
      news: {
        title: {
          required,
          minLength: minLength(10),
        },
        content: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(500),
        },
        image_url: {
          required,
          url,
          // isImage: helpers.withAsync(isImage),
          // custom: {
          //   options: async (value) => {
          //     const result = await isImage(value);
          //     console.log(result);
          //     return Promise.reject("invalid image");
          //   },
          // },
        },
        tags: {
          required,
        },
      },
    };
  },
  created() {
    if (!this.tagOptions.length) {
      this.fetchTagOptions();
    }
  },

  methods: {
    addNews() {
      this.v$.news.$touch();
      if (this.v$.news.$invalid) {
        return;
      }

      const callback = (news) => {
        this.close();
        this.$emit("add-news", news);
        this.reset();
        this.v$.news.$reset();
        this.$toast.success("News added");
      };

      const params = [this.news];

      const errorCallback = (errors) => {
        this.errors = errors;
      };
      this._fetch(addLocalNews, params, callback, errorCallback, true);
    },
    close() {
      this.dialog = false;
    },
    reset() {
      this.news = {
        title: null,
        content: null,
        image_url: null,
        tags: null,
      };
    },
    fetchTagOptions() {
      const callback = (options) => {
        this.tagOptions = options.map((option) => ({
          title: option.name,
          value: option.id,
        }));
      };

      this._fetch(getTags, [], callback);
    },
  },
  computed: {
    location() {
      return this.$store.getters["location/location"];
    },
  },
};
</script>
