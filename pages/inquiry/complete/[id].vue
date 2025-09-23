<template>
  <div class="max-w-2xl mx-auto">
    <!-- 戻るボタン -->
    <div class="mb-4">
      <button @click="goBack" class="btn btn-ghost btn-sm">
        <ArrowLeftIcon class="h-4 w-4 mr-2" />
        戻る
      </button>
    </div>

    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircleIcon class="h-8 w-8 text-success" />
      </div>
      <h1 class="text-2xl font-bold text-gray-900 mb-2">受付完了</h1>
      <p class="text-gray-600">問い合わせを受け付けました。承認後に対応を開始いたします。</p>
    </div>

    <!-- チケット情報 -->
    <div class="iws-card mb-6">
      <div class="text-center mb-6">
        <div class="text-3xl font-bold text-primary mb-2">{{ $route.params.id }}</div>
        <div class="flex items-center justify-center space-x-4">
          <div class="priority-badge-p2">P2</div>
          <div class="text-sm text-gray-600">一次応答 1時間 / 復旧 8時間</div>
        </div>
      </div>

      <!-- 次のステップ -->
      <div class="space-y-4">
        <div class="flex items-start space-x-3">
          <div class="w-6 h-6 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">1</div>
          <div>
            <div class="font-medium">承認待ち</div>
            <div class="text-sm text-gray-600">承認者による承認をお待ちください</div>
          </div>
        </div>
        <div class="flex items-start space-x-3">
          <div class="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
          <div>
            <div class="font-medium text-gray-500">対応開始</div>
            <div class="text-sm text-gray-500">承認後、担当者が対応を開始します</div>
          </div>
        </div>
        <div class="flex items-start space-x-3">
          <div class="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
          <div>
            <div class="font-medium text-gray-500">解決・完了</div>
            <div class="text-sm text-gray-500">問題解決後、チケットをクローズします</div>
          </div>
        </div>
      </div>
    </div>

    <!-- アクションボタン -->
    <div class="flex flex-col sm:flex-row gap-4">
      <NuxtLink to="/tickets" class="iws-btn-primary flex-1 text-center">
        <TicketIcon class="mr-2 h-4 w-4" />
        マイチケットで確認
      </NuxtLink>
      <NuxtLink to="/inquiry/new" class="iws-btn-secondary flex-1 text-center">
        <PlusCircleIcon class="mr-2 h-4 w-4" />
        新規問い合わせ作成
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { 
  CheckCircleIcon, 
  TicketIcon,
  PlusCircleIcon,
  ArrowLeftIcon
} from '@heroicons/vue/24/outline'

const goBack = () => {
  // 前のページに戻る
  history.back()
}
</script>