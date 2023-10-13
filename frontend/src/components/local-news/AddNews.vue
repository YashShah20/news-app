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
          <v-chip prepend-icon="mdi-map-marker" color="black" variant="text">
            {{ location.city }}, {{ location.country }}
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addNews">
            <v-text-field
              v-model="news.title"
              variant="solo-filled"
              elevation="2"
              label="Title"
              prepend-inner-icon="mdi-format-title"
            ></v-text-field>
            <v-textarea
              v-model="news.content"
              variant="solo-filled"
              elevation="2"
              counter="500"
              label="Content"
              prepend-inner-icon="mdi-file-document"
              rows="5"
              class="mb-2"
            ></v-textarea>
            <v-text-field
              prepend-inner-icon="mdi-image"
              v-model="news.image_url"
              variant="solo-filled"
              elevation="2"
              label="Thumbnail URL"
            ></v-text-field>
            <v-autocomplete
              prepend-inner-icon="mdi-tag-multiple"
              v-model="news.tags"
              variant="solo-filled"
              elevation="2"
              :items="tagOptions"
              label="Tags"
              chips
              deletable-chips
              multiple
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
export default {
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
    };
  },
  created() {
    if (!this.tagOptions.length) {
      this.fetchTagOptions();
    }
  },

  methods: {
    addNews() {
      const callback = (news) => {
        this.$emit("add-news", news);
        this.close();
        this.$toast.success("News added");
      };

      const params = [this.news];
      this._fetch(addLocalNews, params, callback);
    },
    close() {
      this.dialog = false;
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
