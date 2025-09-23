<template>
  <div class="bg-white border-b border-gray-200 px-4 py-3">
    <div class="container mx-auto flex items-center justify-between">
      <!-- パンくずナビ -->
      <nav class="flex items-center space-x-2 text-sm">
        <router-link to="/" class="text-primary hover:text-primary-focus">
          ホーム
        </router-link>
        <ChevronRightIcon class="h-4 w-4 text-gray-400" />
        <span 
          v-for="(crumb, index) in breadcrumbs" 
          :key="index"
          class="flex items-center space-x-2"
        >
          <router-link 
            v-if="crumb.to"
            :to="crumb.to"
            class="text-primary hover:text-primary-focus"
          >
            {{ crumb.text }}
          </router-link>
          <span v-else class="text-gray-600">{{ crumb.text }}</span>
          <ChevronRightIcon 
            v-if="index < breadcrumbs.length - 1"
            class="h-4 w-4 text-gray-400" 
          />
        </span>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

const route = useRoute()

// パンくずナビの生成
const breadcrumbs = computed(() => {
  const path = route.path
  const crumbs = []

  if (path === '/') {
    crumbs.push({ text: 'ダッシュボード', to: null })
  } else if (path === '/inquiry/new') {
    crumbs.push({ text: '新規問い合わせ', to: null })
  } else if (path.startsWith('/inquiry/step')) {
    crumbs.push({ text: '新規問い合わせ', to: '/inquiry/new' })
    const step = path.split('/').pop()
    if (step === '2') crumbs.push({ text: 'ステップ2: 影響・緊急度', to: null })
    if (step === '3') crumbs.push({ text: 'ステップ3: 詳細入力', to: null })
    if (step === '4') crumbs.push({ text: 'ステップ4: 確認', to: null })
  } else if (path === '/tickets') {
    crumbs.push({ text: 'マイチケット', to: null })
  } else if (path === '/approvals') {
    crumbs.push({ text: '承認待ち', to: null })
  } else if (path === '/settings') {
    crumbs.push({ text: '設定', to: null })
  }

  return crumbs
})
</script>