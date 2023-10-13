export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async _fetch(fn, params, callback, errorCallback) {
      try {
        this.isLoading = true;
        const response = await fn(...params);
        callback(response.data);
      } catch (error) {
        this.error = error?.response?.data?.error || "Something went wrong";
        this.$toast.error(this.error);
        if (errorCallback) {
          errorCallback();
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
