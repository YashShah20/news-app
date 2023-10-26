<template>
  <v-textarea
    variant="solo"
    rows="1"
    bg-color="white"
    base-color="grey-darken-3"
    class="ma-3 outline-none"
    :model-value="comment.text"
    :messages="commentTime"
    readonly
    auto-grow
    no-resize
  >
    <template #prepend>
      <v-icon> mdi-account </v-icon>
    </template>
    <template #label>
      <span class="headline text-grey-darken-2">
        {{ comment_user }}
      </span>
    </template>
    <template #append-inner>
      <v-icon end @click="toggleReplyBox()">mdi-reply</v-icon>
    </template>
    <template v-slot:message="{ message }">
      <v-chip prepend-icon="mdi-clock-outline" variant="text">{{
        message
      }}</v-chip>
    </template>
    <template #details>
      <v-chip
        variant="text"
        label
        prepend-icon="mdi-eye"
        v-if="!!replyCount"
        @click="fetchReplies(comment.parent_id)"
      >
        {{ replyCount }} replies
      </v-chip>
    </template>
  </v-textarea>

  <the-reply
    v-if="replyBoxVisibility"
    :news_id="$route.params.news_id"
    :parent_id="comment.id"
    :replying_to="comment_user"
    @add-comment="addReply"
  >
  </the-reply>
  <div class="ml-8" v-if="threadVisibility">
    <comment-box v-for="reply in replies" :key="reply.id" :comment="reply">
    </comment-box>
  </div>
</template>

<script>
import Reply from "@/components/comments/Reply.vue";
import fetch from "@/mixins/fetch";
import { getComments } from "@/services/commentApi";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default {
  mixins: [fetch],
  props: {
    comment: {
      required: true,
      type: Object,
    },
  },
  components: {
    "the-reply": Reply,
  },
  data() {
    return {
      replyBoxVisibility: false,
      threadVisibility: false,
      replies: [],
    };
  },
  methods: {
    fetchReplies() {
      this.threadVisibility = !this.threadVisibility;

      if (this.threadVisibility) {
        const callback = (replies) => {
          this.replies = replies;
        };
        const params = [this.$route.params.news_id, this.comment.id];

        this._fetch(getComments, params, callback);
      }
    },
    addReply(reply) {
      this.replies.unshift(reply);
      this.toggleReplyBox();
    },
    toggleReplyBox() {
      this.replyBoxVisibility = !this.replyBoxVisibility;
    },
  },
  computed: {
    replyCount() {
      return this.replies.length || +this.comment.reply_comments;
    },
    commentTime() {
      return dayjs(this.comment.created_on).fromNow();
    },
    comment_user() {
      return `${this.comment.first_name} ${this.comment.last_name}`;
    },
  },
};
</script>

<style scoped></style>
