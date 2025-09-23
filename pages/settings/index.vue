<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">設定</h1>
      <p class="text-gray-600">マスタデータの設定を管理できます。</p>
    </div>

    <!-- 設定メニューカード -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- フォーム設定 -->
      <router-link to="/settings/form" class="iws-card hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <DocumentTextIcon class="h-6 w-6 text-primary" />
          </div>
          <h3 class="text-lg font-semibold">フォーム設定</h3>
        </div>
        <p class="text-gray-600 text-sm">カテゴリ・対象・優先度の選択肢を管理</p>
      </router-link>

      <!-- ルーティング設定 -->
      <router-link to="/settings/routing" class="iws-card hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
            <ArrowPathIcon class="h-6 w-6 text-info" />
          </div>
          <h3 class="text-lg font-semibold">ルーティング設定</h3>
        </div>
        <p class="text-gray-600 text-sm">自動承認・担当者割り当てルールを管理</p>
      </router-link>

      <!-- SLA設定 -->
      <router-link to="/settings/sla" class="iws-card hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <ClockIcon class="h-6 w-6 text-warning" />
          </div>
          <h3 class="text-lg font-semibold">SLA設定</h3>
        </div>
        <p class="text-gray-600 text-sm">応答・復旧時間の目標値を管理</p>
      </router-link>

      <!-- ユーザー管理 -->
      <router-link to="/settings/users" class="iws-card hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <UsersIcon class="h-6 w-6 text-success" />
          </div>
          <h3 class="text-lg font-semibold">ユーザー管理</h3>
        </div>
        <p class="text-gray-600 text-sm">システムユーザーのアカウント・権限を管理</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { 
  DocumentTextIcon,
  ArrowPathIcon,
  ClockIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'
</script>