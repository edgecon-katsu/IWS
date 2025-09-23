<template>
  <div>
    <!-- 戻るボタン -->
    <div class="mb-4">
      <button @click="goBack" class="btn btn-ghost btn-sm">
        <ArrowLeftIcon class="h-4 w-4 mr-2" />
        戻る
      </button>
    </div>

    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">テーマ設定</h1>
      <p class="text-gray-600">システムの色テーマを選択できます。</p>
    </div>

    <div class="iws-card">
      <h2 class="text-lg font-semibold mb-4">カラーパターン選択</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="theme in themes" 
          :key="theme.name"
          @click="selectTheme(theme)"
          class="cursor-pointer border-2 rounded-lg p-4 transition-all duration-200"
          :class="selectedTheme === theme.name ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-medium">{{ theme.displayName }}</h3>
            <div v-if="selectedTheme === theme.name" class="badge badge-primary">選択中</div>
          </div>
          
          <!-- カラープレビュー -->
          <div class="flex space-x-2 mb-3">
            <div 
              class="w-8 h-8 rounded"
              :style="{ backgroundColor: theme.colors.primary }"
            ></div>
            <div 
              class="w-8 h-8 rounded"
              :style="{ backgroundColor: theme.colors.secondary }"
            ></div>
            <div 
              class="w-8 h-8 rounded"
              :style="{ backgroundColor: theme.colors.accent }"
            ></div>
            <div 
              class="w-8 h-8 rounded"
              :style="{ backgroundColor: theme.colors.success }"
            ></div>
          </div>
          
          <p class="text-sm text-gray-600">{{ theme.description }}</p>
        </div>
      </div>
      
      <div class="mt-6 flex justify-end">
        <button 
          @click="applyTheme"
          class="iws-btn-primary"
          :disabled="!selectedTheme"
        >
          テーマを適用
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

// onMountedはNuxt 3で自動インポートされる

const selectedTheme = ref('')

const themes = ref([
  {
    name: 'iws-blue',
    displayName: 'IWSブルー（デフォルト）',
    description: 'IWSの標準カラーテーマ',
    colors: {
      primary: '#0066cc',
      secondary: '#003366',
      accent: '#f97316',
      success: '#10b981'
    }
  },
  {
    name: 'iws-green',
    displayName: 'IWSグリーン',
    description: '落ち着いたグリーンベースのテーマ',
    colors: {
      primary: '#059669',
      secondary: '#064e3b',
      accent: '#f59e0b',
      success: '#10b981'
    }
  },
  {
    name: 'iws-purple',
    displayName: 'IWSパープル',
    description: 'モダンなパープルベースのテーマ',
    colors: {
      primary: '#7c3aed',
      secondary: '#4c1d95',
      accent: '#f97316',
      success: '#10b981'
    }
  },
  {
    name: 'iws-red',
    displayName: 'IWSレッド',
    description: 'エネルギッシュなレッドベースのテーマ',
    colors: {
      primary: '#dc2626',
      secondary: '#7f1d1d',
      accent: '#f59e0b',
      success: '#10b981'
    }
  },
  {
    name: 'iws-dark',
    displayName: 'IWSダーク',
    description: 'ダークモードテーマ',
    colors: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#f59e0b',
      success: '#10b981'
    }
  }
])

const selectTheme = (theme) => {
  selectedTheme.value = theme.name
}

const applyTheme = () => {
  if (!selectedTheme.value) return
  
  // LocalStorageに保存
  localStorage.setItem('iws-theme', selectedTheme.value)
  
  // DaisyUIのテーマを動的に変更
  document.documentElement.setAttribute('data-theme', selectedTheme.value)
  
  // 成功メッセージ
  alert('テーマが適用されました！')
}

const loadSavedTheme = () => {
  const savedTheme = localStorage.getItem('iws-theme')
  if (savedTheme) {
    selectedTheme.value = savedTheme
    document.documentElement.setAttribute('data-theme', savedTheme)
  } else {
    // ランダムテーマを選択
    const randomTheme = themes.value[Math.floor(Math.random() * themes.value.length)]
    selectedTheme.value = randomTheme.name
    document.documentElement.setAttribute('data-theme', randomTheme.name)
    localStorage.setItem('iws-theme', randomTheme.name)
  }
}

onMounted(() => {
  loadSavedTheme()
})

const goBack = () => {
  // 前のページに戻る
  history.back()
}
</script>