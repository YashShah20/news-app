<template>
  <v-textarea
    variant="solo"
    rows="1"
    bg-color="white"
    base-color="grey-darken-3"
    class="ma-3 outline-none"
    :model-value="comment.text"
    readonly
    auto-grow
    no-resize
  >
    <template #prepend>
      <v-icon>mdi-account</v-icon>
    </template>
    <template #append-inner>
      <v-icon end @click="reply(comment.parent_id)">mdi-reply</v-icon>
    </template>
    <template #details>
      <v-chip
        variant="text"
        label
        prepend-icon="mdi-eye"
        @click="loadReplies(comment.parent_id)"
      >
        {{ replyCount }} replies
      </v-chip>
    </template>
  </v-textarea>
</template>

<script>
export default {
  name: "the-dummy",
  data() {
    return {
      comment: {
        id: "7",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem reiciendis recusandae, dolores inventore cumque voluptate, a mollitia explicabo impedit, dolorum debitis perferendis molestiae earum? Numquam dolore incidunt eveniet repudiandae rem minima eos, veniam dignissimos debitis earum autem, animi sed hic.",
        created_on: "2023-10-26T05:21:39.296Z",
        news_id: "82",
        user_id: 4,
        parent_id: 4,
        reply_comments: "0",
      },
    };
  },
  computed: {
    replyCount() {
      return +this.comment.reply_comments;
    },
  },
  methods: {
    addComment() {
      alert("hii");
    },
    reply(event) {
      alert(event);
    },
    loadReplies() {},
  },
};
</script>
