<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">全チケット</h1>
        <p class="text-gray-600">システム内の全チケットを管理できます。</p>
      </div>
      <router-link to="/inquiry/new" class="btn btn-primary">
        新規問い合わせ
      </router-link>
    </div>

    <!-- フィルター -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="label">
            <span class="label-text font-medium">起票日</span>
          </label>
          <input 
            v-model="filters.dateFrom"
            type="date" 
            class="input input-bordered w-full"
          />
        </div>
        <div>
          <label class="label">
            <span class="label-text font-medium">〜</span>
          </label>
          <input 
            v-model="filters.dateTo"
            type="date" 
            class="input input-bordered w-full"
          />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div>
          <label class="label">
            <span class="label-text font-medium">問合せ者</span>
          </label>
          <input 
            v-model="filters.requester"
            type="text" 
            class="input input-bordered w-full"
            placeholder="名前で検索"
          />
        </div>
        <div>
          <label class="label">
            <span class="label-text font-medium">担当者</span>
          </label>
          <select v-model="filters.assignee" class="select select-bordered w-full">
            <option value="">すべて</option>
            <option value="サポート担当">サポート担当</option>
            <option value="情報システム部">情報システム部</option>
          </select>
        </div>
        <div>
          <label class="label">
            <span class="label-text font-medium">優先度</span>
          </label>
          <select v-model="filters.priority" class="select select-bordered w-full">
            <option value="">すべて</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
          </select>
        </div>
        <div>
          <label class="label">
            <span class="label-text font-medium">状態</span>
          </label>
          <select v-model="filters.status" class="select select-bordered w-full">
            <option value="">すべて</option>
            <option value="承認待ち">承認待ち</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="applyFilters" class="btn btn-primary">
          フィルター適用
        </button>
      </div>
    </div>

    <!-- チケット一覧 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>チケット番号</th>
              <th>件名</th>
              <th>問合せ者</th>
              <th>担当者</th>
              <th>優先度</th>
              <th>状態</th>
              <th>起票日</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="ticket in paginatedTickets" 
              :key="ticket.id"
              @click="goToTicket(ticket.id)"
              class="cursor-pointer hover:bg-gray-50"
            >
              <td>
                <code class="text-sm font-mono">{{ ticket.id }}</code>
              </td>
              <td>
                <div class="font-medium">{{ ticket.title }}</div>
                <div class="text-sm text-gray-500 truncate max-w-xs">
                  {{ ticket.description }}
                </div>
              </td>
              <td>{{ ticket.requester }}</td>
              <td>{{ ticket.assignee }}</td>
              <td>
                <div :class="getPriorityBadgeClass(ticket.priority)">
                  {{ ticket.priority }}
                </div>
              </td>
              <td>
                <div :class="getStatusBadgeClass(ticket.status)">
                  {{ ticket.status }}
                </div>
              </td>
              <td>{{ ticket.createdAt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- ページング -->
      <div class="flex justify-between items-center p-4 border-t">
        <div class="text-sm text-gray-600">
          {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, filteredTickets.length) }} 件 / 全 {{ filteredTickets.length }} 件
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
    </div>
  </div>
</template>

<script setup>
// Nuxt 3では自動インポートされるため、ref, computedは不要

const filters = ref({
  dateFrom: '',
  dateTo: '',
  requester: '',
  assignee: '',
  priority: '',
  status: ''
})

const currentPage = ref(1)
const pageSize = ref(20)

// サンプルデータ
const allTickets = ref([
  {
    id: '#IWS-2025-000489',
    title: 'Outlook送受信不可',
    description: '9/2 14:05、PC EC-A123でOutlook起動時"0x80040154"',
    requester: '田中太郎',
    assignee: 'サポート担当',
    priority: 'P2',
    status: '進行中',
    createdAt: '2025/01/02'
  },
  {
    id: '#IWS-2025-000473',
    title: '店舗12 Wi-Fi全断',
    description: '店舗12のWi-Fiが全断。顧客対応に支障。',
    requester: '山田花子',
    assignee: 'サポート担当',
    priority: 'P1',
    status: '完了',
    createdAt: '2025/01/01'
  },
  {
    id: '#IWS-2025-000462',
    title: '会員ランク誤り修正',
    description: '会員：山田太郎／1992-03-15、会員詳細＞契約タブ。ランクS→Aへの修正希望',
    requester: '営業部 田中',
    assignee: 'サポート担当',
    priority: 'P3',
    status: '承認待ち',
    createdAt: '2024/12/31'
  },
  {
    id: '#IWS-2025-000450',
    title: 'プリンター接続不可',
    description: 'オフィスプリンターに接続できない',
    requester: '佐藤次郎',
    assignee: 'サポート担当',
    priority: 'P3',
    status: '進行中',
    createdAt: '2024/12/30'
  }
])

const filteredTickets = computed(() => {
  return allTickets.value.filter(ticket => {
    if (filters.value.dateFrom && ticket.createdAt < filters.value.dateFrom) return false
    if (filters.value.dateTo && ticket.createdAt > filters.value.dateTo) return false
    if (filters.value.requester && !ticket.requester.includes(filters.value.requester)) return false
    if (filters.value.assignee && ticket.assignee !== filters.value.assignee) return false
    if (filters.value.priority && ticket.priority !== filters.value.priority) return false
    if (filters.value.status && ticket.status !== filters.value.status) return false
    return true
  })
})

const totalPages = computed(() => Math.ceil(filteredTickets.value.length / pageSize.value))

const paginatedTickets = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredTickets.value.slice(start, end)
})

const getPriorityBadgeClass = (priority) => {
  const classes = {
    'P1': 'badge badge-error text-white',
    'P2': 'badge badge-warning text-white',
    'P3': 'badge badge-info text-white'
  }
  return classes[priority] || 'badge badge-neutral'
}

const getStatusBadgeClass = (status) => {
  const classes = {
    '承認待ち': 'badge badge-warning text-white',
    '進行中': 'badge badge-info text-white',
    '完了': 'badge badge-success text-white'
  }
  return classes[status] || 'badge badge-neutral'
}

const applyFilters = () => {
  currentPage.value = 1
}

const goToTicket = (ticketId) => {
  return navigateTo(`/tickets/${ticketId.replace('#', '')}`)
}

const updateTicketStatus = (ticket) => {
  // 状態変更のモーダルを開く処理
  console.log('状態変更:', ticket)
}
</script>