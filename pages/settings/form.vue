<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">フォーム設定</h1>
      <p class="text-gray-600">入力項目・選択肢の管理を行います。</p>
    </div>

    <!-- カテゴリ設定 -->
    <div class="iws-card mb-6">
      <h2 class="text-lg font-semibold mb-4">カテゴリ設定</h2>
      <div class="space-y-4">
        <div v-for="(category, index) in categories" :key="index" class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">{{ category.name }}</div>
            <div class="text-sm text-gray-600">{{ category.description }}</div>
          </div>
          <div class="flex space-x-2">
            <button class="btn btn-ghost btn-sm">編集</button>
            <button class="btn btn-error btn-outline btn-sm">削除</button>
          </div>
        </div>
        <button class="btn btn-primary btn-sm">新規カテゴリ追加</button>
      </div>
    </div>

    <!-- 対象設定 -->
    <div class="iws-card mb-6">
      <h2 class="text-lg font-semibold mb-4">対象設定</h2>
      <div class="space-y-4">
        <div v-for="(target, index) in targets" :key="index" class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div>
            <div class="font-medium">{{ target.name }}</div>
            <div class="text-sm text-gray-600">{{ target.description }}</div>
          </div>
          <div class="flex space-x-2">
            <button class="btn btn-ghost btn-sm">編集</button>
            <button class="btn btn-error btn-outline btn-sm">削除</button>
          </div>
        </div>
        <button class="btn btn-primary btn-sm">新規対象追加</button>
      </div>
    </div>

    <!-- 優先度設定 -->
    <div class="iws-card">
      <h2 class="text-lg font-semibold mb-4">優先度設定</h2>
      <div class="space-y-4">
        <div v-for="(priority, index) in priorities" :key="index" class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div class="flex items-center space-x-3">
            <div :class="getPriorityBadgeClass(priority.level)">{{ priority.level }}</div>
            <div>
              <div class="font-medium">{{ priority.name }}</div>
              <div class="text-sm text-gray-600">{{ priority.description }}</div>
            </div>
          </div>
          <div class="flex space-x-2">
            <button class="btn btn-ghost btn-sm">編集</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'

// refはNuxt 3で自動インポートされる

const categories = ref([
  {
    name: 'EUS（社内ITサポート）',
    description: '端末・アカウント・ソフトウェアの問題'
  },
  {
    name: '保守 — Z-CRM',
    description: '顧客管理システムの修正・操作代行'
  },
  {
    name: '保守 — zwei.com',
    description: 'Webサイトの障害・コンテンツ更新'
  },
  {
    name: '保守 — ネットワーク',
    description: '拠点・店舗のネットワーク障害'
  }
])

const targets = ref([
  {
    name: '端末・アカウント',
    description: 'PC、ユーザーアカウント関連'
  },
  {
    name: 'アプリ（Z-CRM/他）',
    description: 'アプリケーション関連'
  },
  {
    name: 'サイト（zwei.com）',
    description: 'Webサイト関連'
  },
  {
    name: '拠点ネットワーク',
    description: 'ネットワーク・インフラ関連'
  }
])

const priorities = ref([
  {
    level: 'P1',
    name: '重大障害',
    description: '一次応答 30分 / 暫定復旧 4時間'
  },
  {
    level: 'P2',
    name: '高優先度',
    description: '一次応答 1時間 / 復旧 8時間'
  },
  {
    level: 'P3',
    name: '通常優先度',
    description: '一次応答 4時間 / 復旧 24時間'
  }
])

// モーダル状態
const showCategoryModal = ref(false)
const showTargetModal = ref(false)
const showPriorityModal = ref(false)

// 編集中のデータ
const editingCategory = ref({ name: '', description: '' })
const editingTarget = ref({ name: '', description: '' })
const editingPriority = ref({ level: '', name: '', description: '' })

// 編集中のインデックス（-1は新規追加）
const editingCategoryIndex = ref(-1)
const editingTargetIndex = ref(-1)
const editingPriorityIndex = ref(-1)

const getPriorityBadgeClass = (priority) => {
  const classes = {
    'P1': 'priority-badge-p1',
    'P2': 'priority-badge-p2',
    'P3': 'priority-badge-p3'
  }
  return classes[priority] || 'badge badge-neutral'
}

// カテゴリ関連の関数
const openAddCategoryModal = () => {
  editingCategory.value = { name: '', description: '' }
  editingCategoryIndex.value = -1
  showCategoryModal.value = true
}

const editCategory = (category, index) => {
  editingCategory.value = { ...category }
  editingCategoryIndex.value = index
  showCategoryModal.value = true
}

const closeCategoryModal = () => {
  showCategoryModal.value = false
  editingCategory.value = { name: '', description: '' }
  editingCategoryIndex.value = -1
}

const saveCategory = () => {
  if (!editingCategory.value.name || !editingCategory.value.description) return
  
  if (editingCategoryIndex.value === -1) {
    // 新規追加
    categories.value.push({ ...editingCategory.value })
  } else {
    // 更新
    categories.value[editingCategoryIndex.value] = { ...editingCategory.value }
  }
  
  closeCategoryModal()
}

const deleteCategory = (index) => {
  if (confirm('このカテゴリを削除しますか？')) {
    categories.value.splice(index, 1)
  }
}

// 対象関連の関数
const openAddTargetModal = () => {
  editingTarget.value = { name: '', description: '' }
  editingTargetIndex.value = -1
  showTargetModal.value = true
}

const editTarget = (target, index) => {
  editingTarget.value = { ...target }
  editingTargetIndex.value = index
  showTargetModal.value = true
}

const closeTargetModal = () => {
  showTargetModal.value = false
  editingTarget.value = { name: '', description: '' }
  editingTargetIndex.value = -1
}

const saveTarget = () => {
  if (!editingTarget.value.name || !editingTarget.value.description) return
  
  if (editingTargetIndex.value === -1) {
    // 新規追加
    targets.value.push({ ...editingTarget.value })
  } else {
    // 更新
    targets.value[editingTargetIndex.value] = { ...editingTarget.value }
  }
  
  closeTargetModal()
}

const deleteTarget = (index) => {
  if (confirm('この対象を削除しますか？')) {
    targets.value.splice(index, 1)
  }
}

// 優先度関連の関数
const editPriority = (priority, index) => {
  editingPriority.value = { ...priority }
  editingPriorityIndex.value = index
  showPriorityModal.value = true
}

const closePriorityModal = () => {
  showPriorityModal.value = false
  editingPriority.value = { level: '', name: '', description: '' }
  editingPriorityIndex.value = -1
}

const savePriority = () => {
  if (!editingPriority.value.name || !editingPriority.value.description) return
  
  priorities.value[editingPriorityIndex.value] = { ...editingPriority.value }
  closePriorityModal()
}
</script>