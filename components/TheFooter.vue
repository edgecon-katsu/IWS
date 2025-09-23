<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
        <!-- 左側：リンク -->
        <div class="flex flex-wrap items-center space-x-6 text-sm">
          <a href="#" class="text-primary hover:text-primary-focus transition-colors">
            SLA・サービスレベル
          </a>
          <a href="#" class="text-primary hover:text-primary-focus transition-colors">
            料金ルール
          </a>
          <a href="#" class="text-primary hover:text-primary-focus transition-colors">
            よくある質問
          </a>
        </div>

        <!-- 右側：緊急時連絡先 -->
        <div class="flex items-center space-x-4">
          <div class="text-sm text-gray-600">
            P1緊急時:
          </div>
          <div class="flex items-center space-x-2">
            <PhoneIcon class="h-4 w-4 text-error" />
            <a 
              href="tel:03-xxxx-xxxx" 
              class="text-error font-medium hover:text-error-focus transition-colors"
            >
              03-xxxx-xxxx
            </a>
          </div>
        </div>
      </div>
      
      <!-- コピーライト -->
      <div class="border-t border-gray-200 mt-4 pt-4">
        <div class="flex flex-wrap items-center justify-between text-xs text-gray-500">
          <div>
            © 2025 ZWEI Inc. All rights reserved. | IWS - Internal Work System
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