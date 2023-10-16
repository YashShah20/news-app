<template>
  <v-card class="mx-auto mb-8" elevation="16" max-width="639">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      cover
      height="250"
      :src="news.image_url || news.thumbnail_url"
    ></v-img>

    <v-card-item>
      <v-card-title>{{ news.title }}</v-card-title>
      <v-card-subtitle>
        By, <span class="me-1">{{ news.author_name }}</span>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <div>
        <v-icon icon="mdi-calendar" start></v-icon>
        <span>{{ news.created_on }}</span>
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

    <v-divider class="mx-4 mb-1" v-if="$slots.source"></v-divider>
    <slot name="source"> </slot>
  </v-card>
</template>

<script>
export default {
  props: ["news"],
};
</script>
