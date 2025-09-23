<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
        <!-- 空のスペース -->
        <div></div>
      </div>
      
      <!-- コピーライト -->
      <div class="border-t border-gray-200 mt-4 pt-4">
        <div class="flex flex-wrap items-center justify-between text-xs text-gray-500">
          <div>
            © 2025 IWS - Internal Work System
          </div>
          <div>
            <span class="text-success">● オンライン</span>
            <span class="ml-4">最終更新: {{ lastUpdated }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { PhoneIcon } from '@heroicons/vue/24/outline'

// 最終更新時刻
const lastUpdated = computed(() => {
  return new Date().toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>