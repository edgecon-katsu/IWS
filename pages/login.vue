<template>
  <div class="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <!-- ロゴ -->
      <div class="text-center mb-8">
        <img 
          src="https://www.zwei.com/wp-content/themes/zwei/img/common/logo2.svg" 
          alt="ZWEI Logo" 
          class="h-12 mx-auto mb-4"
        />
        <h1 class="text-2xl font-bold text-primary">IWS</h1>
        <p class="text-gray-600 text-sm">Internal Work System</p>
      </div>

      <!-- ログインフォーム -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="label">
            <span class="label-text font-medium">メールアドレス</span>
          </label>
          <input 
            v-model="email"
            type="email" 
            class="iws-input"
            placeholder="your-email@zwei.com"
            required
          />
        </div>

        <div>
          <label class="label">
            <span class="label-text font-medium">パスワード</span>
          </label>
          <input 
            v-model="password"
            type="password" 
            class="iws-input"
            placeholder="パスワードを入力"
            required
          />
        </div>

        <div v-if="error" class="alert alert-error">
          <ExclamationTriangleIcon class="h-5 w-5" />
          <span>{{ error }}</span>
        </div>

        <button 
          type="submit" 
          class="iws-btn-primary w-full"
          :disabled="loading"
        >
          <span v-if="loading" class="loading loading-spinner loading-sm"></span>
          ログイン
        </button>
      </form>

      <!-- デモアカウント -->
      <div class="mt-8 p-4 bg-base-200 rounded-lg">
        <h3 class="font-semibold text-sm mb-3">デモアカウント</h3>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between">
            <span>一般ユーザー:</span>
            <code>tanaka@zwei.com</code>
          </div>
          <div class="flex justify-between">
            <span>承認者:</span>
            <code>yamada@zwei.com</code>
          </div>
          <div class="flex justify-between">
            <span>サポート担当:</span>
            <code>support@zwei.com</code>
          </div>
          <div class="text-center mt-2 text-gray-500">
            パスワード: <code>password</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const { setUser } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

// デモアカウント情報
const demoAccounts = {
  'tanaka@zwei.com': {
    id: 1,
    name: '田中太郎',
    email: 'tanaka@zwei.com',
    department: '営業部',
    role: 'user'
  },
  'yamada@zwei.com': {
    id: 2,
    name: '山田花子',
    email: 'yamada@zwei.com',
    department: '管理部',
    role: 'approver'
  },
  'support@zwei.com': {
    id: 3,
    name: 'サポート担当',
    email: 'support@zwei.com',
    department: 'サポート部',
    role: 'support'
  }
}
const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // ダミー認証
    if (password.value === 'password' && demoAccounts[email.value]) {
      // ユーザー情報を設定
      setUser(demoAccounts[email.value])
      await navigateTo('/dashboard')
    } else {
      error.value = 'メールアドレスまたはパスワードが正しくありません'
    }
  } catch (err) {
    error.value = 'ログインに失敗しました'
  } finally {
    loading.value = false
  }
}
</script>