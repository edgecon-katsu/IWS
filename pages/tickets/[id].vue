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
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ route.params.id }}</h1>
          <p class="text-gray-600">Outlook送受信不可</p>
        </div>
        <div class="flex items-center space-x-3">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            対応中
          </span>
          <button class="btn btn-sm btn-primary">
            <CheckIcon class="w-4 h-4 mr-1" />
            解決済みにする
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500 mb-1">優先度</h3>
          <p class="text-lg font-semibold text-red-600">高</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500 mb-1">カテゴリ</h3>
          <p class="text-lg font-semibold">メール</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500 mb-1">担当者</h3>
          <p class="text-lg font-semibold">田中 太郎</p>
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

        <!-- チャットコンポーネント -->
        <TicketChat :ticket-id="$route.params.id" />
      </div>

      <!-- サイドバー -->
      <div class="space-y-6">
        <!-- ステータス変更 -->
        <div class="iws-card">
          <h3 class="text-lg font-semibold mb-4">ステータス変更</h3>
          <div class="space-y-3">
            <button 
              v-if="ticketStatus === '進行中'"
              @click="ticketStatus = '解決済み'"
              class="btn btn-success btn-block"
            >
              <CheckCircleIcon class="w-4 h-4 mr-2" />
              解決済みにする
            </button>
            
            <button 
              v-if="isMyTicket && ticketStatus === '進行中'"
              @click="cancelTicket"
              class="btn btn-error btn-outline btn-block"
            >
              取消し
            </button>
            
            <button 
              v-if="ticketStatus === '解決済み'"
              @click="ticketStatus = '進行中'"
              class="btn btn-warning btn-outline btn-block"
            >
              再オープン
            </button>
          </div>
        </div>

        <!-- 関連情報 -->
        <div class="iws-card">
          <h3 class="text-lg font-semibold mb-4">関連情報</h3>
          <div class="space-y-3">
            <div>
              <div class="text-sm text-gray-600">関連チケット</div>
              <div class="text-sm">なし</div>
            </div>
            <div>
              <div class="text-sm text-gray-600">ナレッジベース</div>
              <a href="#" class="text-sm text-blue-600 hover:underline">Outlookエラー対処法</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  CheckCircleIcon,
  CheckIcon,
  ArrowUturnLeftIcon,
  ArrowLeftIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const { user, userRole } = useAuth()

const ticketStatus = ref('進行中') // 実際のチケット状態

// 自分で起票したチケットかどうか（承認者用）
const isMyTicket = computed(() => {
  // 実際の実装では、チケットの起票者と現在のユーザーを比較
  return user.value?.name === '田中太郎' // サンプル
})

// 操作関数
const cancelTicket = () => {
  if (confirm('このチケットを取消しますか？')) {
    // 取消し処理
    console.log('チケット取消し')
  }
}

const goBack = () => {
  // 前のページに戻る
  history.back()
}
</script>