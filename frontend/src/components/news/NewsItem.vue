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

    <v-img cover height="250" :src="news.image_url || news.thumbnail_url"></v-img>

    <v-card-item>
      <v-card-title>{{ news.title }}</v-card-title>
      <v-card-subtitle>
        By, <span class="me-1">{{ news.author_name }}</span>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-icon icon="mdi-calendar" start></v-icon>
      {{ news.created_on }}
    </v-card-text>

    <v-card-text>
      <div>{{ news.content }}</div>
      <v-chip class="my-4 text-subtitle-1">{{ news.label }}</v-chip>
    </v-card-text>

    <v-divider class="mx-4 mb-1" v-if="$slots.actions"></v-divider>
    <slot name="actions"> </slot>
  </v-card>
</template>

<script>
export default {
  props: ["news"],
};
</script>
