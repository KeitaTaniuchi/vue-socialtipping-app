<template>
  <button
    @click="executeParentEvent"
    :type="type"
    class="text-white px-2 bg-green-500 rounded hover:bg-green-300 mx-auto"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "WalletRelatedButton",
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
