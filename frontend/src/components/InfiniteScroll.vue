<template>
  <div ref="top" style="top: 0; position: absolute"></div>
  <slot></slot>
  <div class="d-flex my-4">
    <v-progress-circular
      indeterminate
      centered
      v-if="isLoading"
      class="mx-auto"
    ></v-progress-circular>
  </div>
  <v-btn
    icon="mdi-arrow-up"
    @click="scrollToTop"
    position="fixed"
    color="grey-darken-4"
    class="mr-2 mb-4 mr-md-8 mb-md-8"
    elevation="24"
    style="bottom: 0; right: 0"
  ></v-btn>
</template>

<script>
export default {
  props: {
    load: {
      type: Function,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onscroll() {
      const isBottomOfPage =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isBottomOfPage && !this.loading) {
        // console.log(window.innerHeight + window.scrollY);
        this.load();
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onscroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.onscroll);
  },
};
</script>
