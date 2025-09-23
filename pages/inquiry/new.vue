<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">新規問い合わせ</h1>
      <p class="text-gray-600">問題やご要望を登録してください。適切なカテゴリを選択することで、迅速な対応が可能になります。</p>
    </div>

    <!-- ステップインジケーター -->
    <div class="mb-8">
      <ul class="steps steps-horizontal w-full">
        <li class="step step-primary">カテゴリ・対象</li>
        <li class="step">影響・緊急度</li>
        <li class="step">詳細入力</li>
        <li class="step">確認</li>
      </ul>
    </div>

    <!-- ステップ1: カテゴリ・対象選択 -->
    <div class="iws-card">
      <h2 class="text-lg font-semibold mb-6">ステップ1: カテゴリ・対象選択</h2>
      
      <!-- カテゴリ選択 -->
      <div class="mb-6">
        <label class="label">
          <span class="label-text font-medium">カテゴリ</span>
        </label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="cursor-pointer">
            <input 
              v-model="form.category" 
              type="radio" 
              value="EUS" 
              class="radio radio-primary mr-3"
            />
            <div class="inline-flex items-center">
              <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <img src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" 
                     alt="PC・IT機器" class="w-12 h-12 rounded object-cover" />
              </div>
              <div>
                <div class="flex items-center">
                  <div class="badge badge-primary badge-sm mr-2">推奨</div>
                  <span class="font-medium">EUS（社内ITサポート）</span>
                </div>
                <div class="text-sm text-gray-500 mt-1">
                  端末・アカウント・ソフトウェアの問題
                </div>
              </div>
            </div>
          </label>
          
          <label class="cursor-pointer">
            <input 
              v-model="form.category" 
              type="radio" 
              value="保守 — Z-CRM" 
              class="radio radio-primary mr-3"
            />
            <div class="inline-flex items-center">
              <div class="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <img src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" 
                     alt="顧客管理システム" class="w-12 h-12 rounded object-cover" />
              </div>
              <div>
                <span class="font-medium">保守 — Z-CRM</span>
                <div class="text-sm text-gray-500 mt-1">
                  顧客管理システムの修正・操作代行
                </div>
              </div>
            </div>
          </label>
          
          <label class="cursor-pointer">
            <input 
              v-model="form.category" 
              type="radio" 
              value="保守 — zwei.com" 
              class="radio radio-primary mr-3"
            />
            <div class="inline-flex items-center">
              <div class="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <img src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" 
                     alt="Webサイト" class="w-12 h-12 rounded object-cover" />
              </div>
              <div>
                <span class="font-medium">保守 — zwei.com</span>
                <div class="text-sm text-gray-500 mt-1">
                  Webサイトの障害・コンテンツ更新
                </div>
              </div>
            </div>
          </label>
          
          <label class="cursor-pointer">
            <input 
              v-model="form.category" 
              type="radio" 
              value="保守 — ネットワーク" 
              class="radio radio-primary mr-3"
            />
            <div class="inline-flex items-center">
              <div class="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <img src="https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" 
                     alt="ネットワーク機器" class="w-12 h-12 rounded object-cover" />
              </div>
              <div>
                <span class="font-medium">保守 — ネットワーク</span>
                <div class="text-sm text-gray-500 mt-1">
                  拠点・店舗のネットワーク障害
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- 対象選択 -->
      <div class="mb-6">
        <label class="label">
          <span class="label-text font-medium">対象</span>
        </label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="cursor-pointer">
            <input 
              v-model="form.target" 
              type="radio" 
              value="端末・アカウント" 
              class="radio radio-primary mr-3"
            />
            <div class="inline-flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <img src="https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop" 
                     alt="PC端末" class="w-8 h-8 rounded object-cover" />
              </div>
              <span>端末・アカウント</span>
            </div>
          </label>
          
          <label class="cursor-pointer">
            <input 
              v-model="form.target" 
              type="radio" 
              value="アプリ（Z-CRM/他）" 
              class="radio radio-primary mr-3"
            />
            <div class="inline-flex items-center">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <img src="https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop" 
                     alt="アプリケーション" class="w-8 h-8 rounded object-cover" />
              </div>
              <span>アプリ（Z-CRM/他）</span>
            </div>
          </label>
          
          <label class="cursor-pointer">
            <input 
              v-model="form.target" 
              type="radio" 
              value="サイト（zwei.com）" 
              class="radio radio-primary mr-3"
            />
            <div class="inline-flex items-center">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <img src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop" 
                     alt="Webサイト" class="w-8 h-8 rounded object-cover" />
              </div>
              <span>サイト（zwei.com）</span>
            </div>
          </label>
          
          <label class="cursor-pointer">
            <input 
              v-model="form.target" 
              type="radio" 
              value="拠点ネットワーク" 
              class="radio radio-primary mr-3"
            />
            <div class="inline-flex items-center">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <img src="https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop" 
                     alt="ネットワーク" class="w-8 h-8 rounded object-cover" />
              </div>
              <span>拠点ネットワーク</span>
            </div>
          </label>
        </div>
      </div>

      <!-- 次へボタン -->
      <div class="flex justify-end">
        <button 
          @click="goToStep2"
          class="iws-btn-primary"
          :disabled="!form.category || !form.target"
        >
          次へ：影響・緊急度の設定
          <ArrowRightIcon class="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

const form = ref({
  category: 'EUS',
  target: ''
})

const goToStep2 = () => {
  navigateTo('/inquiry/step/2')
}
</script>