<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">新規問い合わせ</h1>
      <p class="text-gray-600">入力内容を確認してください。問題がなければ承認依頼を送信します。</p>
    </div>

    <!-- ステップインジケーター -->
    <div class="mb-8">
      <ul class="steps steps-horizontal w-full">
        <li class="step step-primary">カテゴリ・対象</li>
        <li class="step step-primary">影響・緊急度</li>
        <li class="step step-primary">詳細入力</li>
        <li class="step step-primary">確認</li>
      </ul>
    </div>

    <!-- 確認画面 -->
    <div class="space-y-6">
      <!-- 基本情報 -->
      <div class="iws-card">
        <h2 class="text-lg font-semibold mb-4">基本情報</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div class="text-sm text-gray-600">カテゴリ</div>
            <div class="font-medium">EUS</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">対象</div>
            <div class="font-medium">端末・アカウント</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">優先度</div>
            <div class="priority-badge-p2">P2</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">発生日時</div>
            <div class="font-medium">2025/01/02 14:05</div>
          </div>
        </div>
      </div>

      <!-- 詳細情報 -->
      <div class="iws-card">
        <h2 class="text-lg font-semibold mb-4">詳細情報</h2>
        <div class="space-y-4">
          <div>
            <div class="text-sm text-gray-600">詳細説明</div>
            <div class="font-medium whitespace-pre-wrap">Outlook送受信不可の問題が発生しています。</div>
          </div>
        </div>
      </div>

      <!-- SLA情報 -->
      <div class="alert alert-info">
        <InformationCircleIcon class="h-5 w-5" />
        <div>
          <div class="font-semibold">P2 - 高優先度</div>
          <div class="text-sm">一次応答 1時間 / 復旧 8時間</div>
        </div>
      </div>

      <!-- ナビゲーション -->
      <div class="flex justify-between">
        <button 
          @click="goBack"
          class="iws-btn-secondary"
        >
          <ArrowLeftIcon class="mr-2 h-4 w-4" />
          戻る
        </button>
        
        <button 
          @click="submitTicket"
          class="iws-btn-primary"
          :disabled="submitting"
        >
          <span v-if="submitting" class="loading loading-spinner loading-sm mr-2"></span>
          承認依頼を送信
          <PaperAirplaneIcon class="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeftIcon, PaperAirplaneIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'

const submitting = ref(false)

const goBack = () => {
  return navigateTo('/inquiry/step/3')
}

const submitTicket = async () => {
  submitting.value = true
  
  try {
    // チケット作成のシミュレーション
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 完了画面へ遷移
    return navigateTo('/inquiry/complete/IWS-2025-000490')
  } catch (error) {
    console.error('チケット作成エラー:', error)
  } finally {
    submitting.value = false
  }
}
</script>