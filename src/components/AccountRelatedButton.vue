<template>
  <button
    @click="executeParentEvent"
    :type="type"
    class="
      text-blue-500
      block
      px-2
      py-1
      border border-blue-500
      font-semibold
      rounded
      hover:bg-blue-100
      mx-auto
    "
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "AccountRelatedButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    executeParentEvent: function () {
      this.$emit("parentEvent");
    },
  },
};
</script>
