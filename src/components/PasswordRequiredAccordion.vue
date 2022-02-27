<template>
  <collapse-transition>
    <ul
      class="
        list-decimal list-inside
        my-4
        p-2
        border border-blue-500
        rounded
        space-y-2
      "
    >
      <li>12文字以上</li>
      <li>ユーザー名・メールアドレスと異なる文字列</li>
      <li>
        下記に示す「使用可能な文字列」を最低一文字ずつ含む
        <ul class="list-disc list-inside ml-4">
          <li>半角英字(大文字・小文字両方)</li>
          <li>半角数字</li>
        </ul>
      </li>
    </ul>
  </collapse-transition>
</template>

<script>
import { CollapseTransition } from "@ivanv/vue-collapse-transition";
export default {
  name: "PasswordRequiredAccordion",
  components: {
    CollapseTransition,
  },
};
</script>
