<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">ルーティング設定</h1>
      <p class="text-gray-600">カテゴリ×優先度の振り分けルールを管理します。</p>
    </div>

    <!-- 自動承認設定 -->
    <div class="iws-card mb-6">
      <h2 class="text-lg font-semibold mb-4">自動承認設定</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>カテゴリ</th>
              <th>優先度</th>
              <th>自動承認</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rule, index) in autoApprovalRules" :key="index">
              <td>{{ rule.category }}</td>
              <td>
                <div :class="getPriorityBadgeClass(rule.priority)">{{ rule.priority }}</div>
              </td>
              <td>
                <input 
                  v-model="rule.autoApproval" 
                  type="checkbox" 
                  class="checkbox checkbox-primary"
                />
              </td>
              <td>
                <button class="btn btn-ghost btn-sm">編集</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 担当者割り当て設定 -->
    <div class="iws-card">
      <h2 class="text-lg font-semibold mb-4">担当者割り当て設定</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>カテゴリ</th>
              <th>担当部署</th>
              <th>担当者</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(assignment, index) in assignments" :key="index">
              <td>{{ assignment.category }}</td>
              <td>{{ assignment.department }}</td>
              <td>{{ assignment.assignee }}</td>
              <td>
                <button class="btn btn-ghost btn-sm">編集</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// refはNuxt 3で自動インポートされる

const autoApprovalRules = ref([
  { category: 'EUS', priority: 'P1', autoApproval: false },
  { category: 'EUS', priority: 'P2', autoApproval: false },
  { category: 'EUS', priority: 'P3', autoApproval: true },
  { category: '保守 — Z-CRM', priority: 'P1', autoApproval: false },
  { category: '保守 — Z-CRM', priority: 'P2', autoApproval: false },
  { category: '保守 — Z-CRM', priority: 'P3', autoApproval: false },
])

const assignments = ref([
  { category: 'EUS', department: 'サポート部', assignee: 'サポート担当' },
  { category: '保守 — Z-CRM', department: 'サポート部', assignee: 'サポート担当' },
  { category: '保守 — zwei.com', department: 'サポート部', assignee: 'サポート担当' },
  { category: '保守 — ネットワーク', department: 'サポート部', assignee: 'サポート担当' },
])

const getPriorityBadgeClass = (priority) => {
  const classes = {
    'P1': 'priority-badge-p1',
    'P2': 'priority-badge-p2',
    'P3': 'priority-badge-p3'
  }
  return classes[priority] || 'badge badge-neutral'
}
</script>