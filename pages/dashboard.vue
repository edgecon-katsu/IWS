<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">ダッシュボード</h1>
      <p class="text-gray-600">KPI・SLA監視とシステム全体の状況を確認できます。</p>
    </div>

    <!-- 期間選択 -->
    <div class="iws-card mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div>
            <label class="label">
              <span class="label-text font-medium">期間</span>
            </label>
            <select v-model="selectedPeriod" class="iws-select">
              <option value="today">今日</option>
              <option value="week">今週</option>
              <option value="month">今月</option>
              <option value="quarter">四半期</option>
            </select>
          </div>
          <div>
            <label class="label">
              <span class="label-text font-medium">カテゴリ</span>
            </label>
            <select v-model="selectedCategory" class="iws-select">
              <option value="all">すべて</option>
              <option value="EUS">EUS</option>
              <option value="保守 — Z-CRM">保守 — Z-CRM</option>
              <option value="保守 — zwei.com">保守 — zwei.com</option>
              <option value="保守 — ネットワーク">保守 — ネットワーク</option>
            </select>
          </div>
        </div>
        <button class="iws-btn-secondary">
          <DocumentArrowDownIcon class="h-4 w-4 mr-2" />
          CSV出力
        </button>
      </div>
    </div>

    <!-- KPIサマリー -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="iws-card">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium text-gray-600">今日のP1</h3>
          <div class="priority-badge-p1">P1</div>
        </div>
        <div class="text-2xl font-bold text-gray-900">1件</div>
        <div class="text-sm text-gray-500">
          MTTA 12分 / MTTR 1h45m
        </div>
      </div>

      <div class="iws-card">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium text-gray-600">EUS消化</h3>
          <div class="badge badge-success badge-sm">80h達成</div>
        </div>
        <div class="text-2xl font-bold text-gray-900">72h</div>
        <div class="text-sm text-gray-500">/ 100h（80h閾値済）</div>
        <progress class="progress progress-primary w-full mt-2" value="72" max="100"></progress>
      </div>

      <div class="iws-card">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium text-gray-600">Z-CRM消化</h3>
          <div class="badge badge-info badge-sm">繰越残 16</div>
        </div>
        <div class="text-2xl font-bold text-gray-900">64</div>
        <div class="text-sm text-gray-500">/ 80（繰越25含）</div>
        <progress class="progress progress-success w-full mt-2" value="64" max="80"></progress>
      </div>

      <div class="iws-card">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium text-gray-600">SLA達成率</h3>
          <div class="badge badge-success badge-sm">99.92%</div>
        </div>
        <div class="text-2xl font-bold text-success">99.92%</div>
        <div class="text-sm text-gray-500">SLA違反: 0件</div>
      </div>
    </div>

    <!-- システム状態 -->
    <div class="iws-card">
      <h3 class="text-lg font-semibold mb-4">システム状態</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 rounded-full bg-success"></div>
            <span class="text-sm font-medium">Z-CRM</span>
          </div>
          <div class="text-sm text-success">オンライン</div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 rounded-full bg-success"></div>
            <span class="text-sm font-medium">zwei.com</span>
          </div>
          <div class="text-sm text-success">オンライン</div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 rounded-full bg-success"></div>
            <span class="text-sm font-medium">メールサーバー</span>
          </div>
          <div class="text-sm text-success">オンライン</div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 rounded-full bg-success"></div>
            <span class="text-sm font-medium">ネットワーク監視</span>
          </div>
          <div class="text-sm text-success">オンライン</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DocumentArrowDownIcon } from '@heroicons/vue/24/outline'

const selectedPeriod = ref('month')
const selectedCategory = ref('all')
</script>