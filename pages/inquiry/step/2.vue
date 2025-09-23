<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">新規問い合わせ</h1>
      <p class="text-gray-600">影響範囲と緊急度を選択してください。これにより優先度が自動判定されます。</p>
    </div>

    <!-- ステップインジケーター -->
    <div class="mb-8">
      <ul class="steps steps-horizontal w-full">
        <li class="step step-primary">カテゴリ・対象</li>
        <li class="step step-primary">影響・緊急度</li>
        <li class="step">詳細入力</li>
        <li class="step">確認</li>
      </ul>
    </div>

    <!-- ステップ2: 影響・緊急度 -->
    <div class="iws-card">
      <h2 class="text-lg font-semibold mb-6">ステップ2: 影響・緊急度の設定</h2>
      
      <!-- 影響範囲 -->
      <div class="mb-6">
        <label class="label">
          <span class="label-text font-medium">影響範囲</span>
        </label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="cursor-pointer">
            <input 
              v-model="form.impact" 
              type="radio" 
              value="本人" 
              class="radio radio-primary mr-3"
            />
            <div class="inline-flex items-center">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span>本人のみ</span>
            </div>
          </label>
          
          <label class="cursor-pointer">
            <input 
              v-model="form.impact" 
              type="radio" 
              value="部門" 
              class="radio radio-primary mr-3"
            />
            <div class="inline-flex items-center">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span>部門全体</span>
            </div>
          </label>
          
          <label class="cursor-pointer">
            <input 
              v-model="form.impact" 
              type="radio" 
              value="拠点" 
              class="radio radio-primary mr-3"
            />
            <div class="inline-flex items-center">
              <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span>拠点全体</span>
            </div>
          </label>
          
          <label class="cursor-pointer">
            <input 
              v-model="form.impact" 
              type="radio" 
              value="全社" 
              class="radio radio-primary mr-3"
            />
            <div class="inline-flex items-center">
              <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>全社</span>
            </div>
          </label>
        </div>
      </div>

      <!-- 緊急度メーター -->
      <div class="mb-6">
        <label class="label">
          <span class="label-text font-medium">緊急度</span>
        </label>
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">低</span>
            <span class="text-sm font-medium">{{ getUrgencyLabel(form.urgency) }}</span>
            <span class="text-sm text-gray-600">高</span>
          </div>
          <input 
            v-model="form.urgency"
            type="range" 
            min="1" 
            max="4" 
            step="1"
            class="range range-primary w-full"
          />
          <div class="w-full flex justify-between text-xs px-2 mt-1">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
          <div class="flex justify-between text-xs text-gray-500 mt-1">
            <span>通常</span>
            <span>やや急</span>
            <span>急ぎ</span>
            <span>緊急</span>
          </div>
        </div>
      </div>

      <!-- 業務影響メーター -->
      <div class="mb-6">
        <label class="label">
          <span class="label-text font-medium">業務影響</span>
        </label>
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">軽微</span>
            <span class="text-sm font-medium">{{ getBusinessImpactLabel(form.businessImpact) }}</span>
            <span class="text-sm text-gray-600">重大</span>
          </div>
          <input 
            v-model="form.businessImpact"
            type="range" 
            min="1" 
            max="3" 
            step="1"
            class="range range-warning w-full"
          />
          <div class="w-full flex justify-between text-xs px-2 mt-1">
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
          <div class="flex justify-between text-xs text-gray-500 mt-1">
            <span>軽微な影響</span>
            <span>一部業務に支障</span>
            <span>コア業務停止</span>
          </div>
        </div>
      </div>

      <!-- 回避策 -->
      <div class="mb-6">
        <label class="label">
          <span class="label-text font-medium">回避策</span>
        </label>
        <div class="space-y-3">
          <label class="cursor-pointer flex items-start">
            <input 
              v-model="form.workaround" 
              type="radio" 
              value="なし" 
              class="radio radio-primary mr-3 mt-1"
            />
            <span>なし（業務が完全に停止している）</span>
          </label>
          
          <label class="cursor-pointer flex items-start">
            <input 
              v-model="form.workaround" 
              type="radio" 
              value="あり" 
              class="radio radio-primary mr-3 mt-1"
            />
            <div class="flex-1">
              <span>あり（代替手段で業務継続可能）</span>
              <textarea 
                v-if="form.workaround === 'あり'"
                v-model="form.workaroundDetail"
                class="iws-textarea mt-2"
                placeholder="回避策の詳細を入力してください"
                rows="2"
              ></textarea>
            </div>
          </label>
        </div>
      </div>

      <!-- P判定結果 -->
      <div v-if="calculatedPriority" class="alert mb-6" :class="getPriorityAlertClass(calculatedPriority)">
        <div class="flex items-center">
          <div class="w-16 h-16 rounded-lg flex items-center justify-center mr-4" :class="getPriorityImageBg(calculatedPriority)">
            <img :src="getPriorityImage(calculatedPriority)" :alt="calculatedPriority" class="w-12 h-12 rounded object-cover" />
          </div>
          <div class="ml-4">
            <div class="font-semibold text-lg">{{ getPriorityTitle(calculatedPriority) }}</div>
            <div class="text-sm">{{ getPriorityDescription(calculatedPriority) }}</div>
            <div v-if="calculatedPriority === 'P1'" class="text-sm font-medium text-error mt-1">
              ※ P1は電話併用：03-xxxx-xxxx（送信後に通話メモ必須）
            </div>
          </div>
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
          @click="goToStep3"
          class="iws-btn-primary"
          :disabled="!form.impact || !form.workaround || !form.urgency || !form.businessImpact"
        >
          次へ：詳細入力
          <ArrowRightIcon class="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'

