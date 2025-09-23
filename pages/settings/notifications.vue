<template>
  <div>
    <!-- 戻るボタン -->
    <div class="mb-4">
      <button @click="goBack" class="btn btn-ghost btn-sm">
        <ArrowLeftIcon class="h-4 w-4 mr-2" />
        戻る
      </button>
    </div>

    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">通知設定</h1>
      <p class="text-gray-600">メール・システム通知の設定を管理します。</p>
    </div>

    <!-- メール通知設定 -->
    <div class="iws-card mb-6">
      <h2 class="text-lg font-semibold mb-4">メール通知設定</h2>
      
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">新規チケット作成時</div>
            <div class="text-sm text-gray-600">チケットが新規作成された時の通知</div>
          </div>
          <input type="checkbox" v-model="emailSettings.newTicket" class="checkbox checkbox-primary" />
        </div>
        
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">チケット状態変更時</div>
            <div class="text-sm text-gray-600">チケットの状態が変更された時の通知</div>
          </div>
          <input type="checkbox" v-model="emailSettings.statusChange" class="checkbox checkbox-primary" />
        </div>
        
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">承認依頼時</div>
            <div class="text-sm text-gray-600">承認が必要なチケットの通知</div>
          </div>
          <input type="checkbox" v-model="emailSettings.approvalRequest" class="checkbox checkbox-primary" />
        </div>
        
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">SLA警告時</div>
            <div class="text-sm text-gray-600">SLA期限が近づいた時の通知</div>
          </div>
          <input type="checkbox" v-model="emailSettings.slaWarning" class="checkbox checkbox-primary" />
        </div>
        
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">P1緊急通知</div>
            <div class="text-sm text-gray-600">P1チケット発生時の緊急通知</div>
          </div>
          <input type="checkbox" v-model="emailSettings.p1Emergency" class="checkbox checkbox-primary" />
        </div>
      </div>
    </div>

    <!-- 通知先設定 -->
    <div class="iws-card mb-6">
      <h2 class="text-lg font-semibold mb-4">通知先設定</h2>
      
      <div class="space-y-4">
        <div>
          <label class="label">
            <span class="label-text font-medium">P1緊急通知先</span>
          </label>
          <textarea 
            v-model="notificationTargets.p1Emergency"
            class="iws-textarea"
            rows="3"
            placeholder="support@zwei.com, manager@zwei.com"
          ></textarea>
          <div class="text-xs text-gray-500 mt-1">
            複数のメールアドレスはカンマ区切りで入力
          </div>
        </div>
        
        <div>
          <label class="label">
            <span class="label-text font-medium">承認者通知先</span>
          </label>
          <textarea 
            v-model="notificationTargets.approvers"
            class="iws-textarea"
            rows="3"
            placeholder="yamada@zwei.com, manager@zwei.com"
          ></textarea>
        </div>
        
        <div>
          <label class="label">
            <span class="label-text font-medium">管理者通知先</span>
          </label>
          <textarea 
            v-model="notificationTargets.admins"
            class="iws-textarea"
            rows="3"
            placeholder="admin@zwei.com, support@zwei.com"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- システム通知設定 -->
    <div class="iws-card mb-6">
      <h2 class="text-lg font-semibold mb-4">システム通知設定</h2>
      
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">ブラウザ通知</div>
            <div class="text-sm text-gray-600">ブラウザのプッシュ通知を有効にする</div>
          </div>
          <input type="checkbox" v-model="systemSettings.browserNotification" class="checkbox checkbox-primary" />
        </div>
        
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">音声通知</div>
            <div class="text-sm text-gray-600">P1チケット発生時の音声アラート</div>
          </div>
          <input type="checkbox" v-model="systemSettings.soundAlert" class="checkbox checkbox-primary" />
        </div>
        
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">通知頻度制限</div>
            <div class="text-sm text-gray-600">同一チケットの通知間隔を制限</div>
          </div>
          <select v-model="systemSettings.notificationInterval" class="select select-bordered">
            <option value="0">制限なし</option>
            <option value="5">5分間隔</option>
            <option value="15">15分間隔</option>
            <option value="30">30分間隔</option>
            <option value="60">1時間間隔</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 保存ボタン -->
    <div class="flex justify-end">
      <button @click="saveSettings" class="iws-btn-primary">
        <CheckIcon class="h-4 w-4 mr-2" />
        設定を保存
      </button>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'

const emailSettings = ref({
  newTicket: true,
  statusChange: true,
  approvalRequest: true,
  slaWarning: true,
  p1Emergency: true
})

const notificationTargets = ref({
  p1Emergency: 'support@zwei.com, manager@zwei.com',
  approvers: 'yamada@zwei.com, manager@zwei.com',
  admins: 'admin@zwei.com, support@zwei.com'
})

const systemSettings = ref({
  browserNotification: true,
  soundAlert: true,
  notificationInterval: 15
})

const saveSettings = () => {
  // 設定保存処理
  console.log('Email Settings:', emailSettings.value)
  console.log('Notification Targets:', notificationTargets.value)
  console.log('System Settings:', systemSettings.value)
  
  alert('通知設定を保存しました')
}

const goBack = () => {
  return navigateTo('/settings')
}
</script>