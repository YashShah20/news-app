export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async _fetch(
      fn,
      params,
      callback,
      errorCallback,
      errorCallbackOnly = false
    ) {
      try {
        this.isLoading = true;
        const response = await fn(...params);
        callback(response.data);
      } catch (e) {
        const error = e?.response?.data?.error || "Something went wrong";

        if (errorCallbackOnly) {
          errorCallback(error);
        } else {
          switch (typeof error) {
            case "string":
              this.error = error;
              this.$toast.error(this.error);

              break;
            case "object":
              if (Array.isArray(error)) {
                error.forEach((errorObj) => {
                  const message = `${errorObj.msg} for field ${errorObj.path}`;
                  this.$toast.error(message);
                });
              } else {
                const message = JSON.stringify(error);
                this.$toast.error(message);
              }
              break;
          }
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
