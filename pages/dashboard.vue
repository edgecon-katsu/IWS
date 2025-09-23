<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">ダッシュボード</h1>
      <p class="text-gray-600">システムデータのCSV出力が可能です。</p>
    </div>

    <!-- CSV出力 -->
    <div class="iws-card">
      <h2 class="text-lg font-semibold mb-4">データ出力</h2>
      <button class="iws-btn-primary">
        <DocumentArrowDownIcon class="h-4 w-4 mr-2" />
        CSV出力
      </button>
    </div>
  </div>
</template>

<script setup>
import { DocumentArrowDownIcon } from '@heroicons/vue/24/outline'
</script>