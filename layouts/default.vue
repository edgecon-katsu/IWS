<template>
  <div class="min-h-screen bg-base-200" data-theme="iws" v-if="isInitialized">
    <!-- ログイン画面またはログインしていない場合はレイアウトなし -->
    <div v-if="route.path === '/login' || !isLoggedIn">
      <slot />
    </div>
    
    <!-- ログイン済みの通常レイアウト -->
    <div v-else-if="isLoggedIn" class="flex">
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
const { user } = useAuth()
const route = useRoute()

const isInitialized = ref(false)
const isLoggedIn = computed(() => !!user.value)

// 初期化処理
onMounted(() => {
  // ログイン状態の確認が完了したら初期化完了とする
  isInitialized.value = true
  
  // ログインしていない場合はログインページにリダイレクト
  if (!isLoggedIn.value && route.path !== '/login') {
    navigateTo('/login')
  }
})

// ログイン状態の変化を監視
watch(isLoggedIn, (newValue) => {
  if (!newValue && route.path !== '/login') {
    navigateTo('/login')
  }
}, { immediate: false })
</script>