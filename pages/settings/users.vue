<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">ユーザー管理</h1>
      <p class="text-gray-600">システムユーザーのアカウント・権限を管理します。</p>
    </div>

    <!-- ユーザー追加ボタン -->
    <div class="mb-6 flex justify-end">
      <button @click="showAddUserModal = true" class="iws-btn-primary">
        <PlusIcon class="h-4 w-4 mr-2" />
        新規ユーザー追加
      </button>
    </div>

    <!-- ユーザー一覧 -->
    <div class="iws-card">
      <h2 class="text-lg font-semibold mb-4">ユーザー一覧</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>名前</th>
              <th>メールアドレス</th>
              <th>部署</th>
              <th>権限</th>
              <th>状態</th>
              <th>最終ログイン</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar placeholder">
                    <div class="bg-primary text-primary-content rounded-full w-8 h-8">
                      <span class="text-sm">{{ user.name.charAt(0) }}</span>
                    </div>
                  </div>
                  <span class="font-medium">{{ user.name }}</span>
                </div>
              </td>
              <td>{{ user.email }}</td>
              <td>{{ user.department }}</td>
              <td>
                <div :class="getRoleBadgeClass(user.role)">
                  {{ getRoleLabel(user.role) }}
                </div>
              </td>
              <td>
                <div :class="user.active ? 'badge badge-success' : 'badge badge-error'">
                  {{ user.active ? 'アクティブ' : '無効' }}
                </div>
              </td>
              <td>{{ user.lastLogin }}</td>
              <td>
                <div class="flex space-x-2">
                  <button @click="editUser(user)" class="btn btn-ghost btn-sm">編集</button>
                  <button @click="toggleUserStatus(user)" class="btn btn-outline btn-sm" 
                          :class="user.active ? 'btn-error' : 'btn-success'">
                    {{ user.active ? '無効化' : '有効化' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ユーザー追加モーダル -->
    <div v-if="showAddUserModal" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">新規ユーザー追加</h3>
        
        <div class="space-y-4">
          <div>
            <label class="label">
              <span class="label-text font-medium">名前 <span class="text-error">*</span></span>
            </label>
            <input v-model="newUser.name" type="text" class="iws-input" placeholder="田中太郎" required />
          </div>
          
          <div>
            <label class="label">
              <span class="label-text font-medium">メールアドレス <span class="text-error">*</span></span>
            </label>
            <input v-model="newUser.email" type="email" class="iws-input" placeholder="tanaka@zwei.com" required />
          </div>
          
          <div>
            <label class="label">
              <span class="label-text font-medium">部署</span>
            </label>
            <select v-model="newUser.department" class="iws-select">
              <option value="">選択してください</option>
              <option value="営業部">営業部</option>
              <option value="管理部">管理部</option>
              <option value="サポート部">サポート部</option>
              <option value="情報システム部">情報システム部</option>
            </select>
          </div>
          
          <div>
            <label class="label">
              <span class="label-text font-medium">権限 <span class="text-error">*</span></span>
            </label>
            <select v-model="newUser.role" class="iws-select" required>
              <option value="">選択してください</option>
              <option value="user">一般ユーザー</option>
              <option value="approver">承認者</option>
              <option value="support">サポート担当</option>
            </select>
          </div>
        </div>

        <div class="modal-action">
          <button @click="showAddUserModal = false" class="btn btn-ghost">キャンセル</button>
          <button @click="addUser" class="btn btn-primary" :disabled="!isNewUserValid">追加</button>
        </div>
      </div>
      <div class="modal-backdrop" @click="showAddUserModal = false"></div>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'

const showAddUserModal = ref(false)

const newUser = ref({
  name: '',
  email: '',
  department: '',
  role: ''
})

const users = ref([
  {
    id: 1,
    name: '田中太郎',
    email: 'tanaka@zwei.com',
    department: '営業部',
    role: 'user',
    active: true,
    lastLogin: '2025/01/02 09:30'
  },
  {
    id: 2,
    name: '山田花子',
    email: 'yamada@zwei.com',
    department: '管理部',
    role: 'approver',
    active: true,
    lastLogin: '2025/01/02 08:45'
  },
  {
    id: 3,
    name: 'サポート担当',
    email: 'support@zwei.com',
    department: 'サポート部',
    role: 'support',
    active: true,
    lastLogin: '2025/01/02 10:15'
  }
])

const isNewUserValid = computed(() => {
  return newUser.value.name && newUser.value.email && newUser.value.role
})

const getRoleLabel = (role) => {
  const labels = {
    user: '一般ユーザー',
    approver: '承認者',
    support: 'サポート担当'
  }
  return labels[role] || role
}

const getRoleBadgeClass = (role) => {
  const classes = {
    user: 'badge badge-info',
    approver: 'badge badge-warning',
    support: 'badge badge-success'
  }
  return classes[role] || 'badge badge-neutral'
}

const addUser = () => {
  if (!isNewUserValid.value) return
  
  const user = {
    id: users.value.length + 1,
    ...newUser.value,
    active: true,
    lastLogin: '-'
  }
  
  users.value.push(user)
  
  // フォームリセット
  newUser.value = {
    name: '',
    email: '',
    department: '',
    role: ''
  }
  
  showAddUserModal.value = false
  alert('ユーザーを追加しました')
}

const editUser = (user) => {
  alert(`${user.name} の編集機能は開発中です`)
}

const toggleUserStatus = (user) => {
  user.active = !user.active
  alert(`${user.name} を${user.active ? '有効化' : '無効化'}しました`)
}
</script>