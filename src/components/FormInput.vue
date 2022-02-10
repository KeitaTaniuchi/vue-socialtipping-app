<template>
  <div class="mb-8">
    <label :for="type" class="text-sm block">{{ label }}</label>
    <input
      :type="type"
      :id="type"
      :placeholder="placeHolder"
      @input="updateValue"
      class="
        w-full
        py-2
        border-b
        focus:outline-none focus:border-b-2 focus:border-indigo-500
        placeholder-gray-500 placeholder-opacity-50
      "
    />
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      value: "",
    };
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    placeHolder: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateValue: function (e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