const form = ref({
  impact: '',
  urgency: 2,
  businessImpact: 2,
  workaround: '',
  workaroundDetail: ''
})

// 緊急度ラベル
const getUrgencyLabel = (value) => {
  const labels = {
    1: '通常',
    2: 'やや急',
    3: '急ぎ',
    4: '緊急'
  }
  return labels[value] || '通常'
}

// 業務影響ラベル
const getBusinessImpactLabel = (value) => {
  const labels = {
    1: '軽微な影響',
    2: '一部業務に支障',
    3: 'コア業務停止'
  }
  return labels[value] || '軽微な影響'
}

// P判定ロジック（改良版）
const calculatedPriority = computed(() => {
  if (!form.value.impact || !form.value.workaround || !form.value.urgency || !form.value.businessImpact) {
    return null
  }

  // スコア計算
  let score = 0
  
  // 影響範囲スコア
  const impactScores = { '本人': 1, '部門': 2, '拠点': 3, '全社': 4 }
  score += impactScores[form.value.impact] || 0
  
  // 緊急度スコア
  score += parseInt(form.value.urgency)
  
  // 業務影響スコア
  score += parseInt(form.value.businessImpact)
  
  // 回避策による調整
  if (form.value.workaround === 'なし') {
    score += 2
  }

  // P判定
  if (score >= 10) return 'P1'
  if (score >= 7) return 'P2'
  return 'P3'
})

const getPriorityAlertClass = (priority) => {
  const classes = {
    'P1': 'alert-error',
    'P2': 'alert-warning',
    'P3': 'alert-info'
  }
  return classes[priority] || 'alert-info'
}

const getPriorityImageBg = (priority) => {
  const classes = {
    'P1': 'bg-red-100',
    'P2': 'bg-yellow-100',
    'P3': 'bg-blue-100'
  }
  return classes[priority] || 'bg-gray-100'
}

const getPriorityImage = (priority) => {
  const images = {
    'P1': 'https://images.pexels.com/photos/1161547/pexels-photo-1161547.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    'P2': 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    'P3': 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
  }
  return images[priority] || ''
}

const getPriorityTitle = (priority) => {
  const titles = {
    'P1': '重大障害',
    'P2': '高優先度',
    'P3': '通常優先度'
  }
  return titles[priority] || ''
}

const getPriorityDescription = (priority) => {
  const descriptions = {
    'P1': '一次応答 30分 / 暫定復旧 4時間',
    'P2': '一次応答 1時間 / 復旧 8時間',
    'P3': '一次応答 4時間 / 復旧 24時間'
  }
  return descriptions[priority] || ''
}

const goBack = () => {
  return navigateTo('/inquiry/new')
}

const goToStep3 = () => {
  return navigateTo('/inquiry/step/3')
}
</script>