<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">承認待ち</h1>
        <p class="text-gray-600">承認が必要なチケットの一覧です。</p>
      </div>
      <div class="badge badge-warning badge-lg">
        {{ filteredApprovals.length }}件
      </div>
    </div>

    <!-- フィルター -->
    <div class="iws-card mb-6">
      <h3 class="text-lg font-semibold mb-4">フィルター</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="label">
            <span class="label-text font-medium">起票日（開始）</span>
          </label>
          <input 
            v-model="filters.dateFrom"
            type="date" 
            class="iws-input"
          />
        </div>
        <div>
          <label class="label">
            <span class="label-text font-medium">起票日（終了）</span>
          </label>
          <input 
            v-model="filters.dateTo"
            type="date" 
            class="iws-input"
          />
        </div>
        <div>
          <label class="label">
            <span class="label-text font-medium">問合せ者</span>
          </label>
          <input 
            v-model="filters.requester"
            type="text" 
            class="iws-input"
            placeholder="名前で検索"
          />
        </div>
        <div>
          <label class="label">
            <span class="label-text font-medium">優先度</span>
          </label>
          <select v-model="filters.priority" class="iws-select">
            <option value="">すべて</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="applyFilters" class="iws-btn-primary">
          フィルター適用
        </button>
      </div>
    </div>

    <!-- 承認待ちチケット一覧 -->
    <div class="space-y-4">
      <div 
        v-for="approval in paginatedApprovals" 
        :key="approval.id"
        class="iws-card cursor-pointer hover:shadow-lg transition-all duration-200"
        @click="goToTicketDetail(approval.id)"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-3">
              <code class="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{{ approval.id }}</code>
              <div :class="getPriorityBadgeClass(approval.priority)">{{ approval.priority }}</div>
              <div class="badge badge-outline badge-sm">{{ approval.category }}</div>
            </div>
            
            <h3 class="text-lg font-semibold mb-2">{{ approval.title }}</h3>
            <p class="text-gray-600 mb-4">{{ approval.description }}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span class="text-gray-500">起票者:</span>
                <span class="font-medium ml-1">{{ approval.requester }}</span>
              </div>
              <div>
                <span class="text-gray-500">起票日:</span>
                <span class="font-medium ml-1">{{ approval.createdAt }}</span>
              </div>
              <div>
                <span class="text-gray-500">費用:</span>
                <span class="font-medium ml-1">{{ approval.costType }}</span>
              </div>
            </div>
          </div>
          
          <div class="flex flex-col space-y-2 ml-6">
            <button 
              @click="approveTicket(approval)"
              @click.stop
              class="iws-btn-primary btn-sm"
            >
              <CheckIcon class="h-4 w-4 mr-1" />
              承認
            </button>
            <button 
              @click="openRejectModal(approval)"
              @click.stop
              class="btn btn-error btn-outline btn-sm"
            >
              <XMarkIcon class="h-4 w-4 mr-1" />
              却下
            </button>
            <router-link 
              :to="`/tickets/${approval.id.replace('#', '')}`"
              @click.stop
              class="btn btn-ghost btn-sm"
            >
              <EyeIcon class="h-4 w-4 mr-1" />
              詳細
            </router-link>
          </div>
        </div>
      </div>

      <!-- 承認待ちがない場合 -->
      <div v-if="filteredApprovals.length === 0" class="text-center py-12">
        <div class="text-gray-500 mb-2">承認待ちのチケットはありません</div>
        <div class="text-sm text-gray-400">新しい承認依頼があると、ここに表示されます</div>
      </div>
    </div>

    <!-- ページング -->
    <div v-if="totalPages > 1" class="flex justify-between items-center mt-6 p-4 bg-white rounded-lg shadow-sm">
      <div class="text-sm text-gray-600">
        {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, filteredApprovals.length) }} 件 / 全 {{ filteredApprovals.length }} 件
      </div>
      <div class="btn-group">
        <button 
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="btn btn-sm"
        >
          前へ
        </button>
        <button class="btn btn-sm btn-active">{{ currentPage }}</button>
        <button 
          @click="currentPage++"
          :disabled="currentPage >= totalPages"
          class="btn btn-sm"
        >
          次へ
        </button>
      </div>
    </div>

    <!-- 却下理由入力モーダル -->
    <div v-if="showRejectModal" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">チケット却下</h3>
        
        <div class="mb-4">
          <div class="text-sm text-gray-600 mb-2">対象チケット</div>
          <div class="font-medium">{{ selectedTicket?.id }} - {{ selectedTicket?.title }}</div>
        </div>

        <div class="mb-6">
          <label class="label">
            <span class="label-text font-medium">却下理由 <span class="text-error">*</span></span>
          </label>
          <textarea 
            v-model="rejectReason"
            class="iws-textarea"
            rows="4"
            placeholder="却下する理由を詳しく入力してください"
            required
          ></textarea>
          <div class="text-xs text-gray-500 mt-1">
            起票者にこの理由が通知されます
          </div>
        </div>

        <div class="modal-action">
          <button 
            @click="closeRejectModal"
            class="btn btn-ghost"
          >
            キャンセル
          </button>
          <button 
            @click="confirmReject"
            class="btn btn-error"
            :disabled="!rejectReason.trim()"
          >
            <XMarkIcon class="h-4 w-4 mr-1" />
            却下する
          </button>
        </div>
      </div>
      <div class="modal-backdrop" @click="closeRejectModal"></div>
    </div>
  </div>
