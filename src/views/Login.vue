<template>
  <div class="container mx-auto">
    <p class="mb-20 text-center text-4xl">ログイン画面</p>
    <div class="mt-8">
      <form class="w-10/12 mx-auto md:max-w-md">
        <div class="mb-8">
          <label for="email" class="text-sm block">メールアドレス</label>
          <input
            type="email"
            id="email"
            placeholder="メールアドレスを入力してください"
            class="
              w-full
              py-2
              border-b
              focus:outline-none focus:border-b-2 focus:border-indigo-500
              placeholder-gray-500 placeholder-opacity-50
            "
          />
        </div>
        <div class="mb-8">
          <label for="password" class="text-sm block">パスワード</label>
          <input
            type="password"
            id="password"
            placeholder="パスワードを入力してください"
            class="
              w-full
              py-2
              border-b
              focus:outline-none focus:border-b-2 focus:border-indigo-500
              placeholder-gray-500 placeholder-opacity-50
            "
          />
        </div>
        <button
          type="submit"
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
          ログイン
        </button>
        <router-link to="/">新規登録はこちらから</router-link>
      </form>
      <p
        class="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800"
      >
        テストあああ
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>