<template>
  <slot></slot>
  <div class="d-flex my-4">
    <v-progress-circular
      indeterminate
      centered
      v-if="isLoading"
      class="mx-auto"
    ></v-progress-circular>
  </div>
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
      const bottomOfPage =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (bottomOfPage && !this.loading) {
        // console.log(window.innerHeight + window.scrollY);
        this.load();
      }
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
