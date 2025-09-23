<template>
  <div>
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ $route.params.id }}</h1>
          <p class="text-gray-600">Outlook送受信不可</p>
        </div>
        <div class="flex items-center space-x-3">
          <div class="priority-badge-p2">P2</div>
          <div class="status-badge-in-progress">進行中</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- メインコンテンツ -->
      <div class="lg:col-span-2 space-y-6">
        <!-- チケット詳細 -->
        <div class="iws-card">
          <h2 class="text-lg font-semibold mb-4">詳細情報</h2>
          <div class="space-y-4">
            <div>
              <div class="text-sm text-gray-600">説明</div>
              <div class="font-medium whitespace-pre-wrap">9/2 14:05、PC EC-A123でOutlook起動時"0x80040154"。昨日Windows更新</div>
            </div>
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
                <div class="text-sm text-gray-600">影響範囲</div>
                <div class="font-medium">本人のみ</div>
              </div>
              <div>
                <div class="text-sm text-gray-600">回避策</div>
                <div class="font-medium">なし</div>
              </div>
              <div>
                <div class="text-sm text-gray-600">業務影響</div>
                <div class="font-medium">一部業務に支障</div>
              </div>
              <div>
                <div class="text-sm text-gray-600">発生日時</div>
                <div class="font-medium">2025/01/02 14:05</div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div class="text-sm text-gray-600">起票者</div>
                <div class="font-medium">田中太郎</div>
              </div>
              <div>
                <div class="text-sm text-gray-600">担当者</div>
                <div class="font-medium">サポート担当</div>
              </div>
              <div>
                <div class="text-sm text-gray-600">起票日</div>
                <div class="font-medium">2025/01/02</div>
              </div>
            </div>
          </div>
        </div>

        <!-- コメント履歴 -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold mb-4">やり取り履歴</h2>
          <div class="space-y-4 max-h-96 overflow-y-auto">
            <!-- チャット風のメッセージ表示 -->
            <div class="flex items-start space-x-3">
              <div class="avatar placeholder">
                <div class="bg-primary text-primary-content rounded-full w-8 h-8">
                  <span class="text-xs">田</span>
                </div>
              </div>
              <div class="flex-1">
                <div class="bg-gray-100 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-1">
                    <div class="font-medium text-sm">田中太郎</div>
                    <div class="text-xs text-gray-500">2025/01/02 14:05</div>
                  </div>
                  <div class="text-sm">Outlook送受信不可の問題が発生しています。PC EC-A123でOutlook起動時に"0x80040154"エラーが表示されます。昨日Windows更新を行いました。</div>
                </div>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="avatar placeholder">
                <div class="bg-success text-success-content rounded-full w-8 h-8">
                  <span class="text-xs">サ</span>
                </div>
              </div>
              <div class="flex-1">
                <div class="bg-green-50 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-1">
                    <div class="font-medium text-sm">サポート担当</div>
                    <div class="text-xs text-gray-500">2025/01/02 15:30</div>
                  </div>
                  <div class="text-sm">Windows更新の影響と思われます。Outlookの再インストールを試してください。以下の手順で実行してください：<br>1. コントロールパネル > プログラムと機能<br>2. Microsoft Office を選択<br>3. 変更 > クイック修復</div>
                </div>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="avatar placeholder">
                <div class="bg-primary text-primary-content rounded-full w-8 h-8">
                  <span class="text-xs">田</span>
                </div>
              </div>
              <div class="flex-1">
                <div class="bg-gray-100 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-1">
                    <div class="font-medium text-sm">田中太郎</div>
                    <div class="text-xs text-gray-500">2025/01/02 16:15</div>
                  </div>
                  <div class="text-sm">クイック修復を実行しましたが、まだ同じエラーが発生します。他に試せる方法はありますか？</div>
                </div>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="avatar placeholder">
                <div class="bg-success text-success-content rounded-full w-8 h-8">
                  <span class="text-xs">サ</span>
                </div>
              </div>
              <div class="flex-1">
                <div class="bg-green-50 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-1">
                    <div class="font-medium text-sm">サポート担当</div>
                    <div class="text-xs text-gray-500">2025/01/02 16:45</div>
                  </div>
                  <div class="text-sm">承知しました。Outlookプロファイルの再作成を試してみましょう。リモートでサポートしますので、Teams会議を設定いたします。</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 返信フォーム -->
          <div class="mt-6 border-t pt-4">
            <div class="flex items-start space-x-3">
              <div class="avatar placeholder">
                <div class="bg-primary text-primary-content rounded-full w-8 h-8">
                  <span class="text-xs">田</span>
                </div>
              </div>
              <div class="flex-1">
                <textarea 
                  v-model="newMessage"
                  class="textarea textarea-bordered w-full"
                  rows="3"
                  placeholder="返信を入力してください..."
                ></textarea>
                <div class="flex justify-end mt-2">
                  <button 
                    @click="sendMessage"
                    class="btn btn-primary btn-sm"
                    :disabled="!newMessage.trim()"
                  >
                    送信
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- サイドバー -->
      <div class="space-y-6">
        <!-- 操作ボタン -->
        <div class="iws-card">
          <h3 class="font-semibold mb-3">操作</h3>
          <div class="space-y-2">
            <!-- 一般ユーザーの操作 -->
            <div v-if="userRole === 'user'">
              <button 
                @click="cancelTicket"
                class="btn btn-error btn-outline btn-sm w-full"
                :disabled="ticketStatus === '完了'"
              >
                <XMarkIcon class="h-4 w-4 mr-1" />
                取消
              </button>
              <button 
                v-if="ticketStatus === '完了'"
                @click="evaluateTicket"
                class="btn btn-primary btn-sm w-full mt-2"
              >
                <StarIcon class="h-4 w-4 mr-1" />
                評価
              </button>
            </div>

            <!-- 承認者の操作 -->
            <div v-if="userRole === 'approver'">
              <button 
                v-if="ticketStatus === '承認待ち'"
                @click="approveTicket"
                class="btn btn-success btn-sm w-full"
              >
                <CheckIcon class="h-4 w-4 mr-1" />
                承認
              </button>
              <button 
                v-if="ticketStatus === '承認待ち'"
                @click="rejectTicket"
                class="btn btn-error btn-outline btn-sm w-full mt-2"
              >
                <XMarkIcon class="h-4 w-4 mr-1" />
                却下
              </button>
              <button 
                v-if="ticketStatus === '進行中'"
                @click="sendBackTicket"
                class="btn btn-warning btn-outline btn-sm w-full"
              >
                <ArrowUturnLeftIcon class="h-4 w-4 mr-1" />
                差し戻し
              </button>
              <!-- 自分で起票した場合の操作 -->
              <button 
                v-if="isOwnTicket"
                @click="cancelTicket"
                class="btn btn-error btn-outline btn-sm w-full mt-2"
                :disabled="ticketStatus === '完了'"
              >
                <XMarkIcon class="h-4 w-4 mr-1" />
                取消
              </button>
              <button 
                v-if="isOwnTicket && ticketStatus === '完了'"
                @click="evaluateTicket"
                class="btn btn-primary btn-sm w-full mt-2"
              >
                <StarIcon class="h-4 w-4 mr-1" />
                評価
              </button>
            </div>

            <!-- サポート担当の操作 -->
            <div v-if="userRole === 'support'">
              <button 
                v-if="ticketStatus === '進行中'"
                @click="completeTicket"
                class="btn btn-success btn-sm w-full"
              >
                <CheckCircleIcon class="h-4 w-4 mr-1" />
                完了
              </button>
              <button 
                v-if="ticketStatus === '進行中'"
                @click="sendBackToApproval"
                class="btn btn-warning btn-outline btn-sm w-full mt-2"
              >
                <ArrowUturnLeftIcon class="h-4 w-4 mr-1" />
                承認に差し戻し
              </button>
            </div>
          </div>
        </div>

        <!-- ステータス -->
        <div class="iws-card">
          <h3 class="font-semibold mb-3">ステータス</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm">優先度</span>
              <div class="priority-badge-p2">P2</div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm">状態</span>
              <div class="status-badge-in-progress">進行中</div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm">担当者</span>
              <span class="text-sm font-medium">IT部</span>
            </div>
          </div>
        </div>

        <!-- SLA情報 -->
        <div class="iws-card">
          <h3 class="font-semibold mb-3">SLA</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>一次応答</span>
              <span class="font-medium">1時間</span>
            </div>
            <div class="flex justify-between">
              <span>復旧目標</span>
              <span class="font-medium">8時間</span>
            </div>
          </div>
          <div class="mt-3 p-2 bg-success/10 rounded text-xs">
            <div class="flex items-center space-x-1">
              <CheckCircleIcon class="h-3 w-3 text-success" />
              <span class="text-success font-medium">SLA内対応中</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '../composables/useAuth'
