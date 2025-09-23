<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">システム設定</h1>
      <p class="text-gray-600">システム全体の基本設定・メンテナンス機能を管理します。</p>
    </div>

    <!-- 基本設定 -->
    <div class="iws-card mb-6">
      <h2 class="text-lg font-semibold mb-4">基本設定</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="label">
            <span class="label-text font-medium">システム名</span>
          </label>
          <input v-model="basicSettings.systemName" type="text" class="iws-input" />
        </div>
        
        <div>
          <label class="label">
            <span class="label-text font-medium">管理者メール</span>
          </label>
          <input v-model="basicSettings.adminEmail" type="email" class="iws-input" />
        </div>
        
        <div>
          <label class="label">
            <span class="label-text font-medium">タイムゾーン</span>
          </label>
          <select v-model="basicSettings.timezone" class="iws-select">
            <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York (EST)</option>
          </select>
        </div>
        
        <div>
          <label class="label">
            <span class="label-text font-medium">言語</span>
          </label>
          <select v-model="basicSettings.language" class="iws-select">
            <option value="ja">日本語</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>

    <!-- セキュリティ設定 -->
    <div class="iws-card mb-6">
      <h2 class="text-lg font-semibold mb-4">セキュリティ設定</h2>
      
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">2要素認証</div>
            <div class="text-sm text-gray-600">ログイン時の2要素認証を有効にする</div>
          </div>
          <input type="checkbox" v-model="securitySettings.twoFactorAuth" class="checkbox checkbox-primary" />
        </div>
        
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">セッションタイムアウト</div>
            <div class="text-sm text-gray-600">自動ログアウトまでの時間</div>
          </div>
          <select v-model="securitySettings.sessionTimeout" class="select select-bordered">
            <option value="30">30分</option>
            <option value="60">1時間</option>
            <option value="120">2時間</option>
            <option value="480">8時間</option>
          </select>
        </div>
        
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">IPアドレス制限</div>
            <div class="text-sm text-gray-600">特定のIPアドレスからのみアクセス許可</div>
          </div>
          <input type="checkbox" v-model="securitySettings.ipRestriction" class="checkbox checkbox-primary" />
        </div>
        
        <div v-if="securitySettings.ipRestriction">
          <label class="label">
            <span class="label-text font-medium">許可IPアドレス</span>
          </label>
          <textarea 
            v-model="securitySettings.allowedIPs"
            class="iws-textarea"
            rows="3"
            placeholder="192.168.1.0/24&#10;10.0.0.1&#10;203.0.113.0/24"
          ></textarea>
          <div class="text-xs text-gray-500 mt-1">
            1行に1つのIPアドレスまたはCIDR記法で入力
          </div>
        </div>
      </div>
    </div>

    <!-- バックアップ設定 -->
    <div class="iws-card mb-6">
      <h2 class="text-lg font-semibold mb-4">バックアップ設定</h2>
      
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">自動バックアップ</div>
            <div class="text-sm text-gray-600">定期的な自動バックアップを有効にする</div>
          </div>
          <input type="checkbox" v-model="backupSettings.autoBackup" class="checkbox checkbox-primary" />
        </div>
        
        <div v-if="backupSettings.autoBackup" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="label">
              <span class="label-text font-medium">バックアップ頻度</span>
            </label>
            <select v-model="backupSettings.frequency" class="iws-select">
              <option value="daily">毎日</option>
              <option value="weekly">毎週</option>
              <option value="monthly">毎月</option>
            </select>
          </div>
          
          <div>
            <label class="label">
              <span class="label-text font-medium">保存期間</span>
            </label>
            <select v-model="backupSettings.retention" class="iws-select">
              <option value="7">7日間</option>
              <option value="30">30日間</option>
              <option value="90">90日間</option>
              <option value="365">1年間</option>
            </select>
          </div>
        </div>
        
        <div class="flex space-x-4">
          <button @click="createBackup" class="btn btn-outline btn-primary">
            <DocumentArrowDownIcon class="h-4 w-4 mr-2" />
            手動バックアップ作成
          </button>
          <button @click="restoreBackup" class="btn btn-outline btn-warning">
            <DocumentArrowUpIcon class="h-4 w-4 mr-2" />
            バックアップから復元
          </button>
        </div>
      </div>
    </div>

    <!-- メンテナンス -->
    <div class="iws-card mb-6">
      <h2 class="text-lg font-semibold mb-4">メンテナンス</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="text-center p-4 border border-gray-200 rounded-lg">
          <div class="text-2xl font-bold text-primary">1,247</div>
          <div class="text-sm text-gray-600">総チケット数</div>
        </div>
        
        <div class="text-center p-4 border border-gray-200 rounded-lg">
          <div class="text-2xl font-bold text-success">89</div>
          <div class="text-sm text-gray-600">アクティブユーザー</div>
        </div>
        
        <div class="text-center p-4 border border-gray-200 rounded-lg">
          <div class="text-2xl font-bold text-info">2.1GB</div>
          <div class="text-sm text-gray-600">データベースサイズ</div>
        </div>
        
        <div class="text-center p-4 border border-gray-200 rounded-lg">
          <div class="text-2xl font-bold text-warning">99.92%</div>
          <div class="text-sm text-gray-600">稼働率</div>
        </div>
      </div>
      
      <div class="mt-6 flex flex-wrap gap-4">
        <button @click="clearCache" class="btn btn-outline">
          <TrashIcon class="h-4 w-4 mr-2" />
          キャッシュクリア
        </button>
        <button @click="optimizeDatabase" class="btn btn-outline">
          <CogIcon class="h-4 w-4 mr-2" />
          データベース最適化
        </button>
        <button @click="exportLogs" class="btn btn-outline">
          <DocumentTextIcon class="h-4 w-4 mr-2" />
          ログエクスポート
        </button>
        <button @click="systemCheck" class="btn btn-outline btn-info">
          <CheckCircleIcon class="h-4 w-4 mr-2" />
          システムチェック
        </button>
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
import { 
  CheckIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  TrashIcon,
  CogIcon,
  DocumentTextIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

const basicSettings = ref({
  systemName: 'IWS - Internal Work System',
  adminEmail: 'admin@zwei.com',
  timezone: 'Asia/Tokyo',
  language: 'ja'
})

const securitySettings = ref({
  twoFactorAuth: false,
  sessionTimeout: 60,
  ipRestriction: false,
  allowedIPs: ''
})

const backupSettings = ref({
  autoBackup: true,
  frequency: 'daily',
  retention: 30
})

const saveSettings = () => {
  console.log('Basic Settings:', basicSettings.value)
  console.log('Security Settings:', securitySettings.value)
  console.log('Backup Settings:', backupSettings.value)
  
  alert('システム設定を保存しました')
}

const createBackup = () => {
  alert('手動バックアップを作成しています...')
}

const restoreBackup = () => {
  if (confirm('バックアップから復元しますか？現在のデータは失われます。')) {
    alert('バックアップから復元しています...')
  }
}

const clearCache = () => {
  alert('キャッシュをクリアしました')
}

const optimizeDatabase = () => {
  alert('データベースを最適化しています...')
}

const exportLogs = () => {
  alert('ログをエクスポートしています...')
}

const systemCheck = () => {
  alert('システムチェックを実行しています...')
}
</script>