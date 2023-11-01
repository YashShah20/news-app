<template>
  <v-card class="mx-auto mb-8" elevation="16" max-width="600">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img cover height="250" :src="news.image_url"></v-img>

    <v-card-item>
      <v-card-title>
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <router-link
              v-bind="props"
              class="text-grey-darken-4"
              :class="{ 'text-decoration-none': !isHovering }"
              :to="to"
            >
              {{ news.title }}
            </router-link>
          </template>
        </v-hover>
      </v-card-title>
      <v-card-subtitle>
        By, <span class="me-1">{{ news.author_name }}</span>
      </v-card-subtitle>
      <template #append v-if="allowUpvote">
        <v-btn
          icon="mdi-thumb-up"
          variant="text"
          v-if="isUpvoted"
          @click="toggleUpvote"
        >
        </v-btn>
        <v-btn
          icon="mdi-thumb-up-outline"
          variant="text"
          v-else
          @click="toggleUpvote"
        >
        </v-btn>
      </template>
    </v-card-item>
    <v-card-text>
      <div>
        <v-icon icon="mdi-calendar" start></v-icon>
        <span>{{ formatted_created_on }}</span>
      </div>

      <div class="mt-2">
        <slot name="location"></slot>
      </div>
    </v-card-text>
    <v-card-text>
      <div>{{ news.content }}</div>
      <v-chip class="my-4 text-subtitle-1" v-if="news.label">
        {{ news.label }}
      </v-chip>
      <template v-if="news.tags">
        <v-chip
          size="small"
          class="mt-4 me-2 text-subtitle-1"
          v-for="tag in news.tags"
          :key="tag"
        >
          {{ tag }}
        </v-chip>
      </template>
    </v-card-text>

    <v-divider class="mx-4 mb-1" v-if="$slots.actions"></v-divider>
    <slot name="actions"> </slot>
  </v-card>
</template>

<script>
import dayjs from "dayjs";
import fetch from "@/mixins/fetch";
import { deleteUpvote, upvoteNews, getUpvote } from "@/services/upvoteService";

export default {
  mixins: [fetch],
  props: {
    news: {
      type: Object,
      require: true,
    },
    allowUpvote: {
      type: Boolean,
      require: false,
      default: false,
    },
    link: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  data() {
    return {
      isUpvoted: false,
    };
  },
  created() {
    if (this.allowUpvote) {
      setTimeout(() => {
        this.getUpvote();
      }, 100);
    }
  },
  methods: {
    getUpvote() {
      const callback = (upvote) => {
        this.isUpvoted = !!upvote;
      };

      const params = [this.news.id];

      this._fetch(getUpvote, params, callback);
    },
    upvoteNews() {
      const callback = () => {
        this.isUpvoted = !this.isUpvoted;
      };

      const params = [this.news.id];

      this._fetch(upvoteNews, params, callback);
    },
    deleteUpvote() {
      const callback = () => {
        this.isUpvoted = !this.isUpvoted;
      };

      const params = [this.news.id];

      this._fetch(deleteUpvote, params, callback);
    },
    toggleUpvote() {
      if (this.isUpvoted) {
        this.deleteUpvote();
      } else {
        this.upvoteNews();
      }
    },
  },
  computed: {
    to() {
      return this.link
        ? {
            name: "local-news-details",
            params: { news_id: this.news.id },
          }
        : {};
    },
    formatted_created_on() {
      return dayjs(this.news.created_on).format("dddd - DD MMMM, YYYY");
    },
  },
};
</script>
