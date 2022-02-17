<template>
  <div>
    <label :for="type" class="block">{{ label }}</label>
    <input
      :type="type"
      :id="type"
      :placeholder="placeHolder"
      @input="updateValue"
      class="
        w-11/12
        pt-3
        border-b
        focus:outline-none focus:border-b-2 focus:border-indigo-500
        placeholder-gray-500 placeholder-opacity-50
      "
    /><slot></slot>
  </div>
</template>

<script>
export default {
  name: "FormInput",
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
