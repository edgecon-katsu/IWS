<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">SLA設定</h1>
      <p class="text-gray-600">応答・復旧時間の目標値を設定します。</p>
    </div>

    <!-- SLA設定 -->
    <div class="iws-card mb-6">
      <h2 class="text-lg font-semibold mb-4">優先度別SLA設定</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>優先度</th>
              <th>名称</th>
              <th>一次応答時間</th>
              <th>復旧目標時間</th>
              <th>営業時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(sla, index) in slaSettings" :key="index">
              <td>
                <div :class="getPriorityBadgeClass(sla.priority)">{{ sla.priority }}</div>
              </td>
              <td>{{ sla.name }}</td>
              <td>{{ sla.responseTime }}</td>
              <td>{{ sla.resolutionTime }}</td>
              <td>{{ sla.businessHours }}</td>
              <td>
                <button class="btn btn-ghost btn-sm">編集</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 営業時間設定 -->
    <div class="iws-card mb-6">
      <h2 class="text-lg font-semibold mb-4">営業時間設定</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="label">
            <span class="label-text font-medium">平日営業時間</span>
          </label>
          <div class="flex items-center space-x-2">
            <input type="time" v-model="businessHours.weekdayStart" class="input input-bordered" />
            <span>〜</span>
            <input type="time" v-model="businessHours.weekdayEnd" class="input input-bordered" />
          </div>
        </div>
        <div>
          <label class="label">
            <span class="label-text font-medium">土曜営業時間</span>
          </label>
          <div class="flex items-center space-x-2">
            <input type="time" v-model="businessHours.saturdayStart" class="input input-bordered" />
            <span>〜</span>
            <input type="time" v-model="businessHours.saturdayEnd" class="input input-bordered" />
          </div>
        </div>
      </div>
      <div class="mt-4">
        <label class="cursor-pointer flex items-center space-x-2">
          <input type="checkbox" v-model="businessHours.sundayOpen" class="checkbox checkbox-primary" />
          <span>日曜日も営業</span>
        </label>
      </div>
    </div>

    <!-- エスカレーション設定 -->
    <div class="iws-card">
      <h2 class="text-lg font-semibold mb-4">エスカレーション設定</h2>
      <div class="space-y-4">
        <div v-for="(escalation, index) in escalationRules" :key="index" class="p-4 border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">{{ escalation.name }}</div>
              <div class="text-sm text-gray-600">{{ escalation.condition }}</div>
            </div>
            <div class="flex space-x-2">
              <button class="btn btn-ghost btn-sm">編集</button>
              <button class="btn btn-error btn-outline btn-sm">削除</button>
            </div>
          </div>
        </div>
        <button class="btn btn-primary btn-sm">新規エスカレーション追加</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'

// refはNuxt 3で自動インポートされる

const slaSettings = ref([
  {
    priority: 'P1',
    name: '重大障害',
    responseTime: '30分',
    resolutionTime: '4時間',
    businessHours: '24時間365日'
  },
  {
    priority: 'P2',
    name: '高優先度',
    responseTime: '1時間',
    resolutionTime: '8時間',
    businessHours: '営業時間内'
  },
  {
    priority: 'P3',
    name: '通常優先度',
    responseTime: '4時間',
    resolutionTime: '24時間',
    businessHours: '営業時間内'
  }
])

const businessHours = ref({
  weekdayStart: '09:00',
  weekdayEnd: '18:00',
  saturdayStart: '09:00',
  saturdayEnd: '12:00',
  sundayOpen: false
})

const escalationRules = ref([
  {
    name: 'P1 SLA違反時',
    condition: 'P1チケットが4時間以内に解決されない場合'
  },
  {
    name: 'P2 SLA違反時',
    condition: 'P2チケットが8時間以内に解決されない場合'
  }
])

const getPriorityBadgeClass = (priority) => {
  const classes = {
// モーダル状態
const showSlaModal = ref(false)
const showEscalationModal = ref(false)

// 編集中のデータ
const editingSla = ref({ priority: '', name: '', responseTime: '', resolutionTime: '', businessHours: '' })
const editingEscalation = ref({ name: '', condition: '', notifyTo: '' })

// 編集中のインデックス
const editingSlaIndex = ref(-1)
const editingEscalationIndex = ref(-1)

    'P1': 'priority-badge-p1',
    'P2': 'priority-badge-p2',
    'P3': 'priority-badge-p3'
  }
  return classes[priority] || 'badge badge-neutral'
}

// SLA関連の関数
const editSla = (sla, index) => {
  editingSla.value = { ...sla }
  editingSlaIndex.value = index
  showSlaModal.value = true
}

const closeSlaModal = () => {
  showSlaModal.value = false
  editingSla.value = { priority: '', name: '', responseTime: '', resolutionTime: '', businessHours: '' }
  editingSlaIndex.value = -1
}

const saveSla = () => {
  if (!editingSla.value.name || !editingSla.value.responseTime || !editingSla.value.resolutionTime || !editingSla.value.businessHours) return
  
  slaSettings.value[editingSlaIndex.value] = { ...editingSla.value }
  closeSlaModal()
}

// 営業時間保存
const saveBusinessHours = () => {
  alert('営業時間設定を保存しました')
}

// エスカレーション関連の関数
const openAddEscalationModal = () => {
  editingEscalation.value = { name: '', condition: '', notifyTo: '' }
  editingEscalationIndex.value = -1
  showEscalationModal.value = true
}

const editEscalation = (escalation, index) => {
  editingEscalation.value = { ...escalation }
  editingEscalationIndex.value = index
  showEscalationModal.value = true
}

const closeEscalationModal = () => {
  showEscalationModal.value = false
  editingEscalation.value = { name: '', condition: '', notifyTo: '' }
  editingEscalationIndex.value = -1
}

const saveEscalation = () => {
  if (!editingEscalation.value.name || !editingEscalation.value.condition) return
  
  if (editingEscalationIndex.value === -1) {
    // 新規追加
    escalationRules.value.push({ ...editingEscalation.value })
  } else {
    // 更新
    escalationRules.value[editingEscalationIndex.value] = { ...editingEscalation.value }
  }
  
  closeEscalationModal()
}

const deleteEscalation = (index) => {
  if (confirm('このエスカレーションルールを削除しますか？')) {
    escalationRules.value.splice(index, 1)
  }
}
</script>