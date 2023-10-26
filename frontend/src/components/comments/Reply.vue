<template>
  <v-textarea
    class="ma-3 ml-8"
    variant="solo"
    bg-color="grey-lighten-2"
    base-color="grey-darken-3"
    prepend-icon="mdi-account"
    append-inner-icon="mdi-send"
    auto-grow
    counter="500"
    rows="2"
    label="Add Comment"
    :messages="replying_to"
    @click:appendInner="addComment"
    v-model="comment.text"
    :error-messages="v$.comment.text.$errors.map((e) => e.$message)"
    @input="v$.comment.text.$touch"
    :class="{ 'mb-4': v$.comment.text.$invalid }"
  >
    <template v-slot:message="{ message }">
      replying to <span class="font-weight-bold">{{ message }} </span>
    </template>
  </v-textarea>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import fetch from "@/mixins/fetch";
import { addComment } from "@/services/commentApi";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "the-reply",
  props: {
    news_id: { type: String, required: true },
    parent_id: { type: String, required: false, default: null },
    replying_to: String,
  },
  mixins: [fetch],
  data() {
    return {
      comment: {
        text: null,
      },
    };
  },
  validations() {
    return {
      comment: {
        text: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(500),
        },
      },
    };
  },
  methods: {
    addComment() {
      this.v$.comment.$touch();

      if (this.v$.comment.$invalid) {
        return;
      }

      const callback = (comment) => {
        this.$emit("add-comment", {
          ...comment,
          reply_comments: "0",
          first_name: this.user.first_name,
          last_name: this.user.last_name,
        });
        this.v$.comment.$reset();
        this.reset();
      };

      const params = [this.news_id, this.parent_id, this.comment];

      this._fetch(addComment, params, callback);
    },
    reset() {
      this.comment = {
        text: null,
      };
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