</template>

<script setup>
import { 
  CheckIcon, 
  XMarkIcon,
  EyeIcon
} from '@heroicons/vue/24/outline'

// フィルター
const filters = ref({
  dateFrom: '',
  dateTo: '',
  requester: '',
  priority: ''
})

// ページング
const currentPage = ref(1)
const pageSize = ref(10)

// モーダル関連
const showRejectModal = ref(false)
const selectedTicket = ref(null)
const rejectReason = ref('')

// サンプルデータ
const allApprovals = ref([
  {
    id: '#IWS-2025-000462',
    title: '会員ランク誤り修正',
    description: '会員：山田太郎／1992-03-15、会員詳細＞契約タブ。ランクS→Aへの修正希望',
    requester: '営業部 田中',
    category: '保守 — Z-CRM',
    priority: 'P3',
    createdAt: '2024/12/31',
    costType: 'インシデント制'
  },
  {
    id: '#IWS-2025-000485',
    title: 'サーバー増設申請',
    description: 'アクセス増加に伴うWebサーバーの増設を申請します',
    requester: '情報システム部 佐藤',
    category: '保守 — zwei.com',
    priority: 'P2',
    createdAt: '2025/01/01',
    costType: '月額制'
  },
  {
    id: '#IWS-2025-000490',
    title: 'データベース移行作業',
    description: '旧システムから新システムへのデータ移行作業',
    requester: '管理部 鈴木',
    category: '保守 — Z-CRM',
    priority: 'P1',
    createdAt: '2025/01/02',
    costType: 'プロジェクト制'
  }
])

// フィルター適用
const filteredApprovals = computed(() => {
  return allApprovals.value.filter(approval => {
    if (filters.value.dateFrom && approval.createdAt < filters.value.dateFrom) return false
    if (filters.value.dateTo && approval.createdAt > filters.value.dateTo) return false
    if (filters.value.requester && !approval.requester.includes(filters.value.requester)) return false
    if (filters.value.priority && approval.priority !== filters.value.priority) return false
    return true
  })
})

// ページング計算
const totalPages = computed(() => Math.ceil(filteredApprovals.value.length / pageSize.value))

const paginatedApprovals = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredApprovals.value.slice(start, end)
})

// 優先度バッジクラス
const getPriorityBadgeClass = (priority) => {
  const classes = {
    'P1': 'priority-badge-p1',
    'P2': 'priority-badge-p2',
    'P3': 'priority-badge-p3'
  }
  return classes[priority] || 'badge badge-neutral'
}

// フィルター適用
const applyFilters = () => {
  currentPage.value = 1
}

// 承認処理
const approveTicket = (ticket) => {
  console.log('承認:', ticket)
  // 承認処理のロジック
  const index = allApprovals.value.findIndex(a => a.id === ticket.id)
  if (index !== -1) {
    allApprovals.value.splice(index, 1)
  }
  alert(`${ticket.id} を承認しました`)
}

// 却下モーダルを開く
const openRejectModal = (ticket) => {
  selectedTicket.value = ticket
  rejectReason.value = ''
  showRejectModal.value = true
}

// 却下モーダルを閉じる
const closeRejectModal = () => {
  showRejectModal.value = false
  selectedTicket.value = null
  rejectReason.value = ''
}

// 却下確定
const confirmReject = () => {
  if (!rejectReason.value.trim()) return
  
  console.log('却下:', selectedTicket.value, '理由:', rejectReason.value)
  
  // 却下処理のロジック
  const index = allApprovals.value.findIndex(a => a.id === selectedTicket.value.id)
  if (index !== -1) {
    allApprovals.value.splice(index, 1)
  }
  
  alert(`${selectedTicket.value.id} を却下しました\n理由: ${rejectReason.value}`)
  closeRejectModal()
}

// チケット詳細画面への遷移
const goToTicketDetail = (ticketId) => {
  const cleanId = ticketId.replace('#', '')
  return navigateTo(`/tickets/${cleanId}`)
}
</script>