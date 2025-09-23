<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">新規問い合わせ</h1>
      <p class="text-gray-600">問題の詳細を入力してください。具体的な情報により迅速な解決が可能になります。</p>
    </div>

    <!-- ステップインジケーター -->
    <div class="mb-8">
      <ul class="steps steps-horizontal w-full">
        <li class="step step-primary">カテゴリ・対象</li>
        <li class="step step-primary">影響・緊急度</li>
        <li class="step step-primary">詳細入力</li>
        <li class="step">確認</li>
      </ul>
    </div>

    <!-- 詳細入力 -->
    <div class="iws-card">
      <h3 class="text-lg font-semibold mb-4">詳細情報</h3>
      
      <!-- 詳細説明 -->
      <div class="mb-6">
        <label class="label">
          <span class="label-text font-medium">詳細説明 <span class="text-error">*</span></span>
        </label>
        <textarea 
          v-model="form.description"
          class="iws-textarea"
          rows="4"
          placeholder="具体的な状況を入力してください"
          required
        ></textarea>
      </div>

      <!-- 発生日時 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label class="label">
            <span class="label-text font-medium">発生日時 <span class="text-error">*</span></span>
          </label>
          <input 
            v-model="form.occurredAt"
            type="datetime-local" 
            class="iws-input"
            required
          />
        </div>
        
        <div>
          <label class="label">
            <span class="label-text font-medium">希望対応日時</span>
          </label>
          <input 
            v-model="form.preferredAt"
            type="datetime-local" 
            class="iws-input"
          />
        </div>
      </div>

      <!-- 費用同意 -->
      <div class="mb-6">
        <label class="cursor-pointer flex items-start">
          <input v-model="form.costAgreement" type="checkbox" class="checkbox checkbox-primary mr-3 mt-1" required />
          <div class="flex-1">
            <span class="font-medium">費用同意 <span class="text-error">*</span></span>
            <div class="text-sm text-gray-600 mt-1">
              料金体系に同意します。
            </div>
          </div>
        </label>
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
          @click="goToStep4"
          class="iws-btn-primary"
          :disabled="!isFormValid"
        >
          次へ：確認画面
          <ArrowRightIcon class="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'

const form = ref({
  description: '',
  occurredAt: '',
  preferredAt: '',
  costAgreement: false
})

const isFormValid = computed(() => {
  return form.value.description && form.value.occurredAt && form.value.costAgreement
})

const goBack = () => {
  return navigateTo('/inquiry/step/2')
}

const goToStep4 = () => {
  return navigateTo('/inquiry/step/4')
}
</script>