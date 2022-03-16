<template>
  <button type="button" class="ml-2" @click="updateType">
    <font-awesome-icon :icon="updateIcon" />
  </button>
</template>

<script>
export default {
  name: "TogglePasswordDisplayButton",
  data() {
    return {
      isChecked: false,
    };
  },
  computed: {
    updateIcon() {
      return this.isChecked ? "fa-solid fa-eye" : "fa-solid fa-eye-slash";
    },
  },
  methods: {
    updateType() {
      this.isChecked = !this.isChecked;
      this.$emit("updateType", this.isChecked ? "text" : "password");
    },
  },
};
</script>
