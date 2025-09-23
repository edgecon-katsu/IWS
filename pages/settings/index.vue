<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">設定</h1>
      <p class="text-gray-600">システムの各種設定を管理できます。</p>
    </div>

    <!-- 設定メニュー -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- フォーム設定 -->
      <router-link to="/settings/form" class="iws-card hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
            <DocumentTextIcon class="h-6 w-6" />
          </div>
          <div>
            <h3 class="text-lg font-semibold">フォーム設定</h3>
            <p class="text-sm text-gray-600">入力項目・選択肢の管理</p>
          </div>
        </div>
        <div class="text-sm text-gray-500">
          カテゴリ、症状、機器などの選択肢を編集
        </div>
      </router-link>

      <!-- ルーティング設定 -->
      <router-link to="/settings/routing" class="iws-card hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-12 h-12 bg-info/10 text-info rounded-lg flex items-center justify-center">
            <ArrowPathIcon class="h-6 w-6" />
          </div>
          <div>
            <h3 class="text-lg font-semibold">ルーティング設定</h3>
            <p class="text-sm text-gray-600">カテゴリ×優先度の振り分け</p>
          </div>
        </div>
        <div class="text-sm text-gray-500">
          自動承認・担当者割り当てルール
        </div>
      </router-link>

      <!-- SLA設定 -->
      <router-link to="/settings/sla" class="iws-card hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-12 h-12 bg-success/10 text-success rounded-lg flex items-center justify-center">
            <ClockIcon class="h-6 w-6" />
          </div>
          <div>
            <h3 class="text-lg font-semibold">SLA設定</h3>
            <p class="text-sm text-gray-600">応答・復旧時間の目標値</p>
          </div>
        </div>
        <div class="text-sm text-gray-500">
          優先度別のSLA・SLO設定
        </div>
      </router-link>

      <!-- ユーザー管理 -->
      <router-link to="/settings/users" class="iws-card hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-12 h-12 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
            <UsersIcon class="h-6 w-6" />
          </div>
          <div>
            <h3 class="text-lg font-semibold">ユーザー管理</h3>
            <p class="text-sm text-gray-600">アカウント・権限の管理</p>
          </div>
        </div>
        <div class="text-sm text-gray-500">
          ユーザー追加・編集・権限設定
        </div>
      </router-link>

      <!-- 通知設定 -->
      <router-link to="/settings/notifications" class="iws-card hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
            <BellIcon class="h-6 w-6" />
          </div>
          <div>
            <h3 class="text-lg font-semibold">通知設定</h3>
            <p class="text-sm text-gray-600">メール・システム通知の設定</p>
          </div>
        </div>
        <div class="text-sm text-gray-500">
          通知タイミング・送信先の管理
        </div>
      </router-link>

      <!-- システム設定 -->
      <router-link to="/settings/system" class="iws-card hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-12 h-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center">
            <CogIcon class="h-6 w-6" />
          </div>
          <div>
            <h3 class="text-lg font-semibold">システム設定</h3>
            <p class="text-sm text-gray-600">基本設定・メンテナンス</p>
          </div>
        </div>
        <div class="text-sm text-gray-500">
          システム全体の設定・バックアップ
        </div>
      </router-link>
    </div>

    <!-- システム情報 -->
    <div class="mt-8 iws-card">
      <h3 class="text-lg font-semibold mb-4">システム情報</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-medium mb-2">バージョン情報</h4>
          <div class="space-y-1 text-sm text-gray-600">
            <div>IWS Version: 2.1.0</div>
            <div>最終更新: 2025/01/02</div>
            <div>データベース: PostgreSQL 15.2</div>
          </div>
        </div>
        <div>
          <h4 class="font-medium mb-2">統計情報</h4>
          <div class="space-y-1 text-sm text-gray-600">
            <div>総チケット数: 1,247件</div>
            <div>アクティブユーザー: 89名</div>
            <div>平均解決時間: 4.2時間</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  DocumentTextIcon,
  ArrowPathIcon,
  ClockIcon,
  UsersIcon,
  BellIcon,
  CogIcon as CogIcon
} from '@heroicons/vue/24/outline'
</script>