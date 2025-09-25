<template>
  <div class="min-h-screen bg-base-200" data-theme="iws" v-if="isInitialized">
    <!-- ログイン画面はレイアウトなし -->
    <div v-if="route.path === '/login'">
      <slot />
    </div>

    <!-- ログイン済みの通常レイアウト -->
    <div v-else-if="isAuthenticated" class="flex">
      <!-- サイドバー -->
      <TheSidebar />

      <!-- メインコンテンツ -->
      <div class="flex-1 ml-64">
        <!-- ヘッダー -->
        <TheHeader />

        <!-- サブヘッダー -->
        <div class="pt-16">
          <TheSubHeader />
        </div>

        <!-- ページコンテンツ -->
        <main class="container mx-auto px-4 py-6">
          <slot />
        </main>

        <!-- フッター -->
        <TheFooter />
      </div>
    </div>

    <!-- 未ログインの場合 -->
    <div v-else>
      <slot />
    </div>
  </div>

  <!-- 初期化中の表示 -->
  <div v-else class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="text-center">
      <div class="loading loading-spinner loading-lg text-primary mb-4"></div>
      <p class="text-gray-600">読み込み中...</p>
    </div>
  </div>
</template>

<script setup>
const { isAuthenticated, checkAuth } = useAuth()
const route = useRoute()

const isInitialized = ref(false)

// 初期化処理
onMounted(async () => {
  // ログイン状態の確認
  await checkAuth()
  isInitialized.value = true
})
</script>