import { 
  CheckCircleIcon,
  CheckIcon,
  XMarkIcon,
  StarIcon,
  ArrowUturnLeftIcon
} from '@heroicons/vue/24/outline'

const { user, userRole } = useAuth()

const newMessage = ref('')
const ticketStatus = ref('進行中') // 実際のチケット状態

// 自分で起票したチケットかどうか（承認者用）
const isOwnTicket = computed(() => {
  // 実際の実装では起票者IDと現在のユーザーIDを比較
  return user.value?.name === '田中太郎' // サンプル
})

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  // メッセージ送信処理
  console.log('メッセージ送信:', newMessage.value)
  newMessage.value = ''
}

// 操作関数
const cancelTicket = () => {
  if (confirm('このチケットを取消しますか？')) {
    console.log('チケット取消')
    alert('チケットを取消しました')
  }
}

const evaluateTicket = () => {
  console.log('評価画面を開く')
  alert('評価画面を開きます')
}

const approveTicket = () => {
  if (confirm('このチケットを承認しますか？')) {
    console.log('チケット承認')
    ticketStatus.value = '進行中'
    alert('チケットを承認しました')
  }
}

const rejectTicket = () => {
  const reason = prompt('却下理由を入力してください：')
  if (reason) {
    console.log('チケット却下:', reason)
    alert('チケットを却下しました')
  }
}

const sendBackTicket = () => {
  const reason = prompt('差し戻し理由を入力してください：')
  if (reason) {
    console.log('チケット差し戻し:', reason)
    ticketStatus.value = '承認待ち'
    alert('チケットを差し戻しました')
  }
}

const completeTicket = () => {
  if (confirm('このチケットを完了しますか？')) {
    console.log('チケット完了')
    ticketStatus.value = '完了'
    alert('チケットを完了しました')
  }
}

const sendBackToApproval = () => {
  console.log('承認に差し戻し')
  ticketStatus.value = '承認待ち'
  alert('承認に差し戻しました')
}
</script>