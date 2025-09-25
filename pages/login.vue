<template>
  <div class="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <!-- ロゴ -->
      <div class="text-center mb-8">
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
              required
              :disabled="loading"
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
              :disabled="loading"
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
          <span v-else>ログイン</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const { login, checkAuth, userRole } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

// マウント時に既にログインしているかチェック
onMounted(async () => {
  const isAuthenticated = await checkAuth()
  if (isAuthenticated) {
    redirectToDashboard()
  }
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const result = await login(email.value, password.value)

    if (result.success) {
      // ログイン成功
      redirectToDashboard()
    } else {
      // ログイン失敗
      error.value = result.error || 'メールアドレスまたはパスワードが正しくありません'
    }
  } catch (err) {
    console.error('Login error:', err)
    error.value = 'ログインに失敗しました。しばらくしてから再度お試しください。'
  } finally {
    loading.value = false
  }
}

const redirectToDashboard = () => {
  // ユーザーのロールに応じてリダイレクト先を変更
  const role = userRole.value
  if (role === 'support') {
    navigateTo('/dashboard')
  } else {
    navigateTo('/tickets')
  }
}

const fillDemoAccount = (demoEmail, demoPassword) => {
  email.value = demoEmail
  password.value = demoPassword
}
</script>